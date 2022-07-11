const path = require("path");
const dotenv = require("dotenv");
const logger = require("morgan");
const express = require("express");
const cookieParser = require("cookie-parser");
const webpackConfig = require("./config/webpackConfig");

dotenv.config();

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(webpackConfig);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

module.exports = app;
