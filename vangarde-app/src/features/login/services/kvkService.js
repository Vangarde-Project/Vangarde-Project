export async function fetchCompanyData(query, mock = false) {
  if (mock) {
    if (query.toLowerCase().includes("onzin")) {
      return { error: "Mock: geen KvK-gegevens gevonden." };
    }
    // Anders testdata teruggeven
    return {
      kvkNumber: "12345678",
      name: "Vangarde B.V.",
      address: {
        street: "Innovatieweg",
        houseNumber: "10",
        postalCode: "1234AB",
        city: "Utrecht",
      },
      branch: "IT Consultancy",
      website: "www.jouwbedrijf.nl",
    };
  }
}
