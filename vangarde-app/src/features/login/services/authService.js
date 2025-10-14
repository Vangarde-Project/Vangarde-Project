export async function login(email, password) {
  // Mock login (vervang dit later met echte API)
  if (email === "admin@vangarde.ai" && password === "demo") {
    localStorage.setItem("token", "demo-token");
    return true;
  }
  throw new Error("Invalid credentials");
}
