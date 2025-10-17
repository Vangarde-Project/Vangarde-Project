"use client";
import React, { createContext, useContext, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Auth context en provider
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const tokenRef = useRef(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [flash, setFlash] = useState(null);

  // Simple users store persisted in localStorage for dev
  const [users, setUsers] = useState(() => {
    try {
      const raw = localStorage.getItem("vangarde_users");
      if (raw) return JSON.parse(raw);
    } catch (e) {
      // ignore
    }
    return [{ email: "test@vangarde.ai", password: "1234", name: "Demo User" }];
  });

  useEffect(() => {
    try {
      localStorage.setItem("vangarde_users", JSON.stringify(users));
    } catch (e) {
      // ignore
    }
  }, [users]);

  // Restore session if present
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("token");
      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser));
        tokenRef.current = storedToken;
      }
    } catch (e) {
      // ignore
    }
  }, []);

  const isLoggedIn = !!user;

  // Mock login: check against local users array
  async function login(email, password) {
    setLoading(true);
    setError(null);
    try {
      await new Promise((r) => setTimeout(r, 300));
      const found = users.find((u) => u.email === email && u.password === password);
      if (found) {
        const fakeToken = "fake-jwt-token";
        const demoUser = { name: found.name || email, email, provider: "internal" };
        tokenRef.current = fakeToken;
        localStorage.setItem("user", JSON.stringify(demoUser));
        localStorage.setItem("token", fakeToken);
        setUser(demoUser);
        setFlash({ type: "success", text: "Je bent nu ingelogd!" });
        setTimeout(() => setFlash(null), 3000);
        return { ok: true };
      }
      throw new Error("Ongeldige gebruikersnaam of wachtwoord");
    } catch (err) {
      console.error("Login mislukt:", err);
      setError(err.message);
      setUser(null);
      return { ok: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }

  // Mock register: add to users array if email not taken
  async function register({ firstName, lastName, email, password }) {
    setLoading(true);
    setError(null);
    try {
      await new Promise((r) => setTimeout(r, 400));
      if (users.find((u) => u.email === email)) {
        throw new Error("Er bestaat al een account met dit e-mailadres.");
      }
      const newUser = { email, password, name: `${firstName} ${lastName}` };
      setUsers((prev) => [...prev, newUser]);
      setFlash({ type: "success", text: "Account aangemaakt." });
      setTimeout(() => setFlash(null), 3000);
      return { ok: true };
    } catch (err) {
      console.error("Register failed:", err);
      setError(err.message);
      return { ok: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }

  // Simulate sign-in with OAuth provider (mock)
  async function signInWithProvider(providerName) {
    setLoading(true);
    try {
      console.log(`Logging in with ${providerName}...`);
      await new Promise((r) => setTimeout(r, 300));
      const fakeToken = "fake-oauth-token";
      const demoUser = { name: "Demo User", email: `demo+${providerName.toLowerCase()}@vangarde.ai`, provider: providerName };
      tokenRef.current = fakeToken;
      localStorage.setItem("user", JSON.stringify(demoUser));
      localStorage.setItem("token", fakeToken);
      setUser(demoUser);
      setFlash({ type: "success", text: `Ingelogd met ${providerName}` });
      setTimeout(() => setFlash(null), 3000);
      navigate("/dashboard");
      return { ok: true };
    } catch (err) {
      console.error("Provider login failed:", err);
      setError(err.message);
      return { ok: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }

  // Logout
  function logout() {
    tokenRef.current = null;
    setUser(null);
    setError(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setFlash({ type: "info", text: "Je bent uitgelogd." });
    setTimeout(() => setFlash(null), 3000);
    navigate("/");
  }

  const value = { isLoggedIn, user, loading, error, login, logout, signInWithProvider, register, users, flash };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}