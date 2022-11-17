import { prisma } from "../../../prisma/prismaClient";

// POST - add company
export async function addCompany(body: any) {
  const { locations, logo, mission, name, overview, username } = body;

  try {
    // right now, assume headquarters and locations have valid ids
    const response = await prisma.company.create({
      data: {
        logo,
        mission,
        name,
        overview,
        username,
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
