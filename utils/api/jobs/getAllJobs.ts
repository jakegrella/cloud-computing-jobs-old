import { prisma } from "../../../prisma/prismaClient";

// GET - get all jobs
export async function getAllJobs() {
  try {
    const response = await prisma.job.findMany({
      include: { company: true, locations: true },
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
