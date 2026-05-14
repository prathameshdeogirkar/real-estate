const db = require("./config/db");

const sql = `
ALTER TABLE properties 
ADD COLUMN area INT NULL,
ADD COLUMN bedrooms INT NULL,
ADD COLUMN bathrooms INT NULL,
ADD COLUMN parking VARCHAR(100) NULL,
ADD COLUMN amenities JSON NULL,
ADD COLUMN nearby_places JSON NULL,
ADD COLUMN map_location TEXT NULL;
`;

db.query(sql, (err) => {
  if (err) console.error("Error adding columns:", err.message);
  else console.log("Added detailed columns.");
  process.exit();
});
