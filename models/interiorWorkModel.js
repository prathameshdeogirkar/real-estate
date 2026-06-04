const db = require("../config/db");

const addInteriorWork = (data, callback) => {
  const sql = `
    INSERT INTO interior_works 
    (title, interior_type, description, location, room_type, design_style, budget, duration, materials, furniture_included, lighting_details, image, images, before_after_images, contact_number, is_featured)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  db.query(
    sql,
    [
      data.title,
      data.interior_type || null,
      data.description || null,
      data.location || null,
      data.room_type || null,
      data.design_style || null,
      data.budget || null,
      data.duration || null,
      data.materials || null,
      data.furniture_included || null,
      data.lighting_details || null,
      data.image || null,
      data.images ? JSON.stringify(data.images) : null,
      data.before_after_images ? JSON.stringify(data.before_after_images) : null,
      data.contact_number || null,
      data.is_featured === "true" || data.is_featured === true || data.is_featured === 1 ? 1 : 0
    ],
    callback
  );
};

const getAllInteriorWorks = (callback) => {
  const sql = "SELECT * FROM interior_works ORDER BY created_at DESC";
  db.query(sql, callback);
};

const deleteInteriorWork = (id, callback) => {
  const sql = "DELETE FROM interior_works WHERE id = ?";
  db.query(sql, [id], callback);
};

const updateInteriorWork = (id, data, callback) => {
  const sql = `
    UPDATE interior_works
    SET title=?, interior_type=?, description=?, location=?, room_type=?, design_style=?, budget=?, duration=?, materials=?, furniture_included=?, lighting_details=?, image=?, images=?, before_after_images=?, contact_number=?, is_featured=?
    WHERE id=?
  `;
  db.query(
    sql,
    [
      data.title,
      data.interior_type || null,
      data.description || null,
      data.location || null,
      data.room_type || null,
      data.design_style || null,
      data.budget || null,
      data.duration || null,
      data.materials || null,
      data.furniture_included || null,
      data.lighting_details || null,
      data.image || null,
      data.images ? (typeof data.images === 'string' ? data.images : JSON.stringify(data.images)) : null,
      data.before_after_images ? (typeof data.before_after_images === 'string' ? data.before_after_images : JSON.stringify(data.before_after_images)) : null,
      data.contact_number || null,
      data.is_featured === "true" || data.is_featured === true || data.is_featured === 1 ? 1 : 0,
      id,
    ],
    callback
  );
};

const getInteriorWorkById = (id, callback) => {
  const sql = "SELECT * FROM interior_works WHERE id = ?";
  db.query(sql, [id], callback);
};

module.exports = {
  addInteriorWork,
  getAllInteriorWorks,
  deleteInteriorWork,
  updateInteriorWork,
  getInteriorWorkById,
};
