import { NextApiRequest, NextApiResponse } from "next";
import {
  addCompany,
  getAllCompanies,
  getSimilarCompanies,
  updateCompany,
} from "../../../backend-utils";
import { initApiResponse } from "../../../utils/initApiResponse";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let response = initApiResponse;

  try {
    switch (req.method) {
      case "GET":
        response = {
          status: 200,
          data: req.query.similar
            ? await getSimilarCompanies(req.query.similar as string)
            : await getAllCompanies(),
        };
        break;
      case "POST":
        response = { status: 201, data: await addCompany(req.body) };
        break;
      case "PUT":
        response = { status: 200, data: await updateCompany(req.body) };
        break;
      default:
        response = { status: 405, message: "Method Not Allowed" };
        throw new Error("Method Not Allowed");
    }
    return res.status(response.status).json(response.data);
  } catch (err) {
    return res
      .status(response.status)
      .json({ message: err.message || response.message });
  }
}
