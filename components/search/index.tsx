import { Card } from "../card";
import { useStore } from ".././../store";
import { useWindowDimensions } from "../../utils/hooks";
import styles from "./search.module.css";
import { useEffect, useRef, useState } from "react";

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

  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log("document", document.activeElement);
    }
  }, []);

  function handleInputFocus() {
    setDropdownVisible(true);
  }

  function handleInputBlur(e) {
    console.log("x", e.relatedTarget?.innerHTML);
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
    console.log("filter clicked", e);

    const x = `${e.target.innerHTML} ${searchInputValue}`;
    setSearchInputValue(x);
  }

  return (
    <div className={styles.search}>
      {dropdownVisible ? (
        <Card className={`${styles.search_bar} ${className ?? ""}`}>
          <input
            type="text"
            ref={searchInput}
            placeholder={placeholder}
            value={searchInputValue}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onChange={handleSearchInputValueChange}
          />
          <Card className={styles.dropdown}>
            <button onClick={handleDropdownFilterClick}>city:</button>
            <button onClick={handleDropdownFilterClick}>company:</button>
            <button onClick={handleDropdownFilterClick}>job title:</button>
          </Card>
        </Card>
      ) : (
        <Card className={`${styles.search_bar} ${className ?? ""}`}>
          <input
            type="text"
            placeholder={placeholder}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          />
        </Card>
      )}
      {width < 768 && <ButtonGroup />}
    </div>
  );
}
