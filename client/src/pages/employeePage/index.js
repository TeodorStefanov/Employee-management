import React, { useEffect, useState } from "react";
import PageLayout from "../../components/pageLayout";
import styles from "./index.module.css";
import { useForm } from "react-hook-form";
import Input from "../../components/input";
import {
  dateOfBirthValidation,
  emailValidation,
  phoneNumberValidation,
  salaryValidation,
} from "../../utils/inputValidationsEmployee";
import dataService from "../../services/dataService";
import { useNavigate, useParams } from "react-router-dom";

const EmployeePage = () => {
  const [employee, setEmployee] = useState({});
  const [tasksOfEmployee, setTasksOfEmployee] = useState([]);
  const navigate = useNavigate();
  const params = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const checkEmployee = async () => {
    const id = params.id;
    console.log(id);
    const promise = await fetch(
      `http://localhost:9000/api/employee/employee?id=${id}`
    );
    if (promise.status === 200) {
      const response = await promise.json();
      setEmployee(() => ({
        ...response,
      }));
      setTasksOfEmployee(response.assignedTasks);
    } else {
      navigate("/error");
    }
  };
  const handleInputs = async (data) => {
    const promise = await dataService({
      method: "POST",
      url: "employee/create",
      data: data,
    });
    if (promise.status === 200) {
      navigate("/");
    } else {
      navigate("/error");
    }
  };
  const handleDeleteEmployee = async () => {
    const promise = await dataService({
      method: "DELETE",
      url: "task/delete",
      data: { employeeId: employee._id },
    });
    if (promise.status === 200) {
      navigate("/");
    } else {
      navigate("/error");
    }
  };
  useEffect(() => {
    checkEmployee();
  }, []);
  return (
    <PageLayout>
      {!employee ? (
        <div>Loading...</div>
      ) : (
        <div className={styles.container}>
          <div className={styles.main}>
            <p>
              <b>Full Name:</b>{" "}
              {`${employee.firstName} ${
                employee.middleNames && employee.middleNames
              } ${employee.lastName}`}
            </p>
            <p>
              <b>Date of Birth:</b>{" "}
              {new Date(employee.dateOfBirth).toLocaleDateString()}
            </p>
            <p>
              <b>Email:</b> {employee.email}
            </p>
            <p>
              <b>Phone Number: </b>
              {employee.phoneNumber}
            </p>

            <p>
              <b>Salary:</b> {employee.monthlySalary} BGN
            </p>
            <div>
              <b>Assigned Tasks:</b>
              {tasksOfEmployee.map((el, index) => {
                return (
                  <p
                    key={index}
                    onClick={() => navigate(`/tasks/${el._id}`)}
                    className={styles.task}
                  >
                    {el.title}
                  </p>
                );
              })}
            </div>
            <div className={styles.buttons}>
              <button
                type="submit"
                className={styles.button}
                onClick={() => navigate(`/employee/edit/${employee._id}`)}
              >
                Edit
              </button>
              <button
                type="submit"
                className={styles.button}
                onClick={handleDeleteEmployee}
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
export default EmployeePage;
