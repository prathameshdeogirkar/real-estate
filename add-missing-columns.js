require("dotenv").config();
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "real_estate",
});

db.connect((err) => {
  if (err) {
    console.error("🔴 Database Connection Failed:", err.message);
    process.exit(1);
  }
  console.log("🟢 MySQL Connected");

  // Add missing columns to properties table
  const alterSql = `
    ALTER TABLE properties
    ADD COLUMN IF NOT EXISTS rent_amount INT,
    ADD COLUMN IF NOT EXISTS deposit_amount INT,
    ADD COLUMN IF NOT EXISTS area INT,
    ADD COLUMN IF NOT EXISTS bedrooms INT,
    ADD COLUMN IF NOT EXISTS bathrooms INT,
    ADD COLUMN IF NOT EXISTS parking INT
  `;

  db.query(alterSql, (err, result) => {
    if (err) {
      console.error("🔴 Error altering properties table:", err.message);
      db.end();
      process.exit(1);
    } else {
      console.log("🟢 Properties table updated with missing columns");
      db.end();
      process.exit(0);
    }
  });
});
