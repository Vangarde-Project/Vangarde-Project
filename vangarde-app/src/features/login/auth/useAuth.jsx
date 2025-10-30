// src/features/login/auth/useAuth.jsx
import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";
import {
  register as svcRegister,
  login as svcLogin,
  logout as svcLogout,
  getCurrentUser,
} from "../services/authService";

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  // laad user uit localStorage bij start
  useEffect(() => {
    const u = getCurrentUser();
    if (u) setUser(u);
    setReady(true);
  }, []);

  const register = useCallback(async (formData) => {
    // verwacht FormData van signup.jsx
    const res = await svcRegister(formData);
    // na registreren laten we user niet auto-inloggen; signup redirect naar /login
    return res;
  }, []);

  const login = useCallback(async ({ email, password }) => {
    const res = await svcLogin(email, password);
    if (res.ok) setUser(res.user);
    return res;
  }, []);

  const logout = useCallback(() => {
    svcLogout();
    setUser(null);
  }, []);

  const value = useMemo(() => ({ user, ready, register, login, logout }), [user, ready, register, login, logout]);

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}
