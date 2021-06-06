import { useState, useRef } from "react";
import PropTypes from "prop-types";

import styles from "./ImageSearchForm.module.css";

import LoadingSpinner from "../UI/LoadingSpinner";

const ImageSearchForm = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef();

  // Helper function to make POST request
  const makeRequest = async (query) => {
    setIsLoading(true);

    const response = await fetch("/images", {
      method: "POST",
      body: JSON.stringify({ query }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setIsLoading(false);

    // get json data
    const jsonData = await response.json();

    // trigger parent component's function
    props.onAddImages(jsonData);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const query = inputRef.current.value.trim();

    makeRequest(query);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className={styles["form-control"]}>
          <label htmlFor="query">Image Search</label>
          <input
            type="text"
            name="query"
            id="query"
            ref={inputRef}
            placeholder="Enter query"
            required
          />
          <button type="submit">Search</button>
        </div>
      </form>

      {isLoading ? (
        <div className={styles.loading}>
          <LoadingSpinner />
        </div>
      ) : (
        <hr className={styles.hrule} />
      )}
    </>
  );
};

ImageSearchForm.propTypes = {
  onAddImages: PropTypes.func,
};

export default ImageSearchForm;
