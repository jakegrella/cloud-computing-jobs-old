import { Card } from "../card";
import styles from "./search.module.css";

export function Search({ className = undefined, placeholder = "Search" }) {
  return (
    <Card className={`${styles.search} ${className ?? ""}`}>
      <input type="text" placeholder={placeholder} />
    </Card>
  );
}
