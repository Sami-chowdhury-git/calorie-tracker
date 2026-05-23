/* ═══════════════════════════════════════════ */
/* DIARY — Food diary view                     */
/* ═══════════════════════════════════════════ */

window.Diary = {
  currentDate: null,

  init() {
    this.currentDate = Utils.todayStr();

    document.getElementById('diary-prev-btn').addEventListener('click', () => {
      this.currentDate = Utils.addDays(this.currentDate, -1);
      this.render();
    });
    document.getElementById('diary-next-btn').addEventListener('click', () => {
      if (this.currentDate < Utils.todayStr()) {
        this.currentDate = Utils.addDays(this.currentDate, 1);
        this.render();
      }
    });

    document.querySelectorAll('.meal-add-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.dispatchEvent(new CustomEvent('open-meal-log', { detail: { mealType: btn.dataset.meal } }));
      });
    });

    document.getElementById('diary-add-btn').addEventListener('click', () => {
      document.dispatchEvent(new CustomEvent('open-meal-log'));
    });

    document.addEventListener('meal-logged', () => this.render());
  },

  render() {
    document.getElementById('diary-date').textContent = Utils.formatDiaryDate(this.currentDate);
    document.getElementById('diary-next-btn').disabled = this.currentDate >= Utils.todayStr();

    const diary = Store.getDiary(this.currentDate);
    const t = Store.getDayTotals(this.currentDate);

    document.getElementById('diary-total-calories').textContent = t.calories;
    document.getElementById('diary-total-protein').textContent = Math.round(t.protein);
    document.getElementById('diary-total-carbs').textContent = Math.round(t.carbs);
    document.getElementById('diary-total-fat').textContent = Math.round(t.fat);

    ['breakfast','lunch','dinner','snacks'].forEach(meal => {
      const container = document.querySelector(`.meal-group-items[data-meal="${meal}"]`);
      const items = diary[meal];
      if (items.length === 0) {
        container.innerHTML = '<p class="meal-empty">No items logged</p>';
        return;
      }
      container.innerHTML = items.map(item => `
        <div class="meal-item" data-id="${item.id}">
          <div class="meal-item-info">
            <span class="meal-item-name">${item.name}</span>
            <span class="meal-item-serving">${item.serving || ''} · P:${Math.round(item.protein)}g C:${Math.round(item.carbs)}g F:${Math.round(item.fat)}g</span>
          </div>
          <span class="meal-item-cals">${item.calories}</span>
          <button class="meal-item-delete icon-btn" onclick="Diary.deleteItem('${this.currentDate}','${meal}','${item.id}')" title="Remove">
            <i data-lucide="trash-2"></i>
          </button>
        </div>
      `).join('');
    });

    this.renderFrequentFoods();
    if (typeof lucide !== 'undefined') lucide.createIcons();
  },

  deleteItem(dateStr, mealType, itemId) {
    const diary = Store.getDiary(dateStr);
    diary[mealType] = diary[mealType].filter(i => i.id !== itemId);
    Store.saveDiary(dateStr, diary);
    this.render();
    if (dateStr === Utils.todayStr()) Dashboard.refresh();
    Utils.showToast('Item removed', 'info');
  },

  renderFrequentFoods() {
    const container = document.getElementById('frequent-foods');
    const freq = Store.getFrequentFoods(8);
    if (freq.length === 0) {
      container.innerHTML = '<p class="empty-hint">Your most-logged foods will appear here.</p>';
      return;
    }
    container.innerHTML = freq.map(f => {
      const fd = FoodDB.search(f.name);
      const cals = fd ? fd.calories : '?';
      return `<div class="frequent-food-card" onclick="Diary.quickAddFrequent('${f.name.replace(/'/g,"\\'")}')">
        <span class="ff-name">${f.name}</span>
        <span class="ff-cal">${cals} kcal · logged ${f.count}×</span>
      </div>`;
    }).join('');
  },

  quickAddFrequent(foodName) {
    const fd = FoodDB.search(foodName);
    if (!fd) { Utils.showToast('Food not found', 'warning'); return; }
    const h = new Date().getHours();
    let meal = 'snacks';
    if (h >= 5 && h < 11) meal = 'breakfast';
    else if (h >= 11 && h < 15) meal = 'lunch';
    else if (h >= 15 && h < 21) meal = 'dinner';

    const dateStr = Utils.todayStr();
    const diary = Store.getDiary(dateStr);
    diary[meal].push({
      id: Utils.uuid(), name: fd.name, calories: fd.calories,
      protein: fd.protein, carbs: fd.carbs, fat: fd.fat,
      serving: fd.serving, timestamp: new Date().toISOString(),
    });
    Store.saveDiary(dateStr, diary);
    Store.incrementTotalMeals(1);
    Store.incrementFoodFreq(fd.name);
    document.dispatchEvent(new CustomEvent('meal-logged', { detail: { date: dateStr, meal } }));
    Utils.showToast(`${fd.name} added to ${meal}`, 'success');
  },
};
