import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Employees from "../../components/employees";
import PageLayout from "../../components/pageLayout";
import styles from "./index.module.css";
const EmployeesPage = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();
  const handleGetEmployees = async () => {
    const promise = await fetch(
      "http://localhost:9000/api/employee/allEmployees"
    );
    if (promise.status === 200) {
      const response = await promise.json();
      setEmployees(response);
      
    } else {
      navigate("/error");
    }
  };
  useEffect(() => {
    handleGetEmployees();
  }, []);
  return (
    <PageLayout>
      {!employees ? (
        <div>Loading...</div>
      ) : (
        <div className={styles.container}>
          <div className={styles.title}>
            <p className={styles.titleBox}>First Name</p>
            <p className={styles.titleBox}>Middle Names</p>
            <p className={styles.titleBox}>Last Name</p>
            <p className={styles.titleBox}>Date Of Birth</p>
            <p className={styles.titleBox}>Email</p>
            <p className={styles.titleBox}>Salary</p>
            <p className={styles.titleBox}>Completed Tasks</p>
          </div>
          {employees.map((el, index) => {
            
            return (
              <Employees
                id={el._id}
                firstName={el.firstName}
                middleNames={el.middleNames}
                lastName={el.lastName}
                dateOfBirth={el.dateOfBirth}
                email={el.email}
                salary={el.monthlySalary}
                completedTasks={el.completedTasks.length}
                key={index}
              />
            );
          })}
        </div>
      )}
    </PageLayout>
  );
};
export default EmployeesPage;
