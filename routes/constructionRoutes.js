const express = require("express");
const router = express.Router();
const {
  addConstruction,
  getAllConstructions,
  deleteConstruction,
  updateConstruction,
  getConstructionById,
} = require("../controllers/constructionController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/add", authMiddleware, addConstruction);
router.get("/", getAllConstructions);
router.delete("/:id", authMiddleware, deleteConstruction);
router.put("/:id", authMiddleware, updateConstruction);
router.get("/:id", getConstructionById);

module.exports = router;
