import { IMapBounds } from "../../types";

export async function fetchMappableLocations(bounds: IMapBounds) {
  try {
    const { latMin, latMax, lngMin, lngMax } = bounds;
    const url = `/api/locations?lat_min=${latMin}&lat_max=${latMax}&lng_min=${lngMin}&lng_max=${lngMax}`;
    const data = await (await fetch(url)).json();

    return data;
  } catch (err) {
    throw new Error(err.message);
  }
}
