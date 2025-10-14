// src/pages/Dashboard.jsx
"use client";
import { useEffect } from "react";    
import { useAuth } from "../features/login/auth/useAuth";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();

  // code nog fixen want je word na het inloggen meteen weer terug gestuurd naar login pagina

//   // Redirect als niet ingelogd
//   useEffect(() => {
//     if (!isLoggedIn) {
//       navigate("/");
//     }
//   }, [isLoggedIn, navigate]);

//   if (!isLoggedIn) return null;

  return (
    <div style={{ padding: 30 }}>
      <h1>Dashboard</h1>
      <p>Welkom bij het dashboard</p>
      <button onClick={logout}>Uitloggen</button>
    </div>
  );
}
