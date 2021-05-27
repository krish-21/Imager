import { useState } from "react";

import styles from "./ImageSearch.module.css";

import ImageSearchFrom from "../components/Images/ImageSearchForm";
import ImageList from "../components/Images/ImageList";

const ImageSearch = () => {
  const [images, setImages] = useState([]);

  const handleAddImages = (imageData) => {
    // console.log(images);
    setImages(imageData);
  };

  // defualt content
  let content = <p className={styles.empty}>Your images will appear here</p>;

  // If not authenticated, inform user
  if (images.length === undefined) {
    content = <p className={styles.empty}>Not authenticated!</p>;
  }

  // If no images exist, inform user
  else if (images[0] === null) {
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
      <div className={styles["images"]}>{content}</div>
    </>
  );
};

export default ImageSearch;
