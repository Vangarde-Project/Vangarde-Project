// src/features/login/services/authService.js

const USERS_KEY = "vangarde_users_v1";
const CURRENT_USER_KEY = "vangarde_user_v1";

// — helpers —
function loadUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}
function setCurrentUser(user) {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
}
export function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem(CURRENT_USER_KEY) || "null");
  } catch {
    return null;
  }
}

// — API —
// FormData in → maakt user aan en slaat op
export async function register(formData) {
  await new Promise((r) => setTimeout(r, 200)); // mini-latency

  const email = (formData.get("email") || "").trim().toLowerCase();
  const password = formData.get("password") || "";
  const firstName = formData.get("firstName") || "";
  const lastName = formData.get("lastName") || "";

  if (!email || !password) return { ok: false, error: "E-mail en wachtwoord zijn verplicht." };

  const users = loadUsers();
  if (users.some((u) => u.email === email)) {
    return { ok: false, error: "Er bestaat al een account met dit e-mailadres." };
  }

  const user = {
    id: crypto.randomUUID?.() || String(Date.now()),
    email,
    password, // ⚠️ plain voor mock-doeleinden
    name: `${firstName} ${lastName}`.trim() || email,
    role: "User",
    profile: {
      firstName,
      lastName,
      functieTitel: formData.get("functieTitel") || "",
      bedrijfsnaam: formData.get("bedrijfsnaam") || "",
      kvkNummer: formData.get("kvkNummer") || "",
      adres: formData.get("adres") || "",
      website: formData.get("website") || "",
      sector: formData.get("sector") || "",
    },
  };

  users.push(user);
  saveUsers(users);

  // ingelogd laten na registratie? laat signup regisseren + redirecten naar login
  return { ok: true, user: { id: user.id, email: user.email, name: user.name, role: user.role } };
}

export async function login(email, password) {
  await new Promise((r) => setTimeout(r, 200));
  const users = loadUsers();
  const match = users.find((u) => u.email === (email || "").trim().toLowerCase() && u.password === password);
  if (!match) return { ok: false, error: "Ongeldige e-mail of wachtwoord." };

  const safeUser = { id: match.id, email: match.email, name: match.name, role: match.role };
  setCurrentUser(safeUser);
  return { ok: true, user: safeUser };
}

export function logout() {
  localStorage.removeItem(CURRENT_USER_KEY);
  return { ok: true };
}

// Compat-aliasen (mocht ergens registerUser/loginUser aangeroepen worden)
export const registerUser = register;
export const loginUser = login;
