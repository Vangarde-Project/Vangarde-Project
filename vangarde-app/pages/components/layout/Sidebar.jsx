import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
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
  const { pathname } = useRouter();

  const baseWidth = collapsed ? "w-14" : "w-56";
  const showLabels = !collapsed;

  return (
    <>
      {/* Backdrop alleen mobiel */}
      <div
        aria-hidden
        className={`fixed inset-0 bg-black/30 lg:hidden transition-opacity ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      <aside
        className={[
          "fixed inset-y-0 left-0 z-40 bg-white border-r flex flex-col",
          "transition-[transform,width] duration-200",
          baseWidth,
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        ].join(" ")}
      >
        {/* TOP: Branding + Navigatie (met padding) */}
        <div className="p-3">
          <div className={`flex items-center ${collapsed ? "justify-center" : "gap-3"} mb-4`}>
            {/* Gradient logo gelijk aan header */}
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-[#2F6BFF] to-[#7A21FF] text-white font-semibold">
              VI
            </div>

            {!collapsed && (
              <div className="leading-tight">
                <div className="font-semibold text-sm text-gray-800">Vangarde Intelligence</div>
                <div className="text-[10px] text-gray-500 -mt-0.5">AI as a colleague — not a tool</div>
              </div>
            )}
          </div>

          {/* Navigatie */}
          <nav className="space-y-1">
            {NAV_ITEMS.map(({ label, href, icon }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={onClose}
                  title={collapsed ? label : undefined}
                  className={[
                    "group flex items-center rounded-xl py-2 transition",
                    collapsed ? "px-2" : "px-3",
                    active ? "bg-[#F0E9FF] text-[#5B2FFF] font-medium" : "hover:bg-gray-50 text-gray-700",
                  ].join(" ")}
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
                  {showLabels && <span>{label}</span>}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* BOTTOM: Quick Actions + Toggle */}
        <div className="mt-auto">
          {showLabels && (
            <div className="border-t px-3 pt-3 pb-2">
              <div className="text-[10px] uppercase tracking-wide text-gray-400 mb-2">
                Quick actions
              </div>
              <div className="space-y-2 text-[12px]">
                <Link
                  href="/tasks/new"
                  onClick={onClose}
                  className="flex items-center gap-2 rounded-md hover:bg-gray-50 text-gray-800 py-1 px-2"
                >
                  <span className="grid place-items-center h-[18px] w-[18px] rounded-full text-white bg-[#6D4AFF]">
                    <Plus className="h-3 w-3" />
                  </span>
                  <span>Nieuwe Taak</span>
                </Link>
                <Link
                  href="/documents/new"
                  onClick={onClose}
                  className="flex items-center gap-2 rounded-md hover:bg-gray-50 text-gray-800 py-1 px-2"
                >
                  <span className="grid place-items-center h-[18px] w-[18px] rounded-full text-white bg-[#9B5CFF]">
                    <FilePlus2 className="h-3 w-3" />
                  </span>
                  <span>Document Maken</span>
                </Link>
                <Link
                  href="/analytics"
                  onClick={onClose}
                  className="flex items-center gap-2 rounded-md hover:bg-gray-50 text-gray-800 py-1 px-2"
                >
                  <span className="grid place-items-center h-[18px] w-[18px] rounded-full text-white bg-[#50C878]">
                    <BarChart3 className="h-3 w-3" />
                  </span>
                  <span>Data Analyse</span>
                </Link>
              </div>
            </div>
          )}

          <div className="border-t px-3 py-3 flex items-center justify-center">
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
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
