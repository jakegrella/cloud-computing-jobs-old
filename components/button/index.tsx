import styles from "./button.module.css";

export function Button({ children, onClick = undefined }) {
  return (
    <button className={styles.button} onClick={onClick}>
      {children}
    </button>
  );
}
