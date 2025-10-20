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