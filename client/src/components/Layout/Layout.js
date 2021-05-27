import PropTypes from "prop-types";

import styles from "./Layout.module.css";

import MainHeader from "./MainHeader";

// Wrapper Component for better layout
const Layout = (props) => {
  return (
    <>
      <MainHeader />
      <main className={styles.main}>{props.children}</main>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
