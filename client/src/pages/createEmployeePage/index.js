import React from "react";
import PageLayout from "../../components/pageLayout";
import styles from "./index.module.css";
import { useForm } from "react-hook-form"
import Input from "../../components/input";
import {
  dateOfBirthValidation,
  emailValidation,
  phoneNumberValidation,
  salaryValidation,
} from "../../utils/inputValidationsEmployee";
import dataService from "../../services/dataService";
const CreateEmployeePage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const handleInputs = async (data) => {
    console.log(data);
    const promise = await dataService({
      method: "POST",
      url: "employee/create",
      data: data,
    });

    const response = await promise.json();
    console.log(response);
  };
  return (
    <PageLayout>
      <div className={styles.container}>
        <h1 className={styles.title}>Create Employee</h1>
        <p>Please complete the form below.</p>
        <form onSubmit={handleSubmit(handleInputs)}>
          <div className={styles.fullName}>
            <p className={styles.titles}>Full Name</p>
            <div className={styles.collectionInputs}>
              <Input
                name="firstName"
                formHook={register("firstName", {
                  required: "This field is required",
                  minLength: {
                    value: 1,
                    message: "Username must be at least 1 symbols",
                  },
                })}
                type="text"
                title="First Name"
                errorMessage={errors.firstName ? errors.firstName.message : ""}
              />
              <Input
                name="middleNames"
                formHook={register("middleNames")}
                type="text"
                title="Middle Names"
                errorMessage={
                  errors.middleNames ? errors.middleNames.message : ""
                }
              />
              <Input
                name="lastName"
                formHook={register("lastName", {
                  required: "This field is required",
                })}
                type="text"
                title="Last Name"
                errorMessage={errors.lastName ? errors.lastName.message : ""}
              />
            </div>
          </div>
          <div className={styles.twoTwo}>
            <p className={styles.titles}>Contacts</p>
            <div className={styles.collectionInputs}>
              <Input
                name="Email"
                formHook={register("email", {
                  required: "This field is required",
                  validate: (val) => {
                    return emailValidation(val);
                  },
                })}
                label="Email"
                type="email"
                title="Email"
                errorMessage={errors.email ? errors.email.message : ""}
              />
              <Input
                name="phoneNumber"
                formHook={register("phoneNumber", {
                  required: "This field is required",
                  validate: (val) => {
                    return phoneNumberValidation(val);
                  },
                })}
                label="phoneNumber"
                type="tel"
                title="Phone Number"
                errorMessage={
                  errors.phoneNumber ? errors.phoneNumber.message : ""
                }
              />
            </div>
          </div>
          <div className={styles.twoTwo}>
            <p className={styles.titles}>Additional Information</p>
            <div className={styles.collectionInputs}>
              <Input
                name="dateOfBirth"
                formHook={register("dateOfBirth", {
                  required: "This field is required",
                  validate: (val) => {
                    return dateOfBirthValidation(val);
                  },
                })}
                label="dateOfBirth"
                type="date"
                title="Date Of Birth"
                errorMessage={
                  errors.dateOfBirth ? errors.dateOfBirth.message : ""
                }
              />
              <Input
                name="monthlySalary"
                formHook={register("monthlySalary", {
                  required: "This field is required",
                  validate: (val) => {
                    return salaryValidation(val);
                  },
                })}
                label="mothlySalary"
                type="number"
                title="Salary"
                errorMessage={
                  errors.monthlySalary ? errors.monthlySalary.message : ""
                }
              />
            </div>
          </div>
          <button type="submit" className={styles.submitButton}>
            Submit
          </button>
        </form>
      </div>
    </PageLayout>
  );
};
export default CreateEmployeePage;
