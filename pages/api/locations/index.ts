import { NextApiRequest, NextApiResponse } from "next";
import {
  addLocation,
  getAllLocations,
  getMappableLocations,
  updateLocation,
} from "../../../backend-utils";
import { initApiResponse } from "../../../utils/initApiResponse";
import { prisma } from "../../../prisma/prismaClient";

async function getSearchLocations(searchQuery: string) {
  return prisma.location.findMany({
    where: { locality: { startsWith: searchQuery } },
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query } = req;

  let response = initApiResponse;

  async function whichGet() {
    let response;

    if (query.lat_min && query.lat_max && query.lng_min && query.lng_max) {
      const { lat_min, lat_max, lng_min, lng_max } = query;
      response = {
        status: 200,
        data: await getMappableLocations({
          latMin: lat_min as string,
          latMax: lat_max as string,
          lngMin: lng_min as string,
          lngMax: lng_max as string,
        }),
      };
    } else if (query.search) {
      response = {
        status: 200,
        data: await getSearchLocations(query.search as string),
      };
    } else response = { status: 200, data: await getAllLocations() };

    return response;
  }

  try {
    switch (method) {
      case "GET":
        response = await whichGet();
        break;
      case "POST":
        response = { status: 201, data: await addLocation(req.body) };
        break;
      case "PUT":
        response = { status: 200, data: await updateLocation(req.body) };
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
