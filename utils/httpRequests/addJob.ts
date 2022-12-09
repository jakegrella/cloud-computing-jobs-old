export async function addJob(job) {
  // job = form values

  try {
    const response = await fetch("/api/jobs", {
      method: "post",
      headers: new Headers({
        Authorization: "Bearer " + process.env.API_SECRET_KEY,
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(job),
    });

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("error adding job: " + err);
    throw new Error(err.message);
  }
}
