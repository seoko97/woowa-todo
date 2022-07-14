const todoService = require("../services/todoService");

function createTodo(req, res) {
  const { sectionId, title, description } = req.body;
  todoService
    .createTodo(sectionId, title, description)
    .then(() => {
      res.send("CREATED");
    })
    .catch(() => {
      res.send("FAILED");
    });
}

function updateTodo(req, res) {
  const todoId = req.params.id;
  const { title, description } = req.body;
  todoService.updateTodo(todoId, title, description).then(() => {
    res.send(`${todoId} UPDATED`);
  });
}

function deleteTodo(req, res) {
  const todoId = req.params.id;
  todoService.deleteTodo(todoId).then(() => {
    res.send(`${todoId} DELETED`);
  });
}

function moveTodo(req, res) {
  const todoId = req.params.id;
  const { fromSectionId, toSectionId, prevTodoId } = req.body;
  todoService
    .moveTodo(todoId, fromSectionId, toSectionId, prevTodoId)
    .then(() => {
      res.send(`${todoId} MOVED`);
    });
}

module.exports = {
  createTodo,
  updateTodo,
  deleteTodo,
  moveTodo,
};
