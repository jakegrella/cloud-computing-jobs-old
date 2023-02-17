import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MagnifyingGlass } from "phosphor-react";
import { useStore } from "../../store";
// import { ILocation } from "../../types";
import styles from "./searchInput.module.css";

export function SearchInput() {
  const [setInitHomeMap] = useStore((state) => [state.setInitHomeMap]);

  const [searchInputValue, setSearchInputValue] = useState<string>("");
  //   const [searchSuggestions, setSearchSuggestions] = useState<ILocation[]>([]);

  const router = useRouter();

  useEffect(() => {
    // update search suggestions
    console.log(searchInputValue);
  }, [searchInputValue]);

  async function handleSearch(event) {
    event.preventDefault();

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
    <form className={styles.searchInput} onSubmit={handleSearch}>
      {/* TODO: search suggestions */}
      <input
        className={styles.searchInput_input}
        placeholder="Enter a city"
        value={searchInputValue}
        onChange={(event) => setSearchInputValue(event.target.value)}
      />
      <button type="submit" className={styles.searchInput_button}>
        <MagnifyingGlass />
      </button>
    </form>
  );
}
