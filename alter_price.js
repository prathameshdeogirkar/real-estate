const db = require("./config/db");

db.query("ALTER TABLE properties MODIFY price BIGINT NULL;", (err) => {
  if (err) console.error("Error altering price:", err.message);
  else console.log("Altered price to allow NULL.");
  
  db.query("ALTER TABLE properties MODIFY offer_price BIGINT NULL;", (err) => {
    if (err) console.error("Error altering offer_price:", err.message);
    else console.log("Altered offer_price to allow NULL.");
    
    process.exit();
  });
});
