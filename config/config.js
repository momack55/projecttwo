/* eslint-disable camelcase */
require("dotenv").config();
console.log(process.env);
module.exports = {
  development: {
    username: "root",
    password: process.env.DB_PASS,
    database: "volunteers_db",
    host: "localhost",
    dialect: "mysql"
  },
  test: {
    username: "root",
    password: null,
    database: "testdb",
    host: "localhost",
    dialect: "mysql",
    logging: false
  },
  production: {
    use_env_variable: "JAWSDB_URL",
    dialect: "mysql"
  }
};
