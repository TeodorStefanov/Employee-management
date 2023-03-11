import React from "react";
import styles from "./index.module.css";
const Select = ({ name, formHook, title, errorMessage, options }) => {
  return (
    <div className={styles.container}>
      <select {...formHook} id={name} className={styles.field}>
        <option value="DEFAULT" ></option>
        {options.map((el, index) => {
          return (
            <option value={el.id} key={index}>
              {el.fullname}
            </option>
          );
        })}
      </select>
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

export default Select;
