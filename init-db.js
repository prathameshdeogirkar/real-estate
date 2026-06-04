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

  // Create properties table
  const propertiesSql = `
    CREATE TABLE IF NOT EXISTS properties (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      type VARCHAR(100),
      price INT,
      offer_price INT,
      address VARCHAR(255),
      description TEXT,
      image VARCHAR(500),
      property_type VARCHAR(50) DEFAULT 'For Sale',
      rent_amount INT,
      deposit_amount INT,
      images JSON,
      area INT,
      bedrooms INT,
      bathrooms INT,
      parking INT,
      amenities JSON,
      nearby_places JSON,
      map_location VARCHAR(500),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `;

  db.query(propertiesSql, (err, result) => {
    if (err) {
      console.error("🔴 Error creating properties table:", err.message);
    } else {
      console.log("🟢 Properties table checked/created");
    }

    // Create inquiries table
    const inquiriesSql = `
      CREATE TABLE IF NOT EXISTS inquiries (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        whatsapp VARCHAR(20),
        email VARCHAR(255),
        property_id INT,
        message TEXT,
        status ENUM('New', 'Contacted', 'Closed') DEFAULT 'New',
        is_read BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE SET NULL
      )
    `;

    db.query(inquiriesSql, (err, result) => {
      if (err) {
        console.error("🔴 Error creating inquiries table:", err.message);
      } else {
        console.log("🟢 Inquiries table checked/created");
      }

      // Create completed_projects table if needed
      const completedProjectsSql = `
        CREATE TABLE IF NOT EXISTS completed_projects (
          id INT AUTO_INCREMENT PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          description TEXT,
          image VARCHAR(500),
          images JSON,
          location VARCHAR(255),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `;

      db.query(completedProjectsSql, (err, result) => {
        if (err) {
          console.error("🔴 Error creating completed_projects table:", err.message);
        } else {
          console.log("🟢 Completed Projects table checked/created");
        }

        console.log("\n✅ Database initialization complete!");
        db.end();
        process.exit(0);
      });
    });
  });
});
