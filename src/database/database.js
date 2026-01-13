const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "n@ni8888",
  port: 3306,
  database: "neelesh"
});

module.exports = pool;