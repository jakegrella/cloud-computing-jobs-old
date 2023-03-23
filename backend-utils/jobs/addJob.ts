import { prisma } from "../../prisma/prismaClient";
import { IJob, ILocation } from "../../types";
import { formatLocation } from "../../utils";
import { geolocation } from "../locations";

async function locationSetup(locations: ILocation[]) {
  // add geocode info to each location
  const updatedLocations: ILocation[] = [];

  for (const location of locations) {
    if (location.id === 0) {
      const locationInput = formatLocation(location);
      const geo = await geolocation(locationInput);
      updatedLocations.push({
        ...location,
        thoroughfare: geo.thoroughfare,
        premise: geo.premise,
        locality: geo.locality,
        administrativeArea: geo.administrativeArea,
        postalCode: geo.postalCode,
        country: geo.country,
        neighborhood: geo.neighborhood,
        latitude: geo.latitude,
        longitude: geo.longitude,
      });
    } else {
      updatedLocations.push(location);
    }
  }
  return updatedLocations;
}

export async function addJob(job: IJob) {
  return prisma.job.create({
    data: {
      published: job.published,
      datePublished: job.published ? new Date().toISOString() : null,
      title: job.title,
      posting: job.posting,
      // description: job.description,
      description: "",
      // responsibilities: job.responsibilities,
      responsibilities: "",
      // qualifications: job.qualifications,
      qualifications: "",
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
        connectOrCreate: (await locationSetup(job.locations)).map(
          (location) => ({
            where: { id: location.id },
            create: {
              headquarters: location.headquarters,
              country: location.country,
              administrativeArea: location.administrativeArea,
              locality: location.locality,
              postalCode: location.postalCode,
              thoroughfare: location.thoroughfare,
              premise: location.premise,
              latitude: location.latitude,
              longitude: location.longitude,
              neighborhood: location.neighborhood,
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
          })
        ),
      },
    },
    include: {
      company: true,
      locations: true,
    },
  });
}
