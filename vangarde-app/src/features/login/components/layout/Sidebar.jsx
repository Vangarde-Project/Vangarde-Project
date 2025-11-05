import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Bot,
  CheckSquare,
  Briefcase,
  Clock,
  Settings,
  ChevronLeft,
  ChevronRight,
  Plus,
  FilePlus2,
  BarChart3,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: <LayoutDashboard className="h-4 w-4" /> },
  { label: "Agent Workspace", href: "/agents", icon: <Bot className="h-4 w-4" /> },
  { label: "Taken", href: "/tasks", icon: <CheckSquare className="h-4 w-4" /> },
  { label: "Mijn Werk", href: "/work", icon: <Briefcase className="h-4 w-4" /> },
  { label: "History", href: "/history", icon: <Clock className="h-4 w-4" /> },
  { label: "Profiel & Instellingen", href: "/settings", icon: <Settings className="h-4 w-4" /> },
];

function Sidebar({ open, onClose, collapsed, onToggle }) {
  const { pathname } = useLocation();
  const baseWidth = collapsed ? "w-12" : "w-52";
  const labelHidden = collapsed ? "hidden" : "";
  const itemPad = collapsed ? "px-2" : "px-3";

  return (
    <>
      <div
        aria-hidden
        className={`fixed inset-0 bg-black/30 lg:hidden transition-opacity ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-40 ${baseWidth} bg-white border-r flex flex-col justify-between
                    transition-[transform,width] duration-200 lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <div className="flex flex-col gap-6 p-3">
          <div className={`flex items-center ${collapsed ? "justify-center" : "gap-3"}`}>
            <div className="h-8 w-8 rounded-xl bg-gradient-to-r from-[#2F6BFF] to-[#7A21FF]" />
            {!collapsed && (
              <div className="leading-tight">
                <div className="font-semibold text-sm">Vangarde</div>
                <div className="text-[10px] text-gray-500">Intelligence</div>
              </div>
            )}
          </div>

          <nav className="space-y-1">
            {NAV_ITEMS.map(({ label, href, icon }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  to={href}
                  onClick={onClose}
                  className={[
                    "group flex items-center rounded-xl py-2 transition",
                    itemPad,
                    active ? "bg-[#F0E9FF] text-[#5B2FFF] font-medium" : "hover:bg-gray-50 text-gray-700",
                  ].join(" ")}
                  title={collapsed ? label : undefined}
                >
                  <span
                    className={[
                      "grid place-items-center h-6 w-6 rounded-full",
                      collapsed ? "mx-auto" : "mr-3",
                      active ? "bg-[#E8DEFF] text-[#5B2FFF]" : "bg-gray-100 text-gray-600",
                    ].join(" ")}
                  >
                    {icon}
                  </span>
                  {!collapsed && <span>{label}</span>}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Quick Actions */}
        <div className={`mt-auto border-t pt-3 px-3 pb-5 ${labelHidden ? "hidden" : "block"}`}>
          <div className="text-[10px] uppercase tracking-wide text-gray-400 mb-2">Quick actions</div>
          <div className="space-y-2 text-[12px]">
            <Link to="/tasks/new" onClick={onClose} className="flex items-center gap-2 rounded-md hover:bg-gray-50 text-gray-800 py-0.5 px-1.5">
              <span className="grid place-items-center h-4.5 w-4.5 rounded-full text-white bg-[#6D4AFF]"><Plus className="h-2.5 w-2.5" /></span>
              <span>Nieuwe Taak</span>
            </Link>
            <Link to="/documents/new" onClick={onClose} className="flex items-center gap-2 rounded-md hover:bg-gray-50 text-gray-800 py-0.5 px-1.5">
              <span className="grid place-items-center h-4.5 w-4.5 rounded-full text-white bg-[#9B5CFF]"><FilePlus2 className="h-2.5 w-2.5" /></span>
              <span>Document Maken</span>
            </Link>
            <Link to="/analytics" onClick={onClose} className="flex items-center gap-2 rounded-md hover:bg-gray-50 text-gray-800 py-0.5 px-1.5">
              <span className="grid place-items-center h-4.5 w-4.5 rounded-full text-white bg-[#50C878]"><BarChart3 className="h-2.5 w-2.5" /></span>
              <span>Data Analyse</span>
            </Link>
          </div>
        </div>

        {/* Onderste rand + pijl */}
        <div className="border-t py-3 flex items-center justify-center mt-1">
          <button
            type="button"
            onClick={onToggle}
            className="h-7 w-7 rounded-full border bg-white hover:bg-gray-50 text-gray-600 flex items-center justify-center"
            aria-label={collapsed ? "Zijbalk uitklappen" : "Zijbalk inklappen"}
            title={collapsed ? "Uitklappen" : "Inklappen"}
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;