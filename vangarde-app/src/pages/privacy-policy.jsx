import React, { useEffect, useMemo, useState } from "react";
import {
  ShieldCheck, Mail, MapPin, Building2, ListChecks, CheckCircle2, Info, CalendarClock,
  FileText, Lock, Database, Cog, Globe2, RefreshCcw, Gavel
} from "lucide-react";
import { Link } from "react-router-dom";
import LegalLinks from "../features/login/components/ui/LegalLinks";
import { motion } from "framer-motion";

// reusable ui 
const Section = ({ id, title, children }) => (
  <section id={id} className="scroll-mt-24 mb-10">
    <h2 className="text-2xl font-semibold tracking-tight mb-3 flex items-center gap-2">
      <span className="inline-flex h-6 w-1.5 rounded-full bg-gradient-to-b from-indigo-400 to-violet-500" />
      {title}
    </h2>
    <div className="prose prose-slate max-w-none text-slate-700">{children}</div>
  </section>
);

// small purple text component
const Kicker = ({ children }) => (
  <span className="uppercase tracking-widest text-[11px] font-medium text-indigo-600/80">
    {children}
  </span>
);

// styling for pill component
const Pill = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white/60 px-3 py-1.5 shadow-sm">
    {Icon && <Icon className="h-4 w-4 text-indigo-600" />}
    <span className="text-xs text-slate-500">{label}</span>
    <span className="text-xs font-medium text-slate-800">{value}</span>
  </div>
);

// styling for bullet list with icons
const BulletList = ({ items }) => (
  <ul className="not-prose grid gap-2">
    {items.map((content, idx) => (
      <li key={idx} className="group relative flex gap-3 rounded-xl border border-slate-200 bg-white/70 p-3 shadow-sm transition hover:shadow-md">
        <div className="mt-0.5">
          <CheckCircle2 className="h-5 w-5 text-indigo-600 transition group-hover:scale-110" />
        </div>
        <div className="text-sm leading-relaxed text-slate-700">{content}</div>
      </li>
    ))}
  </ul>
);

// sidebar component
const Sidebar = ({ sections, activeId, onJump }) => {
  return (
    <aside className="hidden lg:block">
      <div className="fixed inset-y-0 left-0 z-30 w-72 border-r border-slate-200 bg-white/95 backdrop-blur">
        <div className="h-full overflow-y-auto px-4 py-6">
          <div className="mb-3">
            <Kicker>Document navigatie</Kicker>
            <h3 className="text-lg font-semibold text-slate-900">Privacybeleid</h3>
          </div>
          <nav className="space-y-1">
            {sections.map((s) => {
              const Active = activeId === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => onJump(s.id)}
                  className={[
                    "w-full text-left flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition border",
                    Active
                      ? "bg-gradient-to-r from-indigo-50 to-violet-50 border-indigo-200 text-slate-900"
                      : "bg-white border-transparent text-slate-600 hover:bg-slate-50",
                  ].join(" ")}
                >
                  <s.icon className={["h-4 w-4", Active ? "text-indigo-600" : "text-slate-400"].join(" ")} />
                  <span className="truncate">{s.label}</span>
                </button>
              );
            })}
          </nav>

          {/* small line */}
          <div className="my-4 h-px bg-slate-200" />

          <div className="grid gap-2">
            <Link
              to="/login"
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50"
            >
              Inloggen
            </Link>
            <Link
              to="/signup"
              className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-3 py-2 text-sm font-medium text-white shadow hover:opacity-95"
            >
              Registreren
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
};

// sidebar navigation with active section highlighting
export default function TermsOfService() {
  const lastUpdated = "28 oktober 2025";

  const sections = useMemo(
    () => [
      { id: "inleiding", label: "1. Inleiding", icon: FileText },
      { id: "contact", label: "2. Verwerkingsverantwoordelijke", icon: Mail },
      { id: "categorieen", label: "3. Persoonsgegevens", icon: ListChecks },
      { id: "doeleinden", label: "4. Doeleinden", icon: Cog },
      { id: "rechtsgrond", label: "5. Rechtsgrond", icon: Gavel },
      { id: "soevereiniteit", label: "6. Data-soevereiniteit", icon: Database },
      { id: "functioneringsdata", label: "7. Functioneringsdata", icon: RefreshCcw },
      { id: "ie", label: "8. Intellectueel eigendom", icon: ShieldCheck },
      { id: "beveiliging", label: "9. Beveiliging", icon: Lock },
      { id: "bewaartermijnen", label: "10. Bewaartermijnen", icon: CalendarClock },
      { id: "delen", label: "11. Delen van gegevens", icon: Building2 },
      { id: "rechten", label: "12. Rechten betrokkenen", icon: Info },
      { id: "internationaal", label: "13. Internationale doorgifte", icon: Globe2 },
      { id: "wijzigingen", label: "14. Wijzigingen", icon: CalendarClock },
      { id: "contact-dpo", label: "15. Contact", icon: Mail },
      { id: "bijlage-a", label: "Bijlage", icon: ListChecks },
    ],
    []
  );

  const [activeId, setActiveId] = useState(sections[0].id);
  // styling  
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActiveId(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 1] }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [sections]);

  const jumpTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // main content terms of service
  return (
    <main className="min-h-screen w-full bg-gradient-to-b from-slate-50 via-white to-slate-50 scroll-smooth">
      <Sidebar sections={sections} activeId={activeId} onJump={jumpTo} />
      <div className="lg:ml-72">
        {/* text above main content */}
        <div className="relative isolate">
          <div className="absolute inset-x-0 -top-8 -z-10 h-40 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-200/50 to-transparent blur-2xl" />
          <motion.header
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mx-auto max-w-6xl px-4 pt-10"
          >
            <Kicker>Vangarde Intelligence Platform</Kicker>
            <h1 className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 text-balance">
              Privacybeleid – Vangarde Intelligence Platform
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
              <Pill icon={Info} label="Versie" value="1.0" />
              <Pill icon={CalendarClock} label="Datum" value="28 oktober 2025" />
              <Pill icon={Building2} label="Verantwoordelijke" value="Vangarde B.V." />
              <Pill icon={MapPin} label="Adres" value="[adres invullen]" />
              <Pill icon={Mail} label="Contact" value="privacy@vangarde.ai" />
            </div>
          </motion.header>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 pb-16 pt-8">
        <article className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
          <div className="-mt-8 -mx-6 sm:-mx-8 mb-6 h-2 rounded-t-2xl bg-gradient-to-r from-indigo-500 to-violet-500" />
          <Section id="inleiding" title="1. Inleiding">
            <p>
              Vangarde B.V. (“Vangarde”, “wij”, “ons”) hecht grote waarde aan de bescherming van uw privacy. Dit privacybeleid legt uit hoe wij
              persoonsgegevens verwerken binnen het Vangarde Intelligence Platform, welke keuzes u heeft en welke maatregelen wij nemen om uw gegevens
              te beschermen.
            </p>
            <p>
              Wij verwerken persoonsgegevens uitsluitend in overeenstemming met de Algemene Verordening Gegevensbescherming (AVG), de
              Uitvoeringswet AVG, de NIS2-richtlijn en de relevante bepalingen van de EU AI Act. Door gebruik te maken van onze diensten of door u te
              registreren op onze website, gaat u akkoord met dit privacybeleid.
            </p>
          </Section>
          
          <Section id="contact" title="2. Verwerkingsverantwoordelijke en contact">
            <p>De verwerkingsverantwoordelijke voor de verwerking van persoonsgegevens is:</p>
            <BulletList
              items={[
                <span key="org">Vangarde B.V.</span>,
                <span key="addr">📍 [adres invullen]</span>,
                <span key="mail">📧 privacy@vangarde.ai</span>,
              ]}
            />
            <p className="mt-4">
              Wanneer Vangarde haar platform aanbiedt aan organisaties in SaaS-vorm, geldt dat de klant optreedt als verwerkingsverantwoordelijke en
              Vangarde als verwerker in de zin van artikel 28 AVG. In dat geval wordt een afzonderlijke verwerkersovereenkomst gesloten.
            </p>
          </Section>

          <Section id="categorieen" title="3. Categorieën van persoonsgegevens">
            <p>Afhankelijk van het gebruik van onze diensten verwerken wij de volgende categorieën persoonsgegevens:</p>
            <div className="not-prose grid gap-4">
              {[
                ["Gebruikersgegevens", "Naam, e-mailadres, functieprofiel en organisatie. Doel: authenticatie, accountbeheer en toegangscontrole."],
                ["Account- en systeemgegevens", "IP-adres, inlogmomenten, browser- of apparaatgegevens. Doel: beveiliging, foutanalyse en logging."],
                ["Interactiegegevens", "Prompts, berichten en metadata van interacties met AI-assistenten. Doel: functionele dienstverlening en contextuele ondersteuning."],
                ["Bedrijfscontext", "Procesinformatie, projectmetadata en rolbeschrijvingen. Doel: personalisatie binnen bedrijfsprocessen."],
                ["Functioneringsdata (niet-inhoudelijk)", "Statistische en technische informatie over modelprestaties (zoals foutpatronen, tokenstromen en responslogica) uitsluitend voor systeemoptimalisatie. Deze gegevens bevatten geen persoonsgegevens of bedrijfsinhoud."]
              ].map(([label, body]) => (
                <div key={label} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <h3 className="mb-1 flex items-center gap-2 text-base font-semibold text-slate-900">
                    <ListChecks className="h-5 w-5 text-indigo-600" /> {label}
                  </h3>
                  <p className="text-sm text-slate-700">{body}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section id="doeleinden" title="4. Doeleinden van verwerking">
            <p>Wij verwerken persoonsgegevens uitsluitend voor de volgende doeleinden:</p>
            <BulletList
              items={[
                "Het aanbieden, onderhouden en beveiligen van het Vangarde-platform.",
                "Het beheren van gebruikersaccounts en toegangsrechten.",
                "Het analyseren en verbeteren van de prestaties van het platform en de onderliggende modellen.",
                "Het uitvoeren van wettelijke verplichtingen en nalevingscontroles.",
                "Het informeren van gebruikers over technische of veiligheidsgerelateerde zaken.",
              ]}
            />
            <p className="mt-4">Wij gebruiken geen persoonsgegevens voor commerciële profilering, marketing of geautomatiseerde besluitvorming zonder menselijke tussenkomst.</p>
          </Section>

          <Section id="rechtsgrond" title="5. Rechtsgrond voor verwerking">
            <p>De verwerking van persoonsgegevens door Vangarde vindt plaats op basis van:</p>
            <BulletList
              items={[
                "Uitvoering van de overeenkomst – voor levering van onze diensten en beheer van accounts.",
                "Wettelijke verplichting – voor audit- en beveiligingsdoeleinden.",
                "Gerechtvaardigd belang – voor systeemoptimalisatie, foutdetectie en beveiligingsverbeteringen.",
                "Toestemming – wanneer specifieke aanvullende functionaliteiten dit vereisen.",
              ]}
            />
            <p className="mt-4">Bij verwerking op grond van een gerechtvaardigd belang voert Vangarde altijd een belangenafweging uit tussen bedrijfsbelang en privacybelang van betrokkenen.</p>
          </Section>

          <Section id="soevereiniteit" title="6. Bedrijfsdata en data-soevereiniteit">
            <p>
              Alle inhoudelijke bedrijfsdata die via het Vangarde-platform worden verwerkt, blijven volledig eigendom van de klant. Deze data worden opgeslagen en verwerkt binnen de infrastructuur die de klant beheert, on-premise of in een private cloud binnen de Europese Economische Ruimte (EER). Vangarde heeft geen toegang tot bedrijfsinhoud, tenzij dit strikt noodzakelijk is voor technische ondersteuning en alleen op expliciet verzoek van de klant.
            </p>
          </Section>

          <Section id="functioneringsdata" title="7. Functioneringsdata en modeloptimalisatie">
            <p>
              Vangarde verzamelt uitsluitend niet-inhoudelijke functioneringsdata om haar AI-systemen te verbeteren. Deze gegevens beschrijven hoe modellen functioneren, niet wát zij verwerken. Alle functioneringsdata worden vooraf geanonimiseerd en bevatten geen persoonsgegevens of bedrijfsinformatie. De verwerking van deze data vindt plaats op basis van het gerechtvaardigd belang van Vangarde overeenkomstig artikel 6 lid 1 sub f AVG, met toepassing van passende technische en organisatorische beveiligingsmaatregelen.
            </p>
          </Section>

          <Section id="ie" title="8. Intellectueel eigendom">
            <p>
              Alle algoritmen, AI-modellen, architecturen, gewichten, trainingsprocedures en afgeleide inzichten blijven het exclusieve intellectuele eigendom van Vangarde B.V. Gebruikers behouden het eigendom van hun eigen bedrijfsgegevens en ingevoerde content. Door gebruik te maken van het platform verleent de gebruiker aan Vangarde een niet-exclusieve, wereldwijde licentie om geanonimiseerde interactie- en functioneringsdata te gebruiken voor onderhoud, beveiliging en prestatieverbetering van het platform. Er worden geen inhoudelijke klantgegevens gebruikt voor modeltraining.
            </p>
          </Section>

          <Section id="beveiliging" title="9. Beveiliging van gegevens">
            <p>Vangarde past een Zero Trust-beveiligingsarchitectuur toe met maatregelen op enterprise-niveau, waaronder:</p>
            <BulletList
              items={[
                "End-to-end encryptie (TLS 1.3 en AES-256).",
                "Multi-factor authenticatie (MFA) en rolgebaseerde toegang (RBAC).",
                "Beveiligde opslag in containers (Kubernetes, HashiCorp Vault).",
                "Onwijzigbare logging via blockchain (Hyperledger Fabric).",
                "Continue monitoring via Prometheus en Grafana.",
                "Jaarlijkse penetratietests en interne audits volgens ISO 27001 en NIS2.",
              ]}
            />
            <p className="mt-4">Alle toegang tot persoonsgegevens is strikt beperkt tot geautoriseerde medewerkers onder geheimhoudingsplicht.</p>
          </Section>

          <Section id="bewaartermijnen" title="10. Bewaartermijnen">
            <p>
              Vangarde bewaart persoonsgegevens niet langer dan noodzakelijk voor het doel waarvoor ze zijn verzameld.
            </p>
            {/* mobile view */}
            <div className="not-prose mt-3 md:hidden overflow-hidden rounded-xl border border-slate-200 divide-y divide-slate-200">
              <div className="p-4">
                <p className="text-sm font-medium text-slate-700">Operationele logs</p>
                <p className="text-sm text-slate-700">
                  <span className="font-semibold">Bewaartermijn: </span>max. 90 dagen
                </p>
                <p className="text-sm text-slate-600">
                  <span className="font-semibold">Toelichting: </span>Tenzij langere wettelijke verplichting geldt
                </p>
              </div>
              <div className="p-4">
                <p className="text-sm font-medium text-slate-700">Gebruikersdata</p>
                <p className="text-sm text-slate-700">
                  <span className="font-semibold">Bewaartermijn: </span>Zolang account actief is of wettelijk vereist
                </p>
                <p className="text-sm text-slate-600">
                  <span className="font-semibold">Toelichting: </span>Accountbeheer &amp; naleving
                </p>
              </div>
              <div className="p-4">
                <p className="text-sm font-medium text-slate-700">Functioneringsdata</p>
                <p className="text-sm text-slate-700">
                  <span className="font-semibold">Bewaartermijn: </span>Onbepaalde tijd (geanonimiseerd)
                </p>
                <p className="text-sm text-slate-600">
                  <span className="font-semibold">Toelichting: </span>Uitsluitend voor systeemoptimalisatie
                </p>
              </div>
              <div className="p-4">
                <p className="text-sm font-medium text-slate-700">Ondersteuningsverzoeken</p>
                <p className="text-sm text-slate-700">
                  <span className="font-semibold">Bewaartermijn: </span>max. 1 jaar
                </p>
                <p className="text-sm text-slate-600">
                  <span className="font-semibold">Toelichting: </span>Kwaliteitsborging
                </p>
              </div>
            </div>

            {/* Desktop*/}
            <div className="not-prose mt-3 hidden md:block overflow-hidden rounded-xl border border-slate-200">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-left text-slate-600">
                  <tr>
                    <th className="px-4 py-2">Type gegevens</th>
                    <th className="px-4 py-2">Bewaartermijn</th>
                    <th className="px-4 py-2">Toelichting</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="px-4 py-2">Operationele logs</td>
                    <td className="px-4 py-2">max. 90 dagen</td>
                    <td className="px-4 py-2">Tenzij langere wettelijke verplichting geldt</td>
                  </tr>
                  <tr className="border-t">
                    <td className="px-4 py-2">Gebruikersdata</td>
                    <td className="px-4 py-2">Zolang account actief is of wettelijk vereist</td>
                    <td className="px-4 py-2">Accountbeheer &amp; naleving</td>
                  </tr>
                  <tr className="border-t">
                    <td className="px-4 py-2">Functioneringsdata</td>
                    <td className="px-4 py-2">Onbepaalde tijd (geanonimiseerd)</td>
                    <td className="px-4 py-2">Uitsluitend voor systeemoptimalisatie</td>
                  </tr>
                  <tr className="border-t">
                    <td className="px-4 py-2">Ondersteuningsverzoeken</td>
                    <td className="px-4 py-2">max. 1 jaar</td>
                    <td className="px-4 py-2">Kwaliteitsborging</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="mt-4">Na afloop van de bewaartermijn worden gegevens verwijderd of onomkeerbaar geanonimiseerd.</p>
          </Section>

          <Section id="delen" title="11. Delen van gegevens">
            <p>
              Vangarde verkoopt geen persoonsgegevens aan derden. Gegevens worden uitsluitend gedeeld:
            </p>
            <BulletList
              items={[
                "Met zorgvuldig geselecteerde subverwerkers voor hosting, beveiliging of onderhoud, onder strikte verwerkersovereenkomsten.",
                "Met bevoegde autoriteiten indien dit wettelijk verplicht is.",
                "Met de klant zelf, binnen de overeengekomen beheeromgeving.",
              ]}
            />
            <p className="mt-4">
              Alle gegevensverwerking vindt plaats binnen de EU/EER of onder de voorwaarden van de Europese Standard Contractual Clauses (2021/914/EU).
            </p>
          </Section>

          <Section id="rechten" title="12. Rechten van betrokkenen">
            <p>Gebruikers hebben de volgende rechten onder de AVG:</p>
            <BulletList
              items={[
                "Recht op inzage in de verwerkte gegevens.",
                "Recht op correctie of verwijdering.",
                "Recht op beperking van verwerking.",
                "Recht op overdraagbaarheid van gegevens.",
                "Recht op bezwaar tegen verwerking.",
                "Recht op menselijke tussenkomst bij geautomatiseerde besluitvorming.",
              ]}
            />
            <p className="mt-4">
              Verzoeken kunnen worden ingediend via{" "}
              <a
                href="mailto:privacy@vangarde.ai"
                className="font-medium text-slate-900 underline decoration-violet-400/60 underline-offset-[3px] hover:decoration-violet-500"
              >
                privacy@vangarde.ai
              </a>
              . Vangarde behandelt elk verzoek binnen 30 dagen. Bij geschillen kunt u een klacht indienen bij de Autoriteit Persoonsgegevens via{" "}
              <a
                href="https://www.autoriteitpersoonsgegevens.nl"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-slate-900 underline decoration-violet-400/60 underline-offset-[3px] hover:decoration-violet-500"
              >
                www.autoriteitpersoonsgegevens.nl
              </a>
              .
            </p>
          </Section>

          <Section id="internationaal" title="13. Internationale doorgifte">
            <p>
              Alle persoonsgegevens worden standaard verwerkt binnen de Europese Economische Ruimte (EER). Indien doorgifte naar derde landen noodzakelijk is, past Vangarde uitsluitend landen toe met een door de Europese Commissie vastgesteld adequaatheidsbesluit, of gebruikt zij de Standard Contractual Clauses (SCC 2021/914/EU) met aanvullende beveiligingsmaatregelen.
            </p>
          </Section>

          <Section id="wijzigingen" title="14. Wijzigingen in dit beleid">
            <p>
              Vangarde behoudt zich het recht voor om dit privacybeleid te actualiseren in geval van wijzigingen in wetgeving, technologie of dienstverlening. De meest recente versie is altijd beschikbaar via <span className="font-medium">www.vangarde.ai/privacy</span>. Wij adviseren gebruikers om dit beleid regelmatig te raadplegen.
            </p>
          </Section>

          <Section id="contact-dpo" title="15. Contact">
            <p>
              Voor vragen, verzoeken of klachten over dit privacybeleid kunt u contact opnemen met onze Data Protection Officer (DPO):
            </p>
            <BulletList
              items={[
                "E-mail: privacy@vangarde.ai",
                "Adres: [bedrijfsadres invullen]",
                "Reactietermijn: maximaal 30 dagen",
              ]}
            />
          </Section>

          <Section id="bijlage-a" title="Bijlage A – Technische en organisatorische beveiligingsmaatregelen">
            <BulletList
              items={[
                "Zero Trust Network Architecture (ZTA).",
                "End-to-end encryptie (TLS 1.3 / AES-256).",
                "Multi-factor authenticatie (MFA).",
                "HashiCorp Vault voor geheime opslag.",
                "Immutable blockchain-logging (Hyperledger Fabric).",
                "Volledige on-premise of private cloud implementatie voor enterprise-klanten.",
                "Continue monitoring (SIEM, Prometheus, Grafana).",
                "Jaarlijkse onafhankelijke beveiligingsaudits conform ISO 27001 en SOC 2 Type II.",
                "NIS2-incidentmanagement binnen 24 uur meldingsplicht.",
              ]}
            />
          </Section>

          <div className="my-8 rounded-xl border border-indigo-200/60 bg-indigo-50 p-5">
            <h3 className="mb-1 text-lg font-semibold text-indigo-900">Samenvattend</h3>
            <p className="text-sm text-indigo-900/90">
              Bij Vangarde blijven uw bedrijfsgegevens in uw eigen beheer en infrastructuur. Vangarde gebruikt enkel geanonimiseerde functioneringsdata om haar modellen veiliger, nauwkeuriger en betrouwbaarder te maken. Wij verbinden technologische innovatie aan juridische integriteit en waarborgen maximale datasoevereiniteit voor onze klanten.
            </p>
          </div>

          <div className="mt-8 border-t border-slate-200 pt-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-slate-600 gap-2">
              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" /> Laatst geüpdatet: {lastUpdated}
              </span>
              <div className="inline-flex items-center gap-4">
                <LegalLinks />
              </div>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}