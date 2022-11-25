import { prisma } from "../../../prisma/prismaClient";
// import { IJob } from "../../types";

// POST - add job
export async function addJob(body: any) {
  const {
    companyId,
    datePublished,
    locations,
    open,
    posting,
    published,
    description,
    qualifications,
    equityRangeMax,
    equityRangeMin,
    payRangeMax,
    payRangeMin,
    payRangeTimeFrame,
    type,
    experience,
    responsibilities,
    title,
  } = body;

  try {
    // check if company with companyId exists
    const company = await prisma.company.findUnique({
      where: { id: companyId },
    });

    if (!company) {
      return {
        status: 404,
        data: { message: "failed to create job, company does not exist" },
      };
    }

    // if company exists
    const response = await prisma.job.create({
      data: {
        title,
        posting,
        open,
        published,
        datePublished,
        description,
        companyId,
        responsibilities,
        qualifications,
        equityRangeMax,
        equityRangeMin,
        payRangeMax,
        payRangeMin,
        payRangeTimeFrame,
        type,
        experience,
        locations: {
          connect: locations.map((locationId: number) => ({ id: locationId })),
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
