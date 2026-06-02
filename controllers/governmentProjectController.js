const GovernmentProject = require("../models/governmentProjectModel");

const addGovernmentProject = (req, res) => {
  GovernmentProject.addGovernmentProject(req.body, (err, result) => {
    if (err) {
      console.error('🔴 DB Error adding government project:', err);
      return res.status(500).json({ message: "Error adding government project", error: err.message });
    }
    res.status(201).json({ message: "Government Project Added Successfully" });
  });
};

const getAllGovernmentProjects = (req, res) => {
  GovernmentProject.getAllGovernmentProjects((err, results) => {
    if (err) {
      console.error('🔴 DB Error fetching government projects:', err);
      return res.status(500).json({ message: "Error fetching government projects", error: err.message });
    }
    res.status(200).json(results);
  });
};

const deleteGovernmentProject = (req, res) => {
  const { id } = req.params;
  GovernmentProject.deleteGovernmentProject(id, (err, result) => {
    if (err) {
      console.error('🔴 DB Error deleting government project:', err);
      return res.status(500).json({ message: "Error deleting government project", error: err.message });
    }
    res.status(200).json({ message: "Government Project Deleted Successfully" });
  });
};

const updateGovernmentProject = (req, res) => {
  const { id } = req.params;
  GovernmentProject.updateGovernmentProject(id, req.body, (err, result) => {
    if (err) {
      console.error('🔴 DB Error updating government project:', err);
      return res.status(500).json({ message: "Error updating government project", error: err.message });
    }
    res.status(200).json({ message: "Government Project Updated Successfully" });
  });
};

const getGovernmentProjectById = (req, res) => {
  const { id } = req.params;
  GovernmentProject.getGovernmentProjectById(id, (err, result) => {
    if (err) {
      console.error('🔴 DB Error fetching government project by ID:', err);
      return res.status(500).json({ message: "Error fetching government project", error: err.message });
    }
    if (!result || result.length === 0) {
      return res.status(404).json({ message: "Government Project not found" });
    }
    res.status(200).json(result[0]);
  });
};

module.exports = {
  addGovernmentProject,
  getAllGovernmentProjects,
  deleteGovernmentProject,
  updateGovernmentProject,
  getGovernmentProjectById,
};
