if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// Heroku URL: https://fast-ridge-25038.herokuapp.com/

// Libraries
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const path = require("path");

// Auth Middleware
const requireLogin = require("./middleware/requireLogin");

// Controllers
const authController = require("./controllers/auth");
const imageSearchController = require("./controllers/imageSearch");

// Database URL
const dbURL = process.env.DB_URL || "mongodb://localhost:27017/imagerAuth";

// DB Connection
mongoose.connect(dbURL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

// DB Connection Validation
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("Database connected");
});

// instantiate express & set port
const app = express();
const port = process.env.PORT || 5000;

// To parse incoming requests
app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

// Setting Session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// Reister User & Save to db
app.post("/register", authController.registerUser);

// check credentials
// login user & respond appropriately
app.post("/login", authController.loginUser);

// Logout user
app.post("/logout", authController.logoutUser);

// reaching the controller requires user to be login
// if authenticated, then make API calls
app.post("/images", requireLogin, imageSearchController.searchImage);

// send homepage as fallback
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.listen(port, () => {
  console.log(`LISTENING ON PORT ${port}`);
});
