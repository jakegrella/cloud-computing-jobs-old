import { prisma } from "../../../prisma/prismaClient";
import { IJob } from "../../../types";

export async function addJob(job: any /* IJob */) {
  try {
    const response = await prisma.job.create({
      data: {
        title: job.title,
        posting: job.posting,
        description: job.description,
        responsibilities: job.responsibilities,
        qualifications: job.qualifications,
        type: job.type,
        experience: job.experience,
        payRangeMin: job.payRangeMin,
        payRangeMax: job.payRangeMax,
        payRangeTimeFrame: job.payRangeTimeFrame,
        equityRangeMin: job.equityRangeMin,
        equityRangeMax: job.equityRangeMax,
        company: {
          connectOrCreate: {
            where: { username: job.company.username },
            create: {
              name: job.company.name,
              username: job.company.username,
              logo: job.company.logo,
              mission: job.company.mission,
              overview: job.company.overview,
            },
          },
        },
        locations: {
          connectOrCreate: job.locations.map((location) => ({
            where: { id: location.id ? location.id : 0 }, // 0 passed in for new locations
            create: {
              headquarters: location.headquarters,
              country: location.country,
              administrativeArea: location.administrativeArea,
              locality: location.locality,
              postalCode: parseInt(`${location.postalCode}`), // change zip to string
              thoroughfare: location.thoroughfare,
              premise: location.premise,
              latitude: location.latitude,
              longitude: location.longitude,
              company: {
                connectOrCreate: {
                  where: { username: job.company.username },
                  create: {
                    name: job.company.name,
                    username: job.company.username,
                    logo: job.company.logo,
                    mission: job.company.mission,
                    overview: job.company.overview,
                  },
                },
              },
            },
          })),
        },
      },
      include: {
        company: true,
        locations: true,
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
    // throw error instead?
  }
}
