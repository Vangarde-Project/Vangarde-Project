import React from "react";
import LegalLinks from "../features/login/components/ui/LegalLinks";

export default function TermsOfService() {
  const lastUpdated = "27 Oktober 2025";

  return (
    <>
      <main className="min-h-screen w-full bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <article className="bg-gray-50 p-8 rounded-2xl shadow-sm">
            <h1 className="text-3xl font-semibold mb-4 text-center">Privacybeleid – Vangarde Intelligence Platform</h1>

            <p className="mb-4 text-gray-600 text-center">
              <ul>
                <li>
                  <p>Versie: 1.0</p>
                </li>
                <li>
                  <p>Datum: [invullen]</p>
                </li>
                <li>
                  <p>Verantwoordelijke entiteit: Vangarde B.V.</p>
                </li>
                <li>
                  <p>📍 [adres invullen]</p>
                </li>
                <li>
                  <p>📧 privacy@vangarde.ai</p>
                </li>
              </ul>
            </p>

            <div className="border-t border-gray-200 pt-4 mt-6">
            </div>

            <section className="mb-6">
              <h2 className="text-xl font-medium mb-2">1. Inleiding</h2>
              <p className="text-gray-700">Vangarde B.V. (“Vangarde”, “wij”, “ons”) hecht grote waarde aan de bescherming van uw privacy. Dit privacybeleid legt uit hoe wij persoonsgegevens verwerken binnen het Vangarde Intelligence Platform, welke keuzes u heeft en welke maatregelen wij nemen om uw gegevens te beschermen.
                <br></br>
                Wij verwerken persoonsgegevens uitsluitend in overeenstemming met de Algemene Verordening Gegevensbescherming (AVG), de Uitvoeringswet AVG, de NIS2-richtlijn en de relevante bepalingen van de EU AI Act.
                <br></br>
                Door gebruik te maken van onze diensten of door u te registreren op onze website, gaat u akkoord met dit privacybeleid.</p>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-medium mb-2">2. Verwerkingsverantwoordelijke en contact</h2>
              <p className="text-gray-700">De verwerkingsverantwoordelijke voor de verwerking van persoonsgegevens is:</p>
              <ul>
                <li>
                  <p>Vangarde B.V.</p>
                </li>
                <li>
                  <p>📍 [adres invullen]</p>
                </li>
                <li>
                  <p>📧 privacy@vangarde.ai</p>
                </li>
              </ul>
              <p className="text-gray-700">  Wanneer Vangarde haar platform aanbiedt aan organisaties in SaaS-vorm, geldt dat de klant optreedt als verwerkingsverantwoordelijke en Vangarde als verwerker in de zin van artikel 28 AVG. In dat geval wordt een afzonderlijke verwerkersovereenkomst gesloten.</p>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-medium mb-2">3. Categorieën van persoonsgegevens</h2>
              <p className="text-gray-700">Afhankelijk van het gebruik van onze diensten verwerken wij de volgende categorieën persoonsgegevens:
                <br></br>
                Gebruikersgegevens
                Naam, e-mailadres, functieprofiel en organisatie.
                Doel: authenticatie, accountbeheer en toegangscontrole.
                <br></br>
                Account- en systeemgegevens
                IP-adres, inlogmomenten, browser- of apparaatgegevens.
                Doel: beveiliging, foutanalyse en logging.
                <br></br>
                Interactiegegevens
                Prompts, berichten en metadata van interacties met AI-assistenten.
                Doel: functionele dienstverlening en contextuele ondersteuning.
                <br></br>
                Bedrijfscontext
                Procesinformatie, projectmetadata en rolbeschrijvingen.
                Doel: personalisatie binnen bedrijfsprocessen.
                <br></br>
                Functioneringsdata (niet-inhoudelijk)
                Statistische en technische informatie over modelprestaties, zoals foutpatronen, tokenstromen en responslogica.
                Doel: verbetering van AI-modellen en systeemoptimalisatie.
                Deze gegevens bevatten geen persoonsgegevens of bedrijfsinhoud.</p>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-medium mb-2">4. Doeleinden van verwerking</h2>
              <p className="text-gray-700">Wij verwerken persoonsgegevens uitsluitend voor de volgende doeleinden:</p>
              <ul>
                <li>
                  <p>1. Het aanbieden, onderhouden en beveiligen van het Vangarde-platform.</p>
                </li>
                <li>
                  <p>2. Het beheren van gebruikersaccounts en toegangsrechten.</p>
                </li>
                <li>
                  <p>3. Het analyseren en verbeteren van de prestaties van het platform en de onderliggende modellen.</p>
                </li>
                <li>
                  <p>4. Het uitvoeren van wettelijke verplichtingen en nalevingscontroles.</p>
                </li>
                <li>
                  <p>5. Het informeren van gebruikers over technische of veiligheidsgerelateerde zaken.</p>
                </li>
              </ul>
              <p className="text-gray-700"> Wij gebruiken geen persoonsgegevens voor commerciële profilering, marketing of geautomatiseerde besluitvorming zonder menselijke tussenkomst.</p>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-medium mb-2">5. Rechtsgrond voor verwerking</h2>
              <p className="text-gray-700">De verwerking van persoonsgegevens door Vangarde vindt plaats op basis van:</p>
              <ul>
                <li>
                  <p>Uitvoering van de overeenkomst – voor levering van onze diensten en beheer van accounts.</p>
                </li>
                <li>
                  <p>Wettelijke verplichting – voor audit- en beveiligingsdoeleinden.</p>
                </li>
                <li>
                  <p>Gerechtvaardigd belang – voor systeemoptimalisatie, foutdetectie en beveiligingsverbeteringen.</p>
                </li>
                <li>
                  <p>Toestemming – wanneer specifieke aanvullende functionaliteiten dit vereisen.</p>
                </li>
              </ul>
              <p className="text-gray-700">Bij verwerking op grond van een gerechtvaardigd belang voert Vangarde altijd een belangenafweging uit tussen bedrijfsbelang en privacybelang van betrokkenen.</p>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-medium mb-2">6. Bedrijfsdata en data-soevereiniteit</h2>
              <p className="text-gray-700">Alle inhoudelijke bedrijfsdata die via het Vangarde-platform worden verwerkt, blijven volledig eigendom van de klant.
                Deze data worden opgeslagen en verwerkt binnen de infrastructuur die de klant beheert, on-premise of in een private cloud binnen de Europese Economische Ruimte (EER).
                <br></br>
                Vangarde heeft geen toegang tot bedrijfsinhoud, tenzij dit strikt noodzakelijk is voor technische ondersteuning en alleen op expliciet verzoek van de klant.</p>
            </section>

            <section className="mb-6">
              <h3 className="text-xl font-medium mb-2">7. Functioneringsdata en modeloptimalisatie</h3>
              <p className="text-gray-700">Vangarde verzamelt uitsluitend niet-inhoudelijke functioneringsdata om haar AI-systemen te verbeteren.
                Deze gegevens beschrijven hoe modellen functioneren, niet wát zij verwerken.
                Alle functioneringsdata worden vooraf geanonimiseerd en bevatten geen persoonsgegevens of bedrijfsinformatie.
                <br></br>
                De verwerking van deze data vindt plaats op basis van het gerechtvaardigd belang van Vangarde overeenkomstig artikel 6 lid 1 sub f AVG, met toepassing van passende technische en organisatorische beveiligingsmaatregelen.</p>
            </section>

            <section className="mb-6">
              <h3 className="text-xl font-medium mb-2">8. Intellectueel eigendom</h3>
              <p className="text-gray-700">Alle algoritmen, AI-modellen, architecturen, gewichten, trainingsprocedures en afgeleide inzichten blijven het exclusieve intellectuele eigendom van Vangarde B.V.
                <br></br>
                Gebruikers behouden het eigendom van hun eigen bedrijfsgegevens en ingevoerde content.
                Door gebruik te maken van het platform verleent de gebruiker aan Vangarde een niet-exclusieve, wereldwijde licentie om geanonimiseerde interactie- en functioneringsdata te gebruiken voor onderhoud, beveiliging en prestatieverbetering van het platform.
                Er worden geen inhoudelijke klantgegevens gebruikt voor modeltraining.</p>
            </section>

            <section className="mb-6">
              <h3 className="text-xl font-medium mb-2">9. Beveiliging van gegevens</h3>
              <p className="text-gray-700">Vangarde past een Zero Trust-beveiligingsarchitectuur toe met maatregelen op enterprise-niveau, waaronder:</p>
              <ul>
                <li>
                  <p>End-to-end encryptie (TLS 1.3 en AES-256).</p>
                </li>
                <li>
                  <p>Multi-factor authenticatie (MFA) en rolgebaseerde toegang (RBAC).</p>
                </li>
                <li>
                  <p>Beveiligde opslag in containers (Kubernetes, HashiCorp Vault).</p>
                </li>
                <li>
                  <p>Onwijzigbare logging via blockchain (Hyperledger Fabric).</p>
                </li>
                <li>
                  <p>Continue monitoring via Prometheus en Grafana.</p>
                </li>
                <li>
                  <p>Jaarlijkse penetratietests en interne audits volgens ISO 27001 en NIS2.</p>
                </li>
              </ul>
              <p classname="text-gray-700">Alle toegang tot persoonsgegevens is strikt beperkt tot geautoriseerde medewerkers onder geheimhoudingsplicht.</p>
            </section>

            <section className="mb-6">
              <h3 className="text-xl font-medium mb-2">10. Bewaartermijnen</h3>
              <p className="text-gray-700">Vangarde bewaart persoonsgegevens niet langer dan noodzakelijk voor het doel waarvoor ze zijn verzameld.
              <br></br>
                Type gegevens Bewaartermijn Toelichting Operationele logs maximaal 90 dagen tenzij langere wettelijke verplichting geldt Gebruikersdata zolang het account actief is of wettelijk vereist Functioneringsdata onbepaalde tijd in geanonimiseerde vorm uitsluitend voor systeemoptimalisatie Ondersteuningsverzoeken maximaal 1 jaar voor kwaliteitsborging
                <br></br>
                Na afloop van de bewaartermijn worden gegevens verwijderd of onomkeerbaar geanonimiseerd.</p>
            </section>

            <section className="mb-6">
              <h3 className="text-xl font-medium mb-2">11. Delen van gegevens</h3>
              <p className="text-gray-700">Vangarde verkoopt geen persoonsgegevens aan derden.
                <br></br>
                Gegevens worden uitsluitend gedeeld:</p>
                <ul>
                  <li>
                    <p>Met zorgvuldig geselecteerde subverwerkers voor hosting, beveiliging of onderhoud, onder strikte verwerkersovereenkomsten.</p>
                  </li>
                   <li>
                    <p>Met bevoegde autoriteiten indien dit wettelijk verplicht is.</p>
                  </li>
                   <li>
                    <p>Met de klant zelf, binnen de overeengekomen beheeromgeving.</p>
                  </li>
                </ul>
                <p className="text-gray-700"> Alle gegevensverwerking vindt plaats binnen de EU/EER of onder de voorwaarden van de Europese Standard Contractual Clauses (2021/914/EU).</p>
            </section>

            <section className="mb-6">
              <h3 className="text-xl font-medium mb-2">12. Rechten van betrokkenen</h3>
              <p className="text-gray-700">Gebruikers hebben de volgende rechten onder de AVG:</p>
              <ul>
                <li>
                  <p>Recht op inzage in de verwerkte gegevens.</p>
                </li>
                <li>
                  <p>Recht op correctie of verwijdering.</p>
                </li>
                <li>
                  <p>Recht op beperking van verwerking.</p>
                </li>
                <li>
                  <p>Recht op overdraagbaarheid van gegevens.</p>
                </li>
                <li>
                  <p>Recht op bezwaar tegen verwerking.</p>
                </li>
                <li>
                  <p>Recht op menselijke tussenkomst bij geautomatiseerde besluitvorming.</p>
                </li>
                </ul>
                <p className="text-gray-700">
                Verzoeken kunnen worden ingediend via privacy@vangarde.ai.
                <br></br>
                Vangarde behandelt elk verzoek binnen 30 dagen. Bij geschillen kunt u een klacht indienen bij de Autoriteit Persoonsgegevens via www.autoriteitpersoonsgegevens.nl.</p>
            </section>

            <section className="mb-6">
              <h3 className="text-xl font-medium mb-2">13. Internationale doorgifte</h3>
              <p className="text-gray-700">Alle persoonsgegevens worden standaard verwerkt binnen de Europese Economische Ruimte (EER).
                Indien doorgifte naar derde landen noodzakelijk is, past Vangarde uitsluitend landen toe met een door de Europese Commissie vastgesteld adequaatheidsbesluit, of gebruikt zij de Standard Contractual Clauses (SCC 2021/914/EU) met aanvullende beveiligingsmaatregelen.</p>
            </section>

            <section className="mb-6">
              <h3 className="text-xl font-medium mb-2">14. Wijzigingen in dit beleid</h3>
              <p className="text-gray-700">Vangarde behoudt zich het recht voor om dit privacybeleid te actualiseren in geval van wijzigingen in wetgeving, technologie of dienstverlening.
                De meest recente versie is altijd beschikbaar via www.vangarde.ai/privacy.
                Wij adviseren gebruikers om dit beleid regelmatig te raadplegen.</p>
            </section>

            <section className="mb-6">
              <h3 className="text-xl font-medium mb-2"></h3>
              <p className="text-gray-700">Voor vragen, verzoeken of klachten over dit privacybeleid kunt u contact opnemen met onze Data Protection Officer (DPO):

                E-mail: privacy@vangarde.ai
                Adres: [bedrijfsadres invullen]
                Reactietermijn: maximaal 30 dagen</p>
            </section>

            <section className="mb-6">
              <h3 className="text-xl font-medium mb-2">Bijlage A – Technische en organisatorische beveiligingsmaatregelen</h3>
              <p className="text-gray-700">Zero Trust Network Architecture (ZTA).

                End-to-end encryptie (TLS 1.3 / AES-256).

                Multi-factor authenticatie (MFA).

                HashiCorp Vault voor geheime opslag.

                Immutable blockchain-logging (Hyperledger Fabric).

                Volledige on-premise of private cloud implementatie voor enterprise-klanten.

                Continue monitoring (SIEM, Prometheus, Grafana).

                Jaarlijkse onafhankelijke beveiligingsaudits conform ISO 27001 en SOC 2 Type II.

                NIS2-incidentmanagement binnen 24 uur meldingsplicht.

              </p>
            </section>

            <section className="mb-6">
              <h3 className="text-xl font-medium mb-2">Samenvattend:</h3>
              <p className="text-gray-700">Bij Vangarde blijven uw bedrijfsgegevens in uw eigen beheer en infrastructuur.
                Vangarde gebruikt enkel geanonimiseerde functioneringsdata om haar modellen veiliger, nauwkeuriger en betrouwbaarder te maken.
                Wij verbinden technologische innovatie aan juridische integriteit en waarborgen maximale datasoevereiniteit voor onze klanten.</p>
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
