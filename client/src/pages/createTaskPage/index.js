import React, { useEffect, useState } from "react";
import Input from "../../components/input";
import PageLayout from "../../components/pageLayout";
import styles from "./index.module.css";
import { useForm } from "react-hook-form";
import {
  assignedToValidation,
  dueDateValidation,
} from "../../utils/inputValidationsTask";
import dataService from "../../services/dataService";
import Select from "../../components/select";
import { useNavigate } from "react-router-dom";
import TextArea from "../../components/textarea";
const CreateTaskPage = () => {
  const [employees, setEmployees] = useState([]);
  const [priorityOptions, setPriorityOptions] = useState([
    { fullname: "Low" },
    { fullname: "Medium" },
    { fullname: "High" },
  ]);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleInputs = async (data) => {
    const promise = await dataService({
      method: "POST",
      url: "task/create",
      data: data,
    });
    if (promise.status === 200) {
      navigate("/");
    } else {
      navigate("/error");
    }
  };
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
            <TextArea
              name="description"
              formHook={register("description", {
                required: "This field is required",
              })}
              title="Description"
              errorMessage={
                errors.description ? errors.description.message : ""
              }
              styleChangeWidth={true}
            />
            <Select
              name="assignedTo"
              formHook={register("assignedTo", {
                required: "This field is required",
                validate: (val) => {
                  return assignedToValidation(val);
                },
              })}
              title="Assigned To"
              errorMessage={errors.assignedTo ? errors.assignedTo.message : ""}
              options={employees}
            />
            <Select
              name="priority"
              formHook={register("priority", {
                required: "This field is required",
              })}
              title="Priority"
              errorMessage={errors.priority ? errors.priority.message : ""}
              options={priorityOptions}
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
