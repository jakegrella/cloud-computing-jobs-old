import { IJob } from "../../types";

export async function fetchJobs() {
  try {
    const data: IJob = await (await fetch('/api/jobs')).json();
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
}
