const Construction = require("../models/constructionModel");

const addConstruction = (req, res) => {
  Construction.addConstruction(req.body, (err, result) => {
    if (err) {
      console.error('🔴 DB Error adding construction:', err);
      return res.status(500).json({ message: "Error adding construction", error: err.message });
    }
    res.status(201).json({ message: "Construction Added Successfully" });
  });
};

const getAllConstructions = (req, res) => {
  Construction.getAllConstructions((err, results) => {
    if (err) {
      console.error('🔴 DB Error fetching constructions:', err);
      return res.status(500).json({ message: "Error fetching constructions", error: err.message });
    }
    res.status(200).json(results);
  });
};

const deleteConstruction = (req, res) => {
  const { id } = req.params;
  Construction.deleteConstruction(id, (err, result) => {
    if (err) {
      console.error('🔴 DB Error deleting construction:', err);
      return res.status(500).json({ message: "Error deleting construction", error: err.message });
    }
    res.status(200).json({ message: "Construction Deleted Successfully" });
  });
};

const updateConstruction = (req, res) => {
  const { id } = req.params;
  Construction.updateConstruction(id, req.body, (err, result) => {
    if (err) {
      console.error('🔴 DB Error updating construction:', err);
      return res.status(500).json({ message: "Error updating construction", error: err.message });
    }
    res.status(200).json({ message: "Construction Updated Successfully" });
  });
};

const getConstructionById = (req, res) => {
  const { id } = req.params;
  Construction.getConstructionById(id, (err, result) => {
    if (err) {
      console.error('🔴 DB Error fetching construction by ID:', err);
      return res.status(500).json({ message: "Error fetching construction", error: err.message });
    }
    if (!result || result.length === 0) {
      return res.status(404).json({ message: "Construction not found" });
    }
    res.status(200).json(result[0]);
  });
};

module.exports = {
  addConstruction,
  getAllConstructions,
  deleteConstruction,
  updateConstruction,
  getConstructionById,
};
