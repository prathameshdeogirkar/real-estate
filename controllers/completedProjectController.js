const Project = require("../models/completedProjectModel");

const getCompletedProjects = (req, res) => {
  Project.getCompletedProjects((err, results) => {
    if (err) {
      console.error('🔴 DB Error fetching completed projects:', err);
      return res.status(500).json({
        message: "Error fetching projects",
        error: err.message,
      });
    }

    res.status(200).json(results);
  });
};

const addCompletedProject = (req, res) => {
  Project.addCompletedProject(req.body, (err, result) => {
    if (err) {
      console.error('🔴 DB Error adding completed project:', err);
      return res.status(500).json({
        message: "Error adding project",
        error: err.message,
      });
    }

    res.status(201).json({
      message: "Project Added Successfully",
    });
  });
};

const deleteCompletedProject = (req, res) => {
  const { id } = req.params;
  Project.deleteCompletedProject(id, (err, result) => {
    if (err) {
      console.error('🔴 DB Error deleting completed project:', err);
      return res.status(500).json({
        message: "Error deleting project",
        error: err.message,
      });
    }

    res.status(200).json({
      message: "Project Deleted Successfully",
    });
  });
};

module.exports = {
  getCompletedProjects,
  addCompletedProject,
  deleteCompletedProject,
};