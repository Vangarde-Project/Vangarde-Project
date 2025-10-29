export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.statusCode = 405;
    return res.end(JSON.stringify({ error: "Method not allowed" }));
  }

  const { postcode, huisnummer } = await new Promise((resolve) => {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => resolve(JSON.parse(body || "{}")));
  });

  // 🔹 Simuleer voorbeelddata
  const adresData = {
    street: "Hoofdstraat",
    houseNumber: huisnummer,
    postcode,
    city: "Utrecht",
    province: "Utrecht",
    country: "Nederland",
  };

  res.setHeader("Content-Type", "application/json");
  res.statusCode = 200;
  res.end(JSON.stringify(adresData));
}
