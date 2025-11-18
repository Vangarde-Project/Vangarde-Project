import React, { useMemo, useState } from "react";

/**
 * NotificationSidebar
 * - variant: "inline" | "overlay"  (default: "inline")
 * - open: boolean (alleen voor overlay)
 * - onClose: function (alleen voor overlay backdrop/close)
 */
export default function NotificationSidebar({
  variant = "inline",
  open = false,
  onClose,
}) {
  // Seed met echte meldingen
  const seed = useMemo(
    () => [
      {
        id: "deadline-q4",
        title: "Deadline naderend!",
        description:
          "Salarisverhoging evaluatie moet vandaag om 17:00 klaar zijn.",
        severity: "high", // high | medium | low
        tag: "nieuw",
        time: "Nog 4u 23min",
        actions: [
          { key: "start", label: "Start analyse", style: "primary-rose" },
          { key: "snooze", label: "Snooze", style: "ghost" },
        ],
      },
      {
        id: "agent-update",
        title: "Agent update beschikbaar",
        description:
          "HR Specialist heeft nieuwe functionaliteiten voor beleid analyse.",
        extra: "Nieuwe features: Contract AI, Policy Generator",
        severity: "medium",
        tag: "nieuw",
        time: "1u geleden",
        actions: [
          { key: "open", label: "Open agent", style: "primary-indigo" },
          { key: "later", label: "Later", style: "ghost" },
        ],
      },
      {
        id: "task-done",
        title: "Taak voltooid ✅",
        description:
          "Werknemerstevredenheid enquête is succesvol afgerond.",
        extra: "87% response rate – excellent!",
        severity: "low",
        tag: "alles",
        time: "Zojuist",
        actions: [
          { key: "view", label: "Bekijk resultaten", style: "primary-emerald" },
          { key: "archive", label: "Archiveren", style: "ghost" },
        ],
      },
    ],
    []
  );

  const [items, setItems] = useState(seed.map((m) => ({ ...m, read: false })));
  const [tab, setTab] = useState("nieuw"); // nieuw | urgent | alles

  const counts = useMemo(() => {
    const nieuw = items.filter((i) => i.tag === "nieuw").length;
    const urgent = items.filter((i) => i.severity === "high").length;
    const alles = items.length;
    const unread = items.filter((i) => !i.read).length;
    return { nieuw, urgent, alles, unread };
  }, [items]);

  const visible = useMemo(() => {
    if (tab === "nieuw") return items.filter((i) => i.tag === "nieuw");
    if (tab === "urgent") return items.filter((i) => i.severity === "high");
    return items;
  }, [items, tab]);

  // Helpers
  const dotBySeverity = {
    high: "bg-rose-500",
    medium: "bg-amber-500",
    low: "bg-emerald-500",
  };

  const pillBySeverity = {
    high: "text-rose-700 bg-rose-50 ring-rose-200",
    medium: "text-amber-700 bg-amber-50 ring-amber-200",
    low: "text-emerald-700 bg-emerald-50 ring-emerald-200",
  };

  // 👉 Hover-/border-tones per severity
  const cardTone = {
    high:   { border: "border-rose-200",    hover: "hover:bg-rose-50 hover:border-rose-300" },
    medium: { border: "border-amber-200",   hover: "hover:bg-amber-50 hover:border-amber-300" },
    low:    { border: "border-emerald-200", hover: "hover:bg-emerald-50 hover:border-emerald-300" },
  };
  const neutralTone = { border: "border-slate-200", hover: "hover:bg-slate-50 hover:border-slate-300" };

  const PillIcon = ({ sev }) => {
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
      setItems((s) => s.filter((x) => x.id !== id));
    } else if (key === "snooze") {
      setItems((s) => {
        const found = s.find((x) => x.id === id);
        if (!found) return s;
        const rest = s.filter((x) => x.id !== id);
        return [...rest, { ...found, read: true }];
      });
    } else {
      setItems((s) => s.map((x) => (x.id === id ? { ...x, read: true } : x)));
    }
  };

  // Layout classes (inline vs overlay)
  const asideBase =
    "flex flex-col h-screen bg-white border-l supports-[backdrop-filter]:bg-white/70";
  const asideWidth = "w-full md:w-[360px] xl:w-[380px]";
  const inlineClasses = `sticky top-0 ${asideWidth} ${asideBase}`;
  const overlayClasses = `
    fixed top-0 right-0 ${asideWidth} ${asideBase}
    shadow-2xl transform transition-transform duration-200
    ${open ? "translate-x-0" : "translate-x-full"}
  `;

  return (
    <>
      {/* Backdrop voor overlay */}
      {variant === "overlay" && (
        <div
          aria-hidden
          onClick={onClose}
          className={`fixed inset-0 bg-black/30 transition-opacity ${
            open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        />
      )}

      <aside className={variant === "overlay" ? overlayClasses : inlineClasses}>
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

          {variant === "overlay" && (
            <button
              onClick={onClose}
              className="p-1 rounded hover:bg-slate-100"
              aria-label="Sluiten"
            >
              <svg className="w-4 h-4 text-slate-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
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
                className={`h-8 rounded-full text-sm border transition px-2.5 flex items-center justify-center gap-1.5 ${
                  tab === t.key
                    ? "bg-gradient-to-r from-[#2F6BFF] to-[#7A21FF] text-white border-transparent"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                }`}
              >
                <span>{t.label}</span>
                <span className={`text-[11px] px-1.5 rounded-full ${tab === t.key ? "bg-white/20" : "bg-slate-100"}`}>
                  {t.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Lijst */}
        <div className="p-3 overflow-y-auto">
          <ul className="space-y-3">
            {visible.length === 0 && (
              <li className="text-sm text-slate-500 border border-dashed border-slate-200 rounded-lg p-6 text-center">
                Geen meldingen voor deze filter.
              </li>
            )}

            {visible.map((a) => {
              const tone = cardTone[a.severity] ?? neutralTone;
              return (
                <li
                  key={a.id}
                  className={[
                    "rounded-2xl border p-4 bg-white shadow-sm",
                    "transition-colors duration-150 cursor-pointer",
                    tone.border, tone.hover,
                    a.read ? "opacity-75" : "",
                  ].join(" ")}
                >
                  <div className="flex items-start gap-3">
                    <span className={`mt-1 w-2 h-2 rounded-full ${dotBySeverity[a.severity]}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-flex items-center gap-1 text-xs font-medium ring-1 ring-inset px-2 py-0.5 rounded-full ${pillBySeverity[a.severity]}`}
                        >
                          <PillIcon sev={a.severity} />
                          {a.severity === "high" ? "Urgent" : a.severity === "medium" ? "Update" : "Klaar"}
                        </span>
                        <span className="text-[11px] text-slate-500">{a.time}</span>
                      </div>

                      <h3 className="mt-1 text-sm font-semibold text-slate-900">{a.title}</h3>
                      {a.description && (
                        <p className="mt-1 text-sm text-slate-700 leading-snug">{a.description}</p>
                      )}
                      {a.extra && (
                        <div className="mt-1 text-[11px] text-slate-600">{a.extra}</div>
                      )}

                      <div className="mt-3 flex items-center gap-2 flex-wrap">
                        {a.actions?.map((act) => (
                          <button
                            key={act.key}
                            onClick={() => onAction(a.id, act.key)}
                            className={
                              act.style === "primary-rose"
                                ? "h-9 rounded-full text-sm px-4 bg-rose-600 text-white shadow-sm hover:bg-rose-600/90"
                                : act.style === "primary-indigo"
                                ? "h-9 rounded-full text-sm px-4 bg-indigo-600 text-white shadow-sm hover:bg-indigo-600/90"
                                : act.style === "primary-emerald"
                                ? "h-9 rounded-full text-sm px-4 bg-emerald-600 text-white shadow-sm hover:bg-emerald-600/90"
                                : "h-9 rounded-full text-sm px-4 bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50"
                            }
                          >
                            {act.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          {/* Actieve processen */}
          <div className="mt-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <h4 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                🔄 Actieve Processen
              </h4>

              {/* Recruitment → groen hover */}
              <div
                className={[
                  "mt-3 rounded-xl border bg-white p-3 shadow-sm",
                  "transition-colors duration-150 cursor-pointer",
                  cardTone.low.border, cardTone.low.hover,
                ].join(" ")}
              >
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

              {/* Performance → amber hover */}
              <div
                className={[
                  "mt-3 rounded-xl border bg-white p-3 shadow-sm",
                  "transition-colors duration-150 cursor-pointer",
                  cardTone.medium.border, cardTone.medium.hover,
                ].join(" ")}
              >
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
    </>
  );
}
