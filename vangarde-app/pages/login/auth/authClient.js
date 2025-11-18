// src/features/auth/authClient.js
import { BASE_URL } from "../../config/apiConfig";

// Aanroep naar jouw backend: POST /auth/login
async function login(email, password) {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
    // zet deze op "include" als je met cookies/JWT via cookie werkt:
    // credentials: "include",
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = data?.message || "Inloggen is mislukt.";
    throw new Error(message);
  }

  return data; // bevat bijv. token, user, etc.
}

export const authClient = {
  login,
};
