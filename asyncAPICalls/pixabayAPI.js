const axios = require("axios").default;

module.exports = async (query) => {
  try {
    // API Key
    const key = process.env.PIXELBAY_KEY;

    // URL
    const url = "https://pixabay.com/api/";

    // req params
    const params = {
      key,
      q: query,
      image_type: "photo",
    };

    // make request
    const response = await axios.get(url, { params });

    // extract data
    const { hits: results } = response.data;

    // if no data, return null
    if (results.length === 0) {
      return null;
    }

    // conditionally extract required data & transform
    const transformedData = results.map((image) => ({
      image_ID: image.id,
      thumbnail: image.previewURL ? image.previewURL : "",
      preview: image.pageURL,
      title: image.tags.length ? image.tags : "",
      source: "Pixabay",
      tage: image.tags.length ? image.tags.split(",") : [],
    }));

    return transformedData;
  } catch (err) {
    console.log("Pixabay API Error");
    console.log(err);
    return null;
  }
};
