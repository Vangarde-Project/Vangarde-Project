app.post("/login", (req, res) => {
  const { email, password } = req.body;
  console.log("🧠 Received login:", email, password);

  if (
    (email === "test@vangarde.nl" || email === "test@vangarde.ai") &&
    password === "1234"
  ) {
    return res.json({
      success: true,
      token: "mock-jwt-token-1234",
      user: {
        name: "Test Gebruiker",
        role: "HR-analist",
        email,
      },
    });
  }

  return res
    .status(401)
    .json({ success: false, message: "Ongeldige inloggegevens" });
});
