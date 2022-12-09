import { prisma } from "../../../prisma/prismaClient";

interface IRequestBody {
  title: string;
  posting: string;
  // open: boolean;
  // published: boolean;
  description: string;
  responsibilities: string;
  qualifications: string;
  type: string;
  experience: string;
  equityRangeMax: number | undefined;
  equityRangeMin: number | undefined;
  payRangeMax: number | undefined;
  payRangeMin: number | undefined;
  payRangeTimeFrame: string | undefined;
  locations: number[];
  companyName: string;
  companyUsername: string;
  companyLogo: string;
  companyMission: string;
  companyOverview: string;
}

// POST - add job
export async function addJob({
  title,
  posting,
  // open,
  // published,
  description,
  responsibilities,
  qualifications,
  type,
  experience,
  companyName: name,
  companyUsername: username,
  companyLogo: logo,
  companyMission: mission,
  companyOverview: overview,
  locations: locationIds,
  payRangeMin,
  payRangeMax,
  equityRangeMin,
  equityRangeMax,
  payRangeTimeFrame,
}: IRequestBody) {
  try {
    const response = await prisma.job.create({
      data: {
        title,
        posting,
        description,
        responsibilities,
        qualifications,
        payRangeMin,
        payRangeMax,
        equityRangeMin,
        equityRangeMax,
        payRangeTimeFrame,
        type,
        experience,
        company: {
          connectOrCreate: {
            where: { username },
            create: {
              logo,
              mission,
              overview,
              name,
              username,
            },
          },
        },
        locations: {
          connect: locationIds.map((locationId: number) => ({
            id: locationId,
          })),
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

// to add a job
// company + at least one location  needs to exist
//
// try to find company username
// if not there, create company
//
//
