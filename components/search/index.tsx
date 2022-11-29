import { Card } from "../card";
import { useStore } from ".././../store";
import { useWindowDimensions } from "../../utils/hooks";
import styles from "./search.module.css";

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

  return (
    <div className={styles.search}>
      <Card className={`${styles.search_bar} ${className ?? ""}`}>
        <input type="text" placeholder={placeholder} />
      </Card>
      {width < 768 && <ButtonGroup />}
    </div>
  );
}
