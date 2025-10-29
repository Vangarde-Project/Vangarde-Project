import React from "react";
import LegalLinks from "../features/login/components/ui/LegalLinks";

export default function TermsOfService() {
  const lastUpdated = "27 Oktober 2025";

  return (
    <>
      <main className="min-h-screen w-full bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <article className="bg-gray-50 p-8 rounded-2xl shadow-sm">
            <h1 className="text-3xl font-semibold mb-4 text-center">Vangarde Gebruiksvoorwaarden</h1>

            <p className="mb-4 text-gray-600 text-center">
              Basisversie van de gebruiksvoorwaarden. Pas aan naar jullie juridische tekst.
            </p>

            <div className="border-t border-gray-200 pt-4 mt-6">
            </div>

            <section className="mb-6">
              <h2 className="text-xl font-medium mb-2">1. Acceptatie van voorwaarden</h2>
              <p className="text-gray-700">Wanneer gelden de voorwaarden en voor wie?</p>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-medium mb-2">2. Account & toegangsregels</h2>
              <p className="text-gray-700">Verantwoordelijkheden van gebruikers en beveiliging van accounts.</p>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-medium mb-2">3. Toegestane en verboden gebruik</h2>
              <p className="text-gray-700">Wat mag wel en niet met het platform gedaan worden.</p>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-medium mb-2">4. Aansprakelijkheid & vrijwaring</h2>
              <p className="text-gray-700">Beperkingen van aansprakelijkheid en garanties.</p>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-medium mb-2">5. Wijzigingen in de voorwaarden</h2>
              <p className="text-gray-700">Hoe en wanneer passen we voorwaarden aan en communiceren we dat.</p>
            </section>

             <div className="border-t border-gray-200 pt-4 mt-6">
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-sm text-gray-600 space-y-2 sm:space-y-0">
             <span>Laatst geüpdatet: {lastUpdated}</span>
              <div className="inline-flex  sm:justify-end items-center space-x-4">
              <LegalLinks />
              </div>
            </div>
          </article>
        </div>
      </main>
    </>
  );
}
