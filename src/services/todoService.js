const pool = require("../db");

function create(sectionId, title, description) {
  return pool
    .query(
      `UPDATE Todo SET priority = priority + 1 WHERE sectionId = ?;`,
      sectionId
    )
    .then(() => {
      pool.query(
        `INSERT INTO Todo ( title, description, userId, sectionId, priority)
        VALUES (?, ?, ?, ?, ?);`,
        [title, description, 1, sectionId, 0]
      );
    });
}

function update(todoId, title, description) {
  return pool.query(`Update Todo SET title = ?, description = ? WHERE id = ?`, [
    title,
    description,
    todoId,
  ]);
}

function deleteTodo(todoId) {
  return pool.query(`DELETE FROM Todo WHERE id = ?`, todoId);
}

module.exports = { create, update, deleteTodo };
