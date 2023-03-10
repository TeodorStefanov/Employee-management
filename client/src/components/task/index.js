import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";
const Task = ({ title, name, priority, dueDate, taskId, completedDate }) => {
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
  return (
    <div
      className={styles.container}
      onClick={() => navigate(`/tasks/${taskId}`)}
    >
      <p className={styles.title}>{title}</p>
      <p className={styles.name}>Assigned to: {name}</p>
      {completedDate ? (
        <div className={styles.priorityDueDate}>
          <p
            className={
              priority === "Low"
                ? styles.priorityGreen
                : priority === "Medium"
                ? styles.priorityYellow
                : styles.priorityRed
            }
          >
            Priority: {priority}
          </p>
          <p className={styles.date}>
            Completed Date {new Date(completedDate).toLocaleDateString()}
          </p>
        </div>
      ) : (
        <div className={styles.priorityDueDate}>
          <p
            className={
              priority === "Low"
                ? styles.priorityGreen
                : priority === "Medium"
                ? styles.priorityYellow
                : styles.priorityRed
            }
          >
            Priority: {priority}
          </p>
          <p className={`${styles.date} ${timeStyle ? styles.dateColor : ""}`}>
            Due Date {new Date(dueDate).toLocaleDateString()}
          </p>
        </div>
      )}
    </div>
  );
};

export default Task;
