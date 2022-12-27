import { prisma } from "../../prisma/prismaClient";

// GET - get mappable jobs
export async function fetchMappableJobs(latBound, lngBound) {
  return prisma.job.findMany({
    where: {
      locations: {
        some: {
          latitude: { gte: latBound.min, lte: latBound.max },
          longitude: { gte: lngBound.min, lte: lngBound.max },
        },
      },
    },
    include: {
      locations: {
        where: {
          latitude: { gte: latBound.min, lte: latBound.max },
          longitude: { gte: lngBound.min, lte: lngBound.max },
        },
      },
      company: true,
    },
  });
}
