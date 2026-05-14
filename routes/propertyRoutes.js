const express = require("express");

const router = express.Router();

const {
  addProperty,
  getAllProperties,
    deleteProperty,
     updateProperty,
      getPropertyById,
} = require("../controllers/propertyController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/add", authMiddleware, addProperty);

router.get("/", getAllProperties);

router.delete("/:id", authMiddleware, deleteProperty);

router.put("/:id", authMiddleware, updateProperty);

router.get("/:id", getPropertyById);

module.exports = router;