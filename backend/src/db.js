import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'vangarde_app',
  password: 'changeMe_strong',
  database: 'vangarde'
});

export async function testConnection() {
  const res = await pool.query('SELECT NOW()');
  console.log('✅ Database verbonden:', res.rows[0].now);
}

export { pool };
