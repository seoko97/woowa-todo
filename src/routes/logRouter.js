const express = require("express");
const logController = require("../controllers/logController");

const logRouter = express.Router();

logRouter.get("/", logController.getLogs);

module.exports = logRouter;
