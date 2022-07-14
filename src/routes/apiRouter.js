const express = require("express");
const todoRouter = require("./todoRouter");

const apiRouter = express.Router();

apiRouter.use("/todo", todoRouter);

module.exports = apiRouter;
