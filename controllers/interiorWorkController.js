const InteriorWork = require("../models/interiorWorkModel");

const addInteriorWork = (req, res) => {
  InteriorWork.addInteriorWork(req.body, (err, result) => {
    if (err) {
      console.error('🔴 DB Error adding interior work:', err);
      return res.status(500).json({ message: "Error adding interior work", error: err.message });
    }
    res.status(201).json({ message: "Interior Work Added Successfully" });
  });
};

const getAllInteriorWorks = (req, res) => {
  InteriorWork.getAllInteriorWorks((err, results) => {
    if (err) {
      console.error('🔴 DB Error fetching interior works:', err);
      return res.status(500).json({ message: "Error fetching interior works", error: err.message });
    }
    res.status(200).json(results);
  });
};

const deleteInteriorWork = (req, res) => {
  const { id } = req.params;
  InteriorWork.deleteInteriorWork(id, (err, result) => {
    if (err) {
      console.error('🔴 DB Error deleting interior work:', err);
      return res.status(500).json({ message: "Error deleting interior work", error: err.message });
    }
    res.status(200).json({ message: "Interior Work Deleted Successfully" });
  });
};

const updateInteriorWork = (req, res) => {
  const { id } = req.params;
  InteriorWork.updateInteriorWork(id, req.body, (err, result) => {
    if (err) {
      console.error('🔴 DB Error updating interior work:', err);
      return res.status(500).json({ message: "Error updating interior work", error: err.message });
    }
    res.status(200).json({ message: "Interior Work Updated Successfully" });
  });
};

const getInteriorWorkById = (req, res) => {
  const { id } = req.params;
  InteriorWork.getInteriorWorkById(id, (err, result) => {
    if (err) {
      console.error('🔴 DB Error fetching interior work by ID:', err);
      return res.status(500).json({ message: "Error fetching interior work", error: err.message });
    }
    if (!result || result.length === 0) {
      return res.status(404).json({ message: "Interior Work not found" });
    }
    res.status(200).json(result[0]);
  });
};

module.exports = {
  addInteriorWork,
  getAllInteriorWorks,
  deleteInteriorWork,
  updateInteriorWork,
  getInteriorWorkById,
};
