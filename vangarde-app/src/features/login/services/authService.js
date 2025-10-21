// Simpele mock-auth + KvK helper voor frontend (verbeterde foutafhandeling + env-config)
const mockUsers = [
  { id: "1", email: "admin@vangarde.ai", password: "admin123", name: "Admin Gebruiker", role: "Admin" },
  { id: "2", email: "user@vangarde.ai", password: "user123", name: "Medewerker", role: "User" },
];

const STORAGE_USER_KEY = "vangarde_user_v1";

/** Simuleer login */
export const login = async (email, password) => {
  await new Promise((r) => setTimeout(r, 300));
  const user = mockUsers.find((u) => u.email === email && u.password === password);
  if (!user) return { ok: false, error: "Ongeldige e-mail of wachtwoord" };
  localStorage.setItem(STORAGE_USER_KEY, JSON.stringify({ id: user.id, email: user.email, name: user.name, role: user.role }));
  return { ok: true, user: { id: user.id, email: user.email, name: user.name, role: user.role } };
};

export const logout = () => {
  localStorage.removeItem(STORAGE_USER_KEY);
  return { ok: true };
};

export const getCurrentUser = () => {
  const raw = localStorage.getItem(STORAGE_USER_KEY);
  return raw ? JSON.parse(raw) : null;
};

/**
 * Roept backend endpoint aan voor KvK-lookup.
 * - Support voor VITE_API_BASE (productie) of relatieve /api route (dev proxy)
 * - Returned genormaliseerd object of null bij 404
 * - Werpt Error bij netwerk/401/andere serverfouten
 */
export const getKvKData = async (kvkNummer) => {
  if (!kvkNummer) return null;
  const digits = String(kvkNummer).replace(/\D/g, "");
  if (digits.length < 8) return null;

  const apiBase = (import.meta.env.VITE_API_BASE || "").replace(/\/$/, "");
  const url = apiBase
    ? `${apiBase}/api/kvk-lookup?kvkNummer=${encodeURIComponent(digits)}`
    : `/api/kvk-lookup?kvkNummer=${encodeURIComponent(digits)}`;

  try {
    const res = await fetch(url, {
      method: "GET",
      credentials: "same-origin",
      headers: { Accept: "application/json" },
    });

    // lees raw body altijd zodat we bij fouten nuttige info hebben
    const text = await res.text().catch(() => "");

    // debug (gebruik DevTools console)
    // console.debug("getKvKData:", { url, status: res.status, snippet: text.slice(0, 500) });

    if (res.status === 401) {
      throw new Error("Unauthorized: KVK API key ontbreekt of is ongeldig op de server.");
    }

    if (res.status === 404) {
      return null;
    }

    if (!res.ok) {
      // server gaf iets terug dat niet OK is — include body als mogelijk
      const msg = text || `KvK lookup failed (${res.status})`;
      throw new Error(msg);
    }

    // probeer JSON te parsen, fallback error met eerste stuk van response
    let data;
    try {
      data = JSON.parse(text);
    } catch (err) {
      throw new Error("KvK lookup returned invalid JSON. Response starts with: " + (text ? text.slice(0, 500) : "<empty>"));
    }

    // normaliseer mogelijke veldnamen van verschillende API's/handlers
    const kvkNum = data.kvkNummer || data.kvknummer || data.kvk || digits;
    const handelsnaam = data.handelsnaam || data.bedrijfsnaam || data.naam || data.name || "";
    const straat = data.straat || data.straatNaam || data.street || "";
    const huisnummer = data.huisnummer || data.huisnr || data.huisnummerToev || "";
    const postcode = data.postcode || data.postcodeFormat || data.zip || "";
    const plaats = data.plaats || data.woonplaats || data.city || "";
    const sbiOmschrijving = data.sbiOmschrijving || (Array.isArray(data.sbi) && data.sbi[0]?.omschrijving) || data.sector || data.primaryActivity || "";

    return {
      kvkNummer: kvkNum,
      handelsnaam,
      straat,
      huisnummer,
      postcode,
      plaats,
      sbiOmschrijving,
      // keep raw for debugging if needed
      _raw: data,
    };
  } catch (err) {
    // bubble up met duidelijke boodschap
    const message = err && err.message ? err.message : String(err);
    throw new Error("KvK lookup error: " + message);
  }
};

/** Simpele register mock — sla nieuwe gebruiker lokaal op (voor dev) */
export const registerUser = async (formData) => {
  await new Promise((r) => setTimeout(r, 500));
  const email = formData.get ? formData.get("email") : formData.email;
  if (!email) return { ok: false, error: "E-mailadres is verplicht" };

  if (mockUsers.some((u) => u.email === email)) {
    return { ok: false, error: "E-mail bestaat al" };
  }

  const id = Date.now().toString();
  const newUser = {
    id,
    email,
    password: formData.get ? formData.get("password") : formData.password,
    name: `${formData.get ? formData.get("firstName") : formData.firstName || ""} ${formData.get ? formData.get("lastName") : formData.lastName || ""}`.trim(),
    role: "User",
  };
  mockUsers.push(newUser);
  localStorage.setItem(STORAGE_USER_KEY, JSON.stringify({ id: newUser.id, email: newUser.email, name: newUser.name, role: newUser.role }));
  return { ok: true, user: { id: newUser.id, email: newUser.email, name: newUser.name } };
};