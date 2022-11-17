import { prisma } from "../../../prisma/prismaClient";
import { ILocation } from "../../types";

export async function addLocation(body: ILocation) {
  try {
    // right now, assume headquarters and locations have valid ids
    const {
      companyId,
      headquarters,
      country,
      administrativeArea,
      locality,
      postalCode,
      thoroughfare,
      premise,
    } = body;

    const response = await prisma.location.create({
      data: {
        company: {
          connect: { id: companyId },
        },
        headquarters,
        country,
        administrativeArea,
        locality,
        postalCode,
        thoroughfare,
        premise,
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
