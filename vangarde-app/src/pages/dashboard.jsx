import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../features/login/auth/useAuth.jsx";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const name = user?.name || "Gebruiker";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="space-y-6">
      {/* Welcome / hero */}
      <div className="rounded-2xl border bg-white shadow-sm p-5">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-xl font-semibold">Welkom, {name}</h1>
            <p className="text-gray-600">Dit is jouw persoonlijke Vangarde omgeving.</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              className="inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-white font-medium
                         bg-gradient-to-r from-[#2F6BFF] to-[#7A21FF] shadow hover:opacity-95"
            >
              Nieuwe taak
            </button>
            <button
              className="inline-flex items-center justify-center rounded-xl px-4 py-2 border text-[#5B2FFF] bg-[#F7F4FF] hover:bg-[#F0E9FF]"
            >
              Bekijk bestanden
            </button>
            <button
              onClick={handleLogout}
              className="inline-flex items-center justify-center rounded-xl px-4 py-2 border text-red-600 bg-red-50 hover:bg-red-100"
            >
              Uitloggen
            </button>
          </div>
        </div>
      </div>

      {/* KPI-rij */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-2xl border bg-white shadow-sm p-4">
          <div className="text-sm text-gray-500">Taken afgerond</div>
          <div className="mt-2 text-2xl font-semibold">6/8</div>
          <div className="mt-3 h-2 w-full rounded-full bg-gray-100">
            <div className="h-2 rounded-full bg-gradient-to-r from-[#2F6BFF] to-[#7A21FF]" style={{ width: "75%" }} />
          </div>
        </div>
        <div className="rounded-2xl border bg-white shadow-sm p-4">
          <div className="text-sm text-gray-500">Open contacten</div>
          <div className="mt-2 text-2xl font-semibold">12</div>
          <span className="mt-2 inline-flex rounded-full px-2 py-0.5 text-xs bg-[#F0E9FF] text-[#5B2FFF]">
            +2 deze week
          </span>
        </div>
        <div className="rounded-2xl border bg-white shadow-sm p-4">
          <div className="text-sm text-gray-500">Recruitment-pijplijn</div>
          <div className="mt-2 text-2xl font-semibold">8</div>
          <span className="mt-2 inline-flex rounded-full px-2 py-0.5 text-xs bg-emerald-50 text-emerald-700">
            stabiel
          </span>
        </div>
      </div>

      {/* Takenlijst (placeholder) */}
      <div className="rounded-2xl border bg-white shadow-sm">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="font-semibold">Prioriteit · Taken</h2>
          <button className="text-sm rounded-xl px-3 py-1.5 text-white bg-gradient-to-r from-[#2F6BFF] to-[#7A21FF]">
            Alle taken bekijken
          </button>
        </div>
        <ul className="divide-y">
          {[
            { status: "BELANGRIJK", title: "Onboarding programma update", tone: "orange" },
            { status: "NORMAAL", title: "Maandelijkse HR rapport", tone: "emerald" },
            { status: "IN BEHANDELING", title: "Contracten review Q1 2025", tone: "purple" },
          ].map((t, i) => (
            <li key={i} className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span
                  className={`inline-flex rounded-full px-2 py-0.5 text-xs ${
                    t.tone === "orange"
                      ? "bg-orange-50 text-orange-700"
                      : t.tone === "emerald"
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-[#F0E9FF] text-[#5B2FFF]"
                  }`}
                >
                  {t.status}
                </span>
                <span className="font-medium">{t.title}</span>
              </div>
              <button className="rounded-xl px-3 py-1.5 text-sm border hover:bg-gray-50">
                Start
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
