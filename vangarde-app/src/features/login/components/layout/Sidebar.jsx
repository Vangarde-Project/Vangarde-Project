import React from "react";
import { Link, useLocation } from "react-router-dom";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard" },
  // Voeg later meer items toe (Agents, Work, History, Settings)
];

export default function Sidebar({ open, onClose }) {
  const { pathname } = useLocation();
  return (
    <>
      {/* Backdrop (mobiel) */}
      <div
        className={`fixed inset-0 bg-black/30 lg:hidden transition-opacity ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 bg-white border-r p-4 flex flex-col
                    transition-transform lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Logo / titel */}
        <div className="mb-6">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-r from-[#2F6BFF] to-[#7A21FF]"></div>
          <div className="mt-3 font-semibold">Vangarde Intelligence</div>
        </div>

        {/* Nav */}
        <nav className="space-y-1">
          {NAV_ITEMS.map(({ label, href }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                to={href}
                onClick={onClose}
                className={[
                  "flex items-center gap-3 rounded-xl px-3 py-2 transition",
                  active
                    ? "bg-[#F0E9FF] text-[#5B2FFF] font-medium"
                    : "hover:bg-gray-50 text-gray-700",
                ].join(" ")}
              >
                <span className="h-2 w-2 rounded-full bg-gradient-to-r from-[#2F6BFF] to-[#7A21FF]" />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Quick action onderin */}
        <div className="mt-auto pt-4">
          <Link
            to="/dashboard"
            onClick={onClose}
            className="w-full inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm text-white
                       bg-gradient-to-r from-[#2F6BFF] to-[#7A21FF] shadow-sm hover:opacity-95"
          >
            Nieuwe taak
          </Link>
        </div>
      </aside>
    </>
  );
}
