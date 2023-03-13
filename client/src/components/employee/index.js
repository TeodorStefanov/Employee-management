import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";
const Employee = ({ id, name, completedTasks, isTop }) => {
  const navigate = useNavigate();

  return (
    <div
      className={styles.container}
      onClick={() => navigate(`/employees/${id}`)}
    >
      <p className={styles.title}>{name}</p>
      <p className={styles.name}>
        {isTop ? "Completed Tasks" : "Completed Tasks for previous month"}:{" "}
        {completedTasks}
      </p>
    </div>
  );
};

export default Employee;
