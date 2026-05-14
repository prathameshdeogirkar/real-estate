const db = require("./config/db");

db.query("ALTER TABLE properties ADD COLUMN images JSON NULL;", (err) => {
  if (err) console.error("Error adding images column:", err.message);
  else console.log("Added images column.");
  process.exit();
});
