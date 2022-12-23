import { IJob } from "../../types";

export async function addJob(job: IJob) {
  // TODO: add validation middleware to make sure incoming data is valid

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
    throw new Error(err.message);
  }
}
