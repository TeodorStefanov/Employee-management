import React from "react";
import Header from "../header";
import Menu from "../menu";
import styles from "./index.module.css";
const PageLayout = (props) => {
  return (
    <div className={styles.container}>
      <Header />
      <Menu />
      <main className={styles.main}>{props.children}</main>
    </div>
  );
};
export default PageLayout;
