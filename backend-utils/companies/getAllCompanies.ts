import { prisma } from "../../prisma/prismaClient";

// GET - get all companies
export async function getAllCompanies() {
  return prisma.company.findMany({
    include: { jobs: true, locations: true },
  });
}
