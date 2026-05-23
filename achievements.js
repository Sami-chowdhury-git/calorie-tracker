/* ═══════════════════════════════════════════ */
/* ACHIEVEMENTS — Streaks & Badges             */
/* ═══════════════════════════════════════════ */

const BADGES = [
  { id:'first_log', name:'First Log', icon:'🍽️', desc:'Log your first meal' },
  { id:'streak_3', name:'3-Day Streak', icon:'🔥', desc:'3 consecutive days logged' },
  { id:'streak_7', name:'7-Day Streak', icon:'🔥', desc:'7 consecutive days logged' },
  { id:'streak_30', name:'30-Day Warrior', icon:'💪', desc:'30 consecutive days logged' },
  { id:'bullseye', name:'Bullseye', icon:'🎯', desc:'Hit exact calorie target (±50)' },
  { id:'protein_pro', name:'Protein Pro', icon:'🥩', desc:'Hit protein target 5 days in a row' },
  { id:'data_nerd', name:'Data Nerd', icon:'📊', desc:'Log weight 7 days in a row' },
  { id:'full_day', name:'Full Day', icon:'📅', desc:'Log all 4 meal types in one day' },
  { id:'century', name:'Century Club', icon:'💯', desc:'Log 100 total meals' },
  { id:'consistency', name:'Consistency King', icon:'🏆', desc:'Stay within targets for 7 days' },
  { id:'early_bird', name:'Early Bird', icon:'🌅', desc:'Log breakfast before 9 AM' },
  { id:'quick_logger', name:'Quick Logger', icon:'⚡', desc:'Use food scanner 10 times' },
];

window.Achievements = {
  badges: BADGES,

  init() {
    document.addEventListener('meal-logged', () => this.onMealLogged());
    document.addEventListener('check-achievements', () => this.checkAll());
  },

  onMealLogged() {
    this.updateStreak();
    this.checkAll();
  },

  updateStreak() {
    const streak = Store.getStreakData();
    const today = Utils.todayStr();
    if (streak.lastLogDate === today) return;
    const yesterday = Utils.addDays(today, -1);
    if (streak.lastLogDate === yesterday) streak.currentStreak++;
    else streak.currentStreak = 1;
    streak.lastLogDate = today;
    if (streak.currentStreak > streak.longestStreak) streak.longestStreak = streak.currentStreak;
    Store.saveStreakData(streak);
  },

  checkAll() {
    const ach = Store.getAchievements();
    const streak = Store.getStreakData();
    const profile = Store.getProfile();
    const today = Utils.todayStr();
    const totals = Store.getDayTotals(today);

    const unlock = (id) => {
      if (!ach[id]?.unlocked) {
        ach[id] = { unlocked: true, unlockedDate: today };
        const b = this.badges.find(b => b.id === id);
        if (b) Utils.showToast(`🏆 Badge Unlocked: ${b.name}!`, 'success', 4000);
      }
    };

    if (Store.getTotalMeals() >= 1) unlock('first_log');
    if (streak.currentStreak >= 3) unlock('streak_3');
    if (streak.currentStreak >= 7) unlock('streak_7');
    if (streak.currentStreak >= 30) unlock('streak_30');

    if (profile && totals.meals > 0 && Math.abs(totals.calories - profile.tdee) <= 50) unlock('bullseye');

    const diary = Store.getDiary(today);
    if (diary.breakfast.length > 0 && diary.lunch.length > 0 && diary.dinner.length > 0 && diary.snacks.length > 0) unlock('full_day');

    if (Store.getTotalMeals() >= 100) unlock('century');

    if (diary.breakfast.length > 0 && new Date().getHours() < 9) unlock('early_bird');
    if (Store.getNlpCount() >= 10) unlock('quick_logger');

    // Protein Pro
    if (profile) {
      const ps = Store.getProteinStreakData();
      if (totals.protein >= profile.protein * 0.9) {
        const yesterday = Utils.addDays(today, -1);
        if (ps.lastDate === yesterday) ps.streak++;
        else if (ps.lastDate !== today) ps.streak = 1;
        ps.lastDate = today;
        Store.saveProteinStreakData(ps);
      }
      if (ps.streak >= 5) unlock('protein_pro');
    }

    // Data Nerd
    if (Store.getWeightLogStreak().streak >= 7) unlock('data_nerd');

    // Consistency King
    if (profile) {
      let c = 0;
      for (let i = 0; i < 7; i++) {
        const t = Store.getDayTotals(Utils.addDays(today, -i));
        if (t.meals > 0 && Math.abs(t.calories - profile.tdee) / profile.tdee <= 0.15) c++;
        else break;
      }
      if (c >= 7) unlock('consistency');
    }

    Store.saveAchievements(ach);
  },

  render() {
    const streak = Store.getStreakData();
    document.getElementById('streak-display').textContent = streak.currentStreak;

    const hero = document.querySelector('.streak-hero');
    if (streak.currentStreak > 0) {
      hero.classList.add('active');
      document.getElementById('streak-message').textContent =
        streak.currentStreak >= 7 ? "You're on fire! Keep it going!" :
        streak.currentStreak >= 3 ? 'Great consistency! Keep building!' :
        'Nice start! Log tomorrow to continue!';
    } else {
      hero.classList.remove('active');
      document.getElementById('streak-message').textContent = 'Log a meal to start your streak!';
    }

    const ach = Store.getAchievements();
    document.getElementById('badges-grid').innerHTML = this.badges.map(badge => {
      const unlocked = ach[badge.id]?.unlocked;
      return `<div class="badge-card ${unlocked ? 'unlocked' : 'locked'}">
        <span class="badge-icon">${badge.icon}</span>
        <span class="badge-name">${badge.name}</span>
        <span class="badge-desc">${badge.desc}</span>
        ${unlocked ? `<span class="badge-date">${ach[badge.id].unlockedDate}</span>` : ''}
      </div>`;
    }).join('');
  },
};
