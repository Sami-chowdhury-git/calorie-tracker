/* ═══════════════════════════════════════════ */
/* UTILS — Helper functions & utilities        */
/* ═══════════════════════════════════════════ */

window.Utils = {
  uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = (Math.random() * 16) | 0;
      return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
  },

  todayStr() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  },

  formatDate(dateStr) {
    const d = new Date(dateStr + 'T12:00:00');
    return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  },

  formatDiaryDate(dateStr) {
    if (this.isToday(dateStr)) return `Today — ${this._shortDate(dateStr)}`;
    if (this.isYesterday(dateStr)) return `Yesterday — ${this._shortDate(dateStr)}`;
    const d = new Date(dateStr + 'T12:00:00');
    return `${d.toLocaleDateString('en-US',{weekday:'short'})} — ${this._shortDate(dateStr)}`;
  },

  _shortDate(dateStr) {
    const d = new Date(dateStr + 'T12:00:00');
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  },

  getGreeting() {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 18) return 'Good afternoon';
    return 'Good evening';
  },

  animateNumber(el, target, duration = 800, suffix = '') {
    const start = parseInt(el.textContent.replace(/[^0-9]/g, '')) || 0;
    const startTime = performance.now();
    const diff = target - start;
    const step = (ts) => {
      const p = Math.min((ts - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      el.textContent = this.formatNum(Math.round(start + diff * ease)) + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  },

  ringOffset(radius, progress) {
    const circ = 2 * Math.PI * radius;
    return circ - circ * Math.min(Math.max(progress, 0), 1);
  },

  ringCircumference(radius) {
    return 2 * Math.PI * radius;
  },

  showToast(message, type = 'info', duration = 3000) {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const icons = { success: 'check-circle', warning: 'alert-triangle', error: 'x-circle', info: 'info' };
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<div class="toast-content"><i data-lucide="${icons[type] || 'info'}"></i><span>${message}</span></div>`;
    container.appendChild(toast);
    if (typeof lucide !== 'undefined') lucide.createIcons();
    setTimeout(() => {
      toast.classList.add('toast-exit');
      setTimeout(() => toast.remove(), 350);
    }, duration);
  },

  debounce(fn, delay = 300) {
    let timer;
    return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), delay); };
  },

  formatNum(n) {
    return Math.round(n).toLocaleString('en-US');
  },

  addDays(dateStr, days) {
    const d = new Date(dateStr + 'T12:00:00');
    d.setDate(d.getDate() + days);
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  },

  getDayName(dateStr) {
    return new Date(dateStr + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'short' });
  },

  isToday(dateStr) { return dateStr === this.todayStr(); },

  isYesterday(dateStr) { return dateStr === this.addDays(this.todayStr(), -1); },
};
