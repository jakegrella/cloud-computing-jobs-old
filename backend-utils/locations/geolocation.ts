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
      apiKey: process.env.GOOGLE_MAPS_API_KEY,
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

export async function simpleGeo(loc: string) {
  // returns lat and lng from string location
  try {
    const options = {
      provider: "google",
      apiKey: process.env.GOOGLE_MAPS_API_KEY,
    };

    const geocoder = NodeGeocoder(options);
    const res = await geocoder.geocode(loc);

    if (res.length === 0) throw new Error("Location not found");

    // res may return multiple results, just taking first for now
    return { lat: res[0].latitude, lng: res[0].longitude };
  } catch (err) {
    throw new Error(err.message || "An error occurred");
  }
}
