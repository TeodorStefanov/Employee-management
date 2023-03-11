import React, { useEffect, useState } from "react";
import PageLayout from "../../components/pageLayout";
import Task from "../../components/task";
import getNavigation from "../../utils/navigation";
import styles from "./index.module.css";
const HomePage = () => {
  const [toDoTasks, setToDoTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  const getTasks = async () => {
    const promise = await fetch("http://localhost:9000/api/task/tasks");
    const response = await promise.json();
    setToDoTasks(response.filter((el) => el.completed === false));
    setCompletedTasks(response.filter((el) => el.completed === true));
  };
  useEffect(() => {
    getTasks();
  }, []);
  return (
    <PageLayout>
      <div className={styles.container}>
        <div className={styles.toDo}>
          <p className={styles.toDoTitle}>IN PROGRESS {toDoTasks.length}</p>
          <div className={styles.toDoTasks}>
            {toDoTasks.map((el, index) => {
              return (
                <Task
                  title={el.title}
                  name={`${el.assignedTo.firstName} ${el.assignedTo.lastName}`}
                  key={index}
                  dueDate={el.dueDate}
                  taskId={el._id}
                  employeeId={el.assignedTo._id}
                />
              );
            })}
          </div>
        </div>
        <div className={styles.toDo}>
          <p className={styles.toDoTitle}>COMPLETED {completedTasks.length}</p>
          <div className={styles.toDoTasks}>
            {completedTasks.map((el, index) => {
              return (
                <Task
                  title={el.title}
                  name={`${el.assignedTo.firstName} ${el.assignedTo.lastName}`}
                  key={index}
                  dueDate={el.dueDate}
                  taskId={el._id}
                  employeeId={el.assignedTo._id}
                />
              );
            })}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};
export default HomePage;
