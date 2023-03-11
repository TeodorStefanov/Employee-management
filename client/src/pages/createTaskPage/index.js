import React, { useEffect, useState } from "react";
import Input from "../../components/input";
import PageLayout from "../../components/pageLayout";
import styles from "./index.module.css";
import { useForm } from "react-hook-form";
import { dueDateValidation } from "../../utils/inputValidationsTask";
import dataService from "../../services/dataService";
const CreateTaskPage = () => {
  const [employees, setEmployees] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleInputs = () => {};
  const handleGetEmployees = async () => {
    const promise = await fetch("http://localhost:9000/api/employee/employees");
    const response = await promise.json();
    setEmployees(response);
    
  };
  useEffect(() => {
    handleGetEmployees();
  }, []);
  return (
    <PageLayout>
      <div className={styles.container}>
        <h1 className={styles.title}>Create Task</h1>
        <p>Please complete the form below.</p>
        <form onSubmit={handleSubmit(handleInputs)} className={styles.form}>
          <div className={styles.middleInputs}>
            <Input
              name="title"
              formHook={register("title", {
                required: "This field is required",
              })}
              type="text"
              title="Title"
              errorMessage={errors.title ? errors.title.message : ""}
              styleChangeWidth={true}
            />
            <Input
              name="description"
              formHook={register("description")}
              type="text"
              title="Description"
              errorMessage={
                errors.description ? errors.description.message : ""
              }
              styleChangeWidth={true}
            />
            <Input
              name="assignedTo"
              formHook={register("assignedTo", {
                required: "This field is required",
              })}
              type="text"
              title="Assigned To"
              errorMessage={errors.assignedTo ? errors.assignedTo.message : ""}
              styleChangeWidth={true}
            />
            <Input
              name="dueDate"
              formHook={register("dueDate", {
                required: "This field is required",
                validate: (val) => {
                  return dueDateValidation(val);
                },
              })}
              label="dueDate"
              type="date"
              title="Due Date"
              errorMessage={errors.dueDate ? errors.dueDate.message : ""}
              styleChange={true}
            />
          </div>
          <button type="submit" className={styles.submitButton}>
            Submit
          </button>
        </form>
      </div>
    </PageLayout>
  );
};
export default CreateTaskPage;