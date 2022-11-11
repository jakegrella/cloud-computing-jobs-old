import { ILocation } from "./types";

export function locationHelper(locations: ILocation[]) {
  let l = "";
  locations.forEach((location) => {
    l += `${location.city}, ${location.state} | `;
  });

  return l.substring(0, l.length - 3);
}
