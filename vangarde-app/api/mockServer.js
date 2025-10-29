// api/mockServer.js
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Simuleer /api/kvk-lookup endpoint
app.get("/api/kvk-lookup", (req, res) => {
  try {
    const { query } = req.query;
    console.log("📡 Mock request ontvangen:", query);

    // Simuleer resultaat voor Coolblue
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

    // Geen match
    return res.status(404).json({ error: "Geen KvK-gegevens gevonden." });
  } catch (err) {
    console.error("❌ Mockserver fout:", err);
    return res.status(500).json({ error: "Interne serverfout in mockServer." });
  }
});

// ✅ Start mockserver
const PORT = 5174;
app.listen(PORT, () => console.log(`🟢 Mock API actief op http://localhost:${PORT}/api/kvk-lookup`));
