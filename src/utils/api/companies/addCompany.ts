import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// POST - add company
export async function addCompany(body: any) {
  const { headquarters, locations, logo, mission, name, overview, username } =
    body;

  try {
    // right now, assume headquarters and locations have valid ids
    const response = await prisma.company.create({
      data: {
        logo,
        mission,
        name,
        overview,
        username,
        headquarters: {
          connect: { id: headquarters },
        },
        locations: {
          connect: locations.map((l: number) => ({ id: l })),
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
