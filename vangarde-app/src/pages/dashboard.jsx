"use client";
import { useEffect } from "react";
import { useAuth } from "../features/login/auth/useAuth";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const { isLoggedIn, user, loading, logout } = useAuth();

  // Redirect to login if not logged in
  useEffect(() => {
    if (!loading && !isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, loading, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500 text-lg">
        Even geduld...
      </div>
    );
  }

  return (
    <div className="text-center min-h-screen flex flex-col justify-center items-center bg-gray-50">
      <h1 className="text-5xl font-bold mb-2">Dashboard</h1>
      <p className="mt-2 text-2xl text-gray-700">
        Welkom bij het dashboard{user?.email ? `, ${user.email}` : ""}.
      </p>
      <button
        onClick={logout}
        className="mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-6 rounded-lg font-medium hover:opacity-90 transition"
      >
        Uitloggen
      </button>
    </div>
  );
}

