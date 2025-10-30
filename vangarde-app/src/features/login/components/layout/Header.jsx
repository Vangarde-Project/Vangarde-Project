import { Menu, Bell, Search } from "lucide-react";
import { useAuth } from "../../auth/useAuth.jsx";

export default function Header({ onMenu }) {
  const { user } = useAuth();
  const name = user?.name || "Gebruiker";
  const initials = name.split(" ").map(s => s[0]).slice(0,2).join("");

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b">
      <div className="flex items-center gap-3 px-4 h-16">
        <button className="lg:hidden" onClick={onMenu}><Menu /></button>
        <div className="relative flex-1 max-w-xl">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><Search /></span>
          <input className="w-full pl-10 pr-3 py-2 rounded-xl border text-sm" placeholder="Wat moet ik nu doen?" />
        </div>
        <button className="rounded-xl p-2 border"><Bell /></button>
        <div className="flex items-center gap-2 ml-2">
          <div className="h-9 w-9 rounded-full bg-gray-200 grid place-items-center text-sm font-medium">{initials}</div>
          <div className="leading-tight">
            <div className="text-xs text-gray-500">Welkom terug</div>
            <div className="font-medium">{name}</div>
          </div>
        </div>
      </div>
    </header>
  );
}
