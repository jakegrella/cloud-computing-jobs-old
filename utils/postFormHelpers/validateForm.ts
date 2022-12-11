// import { IJob } from "../types";

// receives the previewJob and returns a boolean answer about its validity
export function validateForm(
  previewJob: any, // ~ IJob
  displayCompensationInfo: boolean
) {
  if (
    previewJob.companyName &&
    previewJob.companyUsername &&
    previewJob.title &&
    previewJob.type !== "Select Job Type" &&
    previewJob.experience !== "Select Experience Level" &&
    previewJob.companyMission &&
    previewJob.companyLogo &&
    previewJob.companyOverview &&
    previewJob.description &&
    previewJob.qualifications &&
    previewJob.responsibilities &&
    previewJob.posting
    // locations
  ) {
    if (displayCompensationInfo) {
      if (
        previewJob.payRangeMin !== undefined &&
        previewJob.payRangeMin !== ""
      ) {
        return true;
      } else {
        return false;
      }
    } else if (!displayCompensationInfo) {
      if (
        previewJob.payRangeMin === undefined ||
        previewJob.payRangeMin === ""
      ) {
        return true;
      } else {
        return false;
      }
    }
  }
}
