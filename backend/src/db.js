import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
  max: 10,
});

export async function pingDb() {
  const r = await pool.query("SELECT 1 AS ok");
  return r.rows[0].ok === 1;
}
