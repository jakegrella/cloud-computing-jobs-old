import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Head } from "../components";
import { useStore } from "../store";
import { ILocation } from "../types";
import styles from "./home.module.css";

// on page load
// -> retrieve and handle user location
//
// on search input value change
// -> get location suggestions (need new implementation method)
//
// on search submit
// -> run city through geocode function
//    -> if success, send to locations?query=xxx
//    -> if error (location doesn't exist or fail), give message below input

export default function Home() {
  const [searchInputValue, setSearchInputValue] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState<ILocation[]>([]);
  const [setInitHomeMap, jobs] = useStore((state) => [
    state.setInitHomeMap,
    state.jobs,
  ]);
  const router = useRouter();

  // TODO: do we want to get user location on page load?
  // useEffect(() => {
  //   // request user location
  //   navigator.geolocation.getCurrentPosition(
  //     (position) => {
  //       const { latitude, longitude } = position.coords;
  //       // set map center to user location
  //       setInitHomeMap({
  //         center: { lat: latitude, lng: longitude },
  //         zoom: 12,
  //       });
  //     },
  //     () => {
  //       // set map center to NYC
  //       setInitHomeMap({
  //         center: { lat: 40.741895, lng: -73.989308 },
  //         zoom: 12,
  //       });
  //     }
  //   );
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  useEffect(() => {
    // update search suggestions
  }, [searchInputValue]);

  async function handleSearch() {
    const defaultLocation = "San Francisco";
    const location = searchInputValue || defaultLocation;

    if (!searchInputValue) setSearchInputValue(defaultLocation);

    // make call to api, send city string, receive coordinates
    try {
      const encodedLocation = encodeURIComponent(location).trim().toLowerCase();

      const res = await (
        await fetch(`/api/locations/geolocation?search=${encodedLocation}`)
      ).json();

      if (!res.lat || !res.lng)
        throw new Error(res.message || "An error occurred");
      else {
        setInitHomeMap({
          center: { lat: res.lat, lng: res.lng },
          zoom: 12,
        });
      }

      router.push(`/locations/${encodedLocation}`);
      // TODO: send to map page
    } catch (err) {
      // TODO: give error message as tip under input
      console.error(err.message || "An error occurred");
    }
  }

  return (
    <div>
      <Head
        title="Cloud Computing Jobs"
        description="The best job board for cloud-focused software engineers"
      />

      <main className={styles.home}>
        <h1>Find your next cloud computing job</h1>
        <input
          placeholder="Enter a city"
          value={searchInputValue}
          onChange={(event) => setSearchInputValue(event.target.value)}
        />
        {/* TODO: search suggestions */}
        <button onClick={handleSearch}>search</button>
      </main>
    </div>
  );
}
