const GovernmentProject = require("../models/governmentProjectModel");

const addGovernmentProject = async (req, res) => {
  try {
    console.log("➡️ [governmentprojects] CREATE request payload received:", req.body.title);
    const project = await GovernmentProject.create(req.body);
    console.log(`🟢 [governmentprojects] Document successfully inserted into MongoDB! ID: ${project._id}`);
    res.status(201).json({ message: "Government Project Added Successfully", project });
  } catch (error) {
    console.error('🔴 DB Error adding government project:', error);
    res.status(500).json({ message: "Error adding government project", error: error.message });
  }
};

const getAllGovernmentProjects = async (req, res) => {
  try {
    console.log("➡️ [governmentprojects] READ request for all government projects");
    const projects = await GovernmentProject.find().sort({ created_at: -1 });
    console.log(`🟢 [governmentprojects] Found ${projects.length} government projects in MongoDB`);
    res.status(200).json(projects);
  } catch (error) {
    console.error('🔴 DB Error fetching government projects:', error);
    res.status(500).json({ message: "Error fetching government projects", error: error.message });
  }
};

const deleteGovernmentProject = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`➡️ [governmentprojects] DELETE request for ID: ${id}`);
    const deleted = await GovernmentProject.findByIdAndDelete(id);
    if (deleted) {
      console.log(`🟢 [governmentprojects] Document successfully deleted! ID: ${id}`);
    } else {
      console.log(`⚠️ [governmentprojects] Document to delete not found: ID: ${id}`);
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
    console.log(`➡️ [governmentprojects] UPDATE request for ID: ${id}`);
    const updated = await GovernmentProject.findByIdAndUpdate(id, req.body, { new: true });
    if (updated) {
      console.log(`🟢 [governmentprojects] Document successfully updated! ID: ${id}`);
    } else {
      console.log(`⚠️ [governmentprojects] Document to update not found: ID: ${id}`);
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
    console.log(`➡️ [governmentprojects] READ request for single government project ID: ${id}`);
    const project = await GovernmentProject.findById(id);
    if (!project) {
      console.log(`⚠️ [governmentprojects] Document not found: ID: ${id}`);
      return res.status(404).json({ message: "Government Project not found" });
    }
    console.log(`🟢 [governmentprojects] Found document for ID: ${id}`);
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
