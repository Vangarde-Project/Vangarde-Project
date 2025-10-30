import { LayoutDashboard, Bot, FolderOpen, History, Settings } from "lucide-react";

export const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Agent Workspace", href: "/agents", icon: Bot },
  { label: "Mijn Werk", href: "/work", icon: FolderOpen },
  { label: "History", href: "/history", icon: History },
  { label: "Profiel & Instellingen", href: "/settings", icon: Settings },
];
