import { prisma } from "../../../prisma/prismaClient";

// GET - get companies with similar names
export async function getSimilarCompanies(companyName) {
  try {
    const response = await prisma.company.findMany({
      where: {
        name: { contains: companyName },
      },
      include: { locations: true },
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
