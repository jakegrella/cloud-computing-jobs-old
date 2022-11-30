export async function fetchMappableJobs(latBound, lngBound) {
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
}
