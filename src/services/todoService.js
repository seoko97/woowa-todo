const pool = require("../db");
const { createLog } = require("./logService");

function findTodoById(todoId) {
  return pool
    .query(
      `
      SELECT s.id as sectionId, s.title as sectionTitle, t.id as todoId, t.title as todoTitle
      FROM Section as s
      LEFT JOIN Todo as t
      ON s.id = t.sectionId
      WHERE t.id = ?;
      `,
      [todoId]
    )
    .then(([rows]) => rows[0]);
}

function createTodo(userId, sectionId, title, description) {
  return pool
    .query(
      `UPDATE Todo SET priority = priority + 1 WHERE sectionId = ?;`,
      sectionId
    )
    .then(() => {
      return pool.query(
        `INSERT INTO Todo ( title, description, userId, sectionId, priority)
        VALUES (?, ?, ?, ?, ?);`,
        [title, description, userId, sectionId, 0]
      );
    })
    .then(([{ insertId }]) => findTodoById(insertId))
    .then(({ sectionTitle, todoTitle }) => {
      return createLog({
        eventType: "CREATE",
        fromSectionTitle: sectionTitle,
        fromTodoTitle: todoTitle,
      });
    });
}

function updateTodo(todoId, title, description) {
  return findTodoById(todoId)
    .then((prevTodo) => {
      pool.query(`UPDATE Todo SET title = ?, description = ? WHERE id = ?`, [
        title,
        description,
        todoId,
      ]);
      return prevTodo;
    })
    .then((prevTodo) => {
      createLog({
        eventType: "UPDATE",
        fromSectionTitle: prevTodo.sectionTitle,
        fromTodoTitle: prevTodo.todoTitle,
        toTodoTitle: title,
      });
    });
}

function deleteTodo(todoId) {
  return findTodoById(todoId)
    .then((prevTodo) => {
      pool.query(`DELETE FROM Todo WHERE id = ?`, todoId);
      return prevTodo;
    })
    .then((prevTodo) => {
      createLog({
        eventType: "DELETE",
        fromSectionTitle: prevTodo.sectionTitle,
        fromTodoTitle: prevTodo.todoTitle,
      });
    });
}

function getPrioirty(todoId) {
  return pool
    .query(`SELECT priority FROM Todo WHERE id = ?`, todoId)
    .then(([rows]) => rows[0].priority)
    .catch(() => -1);
}

function moveTodo(moveTodoDto) {
  const { fromSection, toSection, currentTodo, prevTodo } = moveTodoDto;

  return getPrioirty(prevTodo?.id || null)
    .then((prevPriority) => {
      pool.query(
        `UPDATE Todo SET priority = priority + 1 WHERE sectionId = ? AND priority >= ?;`,
        [toSection.id, prevPriority + 1]
      );
      return prevPriority;
    })
    .then((prevPriority) => {
      pool.query(`UPDATE Todo SET priority = ?, sectionId = ? WHERE id = ?`, [
        prevPriority + 1,
        toSection.id,
        currentTodo.id,
      ]);
    })
    .then(() => {
      createLog({
        eventType: "MOVE",
        fromSectionTitle: fromSection.title,
        toSectionTitle: toSection.title,
        fromTodoTitle: currentTodo.title,
      });
    });
}

module.exports = { createTodo, updateTodo, deleteTodo, moveTodo };
