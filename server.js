if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// https://fast-ridge-25038.herokuapp.com/ | https://git.heroku.com/fast-ridge-25038.git

const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const path = require("path");

const requireLogin = require("./middleware/requireLogin");

const authController = require("./controllers/auth");
const imageSearchController = require("./controllers/imageSearch");

const dbURL = process.env.DB_URL || "mongodb://localhost:27017/internAuth";

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

const app = express();
const port = 5000;

// To parse incoming requests
app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

// Setting Session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.get("/test", (req, res) => {
  console.log("test");
  res.send("test");
});

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

app.listen(port, () => {
  console.log(`LISTENING ON PORT ${port}`);
});
