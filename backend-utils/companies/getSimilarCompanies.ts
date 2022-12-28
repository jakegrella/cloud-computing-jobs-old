import { prisma } from "../../prisma/prismaClient";

// GET - get companies with similar names
export async function getSimilarCompanies(companyName: string) {
  return prisma.company.findMany({
    where: {
      name: { contains: companyName },
    },
    include: { locations: true },
  });
}
