import { prisma } from "../../../prisma/prismaClient";

// GET - get company by username
export default async function handler(req, res) {
  const { username } = req.query;

  try {
    const response = await prisma.company.findUnique({
      where: { username },
      include: { jobs: true, locations: true },
    });

    res.status(200).json(response);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
}
