// src/features/login/services/authService.js

// 🔐 Login via de mockserver API
export async function login(email, password) {
  try {
    const response = await fetch("http://localhost:3001/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      return { ok: false, error: data.message || "Ongeldige e-mail of wachtwoord." };
    }

    // Bewaar login in memory (optioneel in localStorage voor sessiebehoud)
    localStorage.setItem("vangarde_user_v1", JSON.stringify(data.user));

    return { ok: true, user: data.user };
  } catch (err) {
    console.error("Login error:", err);
    return { ok: false, error: "Verbindingsfout met mockserver." };
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
