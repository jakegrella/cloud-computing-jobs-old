import { NextApiRequest, NextApiResponse } from "next";
import { fetchMappableJobs } from "../../../utils/api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // find all jobs where location latitude and longitude
  // fit inside bounds
  // return only the mappable locations

  const { latBound, lngBound } = req.body;

  let response: { status: number; data: any } = {
    status: 500,
    data: { message: "unknown error" },
  };
  try {
    response = await fetchMappableJobs(latBound, lngBound);

    return res.status(response.status).json(response.data);
  } catch (err) {
    res.status(response.status).json(response.data);
  }
}
