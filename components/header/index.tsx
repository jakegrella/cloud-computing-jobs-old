import Link from "next/link";
import { Button, Logo } from "../../components";
import styles from "./header.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <Logo />

      <div>
        <Button>
          <Link href="/jobs/post">Employers</Link>
        </Button>

        <Button>
          <Link href="/account/login">Log In</Link>
        </Button>
      </div>
    </header>
  );
}
