const Construction = require("../models/constructionModel");

const addConstruction = async (req, res) => {
  try {
    console.log("➡️ [constructions] CREATE request payload received:", req.body.title);
    const construction = await Construction.create(req.body);
    console.log(`🟢 [constructions] Document successfully inserted into MongoDB! ID: ${construction._id}`);
    res.status(201).json({ message: "Construction Added Successfully", construction });
  } catch (error) {
    console.error('🔴 DB Error adding construction:', error);
    res.status(500).json({ message: "Error adding construction", error: error.message });
  }
};

const getAllConstructions = async (req, res) => {
  try {
    console.log("➡️ [constructions] READ request for all constructions");
    const constructions = await Construction.find().sort({ created_at: -1 });
    console.log(`🟢 [constructions] Found ${constructions.length} constructions in MongoDB`);
    res.status(200).json(constructions);
  } catch (error) {
    console.error('🔴 DB Error fetching constructions:', error);
    res.status(500).json({ message: "Error fetching constructions", error: error.message });
  }
};

const deleteConstruction = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`➡️ [constructions] DELETE request for ID: ${id}`);
    const deleted = await Construction.findByIdAndDelete(id);
    if (deleted) {
      console.log(`🟢 [constructions] Document successfully deleted! ID: ${id}`);
    } else {
      console.log(`⚠️ [constructions] Document to delete not found: ID: ${id}`);
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
    console.log(`➡️ [constructions] UPDATE request for ID: ${id}`);
    const updated = await Construction.findByIdAndUpdate(id, req.body, { new: true });
    if (updated) {
      console.log(`🟢 [constructions] Document successfully updated! ID: ${id}`);
    } else {
      console.log(`⚠️ [constructions] Document to update not found: ID: ${id}`);
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
    console.log(`➡️ [constructions] READ request for single construction ID: ${id}`);
    const construction = await Construction.findById(id);
    if (!construction) {
      console.log(`⚠️ [constructions] Document not found: ID: ${id}`);
      return res.status(404).json({ message: "Construction not found" });
    }
    console.log(`🟢 [constructions] Found document for ID: ${id}`);
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
