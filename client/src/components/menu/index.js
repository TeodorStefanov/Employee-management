import React, { useState } from "react";
import getNavigation from "../../utils/navigation";
import MenuLink from "../menuLink";
import styles from "./index.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
const Menu = () => {
  const [openMenu, setOpenMenu] = useState(false);

  const links = getNavigation();
  return (
    <div>
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
    </div>
  );
};
export default Menu;
