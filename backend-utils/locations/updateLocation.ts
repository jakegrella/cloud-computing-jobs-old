import { prisma } from "../../prisma/prismaClient";

interface ILocationInfo {
  id: number;
  companyId?: number;
  headquarters?: boolean;
  thoroughfare?: string;
  premise?: string;
  locality?: string;
  administrativeArea?: string;
  postalCode?: string;
  country?: string;
  neighborhood?: string;
  latitude?: number;
  longitude?: number;
}

export async function updateLocation({
  id,
  companyId,
  headquarters,
  thoroughfare,
  premise,
  locality,
  administrativeArea,
  postalCode,
  country,
  neighborhood,
  latitude,
  longitude,
}: ILocationInfo) {
  return prisma.location.update({
    where: { id },
    data: {
      companyId,
      headquarters,
      thoroughfare,
      premise,
      locality,
      administrativeArea,
      postalCode,
      country,
      neighborhood,
      latitude,
      longitude,
    },
  });
}
