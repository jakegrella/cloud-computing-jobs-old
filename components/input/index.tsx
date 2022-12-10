import styles from "./input.module.css";

export function Input({
  name,
  type = "text",
  label,
  value,
  onChange,
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
        onChange={onChange}
        onBlur={onBlur}
        required={required}
        disabled={disabled}
      />
    </div>
  );
}
