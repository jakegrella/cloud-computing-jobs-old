interface ICompanyInfo {
  id: number;
  name?: string;
  username?: string;
  logo?: string;
  mission?: string;
  overview?: string;
  twitter?: string;
}

export async function updateCompany({
  id,
  name,
  username,
  logo,
  mission,
  overview,
  twitter,
}: ICompanyInfo) {
  try {
    const response = await prisma.company.update({
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

    return {
      status: 200,
      data: response,
    };
  } catch (err: any) {
    throw new Error(err.message);
  }
}