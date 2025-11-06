import React from "react";
import NotificationSidebar from "../features/login/components/layout/NotificationSidebar";
import {
  Search,
  AlarmClock,
  Play,
  FileText,
  FileSpreadsheet,
  FileBarChart2,
  Check,
  Users,            
} from "lucide-react";

export default function Dashboard() {
  return (
    <div className="xl:flex gap-6 items-start">
      {/* MAIN */}
      <main className="flex-1 min-w-0 space-y-6" >
        {/* Hero card */}
     <section className="rounded-2xl border border-red-200/60 bg-rose-50 shadow-sm p-5 sm:p-6">
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
            <button
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-white bg-gradient-to-r from-[#2F6BFF] to-[#7A21FF] shadow-sm hover:from-[#295fe5] hover:to-[#6a1be0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
            >
              <Play className="h-4 w-4" aria-hidden="true" />
              Start nu
            </button>

            <button
              className="inline-flex items-center rounded-xl px-4 py-2 border border-blue-700 text-blue-700 hover:bg-gray-50"
            >
              Bekijk openstaande taken
            </button>
          </div>
        </div>
      </section>


        {/* HR Dashboard – Vandaag */}
        <h2 className="text-2xl font-bold">HR Dashboard – Vandaag</h2>
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Kaart 1  taken*/}
          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm p-4 w-56">
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
              <div
                className="h-2 rounded-full bg-emerald-500"
                style={{ width: '75%' }}
              ></div>
            </div>

            <div className="mt-2 text-[11px] text-gray-500">
              75% voltooid – uitstekend tempo!
            </div>
          </div>
          {/* Kaart 2  contracten */}
            <div className="rounded-2xl border border-gray-100 bg-white shadow-sm p-4 w-56">
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
                <span className="inline-block h-2 w-2 rounded-full bg-rose-400"></span>
                3 verlopen deze week
              </div>

              <div className="mt-2 text-[11px] font-medium text-orange-600 hover:underline cursor-pointer">
                Bekijk details →
              </div>
            </div>
          {/* Kaart 3  recruitment*/}
            <div className="rounded-2xl border border-gray-100 bg-white shadow-sm p-4 w-56">
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
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-400"></span>
                2 interviews vandaag
              </div>

              <div className="mt-2 text-[11px] font-medium text-indigo-600 hover:underline cursor-pointer">
                Open pipeline →
              </div>
            </div>
        </section>

        {/* Prioriteit · Taken */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Prioriteit</h3>
            <span className="text-sm rounded-xl px-3 py-1.5 text-white bg-gradient-to-r from-[#2F6BFF] to-[#7A21FF]">
              Alle taken bekijken
            </span>
          </div>

          {/* Kaart 1 */}
          <article className="rounded-2xl border bg-white shadow-sm p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2 text-xs">
                  <span className="inline-flex rounded-full px-2 py-0.5 font-medium bg-orange-50 text-orange-700">
                    lorum ipsum
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 bg-gray-50 text-gray-700">
                    lorum ipsum
                  </span>
                </div>
                <h4 className="mt-2 font-semibold truncate">lorum ipsum</h4>
                <p className="text-sm text-gray-600 mt-1">lorum ipsum</p>
              </div>
              <button
                aria-disabled
                className="pointer-events-none inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm border"
              >
                <Play className="h-4 w-4" /> Start
              </button>
            </div>
          </article>

          {/* Kaart 2 */}
          <article className="rounded-2xl border bg-white shadow-sm p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2 text-xs">
                  <span className="inline-flex rounded-full px-2 py-0.5 font-medium bg-emerald-50 text-emerald-700">
                    lorum ipsum
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 bg-gray-50 text-gray-700">
                    lorum ipsum
                  </span>
                </div>
                <h4 className="mt-2 font-semibold truncate">lorum ipsum</h4>
                <p className="text-sm text-gray-600 mt-1">lorum ipsum</p>
              </div>
              <button
                aria-disabled
                className="pointer-events-none inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm border"
              >
                <Play className="h-4 w-4" /> Start
              </button>
            </div>
          </article>

          {/* Kaart 3 */}
          <article className="rounded-2xl border bg-white shadow-sm p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2 text-xs">
                  <span className="inline-flex rounded-full px-2 py-0.5 font-medium bg-[#F0E9FF] text-[#5B2FFF]">
                    lorum ipsum
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 bg-gray-50 text-gray-700">
                    lorum ipsum
                  </span>
                </div>
                <h4 className="mt-2 font-semibold truncate">lorum ipsum </h4>
                <p className="text-sm text-gray-600 mt-1">lorum ipsum</p>
                {/* Lege progress */}
                <div className="mt-3 h-2 w-full rounded-full bg-gray-100" />
              </div>
              <button
                aria-disabled
                className="pointer-events-none inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm border"
              >
                <Play className="h-4 w-4" /> Start
              </button>
            </div>
          </article>

          {/* Snelle acties */}
          <div className="rounded-2xl border bg-white shadow-sm p-3">
            <div className="text-sm text-gray-600 mb-2">Lorum ipsum</div>
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="inline-flex items-center rounded-lg px-3 py-1.5 bg-[#F0E9FF] text-[#5B2FFF]">
                Lorum
              </span>
              <span className="inline-flex items-center rounded-lg px-3 py-1.5 bg-[#EEF2FF] text-[#312E81]">
                ipsum
              </span>
              <span className="inline-flex items-center rounded-lg px-3 py-1.5 bg-emerald-50 text-emerald-700">
                lorum
              </span>
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
      </main>

      <aside className="w-full xl:w-[30px] shrink-0">
        <NotificationSidebar />
      </aside>
    </div>
  );
}