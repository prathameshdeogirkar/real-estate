const db = require('../config/db');

const Inquiry = {
  create: (data, callback) => {
    const { name, phone, whatsapp, email, property_id, message } = data;
    db.query(
      'INSERT INTO inquiries (name, phone, whatsapp, email, property_id, message) VALUES (?, ?, ?, ?, ?, ?)',
      [name, phone, whatsapp, email, property_id, message],
      callback
    );
  },

  getAll: (callback) => {
    db.query(`
      SELECT i.*, p.title as property_title 
      FROM inquiries i 
      LEFT JOIN properties p ON i.property_id = p.id 
      ORDER BY i.created_at DESC
    `, callback);
  },

  delete: (id, callback) => {
    db.query('DELETE FROM inquiries WHERE id = ?', [id], callback);
  },

  updateStatus: (id, status, callback) => {
    db.query('UPDATE inquiries SET status = ? WHERE id = ?', [status, id], callback);
  },

  markAsRead: (id, callback) => {
    db.query('UPDATE inquiries SET is_read = TRUE WHERE id = ?', [id], callback);
  }
};

module.exports = Inquiry;

