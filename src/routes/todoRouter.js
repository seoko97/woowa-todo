const express = require("express");
const todoController = require("../controllers/todoController");

const todoRouter = express.Router();

todoRouter.post("/", todoController.createTodo);

todoRouter.post("/move", todoController.moveTodo);

todoRouter.put("/:id", todoController.updateTodo);

todoRouter.delete("/:id", todoController.deleteTodo);

module.exports = todoRouter;
