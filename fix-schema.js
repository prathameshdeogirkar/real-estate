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
    process.exit(1);
  }
  console.log("🟢 MySQL Connected");

  // Drop the old properties table if it exists
  db.query("DROP TABLE IF EXISTS properties", (err) => {
    if (err) {
      console.error("🔴 Error dropping table:", err.message);
      process.exit(1);
    }
    console.log("Dropped old properties table");

    // Create the correct properties table
    const propertiesSql = `
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

    db.query(propertiesSql, (err) => {
      if (err) {
        console.error("🔴 Error creating properties table:", err.message);
        process.exit(1);
      }
      console.log("🟢 Properties table created with correct schema");
      db.end();
      process.exit(0);
    });
  });
});
