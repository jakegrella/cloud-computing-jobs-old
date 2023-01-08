import { IJob } from "../../types";

export async function fetchJob(id: string | string[]) {
  try {
    const data: IJob = await (await fetch(`/api/jobs/${id}`)).json();
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
}
