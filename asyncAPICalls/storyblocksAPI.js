const axios = require("axios").default;
const crypto = require("crypto");

module.exports = async (query) => {
  try {
    // API Keys
    const publicKey = process.env.STORYBLOCKS_PUBLIC_KEY;
    const privateKey = process.env.STORYBLOCKS_PRIVATE_KEY;

    // url info
    const baseUrl = "https://api.graphicstock.com";
    const resource = "/api/v2/images/search";
    const urlWithoutQueryParams = baseUrl + resource;

    // HMAC generation
    const expires = Math.floor(Date.now() / 1000) + 100;
    const hmacBuilder = crypto.createHmac("sha256", privateKey + expires);
    hmacBuilder.update(resource);
    const hmac = hmacBuilder.digest("hex");

    // request params
    const params = {
      APIKEY: publicKey,
      EXPIRES: expires,
      HMAC: hmac,
      project_id: "123TESTPROJECT123",
      user_id: "123TESTUSER123",
      keywords: query,
      content_type: "photos",
    };

    // make request
    const response = await axios.get(urlWithoutQueryParams, { params });

    // extract data
    const responseData = response.data;

    // if no data, return null
    if (responseData.total_results === 0) {
      return null;
    }

    // extract image data from data
    const { results } = responseData;

    // conditionally extract required data & transform
    const transformedData = results.map((image) => {
      return {
        image_ID: image.id,
        thumbnail: image.thumbnail_url ? image.thumbnail_url : "",
        preview: image.preview_url ? image.preview_url : "",
        title: image.title ? image.title : "",
        source: "Storyblocks",
        tags: [],
      };
    });

    return transformedData;
  } catch (err) {
    console.log("Storyblocks API Error");

    // if any error, return null
    return null;
  }
};
