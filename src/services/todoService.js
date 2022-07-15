const pool = require("../db");
const { createLog } = require("./logService");

function findTodoById(connection, todoId) {
  return connection
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

function getPrioirty(connection, todoId) {
  return connection
    .query(`SELECT priority FROM Todo WHERE id = ?`, todoId)
    .then(([rows]) => rows[0].priority)
    .catch(() => -1);
}

function createTodo(userId, sectionId, title, description, callback) {
  pool.getConnection().then((connection) => {
    connection.beginTransaction().then(() => {
      connection
        .query(
          `UPDATE Todo SET priority = priority + 1 WHERE sectionId = ?;`,
          sectionId
        )
        .then(() =>
          connection.query(
            `INSERT INTO Todo ( title, description, userId, sectionId, priority)
        VALUES (?, ?, ?, ?, ?);`,
            [title, description, userId, sectionId, 0]
          )
        )
        .then(([{ insertId }]) => findTodoById(connection, insertId))
        .then(({ sectionTitle, todoTitle }) =>
          createLog(connection, {
            eventType: "CREATE",
            fromSectionTitle: sectionTitle,
            fromTodoTitle: todoTitle,
          })
        )
        .then(() => connection.commit())
        .then(() => connection.release())
        .then(() => callback());
    });
  });
}

function updateTodo(todoId, title, description, callback) {
  pool.getConnection().then((connection) => {
    connection.beginTransaction().then(() => {
      findTodoById(connection, todoId)
        .then((prevTodo) => {
          connection.query(
            `UPDATE Todo SET title = ?, description = ? WHERE id = ?`,
            [title, description, todoId]
          );
          return prevTodo;
        })
        .then((prevTodo) => {
          return createLog(connection, {
            eventType: "UPDATE",
            fromSectionTitle: prevTodo.sectionTitle,
            fromTodoTitle: prevTodo.todoTitle,
            toTodoTitle: title,
          });
        })
        .then(() => connection.commit())
        .then(() => connection.release())
        .then(() => callback());
    });
  });
}

function deleteTodo(todoId, callback) {
  pool.getConnection().then((connection) => {
    connection.beginTransaction().then(() => {
      findTodoById(connection, todoId)
        .then((prevTodo) => {
          connection.query(`DELETE FROM Todo WHERE id = ?`, todoId);
          return prevTodo;
        })
        .then((prevTodo) => {
          createLog(connection, {
            eventType: "DELETE",
            fromSectionTitle: prevTodo.sectionTitle,
            fromTodoTitle: prevTodo.todoTitle,
          });
        })
        .then(() => connection.commit())
        .then(() => connection.release())
        .then(() => callback());
    });
  });
}

function moveTodo(moveTodoDto, callback) {
  const { fromSection, toSection, currentTodo, prevTodo } = moveTodoDto;
  pool.getConnection().then((connection) => {
    connection.beginTransaction().then(() => {
      getPrioirty(connection, prevTodo)
        .then((prevPriority) => {
          connection.query(
            `UPDATE Todo SET priority = priority + 1 WHERE sectionId = ? AND priority >= ?;`,
            [toSection.id, prevPriority + 1]
          );
          return prevPriority;
        })
        .then((prevPriority) => {
          return connection.query(
            `UPDATE Todo SET priority = ?, sectionId = ? WHERE id = ?`,
            [prevPriority + 1, toSection.id, currentTodo.id]
          );
        })
        .then(() => {
          return createLog(connection, {
            eventType: "MOVE",
            fromSectionTitle: fromSection.title,
            toSectionTitle: toSection.title,
            fromTodoTitle: currentTodo.title,
          });
        })
        .then(() => connection.commit())
        .then(() => connection.release())
        .then(() => callback());
    });
  });
}

module.exports = { createTodo, updateTodo, deleteTodo, moveTodo };

// function moveTodo(moveTodoDto, callback) {
//   const { fromSection, toSection, currentTodo, prevTodo } = moveTodoDto;
//   pool.getConnection().then((connection) => {
//     connection.beginTransaction().then(() => {
//       connection.query(`LOCK TABLES Section READ, Todo READ;`).then(() => {
//         getPrioirty(connection, prevTodo)
//           .then((prevPriority) => {
//             connection.query(
//               `UPDATE Todo SET priority = priority + 1 WHERE sectionId = ? AND priority >= ?;`,
//               [toSection.id, prevPriority + 1]
//             );
//             return prevPriority;
//           })
//           .then((prevPriority) => {
//             connection.query(
//               `UPDATE Todo SET priority = ?, sectionId = ? WHERE id = ?`,
//               [prevPriority + 1, toSection.id, currentTodo.id]
//             );
//           })
//           .then(() => {
//             createLog(connection, {
//               eventType: "MOVE",
//               fromSectionTitle: fromSection.title,
//               toSectionTitle: toSection.title,
//               fromTodoTitle: currentTodo.title,
//             });
//           })
//           .then(() => {
//             connection.commit();
//           })
//           .then(() => {
//             connection.release();
//             callback();
//           });
//       });
//     });
//   });
// }

// module.exports = { createTodo, updateTodo, deleteTodo, moveTodo };
