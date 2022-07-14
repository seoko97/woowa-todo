const express = require("express");
const todoRouter = require("./todoRouter");
const sectionRouter = require("./sectionRouter");
const logRouter = require("./logRouter");

const apiRouter = express.Router();

apiRouter.use("/log", logRouter);
apiRouter.use("/todo", todoRouter);
apiRouter.use("/section", sectionRouter);

module.exports = apiRouter;
