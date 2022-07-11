const express = require("express");
const path = require("path");
const webpack = require("webpack");
const middleware = require("webpack-dev-middleware");
const config = require("../../webpack.config.js");
const compiler = webpack(config);

const router = express.Router();

const isProduction = process.env.NODE_ENV === "production";

if (isProduction) router.use(express.static(path.join(process.cwd(), "dist")));
else router.use(middleware(compiler, { publicPath: config.output.publicPath }));

module.exports = router;
