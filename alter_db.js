const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "220801",
  database: "real_estate",
});

db.connect((err) => {
  if (err) {
    console.error("Connection error:", err);
    process.exit(1);
  }
  console.log("Connected.");
  
  db.query("ALTER TABLE properties ADD COLUMN property_mode VARCHAR(50) DEFAULT 'For Sale', ADD COLUMN deposit INT DEFAULT NULL;", (err, result) => {
    if (err) {
      console.error("Alter error:", err);
    } else {
      console.log("Table altered successfully.");
    }
    
    db.query("DESCRIBE properties", (err, rows) => {
      console.log(rows);
      process.exit(0);
    });
  });
});
