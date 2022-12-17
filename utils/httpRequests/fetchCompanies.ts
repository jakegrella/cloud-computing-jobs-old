export async function fetchCompanies() {
  try {
    const data = await (
      await fetch("/api/companies", {
        method: "get",
        headers: new Headers({
          Authorization: "Bearer " + process.env.API_SECRET_KEY,
        }),
      })
    ).json();
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
}
