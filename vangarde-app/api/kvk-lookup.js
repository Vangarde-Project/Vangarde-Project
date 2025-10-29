// /api/kvk-lookup.js
// ✅ Dynamische KvK proxy (werkt lokaal & online)
// - Gebruikt mock data in DEV
// - Gebruikt echte KvK API in productie

export default async function kvkLookup(req, res) {
  const { kvkNummer, query } = req.query;

  const isDev = process.env.NODE_ENV !== "production";
  const apiUrl = process.env.VITE_KVK_API_URL || "https://api.kvk.nl/test/api/v2";
  const apiKey = process.env.VITE_KVK_API_KEY;

  // 🧠 DEV: gebruik mockdata
  if (isDev) {
    console.log("🧩 Mock mode actief (lokale lookup)");
    if (query && query.toLowerCase().includes("coolblue")) {
      return res.json({
        kvkNummer: "24317046",
        bedrijfsnaam: "Coolblue B.V.",
        adres: "Weena 664, 3012 CN Rotterdam",
        straat: "Weena",
        huisnummer: "664",
        postcode: "3012 CN",
        plaats: "Rotterdam",
        website: "https://www.coolblue.nl",
        sector: "Detailhandel elektronica",
      });
    }
    return res.status(404).json({ error: "Geen mock KvK-gegevens gevonden." });
  }

  // 🌐 PRODUCTIE: echte KvK API call
  if (!apiKey) {
    return res.status(500).json({ error: "Geen KvK API-sleutel gevonden op de server." });
  }

  const lookupPath = kvkNummer
    ? `basisprofielen/${encodeURIComponent(kvkNummer)}`
    : `zoeken?handelsnaam=${encodeURIComponent(query)}`;
  const url = `${apiUrl}/${lookupPath}`;

  try {
    const response = await fetch(url, {
      headers: { Accept: "application/json", apikey: apiKey },
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: `KvK API fout (${response.status})` });
    }

    const raw = await response.json();
    const result = raw.resultaten?.[0] || raw || {};
    const adres = result.adres || result.adressen?.[0] || {};

    return res.json({
      kvkNummer: result.kvkNummer || "",
      bedrijfsnaam: result.handelsnaam || query || "",
      adres: `${adres.straat || ""} ${adres.huisnummer || ""}, ${adres.postcode || ""} ${adres.plaats || ""}`,
      straat: adres.straat || "",
      huisnummer: adres.huisnummer || "",
      postcode: adres.postcode || "",
      plaats: adres.plaats || "",
      website: result.website || "",
      sector: result.sbiOmschrijving || "",
    });
  } catch (error) {
    console.error("❌ KvK lookup error:", error);
    return res.status(500).json({ error: "Fout bij ophalen KvK-gegevens." });
  }
}
