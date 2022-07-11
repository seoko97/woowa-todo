const express = require("express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

module.exports = app;
