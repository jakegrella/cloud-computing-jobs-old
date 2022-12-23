import { prisma } from "../../prisma/prismaClient";
import { IMapBounds } from "../../types";

export async function getMappableLocations(mapBounds: IMapBounds) {
  try {
    const response = await prisma.location.findMany({
      where: {
        latitude: {
          gte: parseFloat(mapBounds.latMin),
          lte: parseFloat(mapBounds.latMax),
        },
        longitude: {
          gte: parseFloat(mapBounds.lngMin),
          lte: parseFloat(mapBounds.lngMax),
        },
      },
      include: {
        jobs: {
          include: { company: true },
        },
      },
    });

    return {
      status: 201,
      data: response,
    };
  } catch (err: any) {
    return {
      status: 500,
      data: { message: err.message },
    };
  }
}
