export async function fetchMappableJobs(latBound, lngBound) {
  try {
    const response = await fetch("/api/jobs/mappable", {
      method: "post",
      headers: new Headers({
        Authorization: "Bearer " + process.env.API_SECRET_KEY,
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({
        latBound,
        lngBound,
      }),
    });

    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
}