import { useState, useContext } from "react";

import AuthContext from "../store/auth-context";

import styles from "./ImageSearch.module.css";

import ImageSearchFrom from "../components/Images/ImageSearchForm";
import ImageList from "../components/Images/ImageList";

const ImageSearch = () => {
  // array of all images
  const [images, setImages] = useState([]);

  // set state to image array
  const handleAddImages = (imageData) => {
    setImages(imageData);
  };

  // logout function from context
  const { logout } = useContext(AuthContext);

  // If not authenticated, change context
  // auto redirect to auth
  if (images.length === undefined) {
    logout();
  }

  // defualt content
  let content = <p className={styles.empty}>Your images will appear here!</p>;

  // If no images exist, inform user
  if (images[0] === null) {
    content = <p className={styles.empty}>No matching images!</p>;
  }

  // render all images
  // current limit = 60 in backend
  else if (images.length > 0) {
    content = <ImageList images={images} />;
  }

  return (
    <>
      <ImageSearchFrom onAddImages={handleAddImages} />
      {images.length > 0 ? (
        <div className={styles["images"]}>{content}</div>
      ) : (
        content
      )}
    </>
  );
};

export default ImageSearch;
