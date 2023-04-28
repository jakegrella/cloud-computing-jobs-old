import { useEffect, useRef, useState } from "react";
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
  const [setHomeMap] = useStore((state) => [state.setHomeMap]);

  const [searchInputValue, setSearchInputValue] = useState<string>("");
  const [searchInputActive, setSearchInputActive] = useState<boolean>(false);
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);

  const searchInput = useRef(null);

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

    function encodeLocation(location: string) {
      return encodeURIComponent(location).trim().toLowerCase();
    }

    async function fetchSearchedLocation(location: string) {
      const res = await (
        await fetch(
          `/api/locations/geolocation?search=${encodeLocation(location)}`
        )
      ).json();
      console.log("fetch search location res", res);

      return res;
    }

    try {
      // try to search using user inputted location
      // if fail, retry once more with first result of search suggestions
      const res = await fetchSearchedLocation(location);

      if ((!res.lat || !res.lng) && !searchSuggestions.length) {
        // no res and no suggestions
        throw new Error(res.message || "An error occurred");
      } else if ((!res.lat || !res.lng) && !!searchSuggestions.length) {
        // no res but yes suggestions
        const res = await fetchSearchedLocation(searchSuggestions[0]);

        if (!res.lat || !res.lng) {
          // no res
          throw new Error(res.message || "An error occurred");
        } else {
          setHomeMap({
            center: { lat: res.lat, lng: res.lng },
            zoom: 12,
          });
        }
      } else {
        setHomeMap({
          center: { lat: res.lat, lng: res.lng },
          zoom: 12,
        });
      }

      setSearchInputValue("");
      setSearchInputActive(false);
      searchInput.current.blur(); // remove focus
    } catch (err) {
      // TODO: give error message as tip under input
      console.error(err.message || "An error occurred");
    }
  }

  function handleSearchInputChange(event) {
    setSearchInputValue(event.target.value);
  }

  async function handleSuggestionClick(event) {
    setSearchInputValue(event.target.innerText);
    handleSearch(event, event.target.innerText);
  }

  function handleFormBlur(event) {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setSearchInputActive(false);
    }
  }

  return (
    <div className={styles.search}>
      <form
        className={styles.search__form}
        onSubmit={handleSearch}
        onFocus={() => setSearchInputActive(true)}
        onBlur={handleFormBlur}
      >
        <input
          className={styles.search__form__input}
          ref={searchInput}
          name="searchInput"
          value={searchInputValue}
          placeholder="Enter a neighborhood, city, or ZIP code"
          autoComplete="off"
          onChange={handleSearchInputChange}
        />

        {!!searchSuggestions.length && searchInputActive && (
          <ul className={styles.search__searchSuggestions}>
            {searchSuggestions.map((searchSuggestion) => (
              <li key={searchSuggestion} tabIndex={0}>
                {/* add tabIndex to help with form onBlur*/}
                <p
                  onClick={handleSuggestionClick}
                  className={styles.search__searchSuggestions__item}
                >
                  {searchSuggestion}
                </p>
              </li>
            ))}
          </ul>
        )}

        <button type="submit" className={styles.search__form__button}>
          <MagnifyingGlass />
        </button>
      </form>
    </div>
  );
}
