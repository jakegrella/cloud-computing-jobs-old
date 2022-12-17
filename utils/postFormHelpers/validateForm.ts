import { IJob } from "../../types";

// receives the previewJob and returns a boolean answer about its validity
export function validateForm(
  previewJob: IJob,
  displayCompensationInfo: boolean
) {
  if (
    previewJob.title &&
    // previewJob.type !== "Select Job Type" &&
    // previewJob.experience !== "Select Experience Level" &&
    previewJob.description &&
    previewJob.qualifications &&
    previewJob.responsibilities &&
    previewJob.posting &&
    previewJob.company.name &&
    previewJob.company.username &&
    previewJob.company.mission &&
    previewJob.company.logo &&
    previewJob.company.overview
    // locations
  ) {
    if (displayCompensationInfo) {
      if (previewJob.payRangeMin !== undefined) {
        return true;
      } else {
        return false;
      }
    } else if (!displayCompensationInfo) {
      if (previewJob.payRangeMin === undefined) {
        return true;
      } else {
        return false;
      }
    }
  }
}
