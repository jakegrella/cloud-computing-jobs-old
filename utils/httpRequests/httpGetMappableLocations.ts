import { IMapBounds } from "../../types";

export async function httpGetMappableLocations(bounds: IMapBounds) {
  try {
    const { latMin, latMax, lngMin, lngMax } = bounds;
    const url = `/api/locations?lat_min=${latMin}&lat_max=${latMax}&lng_min=${lngMin}&lng_max=${lngMax}`;
    const data = await (
      await fetch(url, {
        method: "get",
        headers: new Headers({
          Authorization: "Bearer " + process.env.API_SECRET_KEY,
          "Content-Type": "application/json",
        }),
      })
    ).json();

    return data;
  } catch (err) {
    throw new Error(err.message);
  }
}
