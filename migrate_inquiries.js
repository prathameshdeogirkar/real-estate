const db = require('./config/db');

const sql = `
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
);
`;

db.query(sql, (err, result) => {
  if (err) {
    console.error("🔴 Error creating inquiries table:", err.message);
  } else {
    console.log("🟢 Inquiries table checked/created");
  }
  process.exit();
});
