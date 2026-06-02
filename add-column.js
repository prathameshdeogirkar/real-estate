const mysql = require("mysql2");

// Try different passwords
const passwords = ["220801", "root", ""];

const tryConnection = async (password) => {
  return new Promise((resolve) => {
    const db = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: password,
      database: "real_estate",
    });

    db.connect((err) => {
      if (err) {
        console.log(`❌ Password "${password}" failed:`, err.message);
        resolve(null);
      } else {
        console.log(`✅ Connected with password: "${password}"`);
        resolve(db);
      }
    });
  });
};

const fixSchema = async () => {
  let db = null;
  
  for (const pwd of passwords) {
    db = await tryConnection(pwd);
    if (db) break;
  }
  
  if (!db) {
    console.error("❌ Could not connect to MySQL with any password");
    process.exit(1);
  }

  // Add property_type column if it doesn't exist
  const addColumnSql = `ALTER TABLE properties ADD COLUMN property_type VARCHAR(50) DEFAULT 'For Sale'`;
  
  db.query(addColumnSql, (err) => {
    if (err) {
      if (err.message.includes("Duplicate column")) {
        console.log("✅ Column property_type already exists");
      } else {
        console.error("❌ Error adding column:", err.message);
      }
    } else {
      console.log("✅ Column property_type added successfully");
    }
    
    db.end();
    process.exit(0);
  });
};

fixSchema();
