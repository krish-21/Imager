import PropTypes from "prop-types";

import Image from "./Image";

// component to render list of Image Item
const ImageList = (props) =>
  props.images.map((image) => (
    <Image
      key={image.image_ID}
      preview={image.preview}
      src={image.thumbnail}
      alt={image.title}
    />
  ));

ImageList.propTypes = {
  images: PropTypes.array,
};

export default ImageList;
