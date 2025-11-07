import React, { useState } from "react";

export default function NotificationSidebar() {
  // tab state' s for new, urgent and all
  const [tab, setTab] = useState("nieuw");
  const [showA1, setShowA1] = useState(true);
  const [showA2, setShowA2] = useState(true);
  const [showA3, setShowA3] = useState(true);

  // counters for alerts
  const counters = { nieuw: 3, urgent: 2, alles: 3 };

  // unread alerts
  const unread = 3;

  // Helper UI snippets
  const IconBell = (
    <svg className="w-5 h-5 text-slate-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 01-3.46 0" />
    </svg>
  );

  const UrgentPill = (
    <span className="inline-flex items-center gap-1 text-xs font-medium ring-1 ring-inset px-2 py-0.5 rounded-full text-rose-700 bg-rose-50 ring-rose-200">
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
      Urgent
    </span>
  );

  const InfoPill = (
    <span className="inline-flex items-center gap-1 text-xs font-medium ring-1 ring-inset px-2 py-0.5 rounded-full text-indigo-700 bg-indigo-50 ring-indigo-200">
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
      Update
    </span>
  );

  const SuccessPill = (
    <span className="inline-flex items-center gap-1 text-xs font-medium ring-1 ring-inset px-2 py-0.5 rounded-full text-emerald-700 bg-emerald-50 ring-emerald-200">
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 12l2 2 4-4" />
        <circle cx="12" cy="12" r="10" />
      </svg>
      Klaar
    </span>
  );

  return (
    <aside className="w-full md:w-[360px] xl:w-[380px] border-l border-slate-200 bg-white/60 backdrop-blur supports-[backdrop-filter]:bg-white/70 sticky top-0 h-screen flex flex-col">
      {/* Header with total alerts */}
      <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative">
            {IconBell}
            {unread > 0 && (
              <span className="absolute -top-2 -right-2 text-[10px] px-1.5 py-0.5 rounded-full bg-indigo-600 text-white">{unread}</span>
            )}
          </div>
          <h2 className="font-semibold text-slate-800">Meldingen & Alerts</h2>
        </div>
        <button className="p-1 rounded hover:bg-slate-100" aria-label="Instellingen">
          <svg className="w-4 h-4 text-slate-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V22a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 8 20.26a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 3.74 16 1.65 1.65 0 0 0 2 15v-.18a2 2 0 1 1 0-3.64V11a1.65 1.65 0 0 0 1.74-1.26 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 8 3.74 1.65 1.65 0 0 0 9 2h.18a2 2 0 1 1 3.64 0H13a1.65 1.65 0 0 0 1.26 1.74 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 20.26 8c.13.53.13 1.08 0 1.61.14.2.29.39.46.57A2 2 0 1 1 19.4 15z" />
          </svg>
        </button>
      </div>

      {/* Tabs with new, urgant and all. */}
      <div className="px-3 py-2 border-b border-slate-200">
        <div className="grid grid-cols-3 gap-2">
          {[
            { key: "nieuw", label: "Nieuw", count: counters.nieuw },
            { key: "urgent", label: "Urgent", count: counters.urgent },
            { key: "alles", label: "Alles", count: counters.alles },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`h-8 rounded-full text-sm border transition px-2.5 flex items-center justify-center gap-1.5 whitespace-nowrap ${tab === t.key
                ? "bg-blue-700 text-white border-slate-900"
                : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                }`}
            >
              <span>{t.label}</span>
              <span className={`${tab === t.key ? "bg-white/30" : "bg-slate-100"} text-black-[11px] px-1.5 rounded-full`}>{t.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* List with content */}
      <div className="p-3 overflow-y-auto">
        <ul className="space-y-3">
          {/* new tab with content*/}
          {tab === "nieuw" && (
            <>
              {showA1 && (
                <li className="rounded-2xl border border-rose-100 bg-rose-50 p-4 shadow-sm">
                  <div className="flex items-start gap-3">
                    <span className="mt-1 w-2 h-2 rounded-full bg-rose-500" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        {UrgentPill}
                        <span className="text-[11px] text-slate-500">Nog 4u 23min</span>
                      </div>
                      <h3 className="mt-1 text-sm font-semibold text-slate-900">Deadline naderend!</h3>
                      <p className="mt-1 text-sm text-slate-700 leading-snug">Salarisverhoging evaluatie moet vandaag om 17:00 klaar zijn.</p>
                      <div className="mt-3 flex items-center gap-2">
                        <button
                          onClick={() => setShowA1(false)}
                          className="h-9 rounded-full text-sm px-4 bg-rose-600 text-white shadow-sm hover:bg-rose-600/90 inline-flex items-center gap-2"
                        >
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                          Start analyse
                        </button>
                        <button
                          onClick={() => setShowA1(false)}
                          className="h-9 rounded-full text-sm px-4 bg-white text-slate-700 ring-1 ring-slate-200 shadow-sm hover:bg-slate-50"
                        >
                          Snooze
                        </button>
                      </div>
                      <div className="mt-2 text-[11px] text-slate-500">Nog 4u 23min</div>
                    </div>
                  </div>
                </li>
              )}

              {showA2 && (
                <li className="rounded-2xl border border-indigo-100 bg-indigo-50 p-4 shadow-sm">
                  <div className="flex items-start gap-3">
                    <span className="mt-1 w-2 h-2 rounded-full bg-amber-400" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        {InfoPill}
                        <span className="text-[11px] text-slate-500">1u geleden</span>
                      </div>
                      <h3 className="mt-1 text-sm font-semibold text-slate-900">Agent update beschikbaar</h3>
                      <p className="mt-1 text-sm text-slate-700 leading-snug">HR Specialist heeft nieuwe functionaliteiten voor beleid analyse.</p>
                      <div className="mt-1 text-[11px] text-slate-600 flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M4 21h16M4 3h16M8 3v18M16 3v18" />
                        </svg>
                        Nieuwe features: Contract AI, Policy Generator
                      </div>
                      <div className="mt-3 flex items-center gap-2">
                        <button
                          onClick={() => setShowA2(false)}
                          className="h-9 rounded-full text-sm px-4 bg-indigo-600 text-white shadow-sm hover:bg-indigo-600/90 inline-flex items-center gap-2"
                        >
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                          Open agent
                        </button>
                        <button
                          onClick={() => setShowA2(false)}
                          className="h-9 rounded-full text-sm px-4 bg-white text-slate-700 ring-1 ring-slate-200 shadow-sm hover:bg-slate-50"
                        >
                          Later
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              )}

              {showA3 && (
                <li className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4 shadow-sm">
                  <div className="flex items-start gap-3">
                    <span className="mt-1 w-2 h-2 rounded-full bg-emerald-500" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        {SuccessPill}
                        <span className="text-[11px] text-slate-500">Zojuist</span>
                      </div>
                      <h3 className="mt-1 text-sm font-semibold text-slate-900">Taak voltooid ✅</h3>
                      <p className="mt-1 text-sm text-slate-700 leading-snug">Werknemerstevredenheid enquête is succesvol afgerond.</p>
                      <div className="mt-1 text-[11px] text-slate-600 flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M3 3h18v14H3z" />
                          <path d="M8 21h8" />
                        </svg>
                        87% response rate – excellent!
                      </div>
                      <div className="mt-3 flex items-center gap-2">
                        <button
                          onClick={() => setShowA3(false)}
                          className="h-9 rounded-full text-sm px-4 bg-emerald-600 text-white shadow-sm hover:bg-emerald-600/90 inline-flex items-center gap-2"
                        >
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h13M10 5l7 7-7 7" /></svg>
                          Bekijk resultaten
                        </button>
                        <button
                          onClick={() => setShowA3(false)}
                          className="h-9 rounded-full text-sm px-4 bg-white text-slate-700 ring-1 ring-slate-200 shadow-sm hover:bg-slate-50"
                        >
                          Archiveren
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              )}
            </>
          )}

          {/* tab 2 with urgent content */}
          {tab === "urgent" && (
            <>
              {showA1 && (
                <li className="rounded-2xl border border-rose-100 bg-rose-50 p-4 shadow-sm">
                  <div className="flex items-start gap-3">
                    <span className="mt-1 w-2 h-2 rounded-full bg-rose-500" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">{UrgentPill}<span className="text-[11px] text-slate-500">Nog 4u 23min</span></div>
                      <h3 className="mt-1 text-sm font-semibold text-slate-900">Deadline naderend!</h3>
                      <p className="mt-1 text-sm text-slate-700 leading-snug">Salarisverhoging evaluatie moet vandaag om 17:00 klaar zijn.</p>
                      <div className="mt-3 flex items-center gap-2">
                        <button onClick={() => setShowA1(false)} className="h-9 rounded-full text-sm px-4 bg-rose-600 text-white shadow-sm hover:bg-rose-600/90 inline-flex items-center gap-2"><svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3" /></svg>Start analyse</button>
                        <button onClick={() => setShowA1(false)} className="h-9 rounded-full text-sm px-4 bg-white text-slate-700 ring-1 ring-slate-200 shadow-sm hover:bg-slate-50">Snooze</button>
                      </div>
                    </div>
                  </div>
                </li>
              )}

              <li className="rounded-2xl border border-rose-100 bg-rose-50 p-4 shadow-sm">
                <div className="flex items-start gap-3">
                  <span className="mt-1 w-2 h-2 rounded-full bg-rose-500" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">{UrgentPill}<span className="text-[11px] text-slate-500">Vandaag</span></div>
                    <h3 className="mt-1 text-sm font-semibold text-slate-900">KPI Monitor 🔴</h3>
                    <p className="mt-1 text-sm text-slate-700 leading-snug">Performance review achter op schema. Actie vereist.</p>
                    <div className="mt-3 flex items-center gap-2">
                      <button className="h-9 rounded-full text-sm px-4 bg-rose-600 text-white shadow-sm hover:bg-rose-600/90">Bekijk voortgang</button>
                    </div>
                  </div>
                </div>
              </li>
            </>
          )}

          {/* all tab, in this case show same content as new tab*/}
          {tab === "alles" && (
            <>
              {showA1 && (
                <li className="rounded-2xl border border-rose-100 bg-rose-50 p-4 shadow-sm">
                  <div className="flex items-start gap-3">
                    <span className="mt-1 w-2 h-2 rounded-full bg-rose-500" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        {UrgentPill}
                        <span className="text-[11px] text-slate-500">Nog 4u 23min</span>
                      </div>
                      <h3 className="mt-1 text-sm font-semibold text-slate-900">Deadline naderend!</h3>
                      <p className="mt-1 text-sm text-slate-700 leading-snug">Salarisverhoging evaluatie moet vandaag om 17:00 klaar zijn.</p>
                      <div className="mt-3 flex items-center gap-2">
                        <button
                          onClick={() => setShowA1(false)}
                          className="h-9 rounded-full text-sm px-4 bg-rose-600 text-white shadow-sm hover:bg-rose-600/90 inline-flex items-center gap-2"
                        >
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                          Start analyse
                        </button>
                        <button
                          onClick={() => setShowA1(false)}
                          className="h-9 rounded-full text-sm px-4 bg-white text-slate-700 ring-1 ring-slate-200 shadow-sm hover:bg-slate-50"
                        >
                          Snooze
                        </button>
                      </div>
                      <div className="mt-2 text-[11px] text-slate-500">Nog 4u 23min</div>
                    </div>
                  </div>
                </li>
              )}

              {showA2 && (
                <li className="rounded-2xl border border-indigo-100 bg-indigo-50 p-4 shadow-sm">
                  <div className="flex items-start gap-3">
                    <span className="mt-1 w-2 h-2 rounded-full bg-amber-400" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        {InfoPill}
                        <span className="text-[11px] text-slate-500">1u geleden</span>
                      </div>
                      <h3 className="mt-1 text-sm font-semibold text-slate-900">Agent update beschikbaar</h3>
                      <p className="mt-1 text-sm text-slate-700 leading-snug">HR Specialist heeft nieuwe functionaliteiten voor beleid analyse.</p>
                      <div className="mt-1 text-[11px] text-slate-600 flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M4 21h16M4 3h16M8 3v18M16 3v18" />
                        </svg>
                        Nieuwe features: Contract AI, Policy Generator
                      </div>
                      <div className="mt-3 flex items-center gap-2">
                        <button
                          onClick={() => setShowA2(false)}
                          className="h-9 rounded-full text-sm px-4 bg-indigo-600 text-white shadow-sm hover:bg-indigo-600/90 inline-flex items-center gap-2"
                        >
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                          Open agent
                        </button>
                        <button
                          onClick={() => setShowA2(false)}
                          className="h-9 rounded-full text-sm px-4 bg-white text-slate-700 ring-1 ring-slate-200 shadow-sm hover:bg-slate-50"
                        >
                          Later
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              )}

              {showA3 && (
                <li className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4 shadow-sm">
                  <div className="flex items-start gap-3">
                    <span className="mt-1 w-2 h-2 rounded-full bg-emerald-500" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        {SuccessPill}
                        <span className="text-[11px] text-slate-500">Zojuist</span>
                      </div>
                      <h3 className="mt-1 text-sm font-semibold text-slate-900">Taak voltooid ✅</h3>
                      <p className="mt-1 text-sm text-slate-700 leading-snug">Werknemerstevredenheid enquête is succesvol afgerond.</p>
                      <div className="mt-1 text-[11px] text-slate-600 flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M3 3h18v14H3z" />
                          <path d="M8 21h8" />
                        </svg>
                        87% response rate – excellent!
                      </div>
                      <div className="mt-3 flex items-center gap-2">
                        <button
                          onClick={() => setShowA3(false)}
                          className="h-9 rounded-full text-sm px-4 bg-emerald-600 text-white shadow-sm hover:bg-emerald-600/90 inline-flex items-center gap-2"
                        >
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h13M10 5l7 7-7 7" /></svg>
                          Bekijk resultaten
                        </button>
                        <button
                          onClick={() => setShowA3(false)}
                          className="h-9 rounded-full text-sm px-4 bg-white text-slate-700 ring-1 ring-slate-200 shadow-sm hover:bg-slate-50"
                        >
                          Archiveren
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              )}
            </>
          )}
        </ul>

        {/* active process, always visable under each tab*/}
        <div className="mt-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <h4 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-slate-600">
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <text
                    x="50%"
                    y="50%"
                    fontSize="18"
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >🔄</text>
                </svg>
              </span>
              Actieve Processen
            </h4>

            <div className="mt-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="text-[13px] font-semibold text-slate-800">Recruitment Pipeline</div>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-emerald-700 bg-emerald-50 ring-1 ring-emerald-200">
                  Actief
                </span>
              </div>
              <div className="mt-2 h-1.5 w-full rounded-full bg-slate-100">
                <div className="h-1.5 rounded-full bg-emerald-500" style={{ width: "68%" }} />
              </div>
              <div className="mt-2 text-[12px] text-slate-600">12 sollicitaties → 1 aanbieding pending</div>
              <button className="mt-2 text-sm font-medium text-indigo-600 inline-flex items-center gap-1 hover:underline">
                Open pipeline <span aria-hidden>→</span>
              </button>
            </div>

            <div className="mt-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="text-[13px] font-semibold text-slate-800">Performance Reviews</div>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-amber-700 bg-amber-50 ring-1 ring-amber-200">
                  Planning
                </span>
              </div>
              <div className="mt-2 h-1.5 w-full rounded-full bg-slate-100">
                <div className="h-1.5 rounded-full bg-orange-500" style={{ width: "55%" }} />
              </div>
              <div className="mt-2 text-[12px] text-slate-600">28/45 voltooid – op schema</div>
              <button className="mt-2 text-sm font-medium text-orange-600 inline-flex items-center gap-1 hover:underline">
                Bekijk voortgang <span aria-hidden>→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

