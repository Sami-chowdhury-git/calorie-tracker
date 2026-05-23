/* ═══════════════════════════════════════════ */
/* ANALYTICS — Charts & Stats (Chart.js)       */
/* ═══════════════════════════════════════════ */

window.Analytics = {
  calorieChart: null,
  weightChart: null,
  weightPeriod: 7,

  init() {
    document.getElementById('weight-period-7').addEventListener('click', () => {
      this.weightPeriod = 7;
      document.getElementById('weight-period-7').classList.add('active');
      document.getElementById('weight-period-30').classList.remove('active');
      this.renderWeightChart();
    });
    document.getElementById('weight-period-30').addEventListener('click', () => {
      this.weightPeriod = 30;
      document.getElementById('weight-period-30').classList.add('active');
      document.getElementById('weight-period-7').classList.remove('active');
      this.renderWeightChart();
    });

    document.getElementById('weight-log-btn').addEventListener('click', () => {
      const w = parseFloat(document.getElementById('weight-input').value);
      if (!w || w < 30 || w > 300) { Utils.showToast('Enter a valid weight', 'warning'); return; }
      const log = Store.getWeightLog();
      const today = Utils.todayStr();
      const idx = log.findIndex(e => e.date === today);
      if (idx >= 0) log[idx].weight = w; else log.push({ date: today, weight: w });
      Store.saveWeightLog(log);
      document.getElementById('weight-input').value = '';

      // Weight log streak
      const ws = Store.getWeightLogStreak();
      const yesterday = Utils.addDays(today, -1);
      if (ws.lastDate === yesterday) ws.streak++;
      else if (ws.lastDate !== today) ws.streak = 1;
      ws.lastDate = today;
      Store.saveWeightLogStreak(ws);

      this.renderWeightChart();
      Utils.showToast('Weight logged!', 'success');
      document.dispatchEvent(new CustomEvent('check-achievements'));
    });

    document.addEventListener('meal-logged', () => this.refresh());
  },

  refresh() {
    this.renderCalorieChart();
    this.renderWeightChart();
    this.renderSummaryStats();
  },

  renderCalorieChart() {
    const canvas = document.getElementById('calorie-chart-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const profile = Store.getProfile();
    if (!profile) return;

    const labels = [], consumed = [], targets = [];
    for (let i = 6; i >= 0; i--) {
      const d = Utils.addDays(Utils.todayStr(), -i);
      labels.push(Utils.getDayName(d));
      const t = Store.getDayTotals(d);
      consumed.push(t.calories);
      targets.push(profile.tdee);
    }

    if (this.calorieChart) this.calorieChart.destroy();
    this.calorieChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          { label:'Consumed', data:consumed,
            backgroundColor:'rgba(99,102,241,0.7)', borderColor:'rgba(99,102,241,1)',
            borderWidth:1, borderRadius:6, barPercentage:0.6 },
          { label:'Target', data:targets,
            backgroundColor:'rgba(99,102,241,0.12)', borderColor:'rgba(99,102,241,0.25)',
            borderWidth:1, borderRadius:6, barPercentage:0.6 },
        ],
      },
      options: {
        responsive:true, maintainAspectRatio:false,
        plugins:{ legend:{ labels:{ color:'#94a3b8', font:{family:'Inter',size:11}, boxWidth:12, padding:16 } } },
        scales:{
          x:{ grid:{color:'rgba(99,102,241,0.06)'}, ticks:{color:'#64748b', font:{family:'Inter',size:11}} },
          y:{ grid:{color:'rgba(99,102,241,0.06)'}, ticks:{color:'#64748b', font:{family:'Inter',size:11}}, beginAtZero:true },
        },
      },
    });
  },

  renderWeightChart() {
    const canvas = document.getElementById('weight-chart-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const log = Store.getWeightLog();
    const cutoff = Utils.addDays(Utils.todayStr(), -this.weightPeriod);
    const filtered = log.filter(e => e.date >= cutoff).sort((a,b) => a.date.localeCompare(b.date));

    if (this.weightChart) this.weightChart.destroy();

    if (filtered.length === 0) {
      this.weightChart = new Chart(ctx, {
        type:'line',
        data:{ labels:['No data yet'], datasets:[{data:[0], borderColor:'transparent'}] },
        options:{ responsive:true, maintainAspectRatio:false,
          plugins:{legend:{display:false}}, scales:{x:{display:false},y:{display:false}} },
      });
      return;
    }

    const labels = filtered.map(e => { const d=new Date(e.date+'T12:00:00'); return `${d.getMonth()+1}/${d.getDate()}`; });
    const weights = filtered.map(e => e.weight);

    this.weightChart = new Chart(ctx, {
      type:'line',
      data:{
        labels,
        datasets:[{
          label:'Weight (kg)', data:weights,
          borderColor:'#818cf8',
          backgroundColor:(context) => {
            const ch = context.chart;
            const {ctx:c, chartArea} = ch;
            if (!chartArea) return 'transparent';
            const g = c.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
            g.addColorStop(0,'rgba(129,140,248,0.25)');
            g.addColorStop(1,'rgba(129,140,248,0.02)');
            return g;
          },
          fill:true, tension:0.4,
          pointBackgroundColor:'#818cf8', pointBorderColor:'#12121a',
          pointBorderWidth:2, pointRadius:4, pointHoverRadius:6,
        }],
      },
      options:{
        responsive:true, maintainAspectRatio:false,
        plugins:{ legend:{display:false} },
        scales:{
          x:{ grid:{color:'rgba(99,102,241,0.06)'}, ticks:{color:'#64748b', font:{family:'Inter',size:11}} },
          y:{ grid:{color:'rgba(99,102,241,0.06)'}, ticks:{color:'#64748b', font:{family:'Inter',size:11}} },
        },
      },
    });
  },

  renderSummaryStats() {
    const profile = Store.getProfile();
    if (!profile) return;
    let totalC = 0, totalP = 0, days = 0;
    for (let i = 0; i < 7; i++) {
      const t = Store.getDayTotals(Utils.addDays(Utils.todayStr(), -i));
      if (t.meals > 0) { totalC += t.calories; totalP += t.protein; days++; }
    }
    const avgC = days > 0 ? Math.round(totalC / days) : 0;
    const avgP = days > 0 ? Math.round(totalP / days) : 0;

    let consistent = 0;
    for (let i = 0; i < 7; i++) {
      const t = Store.getDayTotals(Utils.addDays(Utils.todayStr(), -i));
      if (t.meals > 0 && Math.abs(t.calories - profile.tdee) / profile.tdee <= 0.15) consistent++;
    }

    document.getElementById('avg-calories').textContent = avgC > 0 ? Utils.formatNum(avgC) : '—';
    document.getElementById('avg-protein').textContent = avgP > 0 ? `${avgP}g` : '—';
    document.getElementById('consistency-score').textContent = days > 0 ? `${consistent}/7` : '—';
  },
};
