const Project = require("../models/completedProjectModel");

const getCompletedProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    console.error('🔴 DB Error fetching completed projects:', error);
    res.status(500).json({
      message: "Error fetching projects",
      error: error.message,
    });
  }
};

const addCompletedProject = async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json({
      message: "Project Added Successfully",
      project
    });
  } catch (error) {
    console.error('🔴 DB Error adding completed project:', error);
    res.status(500).json({
      message: "Error adding project",
      error: error.message,
    });
  }
};

const deleteCompletedProject = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Project.findByIdAndDelete(id);
    if (deleted) {
    } else {
    }
    res.status(200).json({
      message: "Project Deleted Successfully",
    });
  } catch (error) {
    console.error('🔴 DB Error deleting completed project:', error);
    res.status(500).json({
      message: "Error deleting project",
      error: error.message,
    });
  }
};

module.exports = {
  getCompletedProjects,
  addCompletedProject,
  deleteCompletedProject,
};