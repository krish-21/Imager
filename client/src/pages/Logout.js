import { useState } from "react";
import { Redirect } from "react-router-dom";

const Logout = () => {
  const [redirect, setRedirect] = useState(false);

  const makeRequest = async () => {
    // make request
    const response = await fetch("/logout", {
      method: "POST",
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
    if (jsonData.loggedOut) {
      console.log("LOGGED OUT");
      setRedirect(true);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    makeRequest();
  };

  // if succefully logged out, redirect user to homepage
  if (redirect) {
    return <Redirect to="home" />;
  }

  // Simple Button to Logout
  return (
    <>
      <h1>Logout</h1>
      <form onSubmit={handleFormSubmit}>
        <button type="submit">Logout</button>
      </form>
    </>
  );
};

export default Logout;
