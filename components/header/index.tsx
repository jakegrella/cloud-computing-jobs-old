import { Logo, Menu, MenuIcon } from "../../components";
import { useStore } from "../../store";
import styles from "./header.module.css";

export function Header() {
  const isMenuVisible = useStore((state) => state.isMenuVisible);

  return (
    <header className={styles.header}>
      <Logo />
      <MenuIcon />
      {isMenuVisible && <Menu />}
    </header>
  );
}
