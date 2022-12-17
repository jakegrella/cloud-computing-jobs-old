import { ILocation } from "../types";

export function formatLocation(location: ILocation) {
  // street address, apt #, city, state, zip, country
  let locationInput = "";
  if (location.thoroughfare) {
    locationInput += `${location.thoroughfare}, `; // street address

    if (location.premise) locationInput += `${location.premise}, `; // apt # (only if street address)
  }

  locationInput += `${location.locality}, `; // city
  locationInput += `${location.administrativeArea}, `; // state

  if (location.postalCode) locationInput += `${location.postalCode}, `; // postal code

  locationInput += location.country; // country
  return locationInput;
}
