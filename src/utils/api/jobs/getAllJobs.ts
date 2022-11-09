import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// GET - get all jobs
export const getAllJobs = async () => {
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
};
