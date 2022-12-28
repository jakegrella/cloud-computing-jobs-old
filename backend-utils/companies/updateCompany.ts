import { prisma } from "../../prisma/prismaClient";

interface ICompanyInfo {
  id: number;
  name?: string;
  username?: string;
  logo?: string;
  mission?: string;
  overview?: string;
  twitter?: string;
}

// PUT - update company by id
export async function updateCompany({
  id,
  name,
  username,
  logo,
  mission,
  overview,
  twitter,
}: ICompanyInfo) {
  return prisma.company.update({
    where: { id },
    data: {
      name,
      username,
      logo,
      mission,
      overview,
      twitter,
    },
  });
}
