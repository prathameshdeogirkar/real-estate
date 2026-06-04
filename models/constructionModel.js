const db = require("../config/db");

const addConstruction = (data, callback) => {
  const sql = `
    INSERT INTO constructions 
    (title, project_type, description, location, area, budget, completion_time, status, contractor_name, materials, features, image, images, contact_number, is_featured)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  db.query(
    sql,
    [
      data.title,
      data.project_type || null,
      data.description || null,
      data.location || null,
      data.area || null,
      data.budget || null,
      data.completion_time || null,
      data.status || null,
      data.contractor_name || null,
      data.materials || null,
      data.features ? JSON.stringify(data.features) : null,
      data.image || null,
      data.images ? JSON.stringify(data.images) : null,
      data.contact_number || null,
      data.is_featured === "true" || data.is_featured === true || data.is_featured === 1 ? 1 : 0
    ],
    callback
  );
};

const getAllConstructions = (callback) => {
  const sql = "SELECT * FROM constructions ORDER BY created_at DESC";
  db.query(sql, callback);
};

const deleteConstruction = (id, callback) => {
  const sql = "DELETE FROM constructions WHERE id = ?";
  db.query(sql, [id], callback);
};

const updateConstruction = (id, data, callback) => {
  const sql = `
    UPDATE constructions
    SET title=?, project_type=?, description=?, location=?, area=?, budget=?, completion_time=?, status=?, contractor_name=?, materials=?, features=?, image=?, images=?, contact_number=?, is_featured=?
    WHERE id=?
  `;
  db.query(
    sql,
    [
      data.title,
      data.project_type || null,
      data.description || null,
      data.location || null,
      data.area || null,
      data.budget || null,
      data.completion_time || null,
      data.status || null,
      data.contractor_name || null,
      data.materials || null,
      data.features ? (typeof data.features === 'string' ? data.features : JSON.stringify(data.features)) : null,
      data.image || null,
      data.images ? (typeof data.images === 'string' ? data.images : JSON.stringify(data.images)) : null,
      data.contact_number || null,
      data.is_featured === "true" || data.is_featured === true || data.is_featured === 1 ? 1 : 0,
      id,
    ],
    callback
  );
};

const getConstructionById = (id, callback) => {
  const sql = "SELECT * FROM constructions WHERE id = ?";
  db.query(sql, [id], callback);
};

module.exports = {
  addConstruction,
  getAllConstructions,
  deleteConstruction,
  updateConstruction,
  getConstructionById,
};
