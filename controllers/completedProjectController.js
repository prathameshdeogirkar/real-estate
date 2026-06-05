const Project = require("../models/completedProjectModel");

const getCompletedProjects = async (req, res) => {
  try {
    console.log("➡️ [completedprojects] READ request for all completed projects");
    const projects = await Project.find();
    console.log(`🟢 [completedprojects] Found ${projects.length} completed projects in MongoDB`);
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
    console.log("➡️ [completedprojects] CREATE request payload received:", req.body.title);
    const project = await Project.create(req.body);
    console.log(`🟢 [completedprojects] Document successfully inserted into MongoDB! ID: ${project._id}`);
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
    console.log(`➡️ [completedprojects] DELETE request for ID: ${id}`);
    const deleted = await Project.findByIdAndDelete(id);
    if (deleted) {
      console.log(`🟢 [completedprojects] Document successfully deleted! ID: ${id}`);
    } else {
      console.log(`⚠️ [completedprojects] Document to delete not found: ID: ${id}`);
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