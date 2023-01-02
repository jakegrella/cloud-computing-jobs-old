import { prisma } from "../../prisma/prismaClient";
import { IMapBounds } from "../../types";

export async function getMappableLocations(mapBounds: IMapBounds) {
  return prisma.location.findMany({
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
      company: {
        include: { jobs: true },
      },
    },
  });
}
