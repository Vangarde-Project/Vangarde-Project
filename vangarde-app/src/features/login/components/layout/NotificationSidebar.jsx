import React, { useMemo, useState } from "react";

export default function NotificationSidebar() {
  // tab state for "nieuw", "urgent", "alles"
  const [tab, setTab] = useState("nieuw");
  const [showA1, setShowA1] = useState(true);
  const [showA2, setShowA2] = useState(true);
  const [showA3, setShowA3] = useState(true);

  // alerts seed
  const seedAlerts = useMemo(
    () => [
      {
        id: "a1",
        title: "Deadline naderend!",
        description: "Salarisverhoging evaluatie moet vandaag om 17:00 klaar zijn.",
        source: "HR",
        severity: "high",
        tag: "nieuw",
        timeAgo: "9m",
        actions: [
          { key: "start", label: "Start analyse" },
          { key: "snooze", label: "Snooze" },
        ],
      },
      {
        id: "a2",
        title: "Agent update beschikbaar",
        description: "HR Specialist heeft nieuwe functionaliteiten voor beleid analyse.",
        source: "Agent Store",
        severity: "medium",
        tag: "nieuw",
        timeAgo: "1u",
        actions: [
          { key: "open", label: "Open agent" },
          { key: "later", label: "Later" },
        ],
      },
      {
        id: "a3",
        title: "Taak voltooid ✅",
        description: "Werknemerstevredenheid enquête is succesvol afgerond.",
        source: "HR Pipeline",
        severity: "low",
        tag: "alles",
        timeAgo: "2u",
        actions: [
          { key: "bekijk", label: "Bekijk resultaten" },
          { key: "archive", label: "Archiveren" },
        ],
      },
    ],
    []
  );

  const [alerts, setAlerts] = useState(seedAlerts.map((a) => ({ ...a, read: false })));

  // counts
  const counts = useMemo(() => {
    const nieuw = alerts.filter((a) => a.tag === "nieuw").length;
    const urgent = alerts.filter((a) => a.severity === "high").length;
    const alles = alerts.length;
    const unread = alerts.filter((a) => !a.read).length;
    return { nieuw, urgent, alles, unread };
  }, [alerts]);

  // filtering by tab
  const visible = useMemo(() => {
    if (tab === "nieuw") return alerts.filter((a) => a.tag === "nieuw");
    if (tab === "urgent") return alerts.filter((a) => a.severity === "high");
    return alerts;
  }, [alerts, tab]);

  // styling helpers
  const colorBySeverity = (sev) =>
    ({ high: "bg-rose-500", medium: "bg-amber-500", low: "bg-emerald-500" }[sev] || "bg-slate-400");

  const pillBySeverity = (sev) =>
    ({
      high: "text-rose-700 bg-rose-50 ring-rose-200",
      medium: "text-amber-700 bg-amber-50 ring-amber-200",
      low: "text-emerald-700 bg-emerald-50 ring-emerald-200",
    }[sev] || "text-slate-700 bg-slate-50 ring-slate-200");

  const icon = (sev) => {
    const common = "w-4 h-4";
    if (sev === "high")
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      );
    if (sev === "medium")
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      );
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 12l2 2 4-4" />
        <circle cx="12" cy="12" r="10" />
      </svg>
    );
  };

  // action handler
  const onAction = (id, key) => {
    if (key === "archive") {
      setAlerts((s) => s.filter((a) => a.id !== id));
    } else if (key === "snooze") {
      setAlerts((s) => {
        const found = s.find((x) => x.id === id);
        if (!found) return s;
        const rest = s.filter((x) => x.id !== id);
        return [...rest, { ...found, read: true }];
      });
    } else {
      setAlerts((s) => s.map((a) => (a.id === id ? { ...a, read: true } : a)));
    }
  };

  // --- UI ---
  return (
    <aside className="w-full md:w-[360px] xl:w-[380px] border-l border-slate-200 bg-white/60 backdrop-blur supports-[backdrop-filter]:bg-white/70 sticky top-0 h-screen flex flex-col">
      {/* Header */}
      <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative">
            <svg className="w-5 h-5 text-slate-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 01-3.46 0" />
            </svg>
            {counts.unread > 0 && (
              <span className="absolute -top-2 -right-2 text-[10px] px-1.5 py-0.5 rounded-full bg-indigo-600 text-white">
                {counts.unread}
              </span>
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

      {/* Tabs */}
      <div className="px-3 py-2 border-b border-slate-200">
        <div className="grid grid-cols-3 gap-2">
          {[
            { key: "nieuw", label: "Nieuw", count: counts.nieuw },
            { key: "urgent", label: "Urgent", count: counts.urgent },
            { key: "alles", label: "Alles", count: counts.alles },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`h-8 rounded-full text-sm border transition px-2.5 flex items-center justify-center gap-1.5 whitespace-nowrap ${
                tab === t.key
                  ? "bg-gradient-to-r from-[#2F6BFF] to-[#7A21FF] text-white border-transparent"
                  : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
              }`}
            >
              <span>{t.label}</span>
              <span
                className={`text-[11px] px-1.5 rounded-full ${
                  tab === t.key ? "bg-white/20" : "bg-slate-100"
                }`}
              >
                {t.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-3 overflow-y-auto">
        <ul className="space-y-3">
          {visible.length === 0 && (
            <li className="text-sm text-slate-500 border border-dashed border-slate-200 rounded-lg p-6 text-center">
              Geen meldingen voor deze filter.
            </li>
          )}

          {visible.map((a) => (
            <li
              key={a.id}
              className={`rounded-2xl border p-4 bg-white shadow-sm ${
                a.read ? "opacity-70" : ""
              } border-slate-200`}
            >
              <div className="flex items-start gap-3">
                <span className={`mt-1 w-2 h-2 rounded-full ${colorBySeverity(a.severity)}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1 text-xs font-medium ring-1 ring-inset px-2 py-0.5 rounded-full ${pillBySeverity(
                        a.severity
                      )}`}
                    >
                      {icon(a.severity)}
                      {a.severity === "high"
                        ? "Urgent"
                        : a.severity === "medium"
                        ? "Let op"
                        : "Info"}
                    </span>
                    <span className="text-[11px] text-slate-500">{a.timeAgo}</span>
                  </div>
                  <h3 className="mt-1 text-sm font-semibold text-slate-900">{a.title}</h3>
                  <p className="mt-1 text-sm text-slate-700 leading-snug">{a.description}</p>
                  <div className="mt-3 flex items-center gap-2">
                    {a.actions?.map((act) => (
                      <button
                        key={act.key}
                        onClick={() => onAction(a.id, act.key)}
                        className={`h-8 rounded-full text-xs px-3 border transition ${
                          act.key === "start" || act.key === "open" || act.key === "bekijk"
                            ? "bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700"
                            : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                        }`}
                      >
                        {act.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* Active processes */}
        <div className="mt-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <h4 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
              🔄 Actieve Processen
            </h4>

            <div className="mt-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="text-[13px] font-semibold text-slate-800">
                  Recruitment Pipeline
                </div>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-emerald-700 bg-emerald-50 ring-1 ring-emerald-200">
                  Actief
                </span>
              </div>
              <div className="mt-2 h-1.5 w-full rounded-full bg-slate-100">
                <div className="h-1.5 rounded-full bg-emerald-500" style={{ width: "68%" }} />
              </div>
              <div className="mt-2 text-[12px] text-slate-600">
                12 sollicitaties → 1 aanbieding pending
              </div>
              <button className="mt-2 text-sm font-medium text-indigo-600 inline-flex items-center gap-1 hover:underline">
                Open pipeline →
              </button>
            </div>

            <div className="mt-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="text-[13px] font-semibold text-slate-800">
                  Performance Reviews
                </div>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-amber-700 bg-amber-50 ring-1 ring-amber-200">
                  Planning
                </span>
              </div>
              <div className="mt-2 h-1.5 w-full rounded-full bg-slate-100">
                <div className="h-1.5 rounded-full bg-orange-500" style={{ width: "55%" }} />
              </div>
              <div className="mt-2 text-[12px] text-slate-600">
                28/45 voltooid – op schema
              </div>
              <button className="mt-2 text-sm font-medium text-orange-600 inline-flex items-center gap-1 hover:underline">
                Bekijk voortgang →
              </button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
