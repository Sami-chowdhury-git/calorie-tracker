/* ═══════════════════════════════════════════ */
/* ONBOARDING — Multi-step wizard              */
/* ═══════════════════════════════════════════ */

window.Onboarding = {
  currentStep: 1,
  totalSteps: 5,
  data: { name:'', age:25, gender:'male', weight:70, height:175, heightInches:0,
          weightUnit:'kg', heightUnit:'cm', activityLevel:1.55, goal:'maintain' },

  init() {
    // Gender toggles
    document.querySelectorAll('.ob-toggle').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.ob-toggle').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.data.gender = btn.dataset.value;
      });
    });

    // Unit selects
    document.getElementById('ob-height-unit').addEventListener('change', (e) => {
      this.data.heightUnit = e.target.value;
      document.getElementById('ob-height-inches-group').classList.toggle('hidden', e.target.value !== 'ft');
    });
    document.getElementById('ob-weight-unit').addEventListener('change', (e) => {
      this.data.weightUnit = e.target.value;
    });

    // Activity cards
    document.querySelectorAll('.ob-selection-card[data-level]').forEach(card => {
      card.addEventListener('click', () => {
        document.querySelectorAll('.ob-selection-card[data-level]').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        this.data.activityLevel = parseFloat(card.dataset.level);
      });
    });

    // Goal cards
    document.querySelectorAll('.ob-selection-card[data-goal]').forEach(card => {
      card.addEventListener('click', () => {
        document.querySelectorAll('.ob-selection-card[data-goal]').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        this.data.goal = card.dataset.goal;
      });
    });

    // Navigation
    document.getElementById('ob-next-btn').addEventListener('click', () => {
      if (this.validateStep(this.currentStep)) this.goToStep(this.currentStep + 1);
    });
    document.getElementById('ob-back-btn').addEventListener('click', () => {
      this.goToStep(this.currentStep - 1);
    });
    document.getElementById('ob-finish-btn').addEventListener('click', () => this.finish());

    // Pre-fill name
    const session = Auth.getCurrentUser();
    if (session && session.name) {
      document.getElementById('ob-name').value = session.name;
      this.data.name = session.name;
    }
  },

  goToStep(step) {
    if (step < 1 || step > this.totalSteps) return;

    // Collect data from current step before leaving
    this.collectData(this.currentStep);

    // Hide current, show target
    document.querySelectorAll('.onboarding-step').forEach(s => s.classList.remove('active'));
    document.querySelector(`.onboarding-step[data-step="${step}"]`).classList.add('active');

    // Progress
    document.getElementById('ob-progress-fill').style.width = `${(step / this.totalSteps) * 100}%`;
    document.querySelectorAll('.ob-dot').forEach(dot => {
      const ds = parseInt(dot.dataset.step);
      dot.classList.remove('active', 'completed');
      if (ds < step) dot.classList.add('completed');
      else if (ds === step) dot.classList.add('active');
    });

    // Nav buttons
    document.getElementById('ob-back-btn').classList.toggle('hidden', step === 1);
    document.getElementById('ob-next-btn').classList.toggle('hidden', step === this.totalSteps);
    document.getElementById('ob-finish-btn').classList.toggle('hidden', step !== this.totalSteps);

    // Results on step 5
    if (step === 5) this.showResults();

    this.currentStep = step;
    if (typeof lucide !== 'undefined') lucide.createIcons();
  },

  collectData(step) {
    if (step === 1) {
      this.data.name = document.getElementById('ob-name').value.trim();
      this.data.age = parseInt(document.getElementById('ob-age').value) || 25;
    } else if (step === 2) {
      this.data.weight = parseFloat(document.getElementById('ob-weight').value) || 70;
      this.data.height = parseFloat(document.getElementById('ob-height').value) || 175;
      this.data.heightInches = parseFloat(document.getElementById('ob-height-inches').value) || 0;
    }
  },

  validateStep(step) {
    if (step === 1) {
      if (!document.getElementById('ob-name').value.trim()) {
        Utils.showToast('Please enter your name', 'warning'); return false;
      }
      if (!document.getElementById('ob-age').value || parseInt(document.getElementById('ob-age').value) < 13) {
        Utils.showToast('Please enter a valid age (13+)', 'warning'); return false;
      }
    }
    if (step === 2) {
      if (!document.getElementById('ob-weight').value || parseFloat(document.getElementById('ob-weight').value) <= 0) {
        Utils.showToast('Please enter your weight', 'warning'); return false;
      }
      if (!document.getElementById('ob-height').value || parseFloat(document.getElementById('ob-height').value) <= 0) {
        Utils.showToast('Please enter your height', 'warning'); return false;
      }
    }
    if (step === 3 && !document.querySelector('.ob-selection-card[data-level].active')) {
      Utils.showToast('Please select your activity level', 'warning'); return false;
    }
    if (step === 4 && !document.querySelector('.ob-selection-card[data-goal].active')) {
      Utils.showToast('Please select your goal', 'warning'); return false;
    }
    return true;
  },

  calculateTDEE() {
    let wKg = this.data.weight;
    if (this.data.weightUnit === 'lbs') wKg = this.data.weight * 0.453592;
    let hCm = this.data.height;
    if (this.data.heightUnit === 'ft') hCm = (this.data.height * 30.48) + (this.data.heightInches * 2.54);

    let bmr;
    if (this.data.gender === 'male') bmr = 10 * wKg + 6.25 * hCm - 5 * this.data.age + 5;
    else bmr = 10 * wKg + 6.25 * hCm - 5 * this.data.age - 161;

    let tdee = Math.round(bmr * this.data.activityLevel);
    const adj = { cut: -500, maintain: 0, bulk: 300 };
    tdee += adj[this.data.goal] || 0;
    tdee = Math.max(1200, tdee);

    const splits = {
      cut:      { protein: 0.40, carbs: 0.30, fat: 0.30 },
      maintain: { protein: 0.30, carbs: 0.40, fat: 0.30 },
      bulk:     { protein: 0.30, carbs: 0.45, fat: 0.25 },
    };
    const s = splits[this.data.goal] || splits.maintain;
    return {
      tdee,
      protein: Math.round((tdee * s.protein) / 4),
      carbs: Math.round((tdee * s.carbs) / 4),
      fat: Math.round((tdee * s.fat) / 9),
    };
  },

  showResults() {
    this.collectData(this.currentStep);
    const r = this.calculateTDEE();
    Utils.animateNumber(document.getElementById('ob-tdee-value'), r.tdee, 1500);
    Utils.animateNumber(document.getElementById('ob-protein-value'), r.protein, 1200);
    Utils.animateNumber(document.getElementById('ob-carbs-value'), r.carbs, 1200);
    Utils.animateNumber(document.getElementById('ob-fat-value'), r.fat, 1200);
  },

  finish() {
    this.collectData(this.currentStep);
    const r = this.calculateTDEE();
    const profile = { ...this.data, tdee: r.tdee, protein: r.protein, carbs: r.carbs, fat: r.fat,
                      completedAt: new Date().toISOString() };
    Store.saveProfile(profile);
    document.dispatchEvent(new CustomEvent('onboarding-complete', { detail: profile }));
  },
};
