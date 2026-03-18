
```jsx
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

// ── Storage Keys ───────────────────────────────────────────────────
const KEYS = {
  USERS: "ese_users",
  CURRENT_USER: "ese_current_user",
  SESSIONS: "ese_sessions",
};

// ── Storage Helpers ────────────────────────────────────────────────
const store = {
  get: (key) => {
    try {
      const v = localStorage.getItem(key);
      return v ? JSON.parse(v) : null;
    } catch { return null; }
  },
  set: (key, value) => {
    try { localStorage.setItem(key, JSON.stringify(value)); }
    catch (e) { console.error(e); }
  },
  del: (key) => localStorage.removeItem(key),
};

// ── Password Hash ──────────────────────────────────────────────────
async function hashPwd(password) {
  const enc = new TextEncoder();
  const data = enc.encode(password + "ese_secret_2024");
  const buf = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// ── ID Generator ───────────────────────────────────────────────────
function genId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// ── Context ────────────────────────────────────────────────────────
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = store.get(KEYS.CURRENT_USER);
    if (saved) setUser(saved);
    setLoading(false);
  }, []);

  // Sign Up
  const signUp = useCallback(async (email, password) => {
    const users = store.get(KEYS.USERS) || {};
    if (users[email]) throw new Error("Account already exists with this email.");
    const hashed = await hashPwd(password);
    const newUser = {
      id: genId(),
      email,
      password: hashed,
      displayName: email.split("@")[0],
      createdAt: new Date().toISOString(),
    };
    users[email] = newUser;
    store.set(KEYS.USERS, users);
    const sessionUser = {
      id: newUser.id,
      email: newUser.email,
      displayName: newUser.displayName,
    };
    store.set(KEYS.CURRENT_USER, sessionUser);
    setUser(sessionUser);
    return sessionUser;
  }, []);

  // Sign In
  const signIn = useCallback(async (email, password) => {
    const users = store.get(KEYS.USERS) || {};
    if (!users[email]) throw new Error("No account found with this email.");
    const hashed = await hashPwd(password);
    if (users[email].password !== hashed)
      throw new Error("Incorrect password.");
    const sessionUser = {
      id: users[email].id,
      email: users[email].email,
      displayName: users[email].displayName,
    };
    store.set(KEYS.CURRENT_USER, sessionUser);
    setUser(sessionUser);
    return sessionUser;
  }, []);

  // Reset Password
  const resetPassword = useCallback(async (email) => {
    const users = store.get(KEYS.USERS) || {};
    if (!users[email]) throw new Error("No account found with this email.");
    return true;
  }, []);

  // Logout
  const logout = useCallback(() => {
    store.del(KEYS.CURRENT_USER);
    setUser(null);
  }, []);

  // Save Session
  const saveSession = useCallback(
    (sessionData) => {
      if (!user) throw new Error("Not authenticated");
      const sessions = store.get(KEYS.SESSIONS) || [];
      const newSession = {
        ...sessionData,
        id: genId(),
        userId: user.id,
        createdAt: new Date().toISOString(),
      };
      sessions.unshift(newSession);
      store.set(KEYS.SESSIONS, sessions);
      return newSession;
    },
    [user]
  );

  // Get User Sessions
  const getUserSessions = useCallback(() => {
    if (!user) return [];
    const sessions = store.get(KEYS.SESSIONS) || [];
    return sessions.filter((s) => s.userId === user.id);
  }, [user]);

  // Delete Session
  const deleteSession = useCallback((sessionId) => {
    const sessions = store.get(KEYS.SESSIONS) || [];
    store.set(
      KEYS.SESSIONS,
      sessions.filter((s) => s.id !== sessionId)
    );
  }, []);

  // Get Stats
  const getUserStats = useCallback(() => {
    const sessions = getUserSessions();
    const explorations = sessions.filter((s) => s.type === "exploration");
    const frictions = sessions.filter((s) => s.type === "friction");
    const avgSaturation =
      explorations.length > 0
        ? Math.round(
            explorations.reduce((a, s) => a + (s.saturationScore || 0), 0) /
              explorations.length
          )
        : 0;
    const avgFriction =
      frictions.length > 0
        ? Math.round(
            frictions.reduce((a, s) => a + (s.frictionScore || 0), 0) /
              frictions.length
          )
        : 0;
    return {
      totalExplorations: explorations.length,
      totalFrictions: frictions.length,
      avgSaturation,
      avgFriction,
    };
  }, [getUserSessions]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signUp,
        signIn,
        resetPassword,
        logout,
        saveSession,
        getUserSessions,
        deleteSession,
        getUserStats,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
```
