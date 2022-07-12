const dotenv = require("dotenv");
dotenv.config();

const ENVIRONMENTS = {
  PORT: process.env.PORT || 3000,
  DATABASE_HOST: process.env.DATABASE_HOST,
  DATABASE_USERNAME: process.env.DATABASE_USERNAME,
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
  DATABASE_PORT: process.env.DATABASE_PORT,
  DATABASE_NAME: process.env.DATABASE_NAME,
};

module.exports = ENVIRONMENTS;
