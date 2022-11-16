import { NextApiRequest, NextApiResponse } from "next";
import { sign } from "jsonwebtoken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const header = {
    alg: "ES256",
    typ: "JWT",
    kid: process.env.MAPKIT_KEY_ID,
  };

  const payload = {
    iss: process.env.MAPKIT_TEAM_ID,
    iat: Date.now() / 1000,
    exp: Date.now() / 1000 + 15778800,
    // origin:
  };

  var token = sign(payload, process.env.MAPKIT_PRIVATE_KEY, { header: header });
  res.json({ token: token });
}
