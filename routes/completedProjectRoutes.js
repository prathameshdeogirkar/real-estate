const express = require("express");

const router = express.Router();

const {
  getCompletedProjects,
  addCompletedProject,
  deleteCompletedProject,
} = require("../controllers/completedProjectController");

const authMiddleware = require("../middleware/authMiddleware");

router.get("/", getCompletedProjects);

router.post("/add", authMiddleware, addCompletedProject);

router.delete("/:id", authMiddleware, deleteCompletedProject);

module.exports = router;