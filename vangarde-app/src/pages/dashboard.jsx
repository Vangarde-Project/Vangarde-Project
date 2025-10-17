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
    // full-width background, with a centered content container for desktop
    <div className="min-h-screen w-full bg-gray-50">
      <div className="max-w-7xl w-full mx-auto px-6 py-12">
        {/* Header row: centered title block */}
        <div className="flex items-start justify-between w-full">
          <div className="max-w-3xl mx-auto w-full">
            <h1 className="text-5xl font-bold mb-2 text-center">Dashboard</h1>
            <p className="mt-2 text-2xl text-gray-700 text-center">
              Welkom bij het dashboard{user?.email ? `, ${user.email}` : ""}.
            </p>

            {/* Centered logout button under the text */}
            <div className="mt-6 flex justify-center">
              <button
                onClick={logout}
                className="w-65 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:opacity-90 transition text-center"
              >
                Uitloggen
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

