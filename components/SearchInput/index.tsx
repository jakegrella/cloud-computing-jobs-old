import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MagnifyingGlass } from "phosphor-react";
import { useStore } from "../../store";
import styles from "./searchInput.module.css";

// Use Google Places API - Place Autocomplete to show user a list of possible locations
async function fetchSearchSuggestions(searchInputValue: string) {
  const result = await (
    await fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${searchInputValue}&components=country:us&region=us&types=neighborhood|locality|sublocality|administrative_area_level_1|postal_code&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_GEOLOCATION_API_KEY}`
    )
  ).json();

  return result.predictions.map((prediction) => prediction.description);
}

let timeout: NodeJS.Timeout;

export function SearchInput() {
  const [setInitHomeMap] = useStore((state) => [state.setInitHomeMap]);

  const [searchInputValue, setSearchInputValue] = useState<string>("");
  const [searchInputActive, setSearchInputActive] = useState<boolean>(false);
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);

  const router = useRouter();

  useEffect(() => {
    // update search suggestions
    if (searchInputValue.length >= 3) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        (async () => {
          // make request to API route
          const results: string[] = await fetchSearchSuggestions(
            searchInputValue
          );
          setSearchSuggestions(results);
        })();
      }, 250);
    }

    if (!searchInputValue) setSearchSuggestions([]);
  }, [searchInputValue]);

  async function handleSearch(event) {
    event.preventDefault();

    if (!searchInputValue) setSearchInputValue("San Francisco");

    // make call to api, send city string, receive coordinates
    try {
      const encodedLocation = encodeURIComponent(searchInputValue)
        .trim()
        .toLowerCase();

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
    } catch (err) {
      // TODO: give error message as tip under input
      console.error(err.message || "An error occurred");
    }
  }

  function handleSuggestionClick(event) {
    setSearchInputValue(event.target.innerText);
    handleSearch(event);
  }

  return (
    <form className={styles.searchInput} onSubmit={handleSearch}>
      <input
        className={styles.searchInput_input}
        name="searchInput"
        value={searchInputValue}
        placeholder="Enter a neighborhood, city, or ZIP code"
        autoComplete="off"
        onChange={(event) => setSearchInputValue(event.target.value)}
        onFocus={() => setSearchInputActive(true)}
        onBlur={() => setSearchInputActive(false)}
      />
      {!!searchSuggestions.length && searchInputActive && (
        <ul className={styles.searchInput_searchSuggestions}>
          {searchSuggestions.map((searchSuggestion) => (
            <li key={searchSuggestion}>
              <p onClick={handleSuggestionClick} className={styles.fakeLink}>
                {searchSuggestion}
              </p>
            </li>
          ))}
        </ul>
      )}
      <button type="submit" className={styles.searchInput_button}>
        <MagnifyingGlass />
      </button>
    </form>
  );
}
