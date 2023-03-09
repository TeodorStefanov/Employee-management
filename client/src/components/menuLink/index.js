import React from "react";
import { Link } from "react-router-dom";
import styles from "./index.module.css";
const MenuLink = ({ href, title, id }) => {
  return (
    <div className={styles.container}>
      <Link to={href} className={styles.link}>
        {title}
      </Link>
    </div>
  );
};
export default MenuLink
