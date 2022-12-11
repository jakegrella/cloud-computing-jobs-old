export async function fetchSimilarCompanies(companyName: string) {
  try {
    const response = await fetch(`/api/companies?similar=${companyName}`, {
      method: "get",
      headers: new Headers({
        Authorization: "Bearer " + process.env.API_SECRET_KEY,
      }),
    });

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("error fetching similar companies: " + err);
    throw new Error(err.message);
  }
}
