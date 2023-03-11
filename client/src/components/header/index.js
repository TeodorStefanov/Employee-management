import React from "react";
import { useNavigate } from "react-router-dom";
import getNavigation from "../../utils/navigation";
import NavigationLink from "../menuLink";
import styles from "./index.module.css";
const Header = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <div className={styles.logo} onClick={() => navigate("/")}>
        Employee Task Management
      </div>
    </div>
  );
};
export default Header;
