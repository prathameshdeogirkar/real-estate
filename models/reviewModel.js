const db = require('../config/db');

const Review = {
  create: (data, callback) => {
    const { name, rating, message } = data;
    db.query(
      'INSERT INTO reviews (name, rating, message) VALUES (?, ?, ?)',
      [name, rating, message],
      callback
    );
  },

  getAll: (callback) => {
    db.query('SELECT * FROM reviews ORDER BY created_at DESC', callback);
  },

  getApproved: (callback) => {
    db.query('SELECT * FROM reviews WHERE status = "Approved" ORDER BY created_at DESC', callback);
  },

  delete: (id, callback) => {
    db.query('DELETE FROM reviews WHERE id = ?', [id], callback);
  },

  updateStatus: (id, status, callback) => {
    db.query('UPDATE reviews SET status = ? WHERE id = ?', [status, id], callback);
  },

  update: (id, data, callback) => {
    const { name, rating, message } = data;
    db.query(
      'UPDATE reviews SET name = ?, rating = ?, message = ? WHERE id = ?',
      [name, rating, message, id],
      callback
    );
  }
};

module.exports = Review;
