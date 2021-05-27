const User = require("../models/User");

module.exports.registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const newUser = new User({ username, hash: password });
    await newUser.save();

    req.session.user_id = newUser._id;
    res.send({ authStatus: true });
  } catch (error) {
    console.log("Registration Error", error);
    res.send({ authStatus: false });
  }
};

module.exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const foundUser = await User.authenticate(username, password);
    if (foundUser) {
      req.session.user_id = foundUser._id;
      res.send({ authStatus: true });
    } else {
      res.send({ authStatus: false });
    }
  } catch (error) {
    console.log("Login Error", error);
    res.send({ authStatus: false });
  }
};

module.exports.logoutUser = (req, res) => {
  req.session.destroy();
  res.send({ loggedOut: true });
};
