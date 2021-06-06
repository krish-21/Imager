import PropTypes from "prop-types";

import styles from "./Image.module.css";

const Image = (props) => {
  return (
    <div className={styles["image-card"]}>
      {/* clicking on image will send user to original image */}
      <a href={props.preview}>
        <img src={props.src} alt={props.alt} className={styles.image} />
      </a>
    </div>
  );
};

Image.propTypes = {
  preview: PropTypes.string,
  src: PropTypes.string,
  alt: PropTypes.string,
};

export default Image;
