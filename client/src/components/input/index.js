import React from "react";
import styles from "./index.module.css";
const Input = ({
  name,
  formHook,
  type,
  title,
  errorMessage,
  styleChangeWidth,
  styleChangeHeight,
}) => {
  return (
    <div
      className={`${
        !styleChangeWidth ? styles.container : styles.changeContainer
      }`}
    >
      <input
        {...formHook}
        id={name}
        type={type}
        className={styles.field}
        autoComplete=""
        step={0.01}
      />
      <label htmlFor={name} className={styles.title}>
        {title}
      </label>
      {errorMessage ? (
        <span className={styles.errorMessage}>{errorMessage}</span>
      ) : (
        ""
      )}
    </div>
  );
};

export default Input;
