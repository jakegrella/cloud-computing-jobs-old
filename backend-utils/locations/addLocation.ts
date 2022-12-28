import { prisma } from "../../prisma/prismaClient";
import { ILocation } from "../../types";
import { formatLocation } from "../../utils";
import { geolocation } from "./geolocation";

export async function addLocation(body: ILocation) {
  const locationInput = formatLocation(body);
  const geo = await geolocation(locationInput);

  return prisma.location.create({
    data: {
      company: {
        connect: { id: body.companyId },
      },
      headquarters: body.headquarters,
      country: geo.country,
      administrativeArea: geo.administrativeArea,
      locality: geo.locality,
      postalCode: geo.postalCode,
      thoroughfare: geo.thoroughfare,
      premise: geo.premise,
      latitude: geo.latitude,
      longitude: geo.longitude,
      neighborhood: geo.neighborhood,
    },
  });
}
