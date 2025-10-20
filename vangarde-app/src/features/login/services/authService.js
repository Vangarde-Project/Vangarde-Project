const mockUsers = [
  { id: 1, email: "admin@vangarde.ai", password: "admin123", name: "Admin Gebruiker", role: "Admin" },
  { id: 2, email: "user@vangarde.ai", password: "user123", name: "Medewerker", role: "User" },
];

// Simuleer loginproces
export const login = async (email, password) => {
  await new Promise((res) => setTimeout(res, 300)); // 300ms vertraging → realistischer UX

  const user = mockUsers.find((u) => u.email === email && u.password === password);
  if (!user) {
    return { ok: false, error: "Ongeldige e-mail of wachtwoord" };
  }

  localStorage.setItem("user", JSON.stringify(user));
  return { ok: true, user };
};

// Uitloggen
export const logout = () => {
  localStorage.removeItem("user");
};

// Ophalen huidige gebruiker
export const getCurrentUser = () => {
  const stored = localStorage.getItem("user");
  return stored ? JSON.parse(stored) : null;
};

/**
 * Haalt bedrijfsinformatie op via de KvK API Sandbox.
 * Vereist een geldige API key in .env: VITE_KVK_API_KEY
 * @param {string} kvkNummer - Het KvK-nummer van het bedrijf.
 * @returns {Promise<object|null>} - Bedrijfsgegevens of null als niet gevonden.
 */
export const getKvKData = async (kvkNummer) => {
  if (!kvkNummer || kvkNummer.length < 8) return null;

  const baseUrl = "https://api.kvk.nl/test/api/v2/zoeken";
  const apiKey = import.meta.env.VITE_KVK_API_KEY;

  try {
    const response = await fetch(`${baseUrl}?kvkNummer=${kvkNummer}`, {
      headers: { apikey: apiKey },
    });

    if (!response.ok) {
      console.error("KvK API error:", response.status);
      throw new Error("Kon KvK-gegevens niet ophalen");
    }

    const data = await response.json();
    const record = data.data?.[0];

    if (!record) return null;

    // Normaliseer de belangrijkste velden
    return {
      kvkNummer: record.kvkNummer,
      handelsnaam: record.handelsnaam,
      straat: record.straatnaam,
      huisnummer: record.huisnummer,
      postcode: record.postcode,
      plaats: record.plaats,
      sbiOmschrijving: record.sbiOmschrijving,
    };
  } catch (error) {
    console.error("Fout bij KvK-lookup:", error);
    return null;
  }
};
