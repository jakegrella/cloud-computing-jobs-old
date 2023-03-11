import { hasCookie, setCookie } from "cookies-next";
import { X } from "phosphor-react";
import { useEffect, useState } from "react";
import { Button } from "../button";
import styles from "./consentBanner.module.css";

export function ConsentBanner() {
  const [consent, setConsent] = useState(true);

  useEffect(() => {
    setConsent(hasCookie("localConsent"));
  }, []);

  const handleAllowAll = () => {
    setConsent(true);
    setCookie("localConsent", "true", { maxAge: 60 * 60 * 24 * 365 });
    gtag("consent", "update", {
      ad_storage: "granted",
      analytics_storage: "granted",
    });
  };

  const handleAllowNecessary = () => {
    setConsent(true);
    setCookie("localConsent", "false", { maxAge: 60 * 60 * 24 * 365 });
  };

  const handleClose = () => {
    setConsent(true);
  };

  if (consent === true) {
    return null;
  }

  return (
    <div className={styles.banner}>
      <p>
        Our website uses cookies to enhance your experience and to analyze
        performance and traffic.
      </p>
      <div className={styles.buttons}>
        <Button onClick={handleAllowNecessary}>Allow Necessary</Button>
        <Button onClick={handleAllowAll}>Allow All</Button>
        <X className={styles.x} onClick={handleClose} />
      </div>
    </div>
  );
}
