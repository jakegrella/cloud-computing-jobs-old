import { prisma } from "../../../prisma/prismaClient";

export async function getAllLocations() {
  try {
    const response = await prisma.location.findMany();

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
