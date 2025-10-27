import React from "react";
import LegalLinks from "../features/login/components/ui/LegalLinks";

export default function PrivacyPolicy() {
  const lastUpdated = "27 Oktober 2025"; 

  return (
    <>
      <main className="min-h-screen w-full bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <article className="bg-gray-50 p-8 rounded-2xl shadow-sm">
            <h1 className="text-3xl font-semibold mb-4 text-center">Vangarde Privacybeleid</h1>

            <p className="mb-4 text-gray-600 text-center">
              Dit is de basisversie van het privacybeleid. Vervang placeholdertekst door jullie
              daadwerkelijke beleidstekst.
            </p>

            <div className="border-t border-gray-200 pt-4 mt-6">
            </div>

            <section className="mb-6">
              <h2 className="text-xl font-medium mb-2">1. Doel en reikwijdte</h2>
              <p className="text-gray-700">Kort beschrijven waarom en voor wie dit beleid geldt.</p>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-medium mb-2">2. Welke persoonsgegevens we verzamelen</h2>
              <ul className="list-disc ml-5 text-gray-700">
                <li>Contactgegevens (naam, e-mail)</li>
                <li>Gebruiksgegevens en logs</li>
                <li>Eventuele metadata of documenten</li>
              </ul>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-medium mb-2">3. Hoe we gegevens gebruiken</h2>
              <p className="text-gray-700">Doelbinding, rechtsgrond en verwerkingsdoeleinden.</p>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-medium mb-2">4. Dataopslag & beveiliging</h2>
              <p className="text-gray-700">Waar worden gegevens opgeslagen en welke maatregelen gelden.</p>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-medium mb-2">5. Rechten van betrokkenen</h2>
              <p className="text-gray-700">Toegang, correctie, verwijdering, bezwaar en dataportabiliteit.</p>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-medium mb-2">6. Delen met derden</h2>
              <p className="text-gray-700">Wanneer en waarom we data delen (verwerkers, subverwerkers).</p>
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
