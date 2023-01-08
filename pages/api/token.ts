import { SignJWT } from "jose";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  if (!req.headers.authorization) {
    return res.status(400).json({ message: "Missing Authorization Header" });
  }

  const header = {
    alg: "HS256",
    typ: "JWT",
  };

  const secret = new TextEncoder().encode(req.headers.authorization); // key

  try {
    const token = await new SignJWT({})
      .setProtectedHeader(header)
      .setIssuedAt(Date.now() / 1000)
      .setExpirationTime(Date.now() / 1000 + 28800) // 8 hours from iat
      .sign(secret);

    return res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json({ message: err.message || "Unknown Error" });
  }
}
