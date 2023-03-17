import Link from "next/link";
import { Button, Logo } from "../../components";
import styles from "./header.module.css";

export function Header() {
  function handlePostAJobButtonClick() {}

  return (
    <header className={styles.header}>
      <Logo />
      <Button onClick={handlePostAJobButtonClick}>
        <Link href="/jobs/post">Post a Job</Link>
      </Button>
    </header>
  );
}
