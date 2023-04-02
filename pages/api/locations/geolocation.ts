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
    const status = err.message === "Location not found" ? 404 : 500;
    res.status(status).json({ message: err.message || "An error occurred" });
  }
}
