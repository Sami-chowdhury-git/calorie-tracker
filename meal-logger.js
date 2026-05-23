/* ═══════════════════════════════════════════ */
/* MEAL LOGGER — NLP, Image, Manual logging    */
/* ═══════════════════════════════════════════ */

window.MealLogger = {
  selectedMealType: 'breakfast',
  parsedItems: [],

  init() {
    document.addEventListener('open-meal-log', (e) => {
      if (e.detail?.mealType) this.selectedMealType = e.detail.mealType;
      this.open();
    });

    document.getElementById('meal-log-close-btn').addEventListener('click', () => this.close());
    document.getElementById('meal-log-modal').addEventListener('click', (e) => {
      if (e.target.id === 'meal-log-modal') this.close();
    });

    // Meal type buttons
    document.querySelectorAll('.meal-type-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.meal-type-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.selectedMealType = btn.dataset.meal;
      });
    });

    // Tab switching
    document.querySelectorAll('#meal-log-tabs .tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('#meal-log-tabs .tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
        document.getElementById(btn.dataset.tab + '-tab').classList.add('active');
      });
    });

    // NLP
    document.getElementById('nlp-parse-btn').addEventListener('click', () => this.parseNLP());
    document.getElementById('nlp-confirm-btn').addEventListener('click', () => this.confirmParsed('nlp'));

    // Image
    this.initImageUpload();
    document.getElementById('image-confirm-btn').addEventListener('click', () => this.confirmParsed('image'));

    // Manual
    document.getElementById('manual-add-btn').addEventListener('click', () => this.addManual());
  },

  open() {
    document.getElementById('meal-log-modal').classList.remove('hidden');
    this.resetTabs();
    this.autoSelectMealType();
    if (typeof lucide !== 'undefined') lucide.createIcons();
  },

  close() {
    document.getElementById('meal-log-modal').classList.add('hidden');
    this.resetForm();
  },

  autoSelectMealType() {
    const h = new Date().getHours();
    let meal = 'snacks';
    if (h >= 5 && h < 11) meal = 'breakfast';
    else if (h >= 11 && h < 15) meal = 'lunch';
    else if (h >= 15 && h < 21) meal = 'dinner';
    document.querySelectorAll('.meal-type-btn').forEach(b => b.classList.remove('active'));
    const btn = document.querySelector(`.meal-type-btn[data-meal="${meal}"]`);
    if (btn) btn.classList.add('active');
    this.selectedMealType = meal;
  },

  resetTabs() {
    document.querySelectorAll('#meal-log-tabs .tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelector('#meal-log-tabs .tab-btn[data-tab="nlp"]').classList.add('active');
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    document.getElementById('nlp-tab').classList.add('active');
  },

  resetForm() {
    document.getElementById('nlp-input').value = '';
    document.getElementById('nlp-results').classList.add('hidden');
    document.getElementById('image-results').classList.add('hidden');
    document.getElementById('image-processing').classList.add('hidden');
    document.getElementById('image-drop-zone').style.display = '';
    ['manual-food-name','manual-calories','manual-protein','manual-carbs','manual-fat','manual-serving']
      .forEach(id => document.getElementById(id).value = '');
    this.parsedItems = [];
  },

  async parseNLP() {
    const text = document.getElementById('nlp-input').value.trim();
    if (!text) { Utils.showToast('Please describe your meal first', 'warning'); return; }

    const parseBtn = document.getElementById('nlp-parse-btn');
    parseBtn.disabled = true;
    parseBtn.innerHTML = '<i data-lucide="loader-2" class="spin-icon"></i> Analyzing with AI...';
    if (typeof lucide !== 'undefined') lucide.createIcons();

    try {
      const geminiResult = await Gemini.analyzeText(text);
      if (geminiResult && geminiResult.length > 0) {
        this.parsedItems = geminiResult;
        Utils.showToast('✨ Analyzed by Gemini AI', 'success', 2000);
      } else {
        Utils.showToast('Gemini could not analyze this — try rephrasing', 'warning', 3000);
      }
    } catch (err) {
      console.error('Gemini NLP error:', err);
      Utils.showToast('AI analysis failed. Check your connection and try again.', 'error', 4000);
    }

    parseBtn.disabled = false;
    parseBtn.innerHTML = '<i data-lucide="sparkles"></i> Analyze Food';
    if (typeof lucide !== 'undefined') lucide.createIcons();
    Store.incrementNlpCount();

    if (this.parsedItems.length === 0) return;
    this.renderParsedItems('nlp');
  },

  editServing(index) {
    const item = this.parsedItems[index];
    const newServing = window.prompt("Edit serving amount/description:", item.food.serving);
    if (newServing !== null && newServing.trim() !== "") {
      item.food.serving = newServing.trim();
      const activeTab = document.querySelector('.tab-panel.active');
      this.renderParsedItems(activeTab.id.replace('-tab', ''));
    }
  },

  renderParsedItems(source) {
    const listEl = document.getElementById(source + '-items-list');
    const totalEl = document.getElementById(source + '-total');
    const resultsEl = document.getElementById(source + '-results');

    listEl.innerHTML = this.parsedItems.map((item, i) => {
      let ingHtml = '';
      if (item.ingredients && item.ingredients.length > 0) {
        ingHtml = `<div class="parsed-item-ingredients" style="margin-top: 12px; padding-top: 12px; border-top: 1px dashed var(--border-color); font-size: 0.85rem; color: var(--text-muted); grid-column: 1 / -1;">
          <div style="margin-bottom: 6px; font-weight: 500; color: var(--text-primary);">Ingredients detected:</div>
          ${item.ingredients.map(ing => `
            <div style="display: flex; justify-content: space-between; margin-bottom: 4px; gap: 8px;">
              <span style="flex-shrink: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">• ${ing.name} <span style="opacity: 0.7; font-size: 0.8rem;">(${ing.quantity} ${ing.serving})</span></span>
              <span style="flex-shrink: 0;">${ing.calories} kcal <span style="opacity: 0.7; font-size: 0.8rem;">(P:${ing.protein}g C:${ing.carbs}g)</span></span>
            </div>
          `).join('')}
        </div>`;
      }

      return `
      <div class="parsed-item ${item.unknown ? 'unknown' : ''}" style="flex-wrap: wrap;">
        <div class="parsed-item-info">
          <span class="parsed-item-name">${item.food.name}${item.unknown ? ' ⚠️' : ''}</span>
          <span class="parsed-item-detail" style="display: flex; align-items: center; gap: 4px;">
            ${item.food.serving}
            <button class="icon-btn" onclick="MealLogger.editServing(${i})" style="width: 20px; height: 20px; min-height: 20px; padding: 0; background: var(--bg-surface-elevated);" title="Edit amount">
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path></svg>
            </button>
          </span>
        </div>
        <div class="parsed-item-qty">
          <button class="qty-btn" onclick="MealLogger.updateQty(${i}, -1)">−</button>
          <span class="qty-value">${item.quantity}</span>
          <button class="qty-btn" onclick="MealLogger.updateQty(${i}, 1)">+</button>
        </div>
        <div class="parsed-item-macros">
          <span class="parsed-item-cals">${item.totalCalories} kcal</span>
          <div class="parsed-item-macro-row">
            <span>P:${item.totalProtein}g</span>
            <span>C:${item.totalCarbs}g</span>
            <span>F:${item.totalFat}g</span>
          </div>
        </div>
        ${ingHtml}
      </div>
    `}).join('');

    const tc = this.parsedItems.reduce((s, i) => s + i.totalCalories, 0);
    const tp = this.parsedItems.reduce((s, i) => s + i.totalProtein, 0);
    const tca = this.parsedItems.reduce((s, i) => s + i.totalCarbs, 0);
    const tf = this.parsedItems.reduce((s, i) => s + i.totalFat, 0);
    totalEl.innerHTML = `<span>Total: ${tc} kcal</span><span>P:${Math.round(tp)}g · C:${Math.round(tca)}g · F:${Math.round(tf)}g</span>`;
    resultsEl.classList.remove('hidden');
  },

  updateQty(index, delta) {
    const item = this.parsedItems[index];
    item.quantity = Math.max(0.5, item.quantity + delta * 0.5);
    item.totalCalories = Math.round(item.food.calories * item.quantity);
    item.totalProtein = Math.round(item.food.protein * item.quantity * 10) / 10;
    item.totalCarbs = Math.round(item.food.carbs * item.quantity * 10) / 10;
    item.totalFat = Math.round(item.food.fat * item.quantity * 10) / 10;
    const activeTab = document.querySelector('.tab-panel.active');
    this.renderParsedItems(activeTab.id.replace('-tab', ''));
  },

  initImageUpload() {
    const dz = document.getElementById('image-drop-zone');
    const fi = document.getElementById('image-file-input');
    const ci = document.getElementById('camera-file-input');
    
    dz.addEventListener('dragover', (e) => { e.preventDefault(); dz.classList.add('dragover'); });
    dz.addEventListener('dragleave', () => dz.classList.remove('dragover'));
    dz.addEventListener('drop', (e) => {
      e.preventDefault(); dz.classList.remove('dragover');
      const files = e.dataTransfer?.files;
      if (files && files.length > 0) this.processImage(files[0]);
    });
    
    const fileChangeHandler = (e) => {
      if (e.target.files && e.target.files.length > 0) this.processImage(e.target.files[0]);
    };
    
    if (fi) fi.addEventListener('change', fileChangeHandler);
    if (ci) ci.addEventListener('change', fileChangeHandler);
  },

  async processImage(file) {
    const dz = document.getElementById('image-drop-zone');
    const proc = document.getElementById('image-processing');
    dz.style.display = 'none';
    proc.classList.remove('hidden');

    try {
      if (file) {
        // Use Gemini Vision to analyze the actual image
        const geminiResult = await Gemini.analyzeImage(file);
        
        proc.classList.add('hidden');
        
        if (geminiResult && geminiResult.length > 0 && !geminiResult[0].error) {
          this.parsedItems = geminiResult;
          Utils.showToast('✨ Image analyzed by Gemini AI', 'success', 2000);
          this.renderParsedItems('image');
        } else if (geminiResult && geminiResult[0].error) {
            Utils.showToast(geminiResult[0].error, 'warning', 4000);
            dz.style.display = ''; // Reset to let them try again
        } else {
             Utils.showToast('Could not identify food in this image', 'warning', 3000);
             dz.style.display = ''; // Reset to let them try again
        }
      } else {
         proc.classList.add('hidden');
         Utils.showToast('Please upload an image first', 'warning', 2000);
         dz.style.display = '';
      }
    } catch (err) {
      console.error('Image analysis failed:', err);
      proc.classList.add('hidden');
      Utils.showToast('Image analysis failed. Please try again or use manual log.', 'error', 4000);
      dz.style.display = ''; // Reset to let them try again
    }
  },

  confirmParsed(source) {
    if (this.parsedItems.length === 0) return;
    const dateStr = Utils.todayStr();
    const diary = Store.getDiary(dateStr);

    this.parsedItems.forEach(item => {
      diary[this.selectedMealType].push({
        id: Utils.uuid(), name: item.food.name,
        calories: item.totalCalories, protein: item.totalProtein,
        carbs: item.totalCarbs, fat: item.totalFat,
        serving: `${item.quantity} × ${item.food.serving}`,
        timestamp: new Date().toISOString(),
      });
      Store.incrementFoodFreq(item.food.name);
    });

    Store.saveDiary(dateStr, diary);
    Store.incrementTotalMeals(this.parsedItems.length);
    document.dispatchEvent(new CustomEvent('meal-logged', { detail: { date: dateStr, meal: this.selectedMealType } }));

    const tc = this.parsedItems.reduce((s, i) => s + i.totalCalories, 0);
    Utils.showToast(`Added ${this.parsedItems.length} items (${tc} kcal)`, 'success');
    this.close();
  },

  addManual() {
    const name = document.getElementById('manual-food-name').value.trim();
    const calories = parseInt(document.getElementById('manual-calories').value) || 0;
    const protein = parseFloat(document.getElementById('manual-protein').value) || 0;
    const carbs = parseFloat(document.getElementById('manual-carbs').value) || 0;
    const fat = parseFloat(document.getElementById('manual-fat').value) || 0;
    const serving = document.getElementById('manual-serving').value.trim() || '1 serving';

    if (!name) { Utils.showToast('Please enter a food name', 'warning'); return; }
    if (calories <= 0) { Utils.showToast('Please enter calories', 'warning'); return; }

    const dateStr = Utils.todayStr();
    const diary = Store.getDiary(dateStr);
    diary[this.selectedMealType].push({
      id: Utils.uuid(), name, calories, protein, carbs, fat, serving,
      timestamp: new Date().toISOString(),
    });

    Store.saveDiary(dateStr, diary);
    Store.incrementTotalMeals(1);
    Store.incrementFoodFreq(name);
    document.dispatchEvent(new CustomEvent('meal-logged', { detail: { date: dateStr, meal: this.selectedMealType } }));
    Utils.showToast(`${name} added (${calories} kcal)`, 'success');
    this.close();
  },
};
