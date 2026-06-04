const db = require("../config/db");

const addGovernmentProject = (data, callback) => {
  const sql = `
    INSERT INTO government_projects 
    (title, department, project_type, description, location, budget, start_date, completion_date, status, contractor_name, image, images, documents, contact_number, is_featured)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  db.query(
    sql,
    [
      data.title,
      data.department || null,
      data.project_type || null,
      data.description || null,
      data.location || null,
      data.budget || null,
      data.start_date || null,
      data.completion_date || null,
      data.status || null,
      data.contractor_name || null,
      data.image || null,
      data.images ? JSON.stringify(data.images) : null,
      data.documents ? JSON.stringify(data.documents) : null,
      data.contact_number || null,
      data.is_featured === "true" || data.is_featured === true || data.is_featured === 1 ? 1 : 0
    ],
    callback
  );
};

const getAllGovernmentProjects = (callback) => {
  const sql = "SELECT * FROM government_projects ORDER BY created_at DESC";
  db.query(sql, callback);
};

const deleteGovernmentProject = (id, callback) => {
  const sql = "DELETE FROM government_projects WHERE id = ?";
  db.query(sql, [id], callback);
};

const updateGovernmentProject = (id, data, callback) => {
  const sql = `
    UPDATE government_projects
    SET title=?, department=?, project_type=?, description=?, location=?, budget=?, start_date=?, completion_date=?, status=?, contractor_name=?, image=?, images=?, documents=?, contact_number=?, is_featured=?
    WHERE id=?
  `;
  db.query(
    sql,
    [
      data.title,
      data.department || null,
      data.project_type || null,
      data.description || null,
      data.location || null,
      data.budget || null,
      data.start_date || null,
      data.completion_date || null,
      data.status || null,
      data.contractor_name || null,
      data.image || null,
      data.images ? (typeof data.images === 'string' ? data.images : JSON.stringify(data.images)) : null,
      data.documents ? (typeof data.documents === 'string' ? data.documents : JSON.stringify(data.documents)) : null,
      data.contact_number || null,
      data.is_featured === "true" || data.is_featured === true || data.is_featured === 1 ? 1 : 0,
      id,
    ],
    callback
  );
};

const getGovernmentProjectById = (id, callback) => {
  const sql = "SELECT * FROM government_projects WHERE id = ?";
  db.query(sql, [id], callback);
};

module.exports = {
  addGovernmentProject,
  getAllGovernmentProjects,
  deleteGovernmentProject,
  updateGovernmentProject,
  getGovernmentProjectById,
};
