const express = require("express");
const router = express.Router();
const {
  addInteriorWork,
  getAllInteriorWorks,
  deleteInteriorWork,
  updateInteriorWork,
  getInteriorWorkById,
} = require("../controllers/interiorWorkController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/add", authMiddleware, addInteriorWork);
router.get("/", getAllInteriorWorks);
router.delete("/:id", authMiddleware, deleteInteriorWork);
router.put("/:id", authMiddleware, updateInteriorWork);
router.get("/:id", getInteriorWorkById);

module.exports = router;
