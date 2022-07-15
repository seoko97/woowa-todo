const pool = require("../db");

function createSection(userId, title, callback) {
  pool.getConnection().then((connection) => {
    connection
      .query(`INSERT INTO Section ( title, userId ) VALUES ( ?, ? );`, [
        title,
        userId,
      ])
      .then(() => {
        callback();
      });
  });
}

function getSections(userId, callback) {
  pool.getConnection().then((connection) => {
    connection
      .query(
        `
        SELECT id, title, createdAt, updatedAt
        FROM Section
        WHERE userId = ?
        ORDER BY id ASC;
      `,
        [userId]
      )
      .then(([rows]) => {
        connection.release();
        callback(rows);
      });
  });
}

function getSection(sectionId, callback) {
  pool.getConnection().then((connection) => {
    connection.beginTransaction().then(() => {
      connection
        .query(
          {
            sql: `
                SELECT section.id, section.title, section.createdAt, section.updatedAt, todo.id, todo.title, todo.description, todo.priority, todo.createdAt, todo.updatedAt
                FROM Section as section
                LEFT JOIN Todo as todo
                ON section.id = todo.sectionId
                WHERE section.id = ?
                ORDER BY todo.priority ASC;
              `,
            nestTables: true,
          },
          [sectionId]
        )
        .then(([rows]) => {
          connection.commit();
          if (rows.length === 0) {
            return {};
          }
          const todos = rows.map((row) => row.todo).filter((todo) => todo.id);
          return {
            ...rows[0].section,
            todos,
          };
        })
        .then((data) => {
          connection.release();
          callback(data);
        });
    });
  });
}

function updateSection(sectionId, title, callback) {
  pool.getConnection().then((connection) => {
    connection
      .query(`UPDATE Section SET title = ? WHERE id = ?;`, [title, sectionId])
      .then(() => {
        connection.release();
        callback();
      });
  });
}

function deleteSection(sectionId, callback) {
  pool.getConnection().then((connection) => {
    connection.query(`DELETE FROM Section WHERE id = ?`, sectionId).then(() => {
      callback();
    });
  });
  return;
}

module.exports = {
  createSection,
  getSections,
  getSection,
  updateSection,
  deleteSection,
};

// function getSection(sectionId, callback) {
//   pool.getConnection().then((connection) => {
//     connection
//       .query("SET SESSION transaction isolation level READ UNCOMMITTED;")
//       .then(() => {
//         connection.beginTransaction().then(() => {
//           connection
//             .query(
//               {
//                 sql: `
//                 SELECT section.id, section.title, section.createdAt, section.updatedAt, todo.id, todo.title, todo.description, todo.priority, todo.createdAt, todo.updatedAt
//                 FROM Section as section
//                 LEFT JOIN Todo as todo
//                 ON section.id = todo.sectionId
//                 WHERE section.id = ?
//                 ORDER BY todo.priority ASC;
//               `,
//                 nestTables: true,
//               },
//               [sectionId]
//             )
//             .then(([rows]) => {
//               if (rows.length === 0) {
//                 return {};
//               }
//               const todos = rows
//                 .map((row) => row.todo)
//                 .filter((todo) => todo.id);
//               return {
//                 ...rows[0].section,
//                 todos,
//               };
//             })
//             .then((data) => {
//               connection.release();
//               callback(data);
//             });
//         });
//       });
//   });
// }
