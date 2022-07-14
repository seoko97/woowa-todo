const todoService = require("../services/todoService");

function createTodo(req, res) {
  const userId = 1;
  const { sectionId, title, description } = req.body;
  todoService.createTodo(userId, sectionId, title, description).then(() => {
    res.status(201).json({
      statusCode: 201,
    });
  });
}

function updateTodo(req, res) {
  const todoId = req.params.id;
  const { title, description } = req.body;
  todoService.updateTodo(todoId, title, description).then(() => {
    res.status(200).json({
      statusCode: 200,
    });
  });
}

function deleteTodo(req, res) {
  const todoId = req.params.id;
  todoService.deleteTodo(todoId).then(() => {
    res.status(200).json({
      statusCode: 200,
    });
  });
}

function moveTodo(req, res) {
  const { currentodoId, fromSectionId, toSectionId, prevTodoId } = req.body;
  todoService
    .moveTodo(currentodoId, fromSectionId, toSectionId, prevTodoId)
    .then(() => {
      res.status(200).json({
        statusCode: 200,
      });
    });
}

module.exports = {
  createTodo,
  updateTodo,
  deleteTodo,
  moveTodo,
};
