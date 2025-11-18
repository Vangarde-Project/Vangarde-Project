import React, { useEffect, useMemo, useState } from "react";
import {
  ShieldCheck, Mail, MapPin, Building2, ListChecks, CheckCircle2, Info, CalendarClock,
  FileText, Lock, Database, Cog, Globe2, RefreshCcw, Gavel
} from "lucide-react";
import Link from "next/link";
import LegalLinks from "./components/ui/LegalLinks";
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
            <h3 className="text-lg font-semibold text-slate-900">Gebruiksvoorwaarden</h3>
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
            <Link href="/login" className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50">Inloggen</Link>
            <Link href="/login/auth/signup" className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-3 py-2 text-sm font-medium text-white shadow hover:opacity-95">Registreren</Link>
          </div>
        </div>
      </div>
    </aside>
  );
};

// sidebar navigation with active section highlighting
export default function PrivacyPolicy() {
  const lastUpdated = "28 Oktober 2025";

  const sections = useMemo(
    () => [
      { id: "inleiding", label: "1. Inleiding", icon: FileText },
      { id: "wie-wij-zijn", label: "2. Wie wij zijn", icon: Building2 },
      { id: "toepassingsgebied", label: "3. Toepassingsgebied", icon: Globe2 },
      { id: "registratie-en-toegang", label: "4. Registratie en toegang", icon: Cog },
      { id: "gebruik", label: "5. Gebruik van de Diensten", icon: ListChecks },
      { id: "ie", label: "6. Intellectueel eigendom", icon: ShieldCheck },
      { id: "betaald", label: "7. Betaalde diensten & abonnementen", icon: Database },
      { id: "beeindiging", label: "8. Beëindiging en opschorting", icon: Lock },
      { id: "beveiliging", label: "9. Beveiliging en beschikbaarheid", icon: RefreshCcw },
      { id: "aansprakelijkheid", label: "10. Aansprakelijkheid en vrijwaring", icon: Gavel },
      { id: "geschil", label: "11. Geschillenbeslechting", icon: Info },
      { id: "wijzigingen", label: "12. Wijzigingen in de Voorwaarden", icon: CalendarClock },
      { id: "contact", label: "13. Contact", icon: Mail },
      { id: "samenvatting", label: "Kort samengevat", icon: CheckCircle2 },
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
              Gebruiksvoorwaarden – Vangarde Intelligence Platform (Europa)
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
              <Pill icon={Info} label="Versie" value="1.0" />
              <Pill icon={CalendarClock} label="Datum" value={lastUpdated} />
              <Pill icon={Building2} label="Verantwoordelijke" value="Vangarde B.V." />
              <Pill icon={MapPin} label="Regio" value="EU" />
              <Pill icon={Mail} label="Contact" value="legal@vangarde.ai" />
            </div>
          </motion.header>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 pb-16 pt-8">
        <article className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
          <div className="-mt-8 -mx-6 sm:-mx-8 mb-6 h-2 rounded-t-2xl bg-gradient-to-r from-indigo-500 to-violet-500" />

          <Section id="inleiding" title="1. Inleiding">
            <p className="text-gray-700">
              Welkom bij Vangarde Intelligence. Deze Gebruiksvoorwaarden (“Voorwaarden”) regelen uw gebruik van het Vangarde Intelligence Platform
              (“Platform”), inclusief alle bijbehorende software, AI-modules, integraties en webapplicaties (gezamenlijk “Diensten”).
              Door u te registreren, in te loggen of gebruik te maken van onze Diensten, gaat u akkoord met deze Voorwaarden.
              Lees dit document zorgvuldig door voordat u de Diensten gebruikt.
            </p>
            <p className="text-gray-700">
              Voor zakelijke implementaties gelden tevens de bepalingen van de Vangarde Zakelijke Voorwaarden en de Verwerkersovereenkomst, indien van toepassing.
              Het Privacybeleid van Vangarde legt uit hoe wij persoonsgegevens verwerken. Hoewel het geen onderdeel vormt van deze Voorwaarden, is het juridisch bindend via verwijzing.
            </p>
          </Section>

          <Section id="wie-wij-zijn" title="2. Wie wij zijn">
            <p className="text-gray-700">
              De Diensten worden geleverd door:
            </p>
            <p className="text-gray-700">
              Vangarde B.V., een besloten vennootschap naar Nederlands recht, statutair gevestigd te [adres invullen],
              ingeschreven bij de Kamer van Koophandel onder nummer [KvK invullen].
            </p>
            <p className="text-gray-700">
              Vangarde ontwikkelt en exploiteert AI-technologie met als doel organisaties in staat te stellen
              besluitvorming, kennisbeheer en communicatie veilig te automatiseren, met volledige databeheersing binnen Europa.
            </p>
          </Section>

          <Section id="toepassingsgebied" title="3. Toepassingsgebied">
            <p className="text-gray-700">
              Deze Voorwaarden zijn van toepassing op alle gebruikers in de Europese Economische Ruimte (EER), Zwitserland en het Verenigd Koninkrijk.
              Voor gebruikers buiten deze regio’s geldt het document Vangarde Terms of Use – Global.
            </p>
          </Section>

          <Section id="registratie-en-toegang" title="4. Registratie en toegang">
            {/* 4.1 Minimumleeftijd */}
            <h3 className="text-lg font-semibold text-slate-900">4.1 Minimumleeftijd</h3>
            <p className="text-gray-700">
              U moet ten minste 16 jaar oud zijn om een Vangarde-account aan te maken, of voldoen aan de minimumleeftijd voor digitale toestemming in uw land.
              Indien u jonger bent dan 18 jaar, is toestemming van ouder of voogd vereist.
            </p>

            {/* 4.2 Accountregistratie */}
            <h3 className="mt-4 text-lg font-semibold text-slate-900">4.2 Accountregistratie</h3>
            <p className="text-gray-700">
              Bij registratie dient u correcte en volledige informatie te verstrekken. U bent verantwoordelijk voor alle activiteiten die plaatsvinden
              onder uw account en dient uw inloggegevens vertrouwelijk te houden. Indien u handelt namens een organisatie, verklaart u daartoe bevoegd te zijn.
            </p>

            {/* 4.3 Bedrijfsdomeinen */}
            <h3 className="mt-4 text-lg font-semibold text-slate-900">4.3 Bedrijfsdomeinen</h3>
            <p className="text-gray-700">
              Wanneer u zich registreert met een e-mailadres dat eigendom is van een organisatie, kan het account worden toegevoegd aan het beheerde bedrijfsdomein.
              In dat geval kan de organisatie beheerrechten uitoefenen, inclusief inzage in platformactiviteit binnen de bedrijfscontext.
            </p>
          </Section>

          <Section id="gebruik" title="5. Gebruik van de Diensten">
            {/* 5.1 Toegestaan gebruik */}
            <h3 className="text-lg font-semibold text-slate-900">5.1 Toegestaan gebruik</h3>
            <p className="text-gray-700">
              Onder voorwaarde van naleving van deze Voorwaarden verleent Vangarde u een niet-exclusieve, niet-overdraagbare, herroepbare licentie om de Diensten te gebruiken
              voor legitieme, rechtmatige doeleinden binnen de overeengekomen functionele context.
            </p>

            {/* 5.2 Verboden gebruik */}
            <h3 className="mt-4 text-lg font-semibold text-slate-900">5.2 Verboden gebruik</h3>
            <div className="mt-2">
              <p className="text-gray-700">U mag de Diensten niet gebruiken voor:</p>
              <BulletList
                items={[
                  <span key="v1">illegale of frauduleuze doeleinden;</span>,
                  <span key="v2">schending van rechten van derden (inclusief intellectuele eigendom);</span>,
                  <span key="v3">reverse engineering, decompilatie of pogingen om de modelarchitectuur of broncode te achterhalen;</span>,
                  <span key="v4">automatisch of programmatisch extraheren van data of AI-output;</span>,
                  <span key="v5">het trainen van concurrerende AI-modellen;</span>,
                  <span key="v6">verstoring van systemen of beveiligingsmechanismen;</span>,
                  <span key="v7">verspreiding van schadelijke of discriminerende inhoud.</span>,
                ]}
              />
              <p className="mt-3 text-gray-700">
                Vangarde behoudt zich het recht voor accounts tijdelijk of permanent te beperken bij overtreding.
              </p>
            </div>
          </Section>

          <Section id="ie" title="6. Intellectueel eigendom">
            <h3 className="text-lg font-semibold text-slate-900">6.1 Eigendom</h3>
            <p className="text-gray-700">
              Alle rechten, titels en belangen in de Diensten, AI-modellen, algoritmen, architecturen, en systeemdocumentatie blijven exclusief eigendom van Vangarde B.V..
              Gebruik van de Diensten verleent geen eigendomsaanspraak.
            </p>
            <h3 className="mt-4 text-lg font-semibold text-slate-900">6.2 Inhoud van de gebruiker</h3>
            <p className="text-gray-700">
              U behoudt alle rechten op gegevens, documenten, prompts en uploads die u inbrengt (“Gebruikersinhoud”).
              Vangarde verkrijgt enkel een niet-exclusieve licentie om deze inhoud te verwerken ten behoeve van de overeengekomen dienstverlening.
              Gebruikersinhoud wordt nooit gebruikt om modellen te trainen of commerciële datasets te verrijken.
            </p>
            <h3 className="mt-4 text-lg font-semibold text-slate-900">6.3 Functioneringsdata</h3>
            <p className="text-gray-700">
              Vangarde mag anonieme functioneringsdata gebruiken voor analyse, onderhoud en modeloptimalisatie, mits zonder herleidbaarheid
              tot natuurlijke personen of bedrijfsinhoud.
            </p>
          </Section>

          <Section id="betaald" title="7. Betaalde diensten en abonnementen">
            <h3 className="text-lg font-semibold text-slate-900">7.1 Tarieven en betaling</h3>
            <p className="text-gray-700">
              Abonnementen en licenties worden vooraf gefactureerd conform overeengekomen tarieven. Alle bedragen zijn exclusief btw tenzij anders vermeld.
            </p>
            <h3 className="mt-4 text-lg font-semibold text-slate-900">7.2 Facturering en verlenging</h3>
            <p className="text-gray-700">
              Betalingen worden uitgevoerd via beveiligde betaalmethoden. Abonnementen worden automatisch verlengd tenzij tijdig opgezegd via de accountinstellingen.
            </p>
            <h3 className="mt-4 text-lg font-semibold text-slate-900">7.3 Opzegging</h3>
            <p className="text-gray-700">
              Gebruikers kunnen hun abonnement op elk moment beëindigen. Na opzegging blijft toegang beschikbaar tot het einde van de lopende facturatieperiode.
              Er vindt geen terugbetaling plaats tenzij wettelijk vereist (bijv. consumentenrechtelijke herroeping binnen 14 dagen).
            </p>
          </Section>

          <Section id="beeindiging" title="8. Beëindiging en opschorting">
            <p className="text-gray-700">Vangarde kan uw toegang beperken, opschorten of beëindigen indien:</p>
            <BulletList
              items={[
                <span key="b1">u deze Voorwaarden of toepasselijke wetgeving schendt;</span>,
                <span key="b2">u de beveiliging van het platform in gevaar brengt;</span>,
                <span key="b3">of wettelijke verplichtingen hiertoe nopen.</span>,
              ]}
            />
            <p className="mt-3 text-gray-700">
              In geval van beëindiging ontvangt u, waar mogelijk, vooraf bericht en gelegenheid om gegevens te exporteren.
            </p>
          </Section>

          <Section id="beveiliging" title="9. Beveiliging en beschikbaarheid">
            <p className="text-gray-700">
              Vangarde waarborgt een Zero Trust-architectuur en voldoet aan de normen van ISO 27001, NIS2 en de AI Act.
              Hoewel maximale zorg wordt betracht, kan Vangarde niet aansprakelijk worden gesteld voor schade veroorzaakt door:
            </p>
            <BulletList
              items={[
                <span key="s1">cyberaanvallen buiten haar invloedssfeer;</span>,
                <span key="s2">onderbreking van diensten door derden;</span>,
                <span key="s3">of overmachtssituaties.</span>,
              ]}
            />
          </Section>

          <Section id="aansprakelijkheid" title="10. Aansprakelijkheid en vrijwaring">
            <h3 className="text-lg font-semibold text-slate-900">10.1 Beperking van aansprakelijkheid</h3>
            <p className="text-gray-700">
              Voor zover wettelijk toegestaan, is de totale aansprakelijkheid van Vangarde beperkt tot het bedrag dat u in de voorafgaande twaalf maanden
              hebt betaald voor de betreffende Dienst, of €500, afhankelijk van welk bedrag hoger is. Vangarde is niet aansprakelijk voor indirecte, incidentele
              of gevolgschade, inclusief verlies van winst of gegevens.
            </p>
            <h3 className="mt-4 text-lg font-semibold text-slate-900">10.2 Vrijwaring</h3>
            <p className="text-gray-700">
              Gebruikers vrijwaren Vangarde tegen claims van derden die voortvloeien uit onrechtmatig gebruik van de Diensten of schending van deze Voorwaarden.
            </p>
          </Section>

          <Section id="geschil" title="11. Geschillenbeslechting">
            <h3 className="text-lg font-semibold text-slate-900">11.1 Toepasselijk recht</h3>
            <p className="text-gray-700">
              Op deze Voorwaarden is uitsluitend het Nederlands recht van toepassing, onverminderd dwingendrechtelijke consumentenbescherming binnen de EU/EER.
            </p>
            <h3 className="mt-4 text-lg font-semibold text-slate-900">11.2 Bevoegde rechter</h3>
            <p className="text-gray-700">
              Geschillen worden voorgelegd aan de bevoegde rechter te Amsterdam (Nederland), tenzij dwingend recht anders bepaalt.
            </p>
            <h3 className="mt-4 text-lg font-semibold text-slate-900">11.3 Alternatieve geschillenbeslechting</h3>
            <p className="text-gray-700">
              Consumenten binnen de EU kunnen geschillen ook voorleggen via het Onlinegeschillenbeslechtingsplatform (ODR) van de Europese Commissie:{" "}
              <a
                href="https://consumer-redress.ec.europa.eu/site-relocation_en"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-slate-900 underline decoration-violet-400/60 underline-offset-[3px] hover:decoration-violet-500"
              >
                Site relocation
              </a>
            </p>
          </Section>

          <Section id="wijzigingen" title="12. Wijzigingen in de Voorwaarden">
            <p className="text-gray-700">Vangarde kan deze Voorwaarden wijzigen wegens:</p>
            <BulletList
              items={[
                <span key="w1">wetswijzigingen of juridische vereisten;</span>,
                <span key="w2">beveiligings- of technische noodzaak;</span>,
                <span key="w3">nieuwe functionaliteiten of Diensten.</span>,
              ]}
            />
            <p className="mt-3 text-gray-700">
              Bij wezenlijke wijzigingen wordt u minimaal 30 dagen vooraf geïnformeerd. Indien u niet akkoord gaat, kunt u het gebruik van de Diensten beëindigen.
            </p>
          </Section>

          <Section id="contact" title="13. Contact">
            <BulletList
              items={[
                <span key="c1">Vangarde B.V. – Legal Department</span>,
                <span key="c2">📧 legal@vangarde.ai</span>,
                <span key="c3">📍 [bedrijfsadres invullen]</span>,
              ]}
            />
          </Section>

          <Section id="samenvatting" title="Kort samengevat:">
            <BulletList
              items={[
                <span key="k1">Uw data blijft van u; onze modellen blijven van ons.</span>,
                <span key="k2">Wij leveren veilige, conforme en controleerbare AI-diensten.</span>,
                <span key="k3">U behoudt transparantie, exporteerbaarheid en keuzevrijheid.</span>,
                <span key="k4">Wij handelen onder Europees recht en volledige AVG-conformiteit.</span>,
              ]}
            />
          </Section>

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