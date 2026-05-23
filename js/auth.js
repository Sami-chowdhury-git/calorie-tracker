/* ═══════════════════════════════════════════ */
/* AUTH — Simulated authentication             */
/* ═══════════════════════════════════════════ */

window.Auth = {
  _listeners: [],

  signUp(name, email, password) {
    const users = Store.getUsers();
    if (users[email]) return { success: false, error: 'Email already registered' };
    const user = { id: Utils.uuid(), name, email, password, createdAt: new Date().toISOString() };
    Store.saveUser(email, user);
    const session = { id: user.id, name: user.name, email: user.email };
    Store.setSession(session);
    this._notify(session);
    return { success: true, user: session };
  },

  signIn(email, password) {
    const users = Store.getUsers();
    const user = users[email];
    if (!user) return { success: false, error: 'No account found with this email' };
    if (user.password !== password) return { success: false, error: 'Incorrect password' };
    const session = { id: user.id, name: user.name, email: user.email };
    Store.setSession(session);
    this._notify(session);
    return { success: true, user: session };
  },

  signOut() { Store.clearSession(); this._notify(null); },

  getCurrentUser() { return Store.getSession(); },

  onAuthStateChanged(cb) {
    this._listeners.push(cb);
    cb(this.getCurrentUser());
  },

  _notify(user) { this._listeners.forEach(cb => cb(user)); },
};
