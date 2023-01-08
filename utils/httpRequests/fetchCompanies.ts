export async function fetchCompanies() {
  try {
    const data = await (await fetch("/api/companies")).json();
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
}
