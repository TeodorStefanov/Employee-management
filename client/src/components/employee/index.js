import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";
const Employee = ({ id, name, completedTasks, taskId, completedDate }) => {
  const [timeStyle, setTimeStyle] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      className={styles.container}
      onClick={() => navigate(`/employees/${taskId}`)}
    >
      <p className={styles.title}>{name}</p>
      <p className={styles.name}>
        Completed Tasks for previous month: {completedTasks}
      </p>
    </div>
  );
};

export default Employee;
