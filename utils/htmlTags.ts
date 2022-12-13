import { ICompany, IJob } from "../types";
import { jobsPlurality } from "./words";

export function companyMetaDescription(company: ICompany) {
  const jobsCount = `${company.jobs.length} ` ?? "";
  const mission =
    company.mission[0].toLowerCase() + company.mission.substring(1);

  return `View ${jobsCount}open ${jobsPlurality(
    company.jobs.length,
    false
  )} for ${company.name}, ${mission}.`;
}

export function jobMetaDescription(job: IJob) {
  return `View the opening for ${job.title} at ${job.company.name}.`;
}

export function metaKeywords(job: IJob) {
  return `Cloud Computing Jobs, ${job.title}, ${job.company.name},`;
}
