import React, { useState } from "react";
import styles from "./index.module.css";
import { Link, useNavigate } from "react-router-dom";
const Menu = () => {
  const [openMenu, setOpenMenu] = useState(false);

  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <nav className={styles.navigation}>
        <div className={styles.container}>
          <Link to="/employees" className={styles.link}>
            Employees
          </Link>
        </div>
        <div className={styles.container}>
          <Link to="/" className={styles.link}>
            Tasks
          </Link>
        </div>
      </nav>
      <div className={styles.createMenu}>
        <button
          className={styles.createButton}
          onClick={() => (!openMenu ? setOpenMenu(true) : setOpenMenu(false))}
        >
          Create
        </button>
        {openMenu ? (
          <div className={styles.menu}>
            <button
              className={styles.employeeTaskButtons}
              onClick={() => navigate("/createEmployee")}
            >
              Employee
            </button>
            <button
              className={styles.employeeTaskButtons}
              onClick={() => navigate("/createTask")}
            >
              Task
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
export default Menu;
