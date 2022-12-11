import styles from "./input.module.css";

export function Input({
  name,
  type = "text",
  label,
  value,
  ref = undefined,
  onChange,
  onFocus = undefined,
  onBlur = undefined,
  required = false,
  disabled = false,
}) {
  return (
    <div className={styles.inputComponent}>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        name={name}
        placeholder={label}
        value={value}
        ref={ref}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        required={required}
        disabled={disabled}
      />
    </div>
  );
}
