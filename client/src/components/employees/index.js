import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";
const Employees = ({
  id,
  firstName,
  middleNames,
  lastName,
  dateOfBirth,
  email,
  salary,
  completedTasks,
}) => {
  const navigate = useNavigate();
  return (
    <div
      className={styles.container}
      onClick={() => navigate(`/employees/${id}`)}
    >
      <div className={styles.title}>{firstName}</div>
      <div className={styles.title}>{middleNames}</div>
      <div className={styles.title}>{lastName}</div>
      <div className={styles.title}>
        {new Date(dateOfBirth).toLocaleDateString()}
      </div>
      <div className={styles.title}>{email}</div>
      <div className={styles.title}>{salary} BGN</div>
      <div className={styles.title}>{completedTasks}</div>
    </div>
  );
};
export default Employees;
