import React, { useMemo, useState } from "react";

export default function NotificationSidebar() {

  const seedAlerts = useMemo(
    () => [
      {
        id: "a1",
        title: "lorem ipsum!",
        description:
          "lorem ipsum.",
        source: "HR",
        severity: "high", 
        tag: "nieuw", 
        timeAgo: "9m",
        actions: [
          { key: "start", label: "Start" },
          { key: "snooze", label: "Snooze" },
        ],
      },
      {
        id: "a2",
        title: "lorem ipsum",
        description:
          "lorem ipsum",
        source: "Agent Store",
        severity: "medium",
        tag: "nieuw",
        timeAgo: "1u",
        actions: [
          { key: "open", label: "Open" },
          { key: "later", label: "Later" },
        ],
      },
      {
        id: "a3",
        title: "lorem ipsum",
        description:
          "lorem ipsum",
        source: "HR Pipeline",
        severity: "low",
        tag: "alles",
        timeAgo: "2u",
        actions: [
          { key: "bekijk", label: "Bekijk resultaten" },
          { key: "archive", label: "Archiveren" },
        ],
      },
      {
        id: "a4",
        title: "lorem ipsum",
        description: "lorem ipsum",
        source: "Recruitment",
        severity: "medium",
        tag: "alles",
        timeAgo: "vandaag",
        actions: [{ key: "details", label: "Open pipeline" }],
      },
      {
        id: "a5",
        title: "lorem ipsum",
        description: "lorem ipsum",
        source: "KPI Monitor",
        severity: "high",
        tag: "urgent",
        timeAgo: "vandaag",
        actions: [{ key: "progress", label: "Bekijk voortgang" }],
      },
    ],
    []
  );

  const [alerts, setAlerts] = useState(
    seedAlerts.map((a) => ({ ...a, read: false }))
  );
  const [tab, setTab] = useState("nieuw"); 

  const counts = useMemo(() => {
    const nieuw = alerts.filter((a) => a.tag === "nieuw").length;
    const urgent = alerts.filter((a) => a.severity === "high").length;
    const alles = alerts.length;
    const unread = alerts.filter((a) => !a.read).length;
    return { nieuw, urgent, alles, unread };
  }, [alerts]);

  const visible = useMemo(() => {
    if (tab === "nieuw") return alerts.filter((a) => a.tag === "nieuw");
    if (tab === "urgent") return alerts.filter((a) => a.severity === "high");
    return alerts;
  }, [alerts, tab]);

  const colorBySeverity = (sev) =>
    ({ high: "bg-red-500", medium: "bg-amber-500", low: "bg-emerald-500" })[
      sev
    ] || "bg-slate-400";

  const pillBySeverity = (sev) =>
    ({
      high: "text-red-700 bg-red-50 ring-red-200",
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

  const onAction = (id, key) => {
    if (key === "archive") {
      setAlerts((s) => s.filter((a) => a.id !== id));
    } else if (key === "snooze") {
      // Move to end & mark read
      setAlerts((s) => {
        const found = s.find((x) => x.id === id);
        if (!found) return s;
        const rest = s.filter((x) => x.id !== id);
        return [...rest, { ...found, read: true }];
      });
    } else {
      // Mark read for any other action
      setAlerts((s) => s.map((a) => (a.id === id ? { ...a, read: true } : a)));
    }
  };

  return (
    <aside className="w-full md:w-[360px] xl:w-[380px] border-l border-slate-200 bg-white/60 backdrop-blur supports-[backdrop-filter]:bg-white/70 sticky top-0 h-screen flex flex-col">
      {/* Header */}
      <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative">
            {/* Bell icon */}
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
                  ? "bg-slate-900 text-white border-slate-900"
                  : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
              }`}
            >
              <span>{t.label}</span>
              <span className={`text-[11px] px-1.5 rounded-full ${
                tab === t.key ? "bg-white/20" : "bg-slate-100"
              }`}>{t.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="p-3 overflow-y-auto">
        <ul className="space-y-3">
          {visible.length === 0 && (
            <li className="text-sm text-slate-500 border border-dashed border-slate-200 rounded-lg p-6 text-center">
              Geen meldingen voor deze filter.
            </li>
          )}

          {visible.map((a) => (
            <li key={a.id} className={`rounded-2xl border p-3 bg-white shadow-sm/10 ${a.read ? "opacity-80" : ""} border-slate-200`}>              
              <div className="flex items-start gap-3">
                <span className={`mt-1 w-2 h-2 rounded-full ${colorBySeverity(a.severity)}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center gap-1 text-xs font-medium ring-1 ring-inset px-2 py-0.5 rounded-full ${pillBySeverity(a.severity)}`}>
                      {icon(a.severity)}
                      {a.severity === "high" ? "Urgent" : a.severity === "medium" ? "Let op" : "Info"}
                    </span>
                    <span className="text-[11px] text-slate-500">{a.timeAgo} geleden</span>
                  </div>
                  <h3 className="mt-1 text-sm font-semibold text-slate-900 truncate">{a.title}</h3>
                  {a.description && (
                    <p className="mt-1 text-sm text-slate-600 leading-snug">{a.description}</p>
                  )}
                  <div className="mt-2 flex items-center gap-2">
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
      </div>
    </aside>
  );
}
