// src/features/login/services/authService.js
// -------------------------------------------------------
// ✅ Verbeterde auth + KvK helper (lokaal + online)
// - Mock login + registratie
// - KvK lookup via mock (lokaal) of serverless function (online)
// - Veilig via VITE_API_BASE + VITE_KVK_API_KEY
// -------------------------------------------------------

const mockUsers = [
  { id: "1", email: "admin@vangarde.ai", password: "admin123", name: "Admin Gebruiker", role: "Admin" },
  { id: "2", email: "user@vangarde.ai", password: "user123", name: "Medewerker", role: "User" },
];

const STORAGE_USER_KEY = "vangarde_user_v1";

// 🔒 Environment variabelen
const apiBase = (import.meta.env.VITE_API_BASE || "").replace(/\/$/, "");
const apiKey = import.meta.env.VITE_KVK_API_KEY || "";

/** 🔧 Dynamische API URL helper -------------------------------- */
const getApiUrl = (path) => {
  if (typeof window !== "undefined" && window.location.hostname === "localhost") {
    // Lokaal → gebruik mockserver
    return `http://localhost:5174${path}`;
  }
  // Online → gebruik serverless functie
  return `${apiBase}${path}`;
};

/** 🟢 LOGIN --------------------------------------------------- */
export const login = async (email, password) => {
  await new Promise((r) => setTimeout(r, 300));

  const user = mockUsers.find((u) => u.email === email && u.password === password);
  if (!user) return { ok: false, error: "Ongeldige e-mail of wachtwoord" };

  localStorage.setItem(
    STORAGE_USER_KEY,
    JSON.stringify({ id: user.id, email: user.email, name: user.name, role: user.role })
  );

  return { ok: true, user: { id: user.id, email: user.email, name: user.name, role: user.role } };
};

/** 🔴 LOGOUT --------------------------------------------------- */
export const logout = () => {
  localStorage.removeItem(STORAGE_USER_KEY);
  return { ok: true };
};

/** 🧠 AUTOLOOKUP OP BEDRIJFSNAAM -------------------------------------------- */
export const getCompanyDataByName = async (bedrijfsnaam) => {
  if (!bedrijfsnaam || bedrijfsnaam.trim().length < 3) return null;

  try {
    const url = getApiUrl(`/api/kvk-lookup?query=${encodeURIComponent(bedrijfsnaam)}`);

    const res = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "x-api-key": apiKey, // ✅ sleutel komt uit .env.local (alleen backend leest hem echt)
      },
    });

    if (!res.ok) throw new Error(`Fout bij ophalen bedrijfsdata (${res.status})`);

    const data = await res.json();

    return {
      kvkNummer: data.kvkNummer || "",
      bedrijfsnaam: data.bedrijfsnaam || bedrijfsnaam,
      adres: data.adres || "",
      straat: data.straat || "",
      huisnummer: data.huisnummer || "",
      postcode: data.postcode || "",
      plaats: data.plaats || "",
      website: data.website || "",
      sector: data.sector || data.sbiOmschrijving || "",
    };
  } catch (err) {
    console.error("getCompanyDataByName error:", err);
    return null;
  }
};
