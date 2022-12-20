// TODO update to make batch call
import NodeGeocoder from "node-geocoder";

function thoroughfare(res) {
  if (res.streetName) {
    if (res.streetNumber) return `${res.streetNumber} ${res.streetName}`;
    else return `${res.streetName}`;
  }
  return undefined;
}

// return info from Google Geocoding API of given string location (street address, city/state, etc)
export async function geolocation(loc: string) {
  try {
    const options = {
      provider: "google",
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_GEOLOCATION_API_KEY,
    };

    const geocoder = NodeGeocoder(options);
    const res = (await geocoder.geocode(loc))[0];

    return {
      thoroughfare: thoroughfare(res), // street address
      premise: res.extra.subpremise, // apt #
      locality: res.city,
      administrativeArea: res.administrativeLevels.level1short, // state code
      postalCode: res.zipcode,
      country: res.countryCode,
      neighborhood: res.extra.neighborhood,
      latitude: res.latitude,
      longitude: res.longitude,
    };
  } catch (err) {
    throw new Error(`Error fetching location info — ${err.message}`);
  }
}
