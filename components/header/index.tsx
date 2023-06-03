import Link from "next/link";
import { Button, Logo } from "../../components";
import styles from "./header.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <Logo />
      <p>Email post@cloudcomputingjobs.com to post a job</p>
    </header>
  );
}
