import { NavLink } from "react-router-dom";

import styles from "./MainHeader.module.css";

const MainHeader = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>Imager</h1>
      <nav>
        <NavLink to="/home" activeClassName={styles.active}>
          Home
        </NavLink>

        <NavLink to="/register" activeClassName={styles.active}>
          Register
        </NavLink>

        <NavLink to="/login" activeClassName={styles.active}>
          Login
        </NavLink>

        <NavLink to="/images" activeClassName={styles.active}>
          Images
        </NavLink>

        <NavLink to="/logout" activeClassName={styles.active}>
          Logout
        </NavLink>
      </nav>
    </header>
  );
};

export default MainHeader;
