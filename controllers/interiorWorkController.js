const InteriorWork = require("../models/interiorWorkModel");

const addInteriorWork = async (req, res) => {
  try {
    console.log("➡️ [interiorworks] CREATE request payload received:", req.body.title);
    const interiorWork = await InteriorWork.create(req.body);
    console.log(`🟢 [interiorworks] Document successfully inserted into MongoDB! ID: ${interiorWork._id}`);
    res.status(201).json({ message: "Interior Work Added Successfully", interiorWork });
  } catch (error) {
    console.error('🔴 DB Error adding interior work:', error);
    res.status(500).json({ message: "Error adding interior work", error: error.message });
  }
};

const getAllInteriorWorks = async (req, res) => {
  try {
    console.log("➡️ [interiorworks] READ request for all interior works");
    const interiorWorks = await InteriorWork.find().sort({ created_at: -1 });
    console.log(`🟢 [interiorworks] Found ${interiorWorks.length} interior works in MongoDB`);
    res.status(200).json(interiorWorks);
  } catch (error) {
    console.error('🔴 DB Error fetching interior works:', error);
    res.status(500).json({ message: "Error fetching interior works", error: error.message });
  }
};

const deleteInteriorWork = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`➡️ [interiorworks] DELETE request for ID: ${id}`);
    const deleted = await InteriorWork.findByIdAndDelete(id);
    if (deleted) {
      console.log(`🟢 [interiorworks] Document successfully deleted! ID: ${id}`);
    } else {
      console.log(`⚠️ [interiorworks] Document to delete not found: ID: ${id}`);
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
    console.log(`➡️ [interiorworks] UPDATE request for ID: ${id}`);
    const updated = await InteriorWork.findByIdAndUpdate(id, req.body, { new: true });
    if (updated) {
      console.log(`🟢 [interiorworks] Document successfully updated! ID: ${id}`);
    } else {
      console.log(`⚠️ [interiorworks] Document to update not found: ID: ${id}`);
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
    console.log(`➡️ [interiorworks] READ request for single interior work ID: ${id}`);
    const interiorWork = await InteriorWork.findById(id);
    if (!interiorWork) {
      console.log(`⚠️ [interiorworks] Document not found: ID: ${id}`);
      return res.status(404).json({ message: "Interior Work not found" });
    }
    console.log(`🟢 [interiorworks] Found document for ID: ${id}`);
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
