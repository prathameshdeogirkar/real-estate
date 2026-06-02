const db = require('./config/db');

const createReviewsTable = `
CREATE TABLE IF NOT EXISTS reviews (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  message TEXT NOT NULL,
  status ENUM('Pending Approval', 'Approved', 'Rejected') DEFAULT 'Pending Approval',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

db.query(createReviewsTable, (err, result) => {
  if (err) {
    console.error("Error creating reviews table:", err);
  } else {
    console.log("Reviews table created or already exists");
  }
  process.exit();
});
