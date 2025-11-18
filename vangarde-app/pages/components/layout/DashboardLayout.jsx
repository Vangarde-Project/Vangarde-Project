"use client";
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import NotificationSidebar from "./NotificationSidebar.jsx";
import { AuthProvider } from "../../login/auth/useAuth";

export default function DashboardLayout({ rightAside = null, children }) {
  // Linker navigatie (mobiel) en inklappen (desktop)
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  // Content-offset op basis van sidebarbreedte
  const contentOffset = collapsed ? "lg:pl-16" : "lg:pl-72";

  // Enige (inline) meldingenkolom
  const asideNode = rightAside ?? <NotificationSidebar variant="inline" />;

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gradient-to-b from-white to-[#F6F7FF]">
        {/* Linker navigatie */}
        <Sidebar
          open={open}
          onClose={() => setOpen(false)}
          collapsed={collapsed}
          onToggle={() => setCollapsed((v) => !v)}
        />

        {/* Content schuift mee met linker sidebar */}
        <div className={contentOffset}>
          {/* Header: menu-knop voor mobiel */}
          <Header onMenu={() => setOpen(true)} />

          <main className="px-4 py-6">
            {/* Midden smaller + sidebar rechts */}
            <div className="mx-auto max-w-[1600px] flex items-start gap-10">
              <section className="flex-1 max-w-[1100px] mx-auto space-y-6">
                {children}
              </section>

              {/* Rechterkolom (enige sidebar) */}
              <aside className="hidden xl:block sticky top-20 w-[360px]">
                {asideNode}
              </aside>
            </div>
          </main>
        </div>
      </div>
    </AuthProvider>
  );
}
