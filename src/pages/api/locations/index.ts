import { NextApiRequest, NextApiResponse } from "next";
import { addLocation } from "../../../utils/api/locations/addLocation";
import { getAllLocations } from "../../../utils/api/locations/getAllLocations";

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
