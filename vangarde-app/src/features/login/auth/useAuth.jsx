// useAuth.js
"use client";
import React, { createContext, useContext, useState } from "react";

// De context
const AuthContext = createContext();

// De provider die de status bijhoudt
export function AuthProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);

  function login() {
    setLoggedIn(true);
  }

  function logout() {
    setLoggedIn(false);
  }

  return (
    <AuthContext.Provider value={{ loggedIn, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
}

// De hook om het makkelijk te gebruiken
export function useAuth() {
  return useContext(AuthContext);
}
