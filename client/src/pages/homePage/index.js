import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Employee from "../../components/employee";
import PageLayout from "../../components/pageLayout";
import Task from "../../components/task";
import styles from "./index.module.css";
const HomePage = () => {
  const [toDoTasks, setToDoTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [topEmployees, setTopEmployees] = useState([]);
  const [employeeFirst, setEmployeeFirst] = useState([]);
  const navigate = useNavigate();
  const getTasks = async () => {
    const promise = await fetch("http://localhost:9000/api/task/tasks");
    const response = await promise.json();
    setToDoTasks(response.filter((el) => el.completed === false).reverse());
    setCompletedTasks(response.filter((el) => el.completed === true).reverse());
    const promiseEmployeeStatistic = await fetch(
      "http://localhost:9000/api/employee/statistic"
    );
    if (promiseEmployeeStatistic.status === 200) {
      const responseEmployeeStatistic = await promiseEmployeeStatistic.json();
      setTopEmployees(responseEmployeeStatistic.employees);
      setEmployeeFirst(responseEmployeeStatistic.employee);
    } else {
      navigate("/error");
    }
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
                  name={
                    el.assignedTo
                      ? `${el.assignedTo.firstName} ${el.assignedTo.lastName}`
                      : ""
                  }
                  key={index}
                  priority={el.priority}
                  dueDate={el.dueDate}
                  taskId={el._id}
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
                  name={
                    el.assignedTo
                      ? `${el.assignedTo.firstName} ${el.assignedTo.lastName}`
                      : ""
                  }
                  key={index}
                  priority={el.priority}
                  dueDate={el.dueDate}
                  taskId={el._id}
                  completedDate={el.completedDate}
                />
              );
            })}
          </div>
        </div>
        <div className={styles.toDo}>
          <div className={styles.toDoTasks}>
            <p className={styles.toDoTitle}>TOP EMPLOYEE</p>

            {employeeFirst.map((el, index) => {
              return (
                <Employee
                  id={el._id}
                  name={`${el.firstName} ${el.middleNames && el.middleNames} ${
                    el.lastName
                  }`}
                  key={index}
                  completedTasks={el.completedTasks.length}
                  isTop={true}
                />
              );
            })}
            <p className={styles.toDoTitle}>TOP 5 EMPLOYEES LAST MONTH</p>
            {topEmployees.map((el, index) => {
              return (
                <Employee
                  id={el._id}
                  name={`${el.firstName} ${el.middleNames && el.middleNames} ${
                    el.lastName
                  }`}
                  key={index}
                  completedTasks={el.completedTasks.length}
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
