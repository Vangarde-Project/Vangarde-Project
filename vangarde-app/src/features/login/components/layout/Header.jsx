import React from "react";
import { useAuth } from "../../auth/useAuth.jsx";
import { useNavigate } from "react-router-dom";

function initialsFrom(name = "Gebruiker") {
  return name
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function Header({ onMenu }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const name = user?.name || "Gebruiker";
  const role = user?.role || "Member";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b shadow-sm">
      <div className="flex items-center justify-between px-6 h-16">
        {/* Linkerzijde: logo of menuknop */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenu}
            className="md:hidden text-gray-600 hover:text-gray-900"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 5.25h16.5m-16.5 6h16.5m-16.5 6h16.5"
              />
            </svg>
          </button>

          <h1 className="text-lg font-semibold text-gray-800 tracking-tight">
            Vangarde Intelligence
          </h1>
        </div>

        {/* Rechterzijde: user info + logout */}
        <div className="flex items-center gap-4">
          {/* Gebruikersinfo */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-[#2F6BFF] to-[#7A21FF] text-white font-semibold shadow-sm">
              {initialsFrom(name)}
            </div>
            <div>
              <div className="text-sm font-medium text-gray-800 truncate max-w-[140px]">
                {name}
              </div>
              <div className="text-xs text-gray-500">{role}</div>
            </div>
          </div>

          {/* Uitloggen */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#2F6BFF] to-[#7A21FF] hover:shadow-md transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
              />
            </svg>
            Uitloggen
          </button>
        </div>
      </div>
    </header>
  );
}
