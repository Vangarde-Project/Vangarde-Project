"use client";
import React, { createContext, useContext, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// // Make auth context
const AuthContext = createContext(null);

// // functions that authProvider can use and provide to other components
export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const tokenRef = useRef(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [flash, setFlash] = useState(null);

  const isLoggedIn = !!user;

  // Get user token when logged in already
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      tokenRef.current = storedToken;
    }
  }, []);

  // Stimulate login 
  async function login(email, password) {
    setLoading(true);
    setError(null);

    try {
      await new Promise((r) => setTimeout(r, 300)); 

      // check login credentials // gets replaced by real API/OICD call later
      if (email === "test@vangarde.ai" && password === "1234") {
        const fakeToken = "fake-jwt-token";
        const demoUser = {
          name: "Demo User",
          email,
          provider: "internal", // TODO: Replace with real OIDC provider (Google, Microsoft, etc.)
        };

        tokenRef.current = fakeToken;
        localStorage.setItem("user", JSON.stringify(demoUser));
        localStorage.setItem("token", fakeToken);
        setUser(demoUser);

        // flash message for successful login
        setFlash({ type: "success", text: "Je bent nu ingelogd!" });
        setTimeout(() => setFlash(null), 3000);

        navigate("/dashboard");
        return { ok: true };
      }
        // catch errors if login fails
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

  
  async function signInWithProvider(providerName) {
    // to see with what provider we are logging in
    console.log(`Logging in with ${providerName}...`);
    const fakeToken = "fake-oauth-token";
    const demoUser = {
      // test data
      name: "Demo User",
      email: "demo@vangarde.ai",
      provider: providerName, // TODO: Replace with real OIDC provider later
    };

    tokenRef.current = fakeToken;
    localStorage.setItem("user", JSON.stringify(demoUser));
    localStorage.setItem("token", fakeToken);
    setUser(demoUser);

    // flash message if logging in with provider was succesfull
    setFlash({ type: "success", text: `Ingelogd met ${providerName}` });
    setTimeout(() => setFlash(null), 3000);

    navigate("/dashboard");
  }

  // function for logging out and removing token from app
  function logout() {
    tokenRef.current = null;
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    // flash message for succesfully logging out
    setFlash({ type: "info", text: "Je bent uitgelogd." });
    setTimeout(() => setFlash(null), 3000);
    navigate("/"); 
  }

  const value = {
    isLoggedIn,user,loading,error,login,logout,signInWithProvider,token: tokenRef.current,flash,
  };

  // return authcontext with values to use in other components
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// // function to use useAuth on more pages
export function useAuth() {
  return useContext(AuthContext);
}