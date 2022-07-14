function createTodo(req, res) {
  res.send("CREATED");
}

function updateTodo(req, res) {
  const todoId = req.params.id;
  res.send(`${todoId} UPDATED`);
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
