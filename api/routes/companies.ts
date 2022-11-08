import { Router } from "express";
import prisma from "../prismaClient";

const router = Router();

// GET - get all companies
router.get("/", async (_req, res) => {
  try {
    const response = await prisma.company.findMany({
      include: {
        jobs: true,
        locations: true,
      },
    });

    res.status(200).json(response);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// GET - get company by username
router.get("/:username", async (req, res) => {
  const { username } = req.params;

  try {
    const response = await prisma.company.findUnique({
      where: { username },
      include: { jobs: true, locations: true, headquarters: true },
    });

    res.status(200).json(response);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// POST - add company
router.post("/", async (req, res) => {
  const { headquarters, locations, logo, mission, name, overview, username } =
    req.body;
  try {
    // right now, assume headquarters and locations have valid ids

    const response = await prisma.company.create({
      data: {
        logo,
        mission,
        name,
        overview,
        username,
        headquartersId: headquarters,
        locations: {
          connect: locations.map((l: number) => ({ id: l })),
        },
      },
    });

    res.status(201).json(response);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
