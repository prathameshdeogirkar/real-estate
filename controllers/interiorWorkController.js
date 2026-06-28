const InteriorWork = require("../models/interiorWorkModel");

const addInteriorWork = async (req, res) => {
  try {
    const interiorWork = await InteriorWork.create(req.body);
    res.status(201).json({ message: "Interior Work Added Successfully", interiorWork });
  } catch (error) {
    console.error('🔴 DB Error adding interior work:', error);
    res.status(500).json({ message: "Error adding interior work", error: error.message });
  }
};

const getAllInteriorWorks = async (req, res) => {
  try {
    const interiorWorks = await InteriorWork.find().sort({ created_at: -1 });
    res.status(200).json(interiorWorks);
  } catch (error) {
    console.error('🔴 DB Error fetching interior works:', error);
    res.status(500).json({ message: "Error fetching interior works", error: error.message });
  }
};

const deleteInteriorWork = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await InteriorWork.findByIdAndDelete(id);
    if (deleted) {
    } else {
    }
    res.status(200).json({ message: "Interior Work Deleted Successfully" });
  } catch (error) {
    console.error('🔴 DB Error deleting interior work:', error);
    res.status(500).json({ message: "Error deleting interior work", error: error.message });
  }
};

const updateInteriorWork = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await InteriorWork.findByIdAndUpdate(id, req.body, { new: true });
    if (updated) {
    } else {
    }
    res.status(200).json({ message: "Interior Work Updated Successfully" });
  } catch (error) {
    console.error('🔴 DB Error updating interior work:', error);
    res.status(500).json({ message: "Error updating interior work", error: error.message });
  }
};

const getInteriorWorkById = async (req, res) => {
  try {
    const { id } = req.params;
    const interiorWork = await InteriorWork.findById(id);
    if (!interiorWork) {
      return res.status(404).json({ message: "Interior Work not found" });
    }
    res.status(200).json(interiorWork);
  } catch (error) {
    console.error('🔴 DB Error fetching interior work by ID:', error);
    res.status(500).json({ message: "Error fetching interior work", error: error.message });
  }
};

module.exports = {
  addInteriorWork,
  getAllInteriorWorks,
  deleteInteriorWork,
  updateInteriorWork,
  getInteriorWorkById,
};
