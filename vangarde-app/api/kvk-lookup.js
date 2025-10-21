export default async function handler(req, res) {
  try {
    // Support both /api/kvk-lookup?kvkNummer=... and frameworks that pass query in req.query
    const rawKvK =
      (req.query && req.query.kvkNummer) ||
      (typeof req.url === "string" && new URL(req.url, "http://localhost").searchParams.get("kvkNummer")) ||
      "";

    const kvkNummer = String(rawKvK || "").replace(/\D/g, "");
    if (!kvkNummer) return res.status(400).json({ error: "KvK-nummer is verplicht" });
    if (kvkNummer.length < 8) return res.status(400).json({ error: "Ongeldig KvK-nummer" });

    const KVK_API_KEY = process.env.KVK_API_KEY;
    const KVK_API_URL = process.env.KVK_API_URL || "https://api.kvk.nl/api/v1/zoeken";

    if (!KVK_API_KEY) {
      console.error("KVK_API_KEY ontbreekt in environment");
      return res.status(500).json({ error: "KVK API key niet geconfigureerd op de server" });
    }

    const url = `${KVK_API_URL}?kvkNummer=${encodeURIComponent(kvkNummer)}`;

    const resp = await fetch(url, {
      method: "GET",
      headers: {
        apikey: KVK_API_KEY,
        Accept: "application/json",
      },
    });

    if (resp.status === 401) {
      console.error("KvK API returned 401 — controleer KVK_API_KEY");
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (resp.status === 404) {
      return res.status(404).json({ error: "Niet gevonden" });
    }

    if (!resp.ok) {
      const text = await resp.text().catch(() => "");
      console.error("KvK API error", resp.status, text);
      return res.status(502).json({ error: "Fout bij KvK API", details: text || resp.statusText });
    }

    const data = await resp.json();

    // Normaliseer: sommige KVK endpoints wrappen resultaten in data.resultaten
    const resultaat = data.resultaten?.[0] || data[0] || data?.items?.[0] || data;
    if (!resultaat) {
      return res.status(404).json({ error: "Geen resultaten" });
    }

    const normalized = {
      kvkNummer: resultaat.kvkNummer || resultaat.kvknummer || kvkNummer,
      handelsnaam: resultaat.handelsnaam || resultaat.bedrijfsnaam || "",
      straat: resultaat.straat || resultaat.straatNaam || "",
      huisnummer: resultaat.huisnummer || resultaat.huisnummerToev || "",
      postcode: resultaat.postcode || "",
      plaats: resultaat.plaats || resultaat.woonplaats || "",
      sbiOmschrijving:
        resultaat.sbiOmschrijving ||
        (resultaat.sbi && resultaat.sbi[0] && resultaat.sbi[0].omschrijving) ||
        "",
    };

    return res.status(200).json(normalized);
  } catch (err) {
    console.error("KvK lookup failed:", err);
    return res.status(500).json({ error: "Netwerk- of serverfout bij KvK lookup" });
  }
}