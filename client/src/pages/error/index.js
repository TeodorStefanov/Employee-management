import React from "react";
import { Link } from "react-router-dom";
import PageLayout from "../../components/pageLayout";
import styles from "./index.module.css";
const ErrorPage = () => {
  return (
    <PageLayout>
      <div className={styles.container}>
        <h2>Sorry, this page isn't available.</h2>
        <span>
          The link you followed may be broken, or the page may have been
          removed.
          <Link to="/"> Go back to Employee-Task-Management.</Link>
        </span>
      </div>
    </PageLayout>
  );
};
export default ErrorPage;
