import React from "react";
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";

// TasksPage.tsx
export default function TasksPage() {
  return (
    <div className="p-10">
      {/* Titel */}
      <h1 className="text-2xl font-semibold">Taken & Acties</h1>
      <p className="text-gray-500 mt-1">
        Een overzicht van acties verzameld uit Jira, CRM en je Agents.
      </p>

        <Header />
        <Sidebar />

      {/* Tabel */}
      <div className="mt-6 border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="p-4">Status</th>
              <th className="p-4">Taak & Context</th>
              <th className="p-4">Prioriteit</th>
              <th className="p-4">Bron</th>
              <th className="p-4">Deadline</th>
              <th className="p-4"></th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {/* --- 1 --- */}
            <tr>
              <td className="p-4">
                <span className="flex items-center gap-2">
                  <input type="checkbox" />
                  To Do
                </span>
              </td>
              <td className="p-4">
                <div className="font-medium">Salarisverhoging evaluatie Q4</div>
                <div className="text-gray-500">
                  Analyseer performance data en stel verhogingspercentages voor.
                </div>
              </td>
              <td className="p-4">
                <span className="px-2 py-1 text-xs bg-red-100 text-red-600 rounded">
                  Urgent
                </span>
              </td>
              <td className="p-4">System</td>
              <td className="p-4">Vandaag 17:00</td>
              <td className="p-4">
                <button className="px-3 py-1 bg-indigo-600 text-white rounded">
                  Start
                </button>
              </td>
            </tr>

            {/* --- 2 --- */}
            <tr>
              <td className="p-4">
                <span className="flex items-center gap-2">
                  <input type="checkbox" />
                  To Do
                </span>
              </td>
              <td className="p-4">
                <div className="font-medium">Crisis: Datalek Melding</div>
                <div className="text-gray-500">
                  Er is een melding van een mogelijk datalek in het recruitment-systeem.
                </div>
              </td>
              <td className="p-4">
                <span className="px-2 py-1 text-xs bg-red-100 text-red-600 rounded">
                  Urgent
                </span>
              </td>
              <td className="p-4">Security</td>
              <td className="p-4">Z.S.M.</td>
              <td className="p-4">
                <button className="px-3 py-1 bg-indigo-600 text-white rounded">
                  Start
                </button>
              </td>
            </tr>

            {/* --- 3 --- */}
            <tr>
              <td className="p-4">
                <span className="flex items-center gap-2">
                  <span className="block h-2 w-2 bg-green-500 rounded-full"></span>
                  Done
                </span>
              </td>
              <td className="p-4">
                <div className="font-medium">Onboarding programma update</div>
                <div className="text-gray-500">
                  Herzien van het huidige onboarding proces en implementatieplan.
                </div>
              </td>
              <td className="p-4">
                <span className="px-2 py-1 text-xs bg-orange-100 text-orange-600 rounded">
                  Important
                </span>
              </td>
              <td className="p-4">Jira</td>
              <td className="p-4">Morgen 12:00</td>
              <td className="p-4">
                <button className="px-3 py-1 bg-indigo-600 text-white rounded">
                  Start
                </button>
              </td>
            </tr>

            {/* --- 4 --- */}
            <tr>
              <td className="p-4">
                <span className="flex items-center gap-2">
                  <input type="checkbox" />
                  To Do
                </span>
              </td>
              <td className="p-4">
                <div className="font-medium">Maandelijkse HR rapport generatie</div>
                <div className="text-gray-500">
                  Compileer en analyseer HR KPI's voor management dashboard.
                </div>
              </td>
              <td className="p-4">
                <span className="px-2 py-1 text-xs bg-green-100 text-green-600 rounded">
                  Normal
                </span>
              </td>
              <td className="p-4">System</td>
              <td className="p-4">Volgende week</td>
              <td className="p-4">
                <button className="px-3 py-1 bg-indigo-600 text-white rounded">
                  Start
                </button>
              </td>
            </tr>

            {/* --- 5 --- */}
            <tr>
              <td className="p-4">
                <span className="flex items-center gap-2">
                  <span className="animate-spin h-3 w-3 border-2 border-blue-500 border-t-transparent rounded-full"></span>
                  In Progress
                </span>
              </td>
              <td className="p-4">
                <div className="font-medium">Contracten review Q1 2025</div>
                <div className="text-gray-500">
                  Analyseer 47 tijdelijke contracten voor verlenging.
                </div>
              </td>
              <td className="p-4">
                <span className="px-2 py-1 text-xs bg-green-100 text-green-600 rounded">
                  Normal
                </span>
              </td>
              <td className="p-4">Agent</td>
              <td className="p-4">In 2 dagen</td>
              <td className="p-4">
                <button className="px-3 py-1 bg-indigo-600 text-white rounded">
                  Start
                </button>
              </td>
            </tr>

            {/* --- 6 --- */}
            <tr>
              <td className="p-4">
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 bg-gray-400 rounded-full"></span>
                  Waiting
                </span>
              </td>
              <td className="p-4">
                <div className="font-medium">Goedkeuring Budget Training</div>
                <div className="text-gray-500">
                  Budgetaanvraag marketingteam voor AI-training.
                </div>
              </td>
              <td className="p-4">
                <span className="px-2 py-1 text-xs bg-red-100 text-red-600 rounded">
                  Urgent
                </span>
              </td>
              <td className="p-4">Email</td>
              <td className="p-4">Vandaag 14:00</td>
              <td className="p-4">
                <button className="px-3 py-1 bg-indigo-600 text-white rounded">
                  Start
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}