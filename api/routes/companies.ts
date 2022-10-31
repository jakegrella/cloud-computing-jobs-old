import { Router } from "express";
import prisma from "../prismaClient";

const router = Router();

// GET - get all companies
router.get("/", async (_req, res) => {
  try {
    const response = await prisma.company.findMany();

    res.status(200).json(response);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// POST - add company
router.post("/", async (req, res) => {
  const { name, logo, mission } = req.body;
  try {
    const response = await prisma.company.create({
      data: {
        name,
        logo,
        mission,
      },
    });
    // return created company
    res.status(201).json(response);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
