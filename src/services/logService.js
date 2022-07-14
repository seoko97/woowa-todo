const pool = require("../db");

function createLog(logData) {
  const {
    eventType,
    fromSectionTitle,
    fromTodoTitle,
    toSectionTitle,
    toTodoTitle,
  } = logData;
  return pool.query(
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

function getLogs(limit = 20, page = 1) {
  return pool
    .query(
      `
      SELECT *
      FROM Log
      ORDER BY createdAt DESC
      LIMIT ?, ?;
    `,
      [(+page - 1) * +limit, +limit]
    )
    .then(([rows]) => rows);
}

module.exports = { createLog, getLogs };
