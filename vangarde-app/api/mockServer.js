import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Endpoint voor mock data
app.get("/api/mock/kvk", (req, res) => {
  const dataPath = path.join(__dirname, "kvkMock.json");
  const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
  res.json(data);
});

// Server starten
app.listen(4000, () => {
  console.log("✅ Mock API draait op http://localhost:4000/api/mock/kvk");
});
