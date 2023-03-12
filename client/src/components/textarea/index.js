import React from "react";
import styles from "./index.module.css";
const TextArea = ({ name, formHook, title, errorMessage }) => {
  return (
    <div className={styles.container}>
      <textarea {...formHook} id={name} className={styles.field}></textarea>
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
export default TextArea;
