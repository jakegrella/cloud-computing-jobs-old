import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// GET - get all companies
export const getAllCompanies = async () => {
  try {
    const response = await prisma.company.findMany({
      include: { jobs: true, locations: true },
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
