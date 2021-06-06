const User = require("../models/User");

module.exports.registerUser = async (req, res) => {
  try {
    // extract data
    const { username, password } = req.body;

    // construct User object
    const newUser = new User({ username, hash: password });

    // Save to db
    // will auto hash password
    await newUser.save();

    // set registered user to current user
    req.session.user_id = newUser._id;

    // send success response
    res.send({ authStatus: true });
  } catch (error) {
    console.log("Registration Error", error);

    // send failure response
    res.send({ authStatus: false });
  }
};

module.exports.loginUser = async (req, res) => {
  try {
    // extract data
    const { username, password } = req.body;

    // validate credentials
    const foundUser = await User.authenticate(username, password);

    // check if foundUser exists
    if (foundUser) {
      // set logged in user to current user
      req.session.user_id = foundUser._id;

      // send success response
      res.send({ authStatus: true });
    } else {
      // send failure response
      res.send({ authStatus: false });
    }
  } catch (error) {
    console.log("Login Error", error);
    // send failure response
    res.send({ authStatus: false });
  }
};

module.exports.logoutUser = (req, res) => {
  // destroy user id session variable
  req.session.destroy();

  // send success response
  res.send({ loggedOut: true });
};
