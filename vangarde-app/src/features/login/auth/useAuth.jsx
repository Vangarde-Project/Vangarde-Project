"use client";
import React, { createContext, useContext, useState, useRef } from "react";

// Make auth context
const AuthContext = createContext(null);

// functions that authProvider can use and provide to other components
export function AuthProvider({ children }) {
  const tokenRef = useRef(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [flash, setFlash] = useState(null); 

  const isLoggedIn = !!user;

  // function for logging in // OICD integration comes here later
  async function login(email, password) {
    setLoading(true);
    setError(null);

    try {
      // stimulate network delay
      await new Promise((r) => setTimeout(r, 300));

      // check login credentials // gets replaced by real API/OICD call later
      if (email === "test@vangarde.ai" && password === "1234") {
        tokenRef.current = "fake-jwt-token";
        setUser({ name: "Demo User", email });
        setLoading(false);

        // flash message for successful login
        setFlash({ type: "success", text: "Je bent nu ingelogd!" });
        setTimeout(() => setFlash(null), 3000);

        return { ok: true };
      } else {
        throw new Error("Ongeldige gebruikersnaam of wachtwoord");
      }
      // catch errors if login fails
    } catch (err) {
      console.error("Login mislukt:", err);
      setError(err.message);
      setUser(null);
      setLoading(false);
      return { ok: false, error: err.message };
    }
  }

  // function for logging out
  function logout() {
    tokenRef.current = null;
    setUser(null);
    setError(null);
    
    // flash message for logging out
    setFlash({ type: "info", text: "Je bent uitgelogd." });
    setTimeout(() => setFlash(null), 3000);
  }

  // return authcontext with values to use in other components
  return (
    <AuthContext.Provider value={{ isLoggedIn, user, loading, error, login, logout, flash }}>
      {children}
    </AuthContext.Provider>
  );
}

// function to use useAuth on more pages
export function useAuth() {
  return useContext(AuthContext);
}
