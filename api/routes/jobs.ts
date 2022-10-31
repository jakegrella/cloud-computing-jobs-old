import { Router } from "express";
import prisma from "../prismaClient";

const router = Router();

// GET - get all jobs
router.get("/", async (_req, res) => {
  try {
    const response = await prisma.job.findMany({
      where: {},
      include: {
        Company: { select: { logo: true, mission: true, name: true } },
      },
    });

    res.status(200).json(response);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// POST - add job
router.post("/", async (req, res) => {
  const { companyId, title, posting, open, published, datePublished } =
    req.body;
  try {
    // check if company with companyId exists
    const company = await prisma.company.findUnique({
      where: { id: companyId },
    });

    // if company does not exist
    if (!company) {
      // return Error saying company doesn't exist
      res
        .status(404)
        .json({ message: "failed to create job, company does not exist" });

      return;

      // throw new Error("failed to create job, company does not exist");
    }

    // if company exists
    const response = await prisma.job.create({
      data: {
        title,
        posting,
        open,
        published,
        datePublished,
        companyId,
      },
    });
    // return created job
    res.status(201).json(response);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
