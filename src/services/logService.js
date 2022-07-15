const pool = require("../db");

function createLog(connection, logData) {
  const {
    eventType,
    fromSectionTitle,
    fromTodoTitle,
    toSectionTitle,
    toTodoTitle,
  } = logData;
  return connection.query(
    `INSERT INTO Log (
      eventType,
      fromSectionTitle,
      fromTodoTitle,
      toSectionTitle,
      toTodoTitle
    )
    VALUES (?, ?, ?, ?, ?)
  `,
    [eventType, fromSectionTitle, fromTodoTitle, toSectionTitle, toTodoTitle]
  );
}

function getLogs(limit = 20, page = 1, callback) {
  return pool.getConnection().then((connection) =>
    connection
      .query(
        `SELECT *
          FROM Log
          ORDER BY createdAt DESC
          LIMIT ?, ?;`,
        [(+page - 1) * +limit, +limit]
      )
      .then(([rows]) => {
        connection.release();
        callback(rows);
      })
  );
}

module.exports = { createLog, getLogs };
