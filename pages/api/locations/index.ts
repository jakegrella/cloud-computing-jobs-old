import { NextApiRequest, NextApiResponse } from "next";
import {
  addLocation,
  getAllLocations,
  getMappableLocations,
  updateLocation,
} from "../../../backend-utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let response: { status: number; data: any } = {
    status: 500,
    data: { message: "unknown error" },
  };

  const { method, query } = req;

  try {
    if (method === "GET") {
      if (query.lat_min && query.lat_max && query.lng_min && query.lng_max) {
        const { lat_min, lat_max, lng_min, lng_max } = query;
        response = await getMappableLocations({
          latMin: lat_min as string,
          latMax: lat_max as string,
          lngMin: lng_min as string,
          lngMax: lng_max as string,
        });
      } else {
        response = await getAllLocations();
      }
    } else if (method === "POST") {
      response = await addLocation(req.body);
    } else if (method === "PUT") {
      response = await updateLocation(req.body);
    }

    return res.status(response.status).json(response.data);
  } catch (err) {
    return res.status(response.status).json(response.data);
  }
}
