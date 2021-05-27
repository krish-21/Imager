const axios = require("axios").default;

module.exports = async (query) => {
  try {
    // API Key
    const client_id = process.env.UNSPLASH_ACCESS_KEY;

    // URL
    const url = "https://api.unsplash.com/search/photos";

    // req params
    const params = {
      client_id,
      query,
      per_page: 20,
    };

    // make request
    const response = await axios.get(url, { params });

    // extract data
    const { results } = response.data;

    // if no data, return null
    if (results.length === 0) {
      return null;
    }

    // conditionally extract required data & transform
    const transformedData = results.map((image) => ({
      image_ID: image.id,
      thumbnail: image.urls.thumb ? image.urls.thumb : "",
      preview: image.urls.full ? image.urls.full : "",
      title: image.alt_description ? image.alt_description : "",
      source: "Unsplash",
      tags: image.tags.length ? image.tags.map((tag) => tag.title) : [],
    }));

    return transformedData;
  } catch (err) {
    console.log("Unsplash API Error");

    // if any error, return null
    return null;
  }
};
