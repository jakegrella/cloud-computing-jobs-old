import { prisma } from "../../prisma/prismaClient";

// GET - get mappable jobs
export async function fetchMappableJobs(latBound, lngBound) {
  try {
    const response = await prisma.job.findMany({
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

    return {
      status: 200,
      data: response,
    };
  } catch (err: any) {
    return {
      status: 500,
      data: { message: err.message },
    };
  }
}
