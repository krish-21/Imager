// middleware function to check if the user is logged in
module.exports = (req, res, next) => {
  if (!req.session.user_id) {
    return res.send({ authStatus: false });
  }
  next();
};
