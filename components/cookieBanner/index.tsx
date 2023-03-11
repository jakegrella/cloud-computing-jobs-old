import { Button } from "../button";
import styles from "./cookieBanner.module.css";

export function CookieBanner() {
  //   function handleAllowAllButtonClick() {}

  return (
    <div className={styles.banner}>
      <p>
        Our website uses cookies to enhance your experience and to analyze
        performance and traffic.
      </p>
      <div className={styles.buttons}>
        {/* <Button onClick={handleAllowNecessaryButtonClick}>Allow Necessary</Button> */}
        {/* <Button onClick={handleAllowAllButtonClick}>Allow All</Button> */}
      </div>
    </div>
  );
}
