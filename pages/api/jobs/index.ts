import { NextApiRequest, NextApiResponse } from "next";
import { addJob, getAllJobs } from "../../../backend-utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let response: { status: number; data: any } = {
    status: 500,
    data: { message: "unknown error" },
  };

  try {
    switch (req.method) {
      case "GET":
        response = await getAllJobs();
        break;
      case "POST":
        response = await addJob(req.body);
        break;
      default:
        break;
    }
    return res.status(response.status).json(response.data);
  } catch (err) {
    throw err;
  }
}
