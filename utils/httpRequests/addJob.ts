export async function addJob(job) {
  // job = form values = previewJob
  // format form values to match a "perfect" job to add
  const jobInfo = {
    title: job.title,
    posting: job.posting,
    description: job.description,
    responsibilities: job.responsibilities,
    qualifications: job.qualifications,
    type: job.type,
    experience: job.experience,
    payRangeMin: job.payRangeMin,
    payRangeMax: job.payRangeMax,
    payRangeTimeFrame: job.payRangeTimeFrame,
    equityRangeMin: job.equityRangeMin,
    equityRangeMax: job.equityRangeMax,
  };

  const company = {
    name: job.companyName,
    username: job.companyUsername,
    logo: job.companyLogo,
    mission: job.companyMission,
    overview: job.companyOverview,
  };

  const payload = { ...jobInfo, company, locations: job.locations };

  try {
    const response = await fetch("/api/jobs", {
      method: "post",
      headers: new Headers({
        Authorization: "Bearer " + process.env.API_SECRET_KEY,
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("error adding job: " + err);
    throw new Error(err.message);
  }
}
