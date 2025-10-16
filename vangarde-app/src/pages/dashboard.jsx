// src/pages/Dashboard.jsx
"use client";
import { useEffect } from "react";    
import { useAuth } from "../features/login/auth/useAuth";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();

  // Redirect to login if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="text-center">
      <h1 className="text-5xl">Dashboard</h1>
      <p className="mt-5 text-2xl">Welkom bij het dashboard</p>
      <button className="mt-5 w-100 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg font-medium hover:opacity-90 transition disabled:opacity-60" onClick={logout}>Uitloggen</button>
    </div>
  );
}
