import { Card } from "../card";
import { useStore } from ".././../store";
import { useWindowDimensions } from "../../utils/hooks";
import styles from "./search.module.css";
import { useEffect, useRef, useState } from "react";
// import { Input } from "../input";

function ButtonGroup() {
  const homePageView = useStore((state) => state.homePageView);
  const setHomePageView = useStore((state) => state.setHomePageView);

  function handleClick({ target }) {
    setHomePageView(target.innerHTML.toLowerCase());
  }

  return (
    <div className={styles.buttonGroup}>
      <div
        className={`${styles.buttonBackground} ${styles[homePageView]}`}
      ></div>
      <button onClick={handleClick}>Map</button>
      <button onClick={handleClick}>List</button>
      <button onClick={handleClick}>Both</button>
    </div>
  );
}

export function Search({ className = undefined, placeholder = "Search" }) {
  const { width } = useWindowDimensions();

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState("");

  const searchInput = useRef(null);

  function handleInputFocus() {
    setDropdownVisible(true);
  }

  function handleInputBlur(e) {
    if (
      e.relatedTarget?.innerHTML === "city:" ||
      e.relatedTarget?.innerHTML === "company:" ||
      e.relatedTarget?.innerHTML === "job title:"
    ) {
      // add that to value of search input
      // reset focus to input
      searchInput.current.focus();
    } else {
      setDropdownVisible(false);
    }
  }

  function handleSearchInputValueChange(e) {
    setSearchInputValue(e.target.value);
  }

  function handleDropdownFilterClick(e) {
    const x = `${e.target.innerHTML} ${searchInputValue}`;
    setSearchInputValue(x);
  }

  return (
    <div className={styles.search}>
      {dropdownVisible ? (
        <div className={`${styles.search_bar} ${className ?? ""}`}>
          <input
            type="text"
            ref={searchInput}
            placeholder={placeholder}
            value={searchInputValue}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onChange={handleSearchInputValueChange}
          />
          {/* <Input
            type="text"
            name="search"
            label={placeholder}
            value={searchInputValue}
            ref={searchInput}
            onChange={handleSearchInputValueChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          /> */}
          <Card className={styles.dropdown}>
            <button onClick={handleDropdownFilterClick}>city:</button>
            <button onClick={handleDropdownFilterClick}>company:</button>
            <button onClick={handleDropdownFilterClick}>job title:</button>
          </Card>
        </div>
      ) : (
        <div className={`${styles.search_bar} ${className ?? ""}`}>
          <input
            type="text"
            placeholder={placeholder}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          />
          {/* <Input
            type="text"
            name="search"
            label={placeholder}
            value={searchInputValue}
            onChange={handleSearchInputValueChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          /> */}
        </div>
      )}
      {width < 768 && <ButtonGroup />}
    </div>
  );
}
