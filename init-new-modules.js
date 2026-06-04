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

  const constructionsSql = `
    CREATE TABLE IF NOT EXISTS constructions (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      project_type VARCHAR(100),
      description TEXT,
      location VARCHAR(255),
      area VARCHAR(100),
      budget VARCHAR(100),
      completion_time VARCHAR(100),
      status VARCHAR(50),
      contractor_name VARCHAR(255),
      materials TEXT,
      features JSON,
      image VARCHAR(500),
      images JSON,
      contact_number VARCHAR(50),
      is_featured BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `;

  const interiorWorksSql = `
    CREATE TABLE IF NOT EXISTS interior_works (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      interior_type VARCHAR(100),
      description TEXT,
      location VARCHAR(255),
      room_type VARCHAR(100),
      design_style VARCHAR(100),
      budget VARCHAR(100),
      duration VARCHAR(100),
      materials TEXT,
      furniture_included VARCHAR(255),
      lighting_details TEXT,
      image VARCHAR(500),
      images JSON,
      before_after_images JSON,
      contact_number VARCHAR(50),
      is_featured BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `;

  const governmentProjectsSql = `
    CREATE TABLE IF NOT EXISTS government_projects (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      department VARCHAR(255),
      project_type VARCHAR(255),
      description TEXT,
      location VARCHAR(255),
      budget VARCHAR(100),
      start_date VARCHAR(100),
      completion_date VARCHAR(100),
      status VARCHAR(50),
      contractor_name VARCHAR(255),
      image VARCHAR(500),
      images JSON,
      documents JSON,
      contact_number VARCHAR(255),
      is_featured BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `;

  db.query(constructionsSql, (err) => {
    if (err) console.error("🔴 Error creating constructions table:", err.message);
    else console.log("🟢 Constructions table checked/created");

    db.query(interiorWorksSql, (err) => {
      if (err) console.error("🔴 Error creating interior_works table:", err.message);
      else console.log("🟢 Interior Works table checked/created");

      db.query(governmentProjectsSql, (err) => {
        if (err) console.error("🔴 Error creating government_projects table:", err.message);
        else console.log("🟢 Government Projects table checked/created");

        console.log("\n✅ Database initialization complete!");
        db.end();
        process.exit(0);
      });
    });
  });
});
