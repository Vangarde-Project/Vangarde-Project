import React from "react";
import { useAuth } from "../../auth/useAuth.jsx"; // named export!
import { useNavigate } from "react-router-dom";

function initialsFrom(name = "Gebruiker") {
  return name.split(" ").map(s => s[0]).slice(0, 2).join("").toUpperCase();
}

export default function Header({ onMenu }) {
  const { user } = useAuth();
  const name = user?.name || "Gebruiker";
  const role = user?.role || "Member";

  // logic for logging out using auth context and router
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b">
      <div className="flex items-center gap-3 px-4 h-16">
        {/* Hamburger (mobiel) */}
        <button
          className="lg:hidden rounded-xl p-2 border hover:bg-gray-50"
          onClick={onMenu}
          aria-label="Open menu"
        >
          ☰
        </button>

        {/* Zoekveld */}
        <div className="relative flex-1 max-w-xl">
          <input
            className="w-full rounded-xl border px-10 py-2 text-sm placeholder:text-gray-400
                       focus:outline-none focus:ring-2 focus:ring-[#7A21FF]/40"
            placeholder="Wat moet ik nu doen?"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔎</span>
        </div>

        {/* Actions rechts */}
        <button className="rounded-xl p-2 border hover:bg-gray-50">🔔</button>

        {/* User chip */}
        <div className="ml-2 flex items-center gap-2">
          <div className="h-9 w-9 rounded-full bg-gradient-to-r from-[#2F6BFF] to-[#7A21FF] text-white grid place-items-center text-sm font-semibold">
            {initialsFrom(name)}
          </div>
          <div className="leading-tight">
            <div className="text-xs text-gray-500">Welkom terug</div>
            <div className="font-medium">{name}</div>
            <div className="text-[10px] text-gray-500">{role}</div>
          </div>
        </div>

{/* Log out button */}
        <button
          onClick={handleLogout}
          className="ml-[1400px] flex items-center text-sm rounded-xl px-3 py-2.5 text-white bg-gradient-to-r from-[#2F6BFF] to-[#7A21FF]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-4 h-4 mr-2"
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
    </header>
  );
}
