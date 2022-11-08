import { Router } from "express";
import prisma from "../prismaClient";

const router = Router();

// GET - get all locations
router.get("/", async (req, res) => {
  try {
    const response = await prisma.location.findMany();

    res.status(200).json(response);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// POST - add location
router.post("/", async (req, res) => {
  const { city, state, country } = req.body;

  try {
    const response = await prisma.location.create({
      data: {
        city,
        state,
        country,
      },
    });

    res.status(201).json(response);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
