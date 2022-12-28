import { prisma } from "../../prisma/prismaClient";
import { ICompany } from "../../types";

// POST - add company
export async function addCompany(body: ICompany) {
  const { locations, logo, mission, name, overview, username, twitter } = body;

  // right now, assume headquarters and locations have valid ids
  return prisma.company.create({
    data: {
      logo,
      mission,
      name,
      overview,
      username,
      twitter,
    },
  });
}
