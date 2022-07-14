const todoService = require("../services/todoService");

function createTodo(req, res) {
  const { sectionId, title, description } = req.body;
  todoService
    .create(sectionId, title, description)
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
  todoService.update(todoId, title, description).then(() => {
    res.send(`${todoId} UPDATED`);
  });
}

function deleteTodo(req, res) {
  const todoId = req.params.id;
  res.send(`${todoId} DELETED`);
}

function moveTodo(req, res) {
  const todoId = req.params.id;
  res.send(`${todoId} MOVED`);
}

module.exports = {
  createTodo,
  updateTodo,
  deleteTodo,
  moveTodo,
};
