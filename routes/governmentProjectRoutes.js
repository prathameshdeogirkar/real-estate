const express = require("express");
const router = express.Router();
const {
  addGovernmentProject,
  getAllGovernmentProjects,
  deleteGovernmentProject,
  updateGovernmentProject,
  getGovernmentProjectById,
} = require("../controllers/governmentProjectController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/add", authMiddleware, addGovernmentProject);
router.get("/", getAllGovernmentProjects);
router.delete("/:id", authMiddleware, deleteGovernmentProject);
router.put("/:id", authMiddleware, updateGovernmentProject);
router.get("/:id", getGovernmentProjectById);

module.exports = router;
