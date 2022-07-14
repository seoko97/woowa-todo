const pool = require("../db");

function createTodo(userId, sectionId, title, description) {
  return pool
    .query(
      `UPDATE Todo SET priority = priority + 1 WHERE sectionId = ?;`,
      sectionId
    )
    .then(() => {
      pool.query(
        `INSERT INTO Todo ( title, description, userId, sectionId, priority)
        VALUES (?, ?, ?, ?, ?);`,
        [title, description, userId, sectionId, 0]
      );
    });
}

function updateTodo(todoId, title, description) {
  return pool.query(`UPDATE Todo SET title = ?, description = ? WHERE id = ?`, [
    title,
    description,
    todoId,
  ]);
}

function deleteTodo(todoId) {
  return pool.query(`DELETE FROM Todo WHERE id = ?`, todoId);
}

function getPrioirty(todoId) {
  return pool
    .query(`SELECT priority FROM Todo WHERE id = ?`, todoId)
    .then(([rows]) => rows[0].priority)
    .catch(() => -1);
}

function moveTodo(todoId, fromSectionId, toSectionId, prevTodoId) {
  return getPrioirty(prevTodoId).then((prevPriority) => {
    pool
      .query(
        `UPDATE Todo SET priority = priority + 1 WHERE sectionId = ? AND priority >= ?;`,
        [toSectionId, prevPriority + 1]
      )
      .then(() => {
        pool.query(`UPDATE Todo SET priority = ?, sectionId = ? WHERE id = ?`, [
          prevPriority + 1,
          toSectionId,
          todoId,
        ]);
      });
  });
}

module.exports = { createTodo, updateTodo, deleteTodo, moveTodo };
