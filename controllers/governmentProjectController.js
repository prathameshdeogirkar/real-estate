const GovernmentProject = require("../models/governmentProjectModel");

const addGovernmentProject = async (req, res) => {
  try {
    const project = await GovernmentProject.create(req.body);
    res.status(201).json({ message: "Government Project Added Successfully", project });
  } catch (error) {
    console.error('🔴 DB Error adding government project:', error);
    res.status(500).json({ message: "Error adding government project", error: error.message });
  }
};

const getAllGovernmentProjects = async (req, res) => {
  try {
    const projects = await GovernmentProject.find().sort({ created_at: -1 });
    res.status(200).json(projects);
  } catch (error) {
    console.error('🔴 DB Error fetching government projects:', error);
    res.status(500).json({ message: "Error fetching government projects", error: error.message });
  }
};

const deleteGovernmentProject = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await GovernmentProject.findByIdAndDelete(id);
    if (deleted) {
    } else {
    }
    res.status(200).json({ message: "Government Project Deleted Successfully" });
  } catch (error) {
    console.error('🔴 DB Error deleting government project:', error);
    res.status(500).json({ message: "Error deleting government project", error: error.message });
  }
};

const updateGovernmentProject = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await GovernmentProject.findByIdAndUpdate(id, req.body, { new: true });
    if (updated) {
    } else {
    }
    res.status(200).json({ message: "Government Project Updated Successfully" });
  } catch (error) {
    console.error('🔴 DB Error updating government project:', error);
    res.status(500).json({ message: "Error updating government project", error: error.message });
  }
};

const getGovernmentProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await GovernmentProject.findById(id);
    if (!project) {
      return res.status(404).json({ message: "Government Project not found" });
    }
    res.status(200).json(project);
  } catch (error) {
    console.error('🔴 DB Error fetching government project by ID:', error);
    res.status(500).json({ message: "Error fetching government project", error: error.message });
  }
};

module.exports = {
  addGovernmentProject,
  getAllGovernmentProjects,
  deleteGovernmentProject,
  updateGovernmentProject,
  getGovernmentProjectById,
};
