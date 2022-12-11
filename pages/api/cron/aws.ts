import { NextApiRequest, NextApiResponse } from "next";
import { aws } from "../../../utils/api/cron/aws";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // if wrong HTTP method
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end("Method Not Allowed");
  }

  // if unauthorized
  if (req.headers.authorization !== `Bearer ${process.env.API_SECRET_KEY}`) {
    return res.status(401).json({ success: false });
  }

  if (!req.body.jobs || !req.body.jobs.length) {
    return res.status(500).json({ success: false, message: "0 Jobs Received" });
  }

  try {
    // TODO check if job already exists in DB
    await aws(req.body.jobs);

    res.status(201).json({ success: true });
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
}
