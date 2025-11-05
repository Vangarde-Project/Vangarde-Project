import React from "react";
import { Link } from "react-router-dom";
import {
  Search,
  AlarmClock,
  Play,
  FileText,
  FileSpreadsheet,
  FileBarChart2,
  Users,
  Briefcase,
} from "lucide-react";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Topbar (search + user preview) */}
      <div className="hidden xl:flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1">
          <div className="rounded-xl border bg-white px-3 py-2">
            <div className="text-[11px] text-gray-500 leading-tight">Welkom terug,</div>
            <div className="text-sm font-medium">Gebruiker</div>
          </div>
          <div className="relative flex-1 max-w-xl">
            <input className="w-full rounded-xl border pl-9 pr-3 py-2.5 bg-white" placeholder="Wat moet ik nu doen?" />
            <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        <div className="text-xs text-gray-500">Focus mode</div>
      </div>

      {/* Hero card */}
      <section className="rounded-2xl border bg-white shadow-sm p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs">
              <span className="inline-flex rounded-full px-2 py-0.5 font-semibold bg-red-50 text-red-700">URGENT</span>
              <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 bg-gray-50 text-gray-700"><AlarmClock className="h-3 w-3"/> Deadline: Vandaag 17:00</span>
            </div>
            <h2 className="text-lg font-semibold">Salarisverhoging evaluatie Q4</h2>
            <p className="text-gray-600 max-w-xl">Analyseer performance data en stel verhogingspercentages voor 24 medewerkers voor.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              aria-disabled
              className="pointer-events-none inline-flex items-center gap-2 rounded-xl px-4 py-2 text-white bg-gradient-to-r from-[#2F6BFF] to-[#7A21FF] shadow-sm"
            >
              <Play className="h-4 w-4"/> Start nu
            </button>
            <span className="inline-flex items-center rounded-xl px-4 py-2 border text-gray-700">Bekijk openstaande taken</span>
          </div>
        </div>
      </section>

      {/* HR Dashboard – Vandaag */}
      <div className="text-sm font-semibold">HR Dashboard · Vandaag</div>
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Kaart 1 */}
        <div className="rounded-2xl border bg-white shadow-sm p-4">
          <div className="text-sm text-gray-500">Taken afgerond</div>
          <div className="mt-2 h-5 w-24 rounded bg-gray-100"></div>
          <div className="mt-3 h-2 w-full rounded-full bg-gray-100"></div>
          <div className="mt-2 text-[11px] text-gray-500">—</div>
        </div>
        {/* Kaart 2 */}
        <div className="rounded-2xl border bg-white shadow-sm p-4">
          <div className="text-sm text-gray-500">Open contacten</div>
          <div className="mt-2 h-5 w-24 rounded bg-gray-100"></div>
          <div className="mt-2 text-[11px] text-[#5B2FFF]">bekijk details →</div>
        </div>
        {/* Kaart 3 */}
        <div className="rounded-2xl border bg-white shadow-sm p-4">
          <div className="text-sm text-gray-500">Recruitment pijplijn</div>
          <div className="mt-2 h-5 w-24 rounded bg-gray-100"></div>
          <div className="mt-2 text-[11px] text-emerald-600">—</div>
        </div>
      </section>

      {/* Prioriteit · Taken */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Prioriteit</h3>
          <span className="text-sm rounded-xl px-3 py-1.5 text-white bg-gradient-to-r from-[#2F6BFF] to-[#7A21FF]">Alle taken bekijken</span>
        </div>

        {/* Kaart 1 */}
        <article className="rounded-2xl border bg-white shadow-sm p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-xs">
                <span className="inline-flex rounded-full px-2 py-0.5 font-medium bg-orange-50 text-orange-700">lorum ipsum</span>
                <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 bg-gray-50 text-gray-700">lorum ipsum</span>
              </div>
              <h4 className="mt-2 font-semibold truncate">lorum ipsum</h4>
              <p className="text-sm text-gray-600 mt-1">lorum ipsum</p>
            </div>
            <button aria-disabled className="pointer-events-none inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm border">
              <Play className="h-4 w-4"/> Start
            </button>
          </div>
        </article>

        {/* Kaart 2 */}
        <article className="rounded-2xl border bg-white shadow-sm p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-xs">
                <span className="inline-flex rounded-full px-2 py-0.5 font-medium bg-emerald-50 text-emerald-700">lorum ipsum</span>
                <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 bg-gray-50 text-gray-700">lorum ipsum</span>
              </div>
              <h4 className="mt-2 font-semibold truncate">lorum ipsum</h4>
              <p className="text-sm text-gray-600 mt-1">lorum ipsum</p>
            </div>
            <button aria-disabled className="pointer-events-none inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm border">
              <Play className="h-4 w-4"/> Start
            </button>
          </div>
        </article>

        {/* Kaart 3 */}
        <article className="rounded-2xl border bg-white shadow-sm p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-xs">
                <span className="inline-flex rounded-full px-2 py-0.5 font-medium bg-[#F0E9FF] text-[#5B2FFF]">lorum ipsum</span>
                <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 bg-gray-50 text-gray-700">lorum ipsum</span>
              </div>
              <h4 className="mt-2 font-semibold truncate">lorum ipsum </h4>
              <p className="text-sm text-gray-600 mt-1">lorum ipsum</p>
              {/* Lege progress */}
              <div className="mt-3 h-2 w-full rounded-full bg-gray-100" />
            </div>
            <button aria-disabled className="pointer-events-none inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm border">
              <Play className="h-4 w-4"/> Start
            </button>
          </div>
        </article>

        {/* Snelle acties */}
        <div className="rounded-2xl border bg-white shadow-sm p-3">
          <div className="text-sm text-gray-600 mb-2">Lorum ipsum</div>
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="inline-flex items-center rounded-lg px-3 py-1.5 bg-[#F0E9FF] text-[#5B2FFF]">Lorum</span>
            <span className="inline-flex items-center rounded-lg px-3 py-1.5 bg-[#EEF2FF] text-[#312E81]">ipsum</span>
            <span className="inline-flex items-center rounded-lg px-3 py-1.5 bg-emerald-50 text-emerald-700">lorum</span>
          </div>
        </div>
      </section>

      {/* Recente Bestanden */}
      <section className="rounded-2xl border bg-white shadow-sm">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold">lorum ipsum</h3>
          <span className="text-sm text-[#5B2FFF]">lorum ipsum</span>
        </div>
        <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {[
            { name: "Salarisverhoging_Q4.docx", icon: FileText },
            { name: "Vergadernotulen_DA.xlsx", icon: FileSpreadsheet },
            { name: "Feedback_Update.docx", icon: FileText },
            { name: "Q4_Review.pptx", icon: FileBarChart2 },
            { name: "Employee_Data.csv", icon: FileSpreadsheet },
            { name: "Recruitment.csv", icon: FileSpreadsheet },
          ].map((f, i) => (
            <div key={i} className="group rounded-xl border p-3 bg-white">
              <div className="flex items-center gap-2">
                <f.icon className="h-4 w-4 text-gray-600" />
                <span className="text-xs text-gray-700 truncate">{f.name}</span>
              </div>
              <div className="mt-1 text-[10px] text-gray-500">—</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
