"use client";

import React from "react";
import { useAuth } from "../../login/auth/useAuth";
import { useRouter } from "next/router";
import { useSession, signOut as nextSignOut } from "next-auth/react";

function initialsFrom(name = "Gebruiker") {
  return name
    .split(" ")
    .filter(Boolean)
    .map((s) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function Header({ onMenu }) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const { data: session } = useSession();

  // prefer NextAuth session data, fall back to local user
  const name = session?.user?.name ?? user?.name ?? "Gebruiker";
  const avatarUrl = session?.user?.image ?? user?.avatarUrl;

  const handleLogout = () => {
    if (session) {
      // NextAuth sign out -> redirect to your Vite app home after sign-out
      nextSignOut({ callbackUrl: "http://localhost:3000" });
    } else {
      // local logout
      logout();
      router.push("/login");
    }
  };

  return (
    <header className="sticky top-0 z-30 border-b bg-white/90 backdrop-blur">
      <div className="h-16 px-4 sm:px-6 flex items-center gap-4 justify-between">
        {/* === LEFT: logo en subtitel === */}
        <div className="flex items-center gap-3">
          {/* Mobiele menu-knop */}
          <button
            onClick={onMenu}
            className="md:hidden -ml-1 p-2 rounded text-gray-600 hover:bg-gray-100"
            aria-label="Menu openen"
          >
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 5.25h16.5M3.75 12h16.5M3.75 18.75h16.5"
              />
            </svg>
          </button>

          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-[#2F6BFF] to-[#7A21FF] text-white font-semibold">
              VI
            </div>
            <div className="leading-tight">
              <div className="text-sm sm:text-base font-semibold text-gray-800">
                Vangarde Intelligence
              </div>
              <div className="text-[11px] text-gray-500 -mt-0.5">
                AI as a colleague — not a tool
              </div>
            </div>
          </div>
        </div>

        {/* === CENTER: zoekbalk === */}
        <div className="flex-1 flex justify-center px-4">
          <div className="w-full max-w-xl">
            <div className="relative">
              <input
                id="global-search"
                type="text"
                placeholder="Wat moet ik nu doen?"
                className="w-full h-10 pl-3 pr-10 rounded-full border border-gray-200 bg-white text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500"
              />
              <button
                className="absolute right-1 top-1.5 h-7 w-7 rounded-full bg-gradient-to-r from-[#2F6BFF] to-[#7A21FF] text-white flex items-center justify-center"
                aria-label="Verstuur"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M22 2L11 13" />
                  <path d="M22 2l-7 20-4-9-9-4 20-7z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* === RIGHT: avatar + name + uitlogknop === */}
        <div className="flex items-center gap-3">
          {/* Avatar - show initials with colored background */}
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-[#2F6BFF] to-[#7A21FF] flex-shrink-0 text-white font-semibold text-sm">
            {initialsFrom(name)}
          </div>

          {/* Name */}
          {name && name !== "Gebruiker" && (
            <span className="text-sm font-medium text-gray-800 hidden sm:inline">
              {name}
            </span>
          )}

          {/* Zichtbare uitlogknop */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#2F6BFF] to-[#7A21FF] hover:shadow-md transition-all"
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
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
