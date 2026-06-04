const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "real_estate",
});

db.connect((err) => {
  if (err) {
    console.error("🔴 Connection failed:", err.message);
    process.exit(1);
  }
  console.log("🟢 Connected");

  // Drop and recreate the properties table with all required columns
  db.query("DROP TABLE IF EXISTS properties", (err) => {
    if (err) {
      console.error("Error dropping table:", err.message);
      process.exit(1);
    }
    
    const createTableSql = `
      CREATE TABLE properties (
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
    
    db.query(createTableSql, (err) => {
      if (err) {
        console.error("Error creating table:", err.message);
        process.exit(1);
      }
      console.log("✅ Properties table created successfully with all columns");
      db.end();
      process.exit(0);
    });
  });
});
