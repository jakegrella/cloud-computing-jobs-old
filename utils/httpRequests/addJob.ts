import { IJob } from "../../types";

export async function addJob(job: IJob) {
  try {
    const data = await (
      await fetch("/api/jobs", {
        method: "post",
        headers: new Headers({ "Content-Type": "application/json" }),
        body: JSON.stringify(job),
      })
    ).json();

    return data;
  } catch (err) {
    throw new Error(err.message);
  }
}
