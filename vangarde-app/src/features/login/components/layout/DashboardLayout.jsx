import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function DashboardLayout({ rightAside, children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#F6F7FF]">
      <Sidebar open={open} onClose={() => setOpen(false)} />
      <div className="lg:pl-72">
        <Header onMenu={() => setOpen(true)} />
        <main className="px-4 py-6">
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6">
            <section className="space-y-6">{children}</section>
            {rightAside && (
              <aside className="hidden xl:block">
                <div className="rounded-2xl border bg-white shadow-sm p-4">
                  {rightAside}
                </div>
              </aside>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
