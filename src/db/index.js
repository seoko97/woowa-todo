const mysql = require("mysql2/promise");
const ENVIRONMENTS = require("../config/constant");

const pool = mysql.createPool({
  host: ENVIRONMENTS.DATABASE_HOST,
  port: ENVIRONMENTS.DATABASE_PORT,
  user: ENVIRONMENTS.DATABASE_USERNAME,
  password: ENVIRONMENTS.DATABASE_PASSWORD,
  database: ENVIRONMENTS.DATABASE_NAME,
});

module.exports = pool;
