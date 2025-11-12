"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useAuth } from "../features/login/auth/useAuth";
import {
  AlarmClock,
  Play,
  FileText,
  Check,
  Users,
  Eye,
  File,
  ExternalLink,
  Cloud,
  UserPlus,
  CheckCircle2,
  Bell,
} from "lucide-react";

import NotificationSidebar from "../features/login/components/layout/NotificationSidebar.jsx";

export default function DashboardMiddle() {

  return (
    <main className="flex-1 min-w-0 space-y-6">
      {/* Knop om meldingen te openen */}
      <div className="flex justify-end">
        <button
          onClick={() => setNotifOpen(true)}
          className="inline-flex items-center gap-2 rounded-full px-3.5 py-2 bg-gray-900 text-white hover:bg-black/90"
        >
          <Bell className="h-4 w-4" />
          Meldingen
        </button>
      </div>

      {/* HERO CARD (→ rode hover) */}
      <section className="rounded-2xl border border-red-200/60 bg-rose-50 shadow-sm p-5 sm:p-6 transition-colors hover:bg-rose-100 hover:border-rose-300">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="inline-flex rounded-full px-2 py-0.5 font-semibold bg-rose-100 text-rose-700">
                URGENT
              </span>
              <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 bg-gray-100 text-gray-700">
                <AlarmClock className="h-3 w-3" aria-hidden="true" />
                Deadline: Vandaag 17:00
              </span>
            </div>

            <h2 className="text-lg font-semibold text-gray-900">
              Salarisverhoging evaluatie Q4
            </h2>

            <p className="text-gray-600 max-w-xl">
              Analyseer performance data en stel verhogingspercentages voor 24 medewerkers voor.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-white bg-gradient-to-r from-[#2F6BFF] to-[#7A21FF] shadow-sm transition-colors hover:from-[#295fe5] hover:to-[#6a1be0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500">
              <Play className="h-4 w-4" aria-hidden="true" />
              Start Nu
            </button>

            <button className="inline-flex items-center rounded-xl px-4 py-2 border border-blue-700 text-blue-700 hover:bg-gray-50">
              Bekijk openstaande taken
            </button>
          </div>
        </div>
      </section>

      {/* HR Dashboard – Vandaag */}
      <h2 className="text-2xl font-bold">HR Dashboard – Vandaag</h2>
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Kaart 1 – Taken afgerond (neutraal) */}
        <div className="rounded-2xl border border-gray-100 bg-white shadow-sm p-4 transition-colors hover:bg-gray-50 hover:border-gray-200">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
              <Check className="h-5 w-5 text-emerald-500" />
            </div>
            <div>
              <div className="text-sm text-gray-500">Taken afgerond</div>
              <div className="text-xl font-semibold text-emerald-600">6/8</div>
            </div>
          </div>

          <div className="mt-3 h-2 w-full rounded-full bg-gray-100">
            <div className="h-2 rounded-full bg-emerald-500" style={{ width: "75%" }} />
          </div>

          <div className="mt-2 text-[11px] text-gray-500">75% voltooid – uitstekend tempo!</div>
        </div>

        {/* Kaart 2 – Open contracten (neutraal) */}
        <div className="rounded-2xl border border-gray-100 bg-white shadow-sm p-4 transition-colors hover:bg-gray-50 hover:border-gray-200">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50">
              <FileText className="h-5 w-5 text-orange-500" />
            </div>
            <div>
              <div className="text-sm text-gray-500">Open contracten</div>
              <div className="text-xl font-semibold text-orange-600">12</div>
            </div>
          </div>

          <div className="mt-2 flex items-center gap-1 text-[11px] text-gray-500">
            <span className="inline-block h-2 w-2 rounded-full bg-rose-400" />
            3 verlopen deze week
          </div>

          <div className="mt-2 text-[11px] font-medium text-orange-600 hover:underline cursor-pointer">
            Bekijk details →
          </div>
        </div>

        {/* Kaart 3 – Recruitment (neutraal) */}
        <div className="rounded-2xl border border-gray-100 bg-white shadow-sm p-4 transition-colors hover:bg-gray-50 hover:border-gray-200">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50">
              <Users className="h-5 w-5 text-indigo-600" />
            </div>
            <div>
              <div className="text-sm text-gray-500">Recruitment pipeline</div>
              <div className="text-xl font-semibold text-indigo-600">8</div>
            </div>
          </div>

          <div className="mt-2 flex items-center gap-1 text-[11px] text-gray-500">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
            2 interviews vandaag
          </div>

          <div className="mt-2 text-[11px] font-medium text-indigo-600 hover:underline cursor-pointer">
            Open pipeline →
          </div>
        </div>
      </section>

      {/* Prioriteit Taken */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Prioriteit Taken</h3>
          <button className="text-sm font-medium text-blue-700 hover:underline">Alle taken bekijken →</button>
        </div>

        {/* BELANGRIJK (→ oranje hover) */}
        <article className="relative rounded-2xl border border-orange-100 bg-white shadow-sm p-4 transition-colors hover:bg-orange-50 hover:border-orange-300">
          <span className="pointer-events-none absolute left-0 top-3 bottom-3 w-1.5 rounded-full bg-orange-400" />
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-xs">
                <span className="inline-flex items-center rounded-full px-2 py-0.5 font-semibold bg-orange-50 text-orange-700 uppercase tracking-wide">BELANGRIJK</span>
                <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 bg-gray-50 text-gray-600">⏰ Deadline: Morgen 12:00</span>
              </div>
              <h4 className="mt-2 font-semibold text-gray-900">Onboarding programma update</h4>
              <p className="text-sm text-gray-600 mt-1">Herzien van het huidige onboarding proces en implementeren van nieuwe AI-gestuurde modules.</p>
            </div>
            <button className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-white bg-[#2F6BFF] hover:bg-[#2254e6] transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-5.197-2.574A1 1 0 008 9.5v5a1 1 0 001.555.832l5.197-2.574a1 1 0 000-1.79z" /></svg>
              Start
            </button>
          </div>
        </article>

        {/* NORMAAL (→ groene hover) */}
        <article className="relative rounded-2xl border border-emerald-100 bg-white shadow-sm p-4 transition-colors hover:bg-emerald-50 hover:border-emerald-300">
          <span className="pointer-events-none absolute left-0 top-3 bottom-3 w-1.5 rounded-full bg-emerald-400" />
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-xs">
                <span className="inline-flex items-center rounded-full px-2 py-0.5 font-semibold bg-emerald-50 text-emerald-700 uppercase tracking-wide">NORMAAL</span>
                <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 bg-gray-50 text-gray-600">⏰ Deadline: Volgende week</span>
              </div>
              <h4 className="mt-2 font-semibold text-gray-900">Maandelijkse HR rapport generatie</h4>
              <p className="text-sm text-gray-600 mt-1">Compileer en analyseer HR KPI's voor management dashboard.</p>
            </div>
            <button className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-white bg-[#2F6BFF] hover:bg-[#2254e6] transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-5.197-2.574A1 1 0 008 9.5v5a1 1 0 001.555.832l5.197-2.574a1 1 0 000-1.79z" /></svg>
              Start
            </button>
          </div>
        </article>

        {/* IN UITVOERING (→ paarse hover) */}
        <article className="relative rounded-2xl border border-purple-200 bg-white shadow-sm p-4 transition-colors hover:bg-purple-50 hover:border-purple-300">
          <span className="pointer-events-none absolute left-0 top-3 bottom-3 w-1.5 rounded-full bg-[#7A21FF]" />
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 w-full">
              <div className="flex items-center gap-2 text-xs">
                <span className="inline-flex items-center rounded-full px-2 py-0.5 font-semibold bg-[#F0E9FF] text-[#5B2FFF] uppercase tracking-wide">IN UITVOERING</span>
                <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 bg-gray-50 text-gray-600">🚀 Gestart: 2u geleden</span>
              </div>
              <h4 className="mt-2 font-semibold text-gray-900">Contracten review Q1 2025</h4>
              <p className="text-sm text-gray-600 mt-1">AI-agent analyseert 47 tijdelijke contracten voor verlenging.</p>
              <div className="mt-3">
                <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
                  <div className="h-2 rounded-full bg-[#7A21FF]" style={{ width: "49%" }} />
                </div>
                <p className="text-xs text-gray-500 mt-1">49% voltooid – verwacht afronding over ±1.5u</p>
              </div>
            </div>
            <button className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-white bg-[#7A21FF] hover:bg-[#661CE6] transition-all">
              <Eye className="h-4 w-4" />
              Bekijk
            </button>
          </div>
        </article>

        <section className="space-y-6">
          {/* Snelle acties (neutraal) */}
          <div className="rounded-2xl bg-white border border-gray-200 shadow-sm p-4 transition-colors hover:bg-gray-50 hover:border-gray-300">
            <div className="text-sm text-gray-700 font-medium mb-3">
              Snelle acties voor HR taken
            </div>
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <button className="inline-flex items-center gap-2 rounded-full px-3.5 py-2 bg-blue-600 text-white font-medium hover:bg-blue-700 transition">
                <UserPlus className="h-4 w-4" />
                Nieuwe werknemer
              </button>

              <button className="inline-flex items-center gap-2 rounded-full px-3.5 py-2 bg-[#5B2FFF] text-white font-medium hover:bg-[#4A1DE0] transition">
                <FileText className="h-4 w-4" />
                Contract opstellen
              </button>

              <button className="inline-flex items-center gap-2 rounded-full px-3.5 py-2 bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition">
                <CheckCircle2 className="h-4 w-4" />
                Performance review
              </button>
            </div>
          </div>

          {/* Recente Bestanden (neutraal) */}
          <section className="rounded-2xl bg-white shadow-md border border-gray-100 transition-colors hover:bg-gray-50 hover:border-gray-200">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h3 className="font-semibold text-gray-900">Recente Bestanden</h3>
              <span className="text-sm text-[#5B2FFF] font-medium hover:underline cursor-pointer">
                Alle bestanden →
              </span>
            </div>

            <div className="p-4 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {[
                { name: "Salarisverhoging_Q4.pdf", time: "23 min geleden", ext: "pdf" },
                { name: "Tevredenheid_Data.xlsx", time: "2u geleden", ext: "xlsx" },
                { name: "Beleid_Update.docx", time: "4u geleden", ext: "docx" },
                { name: "Q4_Review.pptx", time: "1 dag geleden", ext: "pptx" },
                { name: "Employee_Data.csv", time: "2 dagen geleden", ext: "csv" },
              ].map((f, i) => {
                const style = {
                  pdf:  { bg: "bg-red-50",     text: "text-red-600",     ring: "ring-red-100" },
                  xlsx: { bg: "bg-emerald-50", text: "text-emerald-600", ring: "ring-emerald-100" },
                  docx: { bg: "bg-blue-50",    text: "text-blue-600",    ring: "ring-blue-100" },
                  pptx: { bg: "bg-orange-50",  text: "text-orange-600",  ring: "ring-orange-100" },
                  csv:  { bg: "bg-purple-50",  text: "text-purple-600",  ring: "ring-purple-100" },
                }[f.ext];

                return (
                  <div
                    key={i}
                    className="group rounded-xl border border-gray-100 bg-white p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition"
                  >
                    {/* bovenste rij */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-3 min-w-0">
                        <span className={`inline-flex h-8 w-8 items-center justify-center rounded-md ring-1 ${style.ring} ${style.bg} ${style.text}`}>
                          <File className="h-4 w-4" />
                        </span>
                        <span className="text-sm font-medium text-gray-900 truncate">
                          {f.name}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          className="inline-flex h-7 w-7 items-center justify-center rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition"
                          aria-label="Openen"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </button>
                        <button
                          className="inline-flex h-7 w-7 items-center justify-center rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition"
                          aria-label="Opslaan in cloud"
                        >
                          <Cloud className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-2 text-xs text-gray-500">{f.time}</div>
                  </div>
                );
              })}
            </div>
          </section>
        </section>
      </section>
    </main>
  );
}