export async function fetchSimilarCompanies(companyName: string) {
  try {
    const response = await fetch(`/api/companies?similar=${companyName}`);

    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
}
