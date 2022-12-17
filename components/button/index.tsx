import styles from "./button.module.css";

interface IButtonProps
  extends React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    React.AriaAttributes {}

export function Button({
  children,
  disabled = false,
  onClick = undefined,
  type = "button",
}: IButtonProps) {
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
