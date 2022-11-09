import { ILocation } from "./types";

export function locationHelper(locations: ILocation[]) {
  let a = "";
  locations.forEach((l) => {
    a += `${l.city}, ${l.state}`;
  });

  return a;
}
