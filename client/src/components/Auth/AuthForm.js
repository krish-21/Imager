import { useState, useRef, useContext } from "react";
import { useHistory } from "react-router-dom";

import AuthContext from "../../store/auth-context";

import styles from "./AuthForm.module.css";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const usernameInputRef = useRef();
  const passwordInputRef = useRef();

  const authCtx = useContext(AuthContext);

  const history = useHistory();

  const handleSwitchAuthMode = () => {
    setIsLogin((prevState) => !prevState);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const enteredUsername = usernameInputRef.current.value.trim();
    const enteredPassword = passwordInputRef.current.value.trim();

    if (enteredUsername.length === 0 || enteredPassword.length === 0) {
      return;
    }

    setIsLoading(true);

    let url;

    // check auth mode & set url
    if (isLogin) {
      url = "/login";
    } else {
      url = "/register";
    }

    try {
      // make req
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          username: enteredUsername,
          password: enteredPassword,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      setIsLoading(false);

      const jsonData = await response.json();

      if (!response.ok) {
        throw new Error(jsonData.error.message);
      }

      // console.log(jsonData);

      if (!jsonData.authStatus) {
        console.log("auth fail");
        usernameInputRef.current.value = "";
        passwordInputRef.current.value = "";
        throw new Error("Invalid Credentials");
      }

      authCtx.login();

      // redirect user
      history.replace("/images");
    } catch (error) {
      console.log(error);
      alert(`Authentication Failed: ${error}`);
    }
  };

  return (
    <section className={styles.auth}>
      <h2>{isLogin ? "Login" : "Sign Up"}</h2>

      <form onSubmit={handleFormSubmit}>
        <div className={styles.control}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            ref={usernameInputRef}
            minLength="4"
            maxLength="12"
            required
          />
        </div>

        <div className={styles.control}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            ref={passwordInputRef}
            minLength="6"
            maxLength="16"
            required
          />
        </div>

        <div className={styles.actions}>
          <button>{isLogin ? "Login" : "Create Account"}</button>

          {isLoading && <p className={styles.loading}>Sending request...</p>}

          <button
            type="button"
            className={styles.toggle}
            onClick={handleSwitchAuthMode}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
