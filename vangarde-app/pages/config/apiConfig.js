// Leest de API-URL van de backend uit de Vite .env file
const BASE_URL = import.meta.env.VITE_API_URL;

if (!BASE_URL) {
  console.error(
    "❌ VITE_API_URL ontbreekt. Voeg dit toe aan je .env in de frontend (vangarde-app/.env)."
  );
}

export { BASE_URL };
