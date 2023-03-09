import React from "react";
import Header from "../header";
import Menu from "../menu";
import styles from "./index.module.css";
const PageLayout = () => {
  return (
    <div className={styles.container}>
      <Header />
      <Menu />
    </div>
  );
};
export default PageLayout;
