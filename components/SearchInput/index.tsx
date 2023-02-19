import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MagnifyingGlass } from "phosphor-react";
import { useStore } from "../../store";
import styles from "./searchInput.module.css";

// Use Google Places API - Place Autocomplete to show user a list of possible locations
async function fetchSearchSuggestions(searchInputValue: string) {
  const res = await (
    await fetch(`/api/locations/suggestions?input=${searchInputValue}`)
  ).json();

  return res;
}

let timeout: NodeJS.Timeout;

export function SearchInput() {
  const [setInitHomeMap] = useStore((state) => [state.setInitHomeMap]);

  const [searchInputValue, setSearchInputValue] = useState<string>("");
  const [searchInputActive, setSearchInputActive] = useState<boolean>(false);
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);

  const router = useRouter();

  // update search suggestions
  useEffect(() => {
    if (searchInputValue.length >= 3) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        (async () => {
          const results: string[] = await fetchSearchSuggestions(
            searchInputValue
          );
          setSearchSuggestions(results);
        })();
      }, 250);
    }

    if (!searchInputValue || searchInputValue.length < 3)
      setSearchSuggestions([]);
  }, [searchInputValue]);

  // make call to API, send location, receive geo coordinates
  async function handleSearch(event, locationParam: string = "") {
    event.preventDefault();

    const location =
      locationParam ||
      event.target.elements.searchInput.value ||
      "San Francisco";

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
      setSearchInputValue("");
    } catch (err) {
      // TODO: give error message as tip under input
      console.error(err.message || "An error occurred");
    }
  }

  async function handleSuggestionClick(event) {
    setSearchInputValue(event.target.innerText);
    handleSearch(event, event.target.innerText);
  }

  function handleFormBlur(event) {
    if (!event.currentTarget.contains(event.relatedTarget))
      setSearchInputActive(false);
  }

  return (
    <form
      className={styles.searchInput}
      onSubmit={handleSearch}
      onFocus={() => setSearchInputActive(true)}
      onBlur={handleFormBlur}
    >
      <input
        className={styles.searchInput_input}
        name="searchInput"
        value={searchInputValue}
        placeholder="Enter a neighborhood, city, or ZIP code"
        autoComplete="off"
        onChange={(event) => setSearchInputValue(event.target.value)}
      />
      {!!searchSuggestions.length && searchInputActive && (
        <ul className={styles.searchInput_searchSuggestions}>
          {searchSuggestions.map((searchSuggestion) => (
            <li key={searchSuggestion} tabIndex={0}>
              {/* add tabIndex to help with form onBlur*/}
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
