import { createContext, useState } from "react";
import PropTypes from "prop-types";

// create context
// fill in values for better autocompletion
const AuthContext = createContext({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

// Auth Context Provider
// State to manage token
export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  // Default context value
  const contextValue = {
    isLoggedIn,
    login: handleLogin,
    logout: handleLogout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthContext;
