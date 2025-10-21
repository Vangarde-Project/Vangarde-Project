"use client";
import React, { createContext, useContext, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as authService from "../services/authService"; 

// === Auth context ===
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const tokenRef = useRef(null);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [flash, setFlash] = useState(null);

  // Herstel sessie bij paginaverversing
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("token");
      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser));
        tokenRef.current = storedToken;
      }
    } catch {
      /* ignore */
    }
  }, []);

  const isLoggedIn = !!user;

  // === LOGIN ===
  async function login(email, password) {
    setLoading(true);
    setError(null);

    try {
      const result = await authService.login(email, password);
      if (!result.ok) throw new Error(result.error || "Login mislukt.");

      const loggedUser = result.user;
      const fakeToken = "fake-jwt-token";

      localStorage.setItem("user", JSON.stringify(loggedUser));
      localStorage.setItem("token", fakeToken);
      tokenRef.current = fakeToken;
      setUser(loggedUser);

      setFlash({ type: "success", text: "Je bent nu ingelogd!" });
      setTimeout(() => setFlash(null), 3000);

      navigate("/dashboard");
      return { ok: true };
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message);
      setUser(null);
      return { ok: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }

  // === REGISTRATIE ===
  async function register(formData) {
    setLoading(true);
    setError(null);

    try {
      // JSON payload opbouwen conform backend
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        functieTitel: formData.functieTitel,
        kvkNummer: formData.kvkNummer,
        bedrijfsnaam: formData.bedrijfsnaam,
        adres: formData.adres,
        sector: formData.sector,
      };

      const result = await authService.registerUser(payload);
      if (!result.ok) throw new Error(result.error || "Registratie mislukt.");

      setFlash({ type: "success", text: "Account succesvol aangemaakt." });
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

  // === SIGN IN VIA PROVIDER (mock) ===
  async function signInWithProvider(providerName) {
    setLoading(true);
    try {
      console.log(`Logging in with ${providerName}...`);
      await new Promise((r) => setTimeout(r, 300));

      const fakeToken = "fake-oauth-token";
      const demoUser = {
        name: "Demo User",
        email: `demo+${providerName.toLowerCase()}@vangarde.ai`,
        provider: providerName,
      };

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

  // === LOGOUT ===
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

  // === Exporteer contextwaarden ===
  const value = {
    isLoggedIn,
    user,
    loading,
    error,
    flash,
    login,
    register,
    logout,
    signInWithProvider,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook om context te gebruiken
export function useAuth() {
  return useContext(AuthContext);
}
