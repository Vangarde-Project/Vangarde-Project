export async function getCompanyDataByName(name) {
  if (!name || name.trim().length < 3) return {};
  // TODO: vervang dit met echte API-call
  return {
    kvkNummer: "12345678",
    straat: "Damrak",
    huisnummer: "1",
    postcode: "1012LG",
    plaats: "Amsterdam",
    website: "vangarde.ai",
    sector: "IT-dienstverlening",
  };
}
