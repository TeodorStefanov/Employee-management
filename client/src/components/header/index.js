import React from "react";
import getNavigation from "../../utils/navigation";
import NavigationLink from "../menuLink";
import styles from "./index.module.css";
const Header = () => {
  const links = getNavigation();
  return (
    <div className={styles.container}>
      <div className={styles.logo}>Employee Task Management</div>
    </div>
  );
};
export default Header;
