import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";
const Task = ({ title, name, dueDate, taskId, employeeId }) => {
  const [dueDateDate, setDueDateDate] = useState(
    new Date(dueDate).toLocaleDateString()
  );
  const [timeStyle, setTimeStyle] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const date1 = new Date().getTime();
    const date2 = new Date(dueDate).getTime();
    const timeDifference = Math.floor((date2 - date1) / (1000 * 3600 * 24));
    if (timeDifference < 5) {
      setTimeStyle(true);
    }
  }, []);
  console.log(timeStyle);
  return (
    <div className={styles.container}>
      <p className={styles.title} onClick={() => navigate(`/tasks/${taskId}`)}>
        {title}
      </p>
      <p
        className={styles.name}
        onClick={() => navigate(`/employee/${employeeId}`)}
      >
        Assigned to: {name}
      </p>
      <p
        className={`${styles.date} ${timeStyle ? styles.dateColor : ""}`}
        onClick={() => navigate(`/tasks/${taskId}`)}
      >
        Due Date {dueDateDate}
      </p>
    </div>
  );
};

export default Task;
