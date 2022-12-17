import styles from "./input.module.css";

interface IInputProps
  extends React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    React.AriaAttributes {
  label?: string;
  forwardRef?: React.MutableRefObject<any>;
  bordered?: boolean;
}

export function Input({
  name,
  type = "text",
  label,
  value,
  forwardRef,
  onChange,
  onFocus,
  onBlur,
  required = false,
  disabled = false,
  bordered = false,
  autoComplete = "on",
}: IInputProps) {
  return (
    <div className={`${styles.inputComponent} ${bordered && styles.bordered}`}>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        name={name}
        placeholder={label}
        value={value}
        ref={forwardRef}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        required={required}
        disabled={disabled}
        autoComplete={autoComplete}
      />
    </div>
  );
}
