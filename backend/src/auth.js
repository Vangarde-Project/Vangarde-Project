import jwt from "jsonwebtoken";
// ...bovenaan staan Router, bcrypt, zod, pool al

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string()
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = LoginSchema.parse(req.body);

    const { rows } = await pool.query(
      `SELECT id, email, password_hash FROM auth.users WHERE lower(email)=lower($1)`,
      [email]
    );
    const user = rows[0];
    if (!user) return res.status(401).json({ error: "Ongeldige e-mail of wachtwoord" });

    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(401).json({ error: "Ongeldige e-mail of wachtwoord" });

    const token = jwt.sign(
      { sub: user.id, email: user.email },
      "dev_secret_change_me",      // zet later in .env
      { expiresIn: "1h" }
    );

    res.json({ token, user: { id: user.id, email: user.email } });
  } catch (err) {
    if (err.name === "ZodError") return res.status(400).json({ error: err.flatten() });
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});
export default router;
