// src/features/login/services/authService.js
// -------------------------------------------------------
// ✅ Verbeterde auth + KvK helper
// - Mock login + registratie
// - KvK lookup met fallback naar backend endpoint
// - Veilig via VITE_API_BASE
// -------------------------------------------------------

const mockUsers = [
  { id: "1", email: "admin@vangarde.ai", password: "admin123", name: "Admin Gebruiker", role: "Admin" },
  { id: "2", email: "user@vangarde.ai", password: "user123", name: "Medewerker", role: "User" },
];

const STORAGE_USER_KEY = "vangarde_user_v1";

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

/** 🟡 GET CURRENT USER ---------------------------------------- */
export const getCurrentUser = () => {
  const raw = localStorage.getItem(STORAGE_USER_KEY);
  return raw ? JSON.parse(raw) : null;
};

/** 🧩 KVK LOOKUP ----------------------------------------------- */
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

    const text = await res.text().catch(() => "");
    if (res.status === 401) throw new Error("Unauthorized: KVK API key ontbreekt of is ongeldig.");
    if (res.status === 404) return null;
    if (!res.ok) throw new Error(text || `KvK lookup failed (${res.status})`);

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      throw new Error("KvK lookup returned invalid JSON: " + text.slice(0, 200));
    }

    const kvkNum = data.kvkNummer || data.kvknummer || data.kvk || digits;
    const handelsnaam = data.handelsnaam || data.bedrijfsnaam || data.naam || data.name || "";
    const straat = data.straat || data.straatNaam || data.street || "";
    const huisnummer = data.huisnummer || data.huisnr || data.huisnummerToev || "";
    const postcode = data.postcode || data.zip || "";
    const plaats = data.plaats || data.woonplaats || data.city || "";
    const sbiOmschrijving =
      data.sbiOmschrijving ||
      (Array.isArray(data.sbi) && data.sbi[0]?.omschrijving) ||
      data.sector ||
      data.primaryActivity ||
      "";

    return {
      kvkNummer: kvkNum,
      handelsnaam,
      straat,
      huisnummer,
      postcode,
      plaats,
      sbiOmschrijving,
      _raw: data,
    };
  } catch (err) {
    throw new Error("KvK lookup error: " + (err.message || String(err)));
  }
};

/** 🟢 REGISTER USER -------------------------------------------- */
export const registerUser = async (formData) => {
  await new Promise((r) => setTimeout(r, 400));

  // ✅ Support voor FormData of JSON-object
  const get = (key) => (formData.get ? formData.get(key) : formData[key]);

  const email = get("email");
  const password = get("password");
  const firstName = get("firstName") || "";
  const lastName = get("lastName") || "";
  const bedrijfsnaam = get("bedrijfsnaam") || "";
  const kvkNummer = get("kvkNummer") || "";
  const adres = get("adres") || "";
  const website = get("website") || "";
  const sector = get("sector") || "";

  if (!email || !password) return { ok: false, error: "E-mail en wachtwoord zijn verplicht" };
  if (mockUsers.some((u) => u.email === email)) return { ok: false, error: "E-mailadres bestaat al" };

  // Mock user opslaan
  const id = Date.now().toString();
  const newUser = {
    id,
    email,
    password,
    name: `${firstName} ${lastName}`.trim(),
    bedrijfsnaam,
    kvkNummer,
    adres,
    website,
    sector,
    role: "User",
  };
  mockUsers.push(newUser);

  // Simuleer backend call (optioneel future-ready)
  const apiBase = import.meta.env.VITE_API_BASE;
  if (apiBase) {
    try {
      await fetch(`${apiBase}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
    } catch (err) {
      console.warn("Mock fallback gebruikt (backend niet bereikbaar)", err);
    }
  }

  localStorage.setItem(
    STORAGE_USER_KEY,
    JSON.stringify({ id: newUser.id, email: newUser.email, name: newUser.name, role: newUser.role })
  );

  console.log("🧾 Mock-registratie opgeslagen:", newUser);

  return { ok: true, user: { id: newUser.id, email: newUser.email, name: newUser.name, role: newUser.role } };
};
