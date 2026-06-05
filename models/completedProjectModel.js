const db = require("../config/db");

const getCompletedProjects = (callback) => {
  const sql = "SELECT * FROM completed_projects";

  db.query(sql, callback);
};

const addCompletedProject = (data, callback) => {
  const sql = `
    INSERT INTO completed_projects
    (title, description, image, year)
    VALUES (?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      data.title,
      data.description,
      data.image,
      data.year,
    ],
    callback
  );
};

const deleteCompletedProject = (id, callback) => {
  const sql = "DELETE FROM completed_projects WHERE id = ?";

  db.query(sql, [id], callback);
};

module.exports = {
  getCompletedProjects,
  addCompletedProject,
  deleteCompletedProject,
};