import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";

import AuthContext from "../../store/auth-context";

import styles from "./MainHeader.module.css";

const MainHeader = () => {
  const authCtx = useContext(AuthContext);

  const { isLoggedIn, logout } = authCtx;

  const handleLogout = () => {
    // auto-redirect handled in Navigation Guards
    logout();
  };

  return (
    <header className={styles.header}>
      <Link to="/home">
        <h1 className={styles.logo}>Imager</h1>
      </Link>

      <nav>
        {!isLoggedIn && (
          <NavLink to="/auth" activeClassName={styles.active}>
            Login
          </NavLink>
        )}

        {isLoggedIn && (
          <>
            <NavLink to="/images" activeClassName={styles.active}>
              Images
            </NavLink>

            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </nav>
    </header>
  );
};

export default MainHeader;
