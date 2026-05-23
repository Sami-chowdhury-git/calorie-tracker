/* ═══════════════════════════════════════════ */
/* DASHBOARD — Main dashboard view             */
/* ═══════════════════════════════════════════ */

window.Dashboard = {
  init() {
    document.getElementById('quick-add-btn').addEventListener('click', () => {
      document.dispatchEvent(new CustomEvent('open-meal-log'));
    });
    document.getElementById('dash-view-diary-btn').addEventListener('click', () => {
      document.dispatchEvent(new CustomEvent('navigate', { detail: { view: 'diary' } }));
    });
  },

  refresh() {
    const profile = Store.getProfile();
    if (!profile) return;
    const session = Auth.getCurrentUser();

    // Greeting
    const firstName = (session?.name || profile.name || 'there').split(' ')[0];
    document.getElementById('greeting-text').textContent = `${Utils.getGreeting()}, ${firstName}`;
    document.getElementById('current-date').textContent = Utils.formatDate(Utils.todayStr());

    // Today's totals
    const t = Store.getDayTotals(Utils.todayStr());
    const target = profile.tdee;
    const remaining = Math.max(0, target - t.calories);

    // Calorie ring (radius 85)
    this.updateRing('calorie-ring-fill', 85, t.calories / target);
    document.getElementById('calories-remaining').textContent = Utils.formatNum(remaining);
    document.getElementById('calories-consumed').textContent = Utils.formatNum(t.calories);
    document.getElementById('calories-target').textContent = Utils.formatNum(target);

    // Dynamic color
    const rf = document.getElementById('calorie-ring-fill');
    rf.classList.remove('warning', 'danger');
    if (t.calories / target > 1) rf.classList.add('danger');
    else if (t.calories / target > 0.8) rf.classList.add('warning');

    // Macro rings (radius 32)
    this.updateMacro('protein', t.protein, profile.protein);
    this.updateMacro('carbs', t.carbs, profile.carbs);
    this.updateMacro('fat', t.fat, profile.fat);

    // Stats
    document.getElementById('meals-logged-count').textContent = t.meals;
    document.getElementById('dash-streak-count').textContent = Store.getStreakData().currentStreak;
    const ach = Store.getAchievements();
    document.getElementById('dash-badges-count').textContent = Object.values(ach).filter(b => b.unlocked).length;

    // Meals preview
    this.renderMealsPreview();
  },

  updateRing(id, radius, progress) {
    const el = document.getElementById(id);
    const circ = Utils.ringCircumference(radius);
    el.style.strokeDasharray = circ;
    el.style.strokeDashoffset = Utils.ringOffset(radius, Math.min(progress, 1));
  },

  updateMacro(macro, consumed, target) {
    const ringId = macro + '-ring-fill';
    this.updateRing(ringId, 32, consumed / target);
    document.getElementById(macro + '-consumed').textContent = Math.round(consumed);
    document.getElementById(macro + '-target').textContent = Math.round(target);

    const el = document.getElementById(ringId);
    el.classList.remove('warning', 'danger');
    if (consumed / target > 1) el.classList.add('danger');
    else if (consumed / target > 0.8) el.classList.add('warning');
  },

  renderMealsPreview() {
    const diary = Store.getDiary(Utils.todayStr());
    const container = document.getElementById('dash-meals-list');
    const all = [];
    ['breakfast','lunch','dinner','snacks'].forEach(m => {
      diary[m].forEach(item => all.push({ ...item, meal: m }));
    });

    if (all.length === 0) {
      container.innerHTML = '<div class="empty-state-mini"><i data-lucide="plus-circle"></i><p>No meals logged yet. Tap + to add your first meal!</p></div>';
      if (typeof lucide !== 'undefined') lucide.createIcons();
      return;
    }

    container.innerHTML = all.slice(-5).map(item => `
      <div class="meal-preview-item">
        <div class="meal-preview-info">
          <span class="meal-preview-name">${item.name}</span>
          <span class="meal-preview-meal">${item.meal}</span>
        </div>
        <span class="meal-preview-cals">${item.calories} kcal</span>
      </div>
    `).join('');
  },
};
