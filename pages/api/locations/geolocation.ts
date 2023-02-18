import { NextApiRequest, NextApiResponse } from "next";
import { simpleGeo } from "../../../backend-utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    res
      .status(200)
      .json(await simpleGeo(decodeURIComponent(req.query.search as string)));
  } catch (err) {
    res.status(500).json({ message: err.message || "An error occurred" });
  }
}
