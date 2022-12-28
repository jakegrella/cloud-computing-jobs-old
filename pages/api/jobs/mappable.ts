import { NextApiRequest, NextApiResponse } from "next";
import { fetchMappableJobs } from "../../../backend-utils";

// find all jobs where location latitude and longitude
// fit inside bounds
// return only the mappable locations
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { latBound, lngBound } = req.body;

  try {
    return res.status(200).json(await fetchMappableJobs(latBound, lngBound));
  } catch (err) {
    return res.status(500).json({ message: err.message || "unknown error" });
  }
}
