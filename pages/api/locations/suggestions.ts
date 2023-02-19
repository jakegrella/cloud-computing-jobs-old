import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await (
      await fetch(
        encodeURI(
          `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${req.query.input}&components=country:us&region=us&types=neighborhood|locality|sublocality|administrative_area_level_1|postal_code&key=${process.env.GOOGLE_MAPS_API_KEY}`
        )
      )
    ).json();

    res
      .status(200)
      .json(response.predictions.map((prediction) => prediction.description));
  } catch (err) {
    res.status(500).json({ message: err.message || "An error occurred" });
  }
}
