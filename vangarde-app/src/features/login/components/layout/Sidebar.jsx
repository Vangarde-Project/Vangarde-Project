import { NAV_ITEMS } from "../../../../config/navItems";
import { Link, useLocation } from "react-router-dom";
import { X } from "lucide-react";

export default function Sidebar({ open, onClose }) {
  const { pathname } = useLocation();
  return (
    <>
      {/* backdrop (mobile) */}
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
        <div className="flex items-center justify-between mb-6">
          <span className="font-bold text-lg">Vangarde</span>
          <button className="lg:hidden" onClick={onClose}><X /></button>
        </div>
        <nav className="space-y-1">
          {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                to={href}
                className={`flex items-center gap-3 rounded-xl px-3 py-2 transition
                            ${active ? "bg-gray-100 font-medium" : "hover:bg-gray-50"}`}
                onClick={onClose}
              >
                <Icon className="h-5 w-5" />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
