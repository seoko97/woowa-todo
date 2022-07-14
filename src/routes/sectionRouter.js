const express = require("express");
const sectionController = require("../controllers/sectionController");

const sectionRouter = express.Router();

sectionRouter.get("/:id", sectionController.getSection);

module.exports = sectionRouter;
