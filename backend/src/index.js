// backend/src/index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRouter from "./auth.js";
import { pool, pingDb } from "./db.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: (process.env.CORS_ORIGIN || "").split(",").filter(Boolean) || "*",
  })
);

// health endpoints
app.get("/health", (_req, res) => res.json({ ok: true }));

app.get("/health/db", async (_req, res) => {
  try {
    const ok = await pingDb();
    res.json({ db: ok });
  } catch (e) {
    console.error(e);
    res.status(500).json({ db: false, error: e.message });
  }
});

// voorbeeld endpoint met DB
app.get("/api/time", async (_req, res) => {
  const r = await pool.query("SELECT NOW() AS now");
  res.json({ now: r.rows[0].now });
});

// auth routes
app.use("/api/auth", authRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`API running on port ${port}`);
});
