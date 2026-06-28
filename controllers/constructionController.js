const Construction = require("../models/constructionModel");

const addConstruction = async (req, res) => {
  try {
    const construction = await Construction.create(req.body);
    res.status(201).json({ message: "Construction Added Successfully", construction });
  } catch (error) {
    console.error('🔴 DB Error adding construction:', error);
    res.status(500).json({ message: "Error adding construction", error: error.message });
  }
};

const getAllConstructions = async (req, res) => {
  try {
    const constructions = await Construction.find().sort({ created_at: -1 });
    res.status(200).json(constructions);
  } catch (error) {
    console.error('🔴 DB Error fetching constructions:', error);
    res.status(500).json({ message: "Error fetching constructions", error: error.message });
  }
};

const deleteConstruction = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Construction.findByIdAndDelete(id);
    if (deleted) {
    } else {
    }
    res.status(200).json({ message: "Construction Deleted Successfully" });
  } catch (error) {
    console.error('🔴 DB Error deleting construction:', error);
    res.status(500).json({ message: "Error deleting construction", error: error.message });
  }
};

const updateConstruction = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Construction.findByIdAndUpdate(id, req.body, { new: true });
    if (updated) {
    } else {
    }
    res.status(200).json({ message: "Construction Updated Successfully" });
  } catch (error) {
    console.error('🔴 DB Error updating construction:', error);
    res.status(500).json({ message: "Error updating construction", error: error.message });
  }
};

const getConstructionById = async (req, res) => {
  try {
    const { id } = req.params;
    const construction = await Construction.findById(id);
    if (!construction) {
      return res.status(404).json({ message: "Construction not found" });
    }
    res.status(200).json(construction);
  } catch (error) {
    console.error('🔴 DB Error fetching construction by ID:', error);
    res.status(500).json({ message: "Error fetching construction", error: error.message });
  }
};

module.exports = {
  addConstruction,
  getAllConstructions,
  deleteConstruction,
  updateConstruction,
  getConstructionById,
};
