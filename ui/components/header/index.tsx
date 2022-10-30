import { useStore } from "../../store";
import Logo from "../logo";
import Menu from "../menu";
import MenuIcon from "../menu-icon";
import styles from "./header.module.css";

export default function Header() {
  const isMenuVisible = useStore((state) => state.isMenuVisible);

  return (
    <header className={styles.header}>
      <Logo />
      <MenuIcon />
      {isMenuVisible && <Menu />}
    </header>
  );
}
