const express = require("express");
const todoRouter = require("./todoRouter");
const sectionRouter = require("./sectionRouter");

const apiRouter = express.Router();

apiRouter.use("/todo", todoRouter);
apiRouter.use("/section", sectionRouter);

module.exports = apiRouter;
