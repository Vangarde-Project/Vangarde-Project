"use client";
import React, { createContext, useContext, useState, useRef, useEffect } from "react";


const AuthContext = createContext(null);


export function AuthProvider({ children }) {
  const tokenRef = useRef(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [flash, setFlash] = useState(null); 
  // Eenvoudige mock gebruikerstore die we in localStorage bewaren
  const [users, setUsers] = useState(() => {
    try {
      const raw = localStorage.getItem("vangarde_users");
      if (raw) return JSON.parse(raw);
    } catch (e) {
      // als localStorage niet beschikbaar is, gebruik een demo-account
    }
    return [{ email: "test@vangarde.ai", password: "1234", name: "Demo User" }];
  });

  // Sla users op in localStorage telkens wanneer ze veranderen
  useEffect(() => {
    try {
      localStorage.setItem("vangarde_users", JSON.stringify(users));
    } catch (e) {
      // ignore write errors
    }
  }, [users]);

  const isLoggedIn = !!user;

  // Login: check credentials tegen de mock users array
  async function login(email, password) {
    setLoading(true);
    setError(null);

    try {
      // Simuleer netwerkvertraging
      await new Promise((r) => setTimeout(r, 300));

      const found = users.find((u) => u.email === email && u.password === password);
      if (found) {
        tokenRef.current = "fake-jwt-token";
        setUser({ name: found.name || email, email });
        setLoading(false);

        // korte flashmelding
        setFlash({ type: "success", text: "Je bent nu ingelogd!" });
        setTimeout(() => setFlash(null), 3000);

        return { ok: true };
      } else {
        throw new Error("Ongeldige gebruikersnaam of wachtwoord");
      }
    } catch (err) {
      console.error("Login mislukt:", err);
      setError(err.message);
      setUser(null);
      setLoading(false);
      return { ok: false, error: err.message };
    }
  }

  // Register: voeg nieuwe gebruiker toe aan mock store als e-mail nog niet bestaat
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
      setLoading(false);
      setFlash({ type: "success", text: "Account aangemaakt." });
      setTimeout(() => setFlash(null), 3000);
      return { ok: true };
    } catch (err) {
      console.error("Register failed:", err);
      setError(err.message);
      setLoading(false);
      return { ok: false, error: err.message };
    }
  }

  // Uitloggen: maak sessie leeg
  function logout() {
    tokenRef.current = null;
    setUser(null);
    setError(null);
    
    // Toon korte melding
    setFlash({ type: "info", text: "Je bent uitgelogd." });
    setTimeout(() => setFlash(null), 3000);
  }

  // Provider met alle relevante functies/state
  return (
    <AuthContext.Provider value={{ isLoggedIn, user, loading, error, login, logout, flash, register, users }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook om auth context te gebruiken in componenten
export function useAuth() {
  return useContext(AuthContext);
}
