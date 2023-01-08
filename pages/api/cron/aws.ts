import { NextApiRequest, NextApiResponse } from "next";
import { aws } from "../../../backend-utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // if wrong HTTP method
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  if (!req.body.jobs?.length) {
    return res.status(500).json({ success: false, message: "0 Jobs Received" });
  }

  try {
    await aws(req.body.jobs);

    res
      .status(201)
      .json({ success: true, message: "Successfully added AWS jobs" });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: err.message || "Unknown Error" });
  }
}
