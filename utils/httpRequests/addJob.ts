import { IJob } from "../../types";

export async function addJob(job: IJob) {
  try {
    const data = await (
      await fetch("/api/jobs", {
        method: "post",
        headers: new Headers({
          Authorization: "Bearer " + process.env.API_SECRET_KEY,
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(job),
      })
    ).json();

    return data;
  } catch (err) {
    console.error("error adding job: " + err);
    throw new Error(err.message);
  }
}
