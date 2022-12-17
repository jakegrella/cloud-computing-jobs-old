import Link from "next/link";
import { Button, Card } from "../../components";
import { useStore } from "../../store";
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
            <li>
              <Button>
                <Link href="/jobs/post" onClick={() => setIsMenuVisible(false)}>
                  <p className={styles["menu-item"]}>Post a Job</p>
                </Link>
              </Button>
            </li>
          </ul>
        </nav>
      </Card>
    </div>
  );
}
