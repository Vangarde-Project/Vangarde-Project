// src/features/login/services/authService.js

// 🔐 Login via de mockserver API
export async function login(email, password) {
  // Very small, client-side hardcoded auth for local development / demo
  // Accepts two emails and password '1234' and returns the same shape as the mock server used to.
  try {
    const normalizedEmail = (email || "").toString().trim().toLowerCase();
    const normalizedPassword = (password || "").toString();

    const allowed = ["test@vangarde.nl", "test@vangarde.ai"];
    if (allowed.includes(normalizedEmail) && normalizedPassword === "1234") {
      const user = {
        name: "Test Gebruiker",
        role: "HR-analist",
        email: normalizedEmail,
      };

      // persist to localStorage so the rest of the app can read it
      localStorage.setItem("vangarde_user_v1", JSON.stringify(user));

      return { ok: true, user };
    }

    return { ok: false, error: "Ongeldige e-mail of wachtwoord." };
  } catch (err) {
    console.error("Login error (client hardcoded):", err);
    return { ok: false, error: "Onbekende fout bij inloggen." };
  }
}

// 🧠 Registreer nieuwe user — (optioneel, als je later mock-registratie toevoegt)
export async function register(formData) {
  // nog niet nodig bij dummy login; placeholder
  return { ok: false, error: "Registratie via mockserver niet geconfigureerd." };
}

// 🚪 Logout
export function logout() {
  localStorage.removeItem("vangarde_user_v1");
  return { ok: true };
}

// ✅ Huidige user ophalen
export function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem("vangarde_user_v1") || "null");
  } catch {
    return null;
  }
}

// Compat-aliasen (voor bestaande imports)
export const loginUser = login;
export const registerUser = register;
