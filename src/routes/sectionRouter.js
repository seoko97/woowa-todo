const express = require("express");
const sectionController = require("../controllers/sectionController");

const sectionRouter = express.Router();

sectionRouter.post("/", sectionController.createSection);

sectionRouter.get("/", sectionController.getSections);

sectionRouter.get("/:id", sectionController.getSection);

sectionRouter.put("/:id", sectionController.updateSection);

sectionRouter.delete("/:id", sectionController.deleteSection);

module.exports = sectionRouter;
