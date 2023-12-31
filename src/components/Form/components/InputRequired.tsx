import { useContext } from "react";
import { FormContext } from "..";
import styles from "./styles.module.scss";

interface InputProps {
  type?: "text" | "password" | "number" | "email" | "date";
  name: string;
  label: string;
  placeholder?: string;
}

export function InputRequired({ label, name, placeholder, type }: InputProps) {
  const { formValues, setFormValues } = useContext(FormContext)!;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  return (
    <div className={styles.inputContainer}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={formValues[name] || ""}
        onChange={handleChange}
        placeholder={placeholder}
        required
      />
      {formValues[name] === "" && (
        <p className="text-red-500 text-xs">Este campo es requerido</p>
      )}
    </div>
  );
}
