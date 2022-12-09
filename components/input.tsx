import { Card } from "./card";

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
    <div>
      <label htmlFor={name}>{label}</label>
      <Card>
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
      </Card>
    </div>
  );
}
