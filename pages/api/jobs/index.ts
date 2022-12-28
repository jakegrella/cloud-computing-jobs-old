import { NextApiRequest, NextApiResponse } from "next";
import { addJob, getAllJobs, tweet } from "../../../backend-utils";
import { inProd } from "../../../utils";
import { initApiResponse } from "../../../utils/initApiResponse";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let response = initApiResponse;

  try {
    switch (req.method) {
      case "GET":
        response = { status: 200, data: await getAllJobs() };
        break;
      case "POST":
        response = { status: 201, data: await addJob(req.body) };
        // create tweet every time a job is added in prod
        if (inProd()) await tweet(response.data);
        break;
      default:
        response = { status: 405, message: "method not allowed" };
        throw new Error("method not allowed");
    }

    return res.status(response.status).json(response.data);
  } catch (err) {
    return res
      .status(response.status)
      .json({ message: err.message || response.message });
  }
}
