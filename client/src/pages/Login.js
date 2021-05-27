import { useRef, useState } from "react";
import { Redirect } from "react-router-dom";

const Login = () => {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const [redirect, setRedirect] = useState(false);
  const [authError, setAuthError] = useState(false);

  const makeRequest = async (username, password) => {
    // make request
    const response = await fetch("/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // throw error
    if (!response.ok) {
      throw new Error("Auth Error!");
    }

    // json Data to get auth Status
    const jsonData = await response.json();

    // Not best practice frontend Auth
    // Proper auth implemented in backend
    if (jsonData.authStatus) {
      console.log("AUTH SUCCESSULL");
      setRedirect(true);
    } else {
      // if invalid auth
      console.log("AUTH FAILED");
      setRedirect(false);
      setAuthError(true);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    // extract values form ref
    const username = usernameRef.current.value.trim();
    const password = passwordRef.current.value.trim();

    // if either is empty, do not submit form
    if (username === "" || password === "") {
      return;
    }

    makeRequest(username, password);
  };

  // if succefully authenticated, redirect user to image search
  if (redirect) {
    return <Redirect to="images" />;
  }

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="username"
            ref={usernameRef}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
            ref={passwordRef}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <br />
      {/* if invalid auth, inform user */}
      {authError && (
        <>
          <h3>Authentication Error</h3>
          <p>Please try again</p>
        </>
      )}
    </>
  );
};

export default Login;
