const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "220801",
  database: "real_estate",
});

db.connect((err) => {
  if (err) {
    console.error("🔴 Database Connection Failed:", err.message);
  } else {
    console.log("🟢 MySQL Connected");
  }
});

module.exports = db;