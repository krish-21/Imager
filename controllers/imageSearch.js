// functions to make API Calls
const unsplashAPI = require("../asyncAPICalls/unsplashAPI");
const pixabayAPI = require("../asyncAPICalls/pixabayAPI");
const storyblocksAPI = require("../asyncAPICalls/storyblocksAPI");

module.exports.searchImage = async (req, res) => {
  // extract search query from req.body
  const { query } = req.body;
  // console.log(`query: ${query}\n`);

  // trigger all API Calls in parallel
  // array of arrays
  // each API Call: success => array
  //                fails => null
  const promise_results = await Promise.all([
    unsplashAPI(query),
    pixabayAPI(query),
    storyblocksAPI(query),
  ]);

  const transformedResults = [];

  promise_results.forEach((imageArray) => {
    // filter out null values
    if (imageArray === null) {
      // console.log("NULL FOUND");
      return;
    }

    // push destructured array to new array
    transformedResults.push(...imageArray);
  });

  // if all API Calls return null
  if (transformedResults.length === 0) {
    res.send([null]);
  }
  // if at least one API call is successfull
  else {
    res.send(transformedResults);
  }
};
