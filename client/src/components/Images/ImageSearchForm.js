import { useRef } from "react";
import PropTypes from "prop-types";

import styles from "./ImageSearchForm.module.css";

const ImageSearchForm = (props) => {
  const inputRef = useRef();

  // Helper function to make POST request
  const makeRequest = async (query) => {
    const response = await fetch("/images", {
      method: "POST",
      body: JSON.stringify({ query }),
      headers: {
        "Content-Type": "application/json",
      },
    });

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
  );
};

ImageSearchForm.propTypes = {
  onAddImages: PropTypes.func,
};

export default ImageSearchForm;
