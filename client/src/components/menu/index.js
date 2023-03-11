import React, { useEffect, useRef, useState } from "react";
import getNavigation from "../../utils/navigation";
import MenuLink from "../menuLink";
import styles from "./index.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
const Menu = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef();
  const links = getNavigation();
  const navigate = useNavigate();
  useEffect(() => {
    window.onclick = (event) => {
      if (
        event.target.contains(menuRef.current) &&
        event.target !== menuRef.current
      ) {
        setOpenMenu(false);
      }
    };
  }, []);
  return (
    <div className={styles.container}>
      <div>
        <FontAwesomeIcon
          className={styles.bars}
          icon={faBars}
          onClick={() => setOpenMenu(true)}
        />
      </div>
      <nav className={styles.navigation}>
        {links.map((el, index) => {
          return <MenuLink href={el.link} title={el.title} key={index} />;
        })}
      </nav>
      <div className={styles.createMenu}>
        <button
          className={styles.createButton}
          onClick={() => (!openMenu ? setOpenMenu(true) : setOpenMenu(false))}
        >
          Create
        </button>
        {openMenu ? (
          <div className={styles.menu} ref={menuRef}>
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
