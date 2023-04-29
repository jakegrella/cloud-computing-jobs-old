import { NextApiRequest, NextApiResponse } from "next";
import { addJob, getAllJobs } from "../../../backend-utils";
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
        console.log("hit that shit");
        // response = { status: 201, data: await addJob(req.body) };
        break;
      default:
        response = { status: 405, message: "Method Not Allowed" };
        throw new Error("Method Not Allowed");
    }

    return res.status(response.status).json(response.data);
  } catch (err) {
    return res
      .status(response.status)
      .json({ message: err.message || response.message });
  }
}
