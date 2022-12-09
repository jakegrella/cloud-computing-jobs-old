import styles from "./button.module.css";

interface IButton {
  children: any;
  className?: any;
  disabled?: boolean;
  onClick?: any;
  type?: "button" | "submit" | "reset";
}

export function Button({
  children,
  className,
  disabled = false,
  onClick = undefined,
  type = "button",
}: IButton) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`${styles.button}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
