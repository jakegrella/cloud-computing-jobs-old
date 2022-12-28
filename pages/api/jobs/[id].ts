import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/prismaClient";

// GET - get job by id
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = parseInt(req.query.id as string);

  try {
    return res.status(200).json(
      await prisma.job.findUnique({
        where: { id },
        include: { company: true, locations: true },
      })
    );
  } catch (err: any) {
    return res.status(500).json({ message: err.message || "unknown error" });
  }
}
