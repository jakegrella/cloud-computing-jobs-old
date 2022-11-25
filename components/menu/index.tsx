import Link from "next/link";
import { useStore } from "../../store";
import { Card } from "../card";
import styles from "./menu.module.css";

export function Menu() {
  const setIsMenuVisible = useStore((state) => state.setIsMenuVisible);

  return (
    <div className={styles.menu}>
      <Card>
        <nav>
          <ul>
            <li>
              <Link href="/" onClick={() => setIsMenuVisible(false)}>
                <p className={styles["menu-item"]}>Jobs</p>
              </Link>
            </li>
            <li>
              <Link href="/companies" onClick={() => setIsMenuVisible(false)}>
                <p className={styles["menu-item"]}>Companies</p>
              </Link>
            </li>
          </ul>
        </nav>
      </Card>
    </div>
  );
}
