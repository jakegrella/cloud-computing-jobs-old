import { prisma } from "../../prisma/prismaClient";

export async function getAllLocations() {
  return prisma.location.findMany();
}
