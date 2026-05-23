/* ═══════════════════════════════════════════ */
/* APP — Main application controller           */
/* ═══════════════════════════════════════════ */

(function() {
  'use strict';

  const App = {
    currentView: 'dashboard',

    init() {
      Onboarding.init();
      Dashboard.init();
      MealLogger.init();
      Diary.init();
      Analytics.init();
      Achievements.init();

      this.bindAuthForms();
      this.bindNavigation();
      this.bindGlobalEvents();

      Auth.onAuthStateChanged((user) => this.onAuthChanged(user));

      if (typeof lucide !== 'undefined') lucide.createIcons();
    },

    onAuthChanged(user) {
      if (!user) { this.showScreen('auth'); return; }
      const profile = Store.getProfile();
      if (!profile) {
        this.showScreen('onboarding');
        const ni = document.getElementById('ob-name');
        if (ni && user.name) ni.value = user.name;
      } else {
        this.showScreen('app');
        this.navigateTo('dashboard');
      }
    },

    showScreen(screen) {
      document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
      const map = { auth:'auth-screen', onboarding:'onboarding-screen', app:'app-shell' };
      const el = document.getElementById(map[screen]);
      if (el) el.classList.add('active');
      if (typeof lucide !== 'undefined') lucide.createIcons();
    },

    bindAuthForms() {
      document.getElementById('show-signup').addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('auth-login-form').classList.add('hidden');
        document.getElementById('auth-signup-form').classList.remove('hidden');
      });
      document.getElementById('show-login').addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('auth-signup-form').classList.add('hidden');
        document.getElementById('auth-login-form').classList.remove('hidden');
      });

      document.getElementById('auth-login-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value.trim();
        const pw = document.getElementById('login-password').value;
        if (!email || !pw) { Utils.showToast('Please fill all fields', 'warning'); return; }
        const r = Auth.signIn(email, pw);
        if (!r.success) { Utils.showToast(r.error, 'error'); return; }
        Utils.showToast('Welcome back!', 'success');
      });

      document.getElementById('auth-signup-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('signup-name').value.trim();
        const email = document.getElementById('signup-email').value.trim();
        const pw = document.getElementById('signup-password').value;
        if (!name || !email || !pw) { Utils.showToast('Please fill all fields', 'warning'); return; }
        if (pw.length < 6) { Utils.showToast('Password must be at least 6 characters', 'warning'); return; }
        const r = Auth.signUp(name, email, pw);
        if (!r.success) { Utils.showToast(r.error, 'error'); return; }
        Utils.showToast('Account created!', 'success');
      });

      document.getElementById('logout-btn').addEventListener('click', () => {
        Auth.signOut();
        Utils.showToast('Signed out', 'info');
      });
    },

    bindNavigation() {
      document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', () => this.navigateTo(item.dataset.view));
      });
    },

    navigateTo(view) {
      this.currentView = view;
      document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
      const nav = document.querySelector(`.nav-item[data-view="${view}"]`);
      if (nav) nav.classList.add('active');

      document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
      const el = document.getElementById(view + '-view');
      if (el) el.classList.add('active');

      switch (view) {
        case 'dashboard': Dashboard.refresh(); break;
        case 'diary': Diary.render(); break;
        case 'analytics': Analytics.refresh(); break;
        case 'achievements': Achievements.render(); break;
      }

      if (typeof lucide !== 'undefined') lucide.createIcons();
    },

    bindGlobalEvents() {
      document.addEventListener('onboarding-complete', () => {
        this.showScreen('app');
        this.navigateTo('dashboard');
        Utils.showToast("Your plan is ready! Let's start tracking! 🎉", 'success', 4000);
      });
      document.addEventListener('navigate', (e) => this.navigateTo(e.detail.view));
      document.addEventListener('meal-logged', () => {
        if (this.currentView === 'dashboard') Dashboard.refresh();
      });
    },
  };

  document.addEventListener('DOMContentLoaded', () => App.init());
})();
