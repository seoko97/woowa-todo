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

module.exports = { create };
