// useAuth.js
"use client";
import React, { createContext, useContext, useState, } from "react";

// De context
const AuthContext = createContext(null);

// De provider die de status bijhoudt
export function AuthProvider({ children }) {
   // Houd loginstatus in memory (alleen state)
  const [isLoggedIn, setLoggedIn] = useState(false);

    /**
   * login()
   * ----------------------------
   * Deze functie wordt aangeroepen na succesvolle validatie.
   * Later kun je hier OIDC-tokenverwerking toevoegen (bijv. id_token van Azure AD).
   * Voor nu: alleen state = true.
   */
  function login() {
     // TODO: OIDC-integratie – bewaar tokens tijdelijk in memory of session
    setLoggedIn(true);
  }

    /**
   * logout()
   * ----------------------------
   * Reset loginstatus.
   * Later kun je hier OIDC-logout flow toevoegen (bijv. redirect naar provider logout endpoint).
   */
  function logout() {
    setLoggedIn(false);
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
}

// De hook om het makkelijk te gebruiken
export function useAuth() {
  return useContext(AuthContext);
}
