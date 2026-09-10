import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { clearTimerStorage } from "./timer";

export type HiveUser = { name: string; email: string; role: string };

const STORAGE_KEY = "hivedesk.session";

type AuthValue = {
  user: HiveUser | null;
  ready: boolean;
  signIn: (email: string, name?: string) => HiveUser;
  signOut: () => void;
};

const AuthContext = createContext<AuthValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<HiveUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw) as HiveUser);
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  const signIn = useCallback((email: string, name?: string) => {
    const derived =
      name?.trim() ||
      (email.split("@")[0] ?? "")
        .replace(/[._-]+/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase()) ||
      "Alex Moreno";
    const next: HiveUser = { name: derived, email, role: "Independent designer" };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setUser(next);
    return next;
  }, []);

  const signOut = useCallback(() => {
    clearTimerStorage();
    window.localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  }, []);

  const value = useMemo(() => ({ user, ready, signIn, signOut }), [user, ready, signIn, signOut]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
