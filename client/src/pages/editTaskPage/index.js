import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../../components/input";
import PageLayout from "../../components/pageLayout";
import Select from "../../components/select";
import TextArea from "../../components/textarea";
import dataService from "../../services/dataService";
import {
  assignedToValidation,
  dueDateValidation,
} from "../../utils/inputValidationsTask";
import styles from "./index.module.css";
const EditTaskPage = () => {
  const [task, setTask] = useState({});
  const [employees, setEmployees] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
    },
  });
  const checkTask = async () => {
    const id = params.id;
    const promiseTask = await fetch(
      `http://localhost:9000/api/task/task?id=${id}`
    );
    if (promiseTask.status !== 200) {
      navigate("/error");
    } else {
      const response = await promiseTask.json();
      setTask(() => ({
        ...response,
      }));
      reset(response);

      setTitle(response.title);
      setDescription(response.description);
    }
    const promiseEmployees = await fetch(
      "http://localhost:9000/api/employee/employees"
    );
    if (promiseEmployees.status === 200) {
      const responseEmployees = await promiseEmployees.json();
      setEmployees(responseEmployees);
    } else {
      navigate("/error");
    }
  };
  const handleInputs = async (data) => {
    data["id"] = task._id;
    const promise = await dataService({
      method: "PUT",
      url: "task/update",
      data: data,
    });
    if (promise.status === 200) {
      navigate("/");
    } else {
      navigate("/error");
    }
  };
  useEffect(() => {
    checkTask();
  }, [reset]);
  return (
    <PageLayout>
      <div className={styles.container}>
        <h1 className={styles.title}>Edit Task</h1>
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
              type="text"
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
export default EditTaskPage;
