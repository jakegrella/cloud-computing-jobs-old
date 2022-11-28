import { useStore } from "../../store";
import styles from "./menu-icon.module.css";

export function MenuIcon() {
  const isMenuVisible = useStore((state) => state.isMenuVisible);
  const setIsMenuVisible = useStore((state) => state.setIsMenuVisible);

  return (
    <div onClick={() => setIsMenuVisible(!isMenuVisible)}>
      <div
        className={`${styles["menu-icon_top"]} ${
          styles[isMenuVisible.toString()]
        }`}
      ></div>
      <div
        className={`${styles["menu-icon_bottom"]} ${
          styles[isMenuVisible.toString()]
        }`}
      ></div>
    </div>
  );
}
