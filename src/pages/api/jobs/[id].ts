import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// GET - get job by id
export default async function handler(req, res) {
  const id = parseInt(req.query.id);

  try {
    const response = await prisma.job.findUnique({
      where: { id },
      include: { company: true, locations: true },
    });

    res.status(200).json(response);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
}
