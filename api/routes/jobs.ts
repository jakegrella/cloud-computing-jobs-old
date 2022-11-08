import { Router } from "express";
import prisma from "../prismaClient";

const router = Router();

// GET - get all jobs
router.get("/", async (_req, res) => {
  try {
    const response = await prisma.job.findMany({
      where: {},
      include: {
        company: true,
        locations: true,
      },
    });

    res.status(200).json(response);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// GET - get job by id
router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const response = await prisma.job.findUnique({
      where: { id },
      include: { company: true, locations: true },
    });

    res.status(200).json(response);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// POST - add job
router.post("/", async (req, res) => {
  const {
    companyId,
    datePublished,
    locations,
    open,
    posting,
    published,
    description,
    qualifications,
    equityRangeMax,
    equityRangeMin,
    payRangeMax,
    payRangeMin,
    payRangeTimeFrame,
    type,
    experience,
    responsibilities,
    title,
  } = req.body;

  try {
    // check if company with companyId exists
    const company = await prisma.company.findUnique({
      where: { id: companyId },
    });

    if (!company) {
      res
        .status(404)
        .json({ message: "failed to create job, company does not exist" });

      return;
    }

    // if company exists
    const response = await prisma.job.create({
      data: {
        title,
        posting,
        open,
        published,
        datePublished,
        description,
        companyId,
        responsibilities,
        qualifications,
        equityRangeMax,
        equityRangeMin,
        payRangeMax,
        payRangeMin,
        payRangeTimeFrame,
        type,
        experience,
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
