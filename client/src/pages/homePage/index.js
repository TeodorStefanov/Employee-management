import React from "react";
import PageLayout from "../../components/pageLayout";
import getNavigation from "../../utils/navigation";
import styles from "./index.module.css"
const HomePage = () => {
  const links = getNavigation();
  return (
    <div className={styles.container}>
      <PageLayout></PageLayout>
    </div>
  );
};
export default HomePage;
