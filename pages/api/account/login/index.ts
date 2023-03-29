import { Magic } from "@magic-sdk/admin";
import { NextApiRequest, NextApiResponse } from "next";
import type { User } from "../user";

let mAdmin = new Magic(process.env.MAGIC_SECRET_KEY);

async function login(req: NextApiRequest, res: NextApiResponse) {
  try {
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
