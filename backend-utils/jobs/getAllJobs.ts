import { prisma } from "../../prisma/prismaClient";
import { IJob } from "../../types";

// GET - get all jobs
export async function getAllJobs(): Promise<IJob[] | Error> {
  return prisma.job.findMany({
    include: { company: true, locations: true },
  });
}
