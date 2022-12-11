import { NextApiRequest, NextApiResponse } from "next";
import { getAllCompanies } from "../../../utils/api/companies/getAllCompanies";
import { addCompany } from "../../../utils/api/companies/addCompany";
import { getSimilarCompanies } from "../../../utils/api/companies/getSimilarCompanies";

async function getRequests(req: NextApiRequest) {
  if (req.query.similar) {
    const response = await getSimilarCompanies(req.query.similar);
    return response;
  }

  const response = await getAllCompanies();
  return response;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let response: { status: number; data: any } = {
    status: 500,
    data: { message: "unknown error" },
  };

  try {
    switch (req.method) {
      case "GET":
        response = await getRequests(req);
        break;
      case "POST":
        response = await addCompany(req.body);
        break;
      default:
        break;
    }
    return res.status(response.status).json(response.data);
  } catch (err) {
    return res.status(500).json(response.data);
  }
}
