import { NextApiRequest, NextApiResponse } from "next";
import { addLocation, getAllLocations } from "../../../utils/api";

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
        response = await getAllLocations();
        break;
      case "POST":
        response = await addLocation(req.body);
        break;
      default:
        break;
    }
    return res.status(response.status).json(response.data);
  } catch (err) {
    return res.status(response.status).json(response.data);
  }
}
