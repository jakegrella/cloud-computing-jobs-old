import { prisma } from "../../prisma/prismaClient";
import { IJob, ILocation } from "../../types";
import { formatLocation } from "../../utils";
import { geolocation } from "../locations";
import { tweet } from "./tweet";

interface INewLocations extends ILocation {
  geo: any;
}

async function locationSetup(locations: ILocation[]) {
  // add geocode info to each location
  const newLocations: INewLocations[] = [];

  for (const location of locations) {
    const locationInput = formatLocation(location);
    const geo = await geolocation(locationInput);
    newLocations.push({ ...location, geo });
  }
  return newLocations;
}

export async function addJob(job: IJob) {
  try {
    const newLocations = await locationSetup(job.locations);

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
              twitter: job.company.twitter,
            },
          },
        },
        locations: {
          connectOrCreate: newLocations.map((location) => ({
            where: { id: location.id },
            create: {
              headquarters: location.headquarters,
              country: location.geo.country,
              administrativeArea: location.geo.administrativeArea,
              locality: location.geo.locality,
              postalCode: location.geo.postalCode,
              thoroughfare: location.geo.thoroughfare,
              premise: location.geo.premise,
              latitude: location.geo.latitude,
              longitude: location.geo.longitude,
              neighborhood: location.geo.neighborhood,
              company: {
                connectOrCreate: {
                  where: { username: job.company.username },
                  create: {
                    name: job.company.name,
                    username: job.company.username,
                    logo: job.company.logo,
                    mission: job.company.mission,
                    overview: job.company.overview,
                    twitter: job.company.twitter,
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

    // every time a job is added, also tweet out the job
    await tweet(response);

    return {
      status: 201,
      data: response,
    };
  } catch (err: any) {
    throw new Error(`Error adding job: ${err.message}`);
  }
}
