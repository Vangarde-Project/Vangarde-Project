import express from "express";
import cors from "cors";
import { testConnection } from "./src/db.js";
import authRouter from "./src/auth.js";

const app = express();
const PORT = 3000;

app.use(cors({
  origin: "http://localhost:5173",   // Vite dev server
  credentials: true
}));
app.use(express.json());

app.get("/", (_req, res) => res.send("Server werkt ✅"));
app.use("/auth", authRouter);

app.listen(PORT, async () => {
  console.log(`🚀 Server draait op http://localhost:${PORT}`);
  await testConnection();
});
