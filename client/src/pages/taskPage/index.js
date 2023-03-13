import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageLayout from "../../components/pageLayout";
import dataService from "../../services/dataService";
import styles from "./index.module.css";
const TaskPage = () => {
  const [task, setTask] = useState({});
  const [taskId, setTaskId] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [completedTask, setCompletedTask] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  const checkTask = async () => {
    const id = params.id;
    const promise = await fetch(`http://localhost:9000/api/task/task?id=${id}`);
    if (promise.status !== 200) {
      navigate("/error");
    } else {
      const response = await promise.json();
      setTask(() => ({
        ...response,
      }));
      setTaskId(response._id);
      setEmployeeId(response.assignedTo._id);
      setCompletedTask(response.completed);
    }
  };
  const handleCompletedTask = async () => {
    const promise = await dataService({
      method: "PUT",
      url: "task/completed",
      data: { taskId, employeeId },
    });
    if (promise.status === 200) {
      navigate("/");
    } else {
      navigate("/error");
    }
  };
  const handleDeleteTask = async () => {
    const promise = await dataService({
      method: "DELETE",
      url: "task/delete",
      data: { taskId, employeeId },
    });
    if (promise.status === 200) {
      navigate("/");
    } else {
      navigate("/error");
    }
  };
  useEffect(() => {
    checkTask();
  }, []);

  return (
    <PageLayout>
      {!taskId ? (
        <div>Loading....</div>
      ) : (
        <div className={styles.container}>
          <div className={styles.main}>
            <p>
              <b>Title:</b> {task.title}
            </p>
            <p>
              <b>Description:</b> {task.description}
            </p>
            <p>
              <b>Assigned To:</b>{" "}
              <span
                onClick={() => navigate(`/employees/${employeeId}`)}
                className={styles.span}
              >
                {task.assignedTo
                  ? `${task.assignedTo.firstName} ${
                      task.assignedTo.middleNames && task.assignedTo.middleNames
                    } ${task.assignedTo.lastName}`
                  : ""}
              </span>
            </p>
            <p>
              <b>Priority: </b>
              {task.priority}
            </p>
            {completedTask ? (
              <p>
                <b>Completed Date:</b>{" "}
                {new Date(task.completedDate).toLocaleDateString()}
              </p>
            ) : (
              <p>
                <b>Due Date:</b> {new Date(task.dueDate).toLocaleDateString()}
              </p>
            )}
            <div className={styles.buttons}>
              {!completedTask ? (
                <>
                  <button
                    type="submit"
                    className={styles.button}
                    onClick={() => navigate(`/task/edit/${taskId}`)}
                  >
                    Edit
                  </button>
                  <button
                    type="submit"
                    className={styles.button}
                    onClick={handleCompletedTask}
                  >
                    Completed
                  </button>{" "}
                </>
              ) : (
                ""
              )}
              <button
                type="submit"
                className={styles.button}
                onClick={handleDeleteTask}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default TaskPage;
