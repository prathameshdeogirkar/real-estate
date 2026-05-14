const express = require("express");
const multer = require("multer");
const cloudinary = require("../config/cloudinary");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

const storage = multer.diskStorage({});

const upload = multer({ storage });

router.post("/", authMiddleware, upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image file provided" });
    }

    const result = await cloudinary.uploader.upload(
      req.file.path
    );

    res.status(200).json({
      imageUrl: result.secure_url,
    });

  } catch (error) {
    console.error('🔴 Cloudinary Upload Error:', error);

    res.status(500).json({
      message: "Image upload failed",
      error: error.message
    });
  }
});
router.post("/multiple", authMiddleware, upload.array("images", 15), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No image files provided" });
    }

    const uploadPromises = req.files.map(file => 
      cloudinary.uploader.upload(file.path)
    );

    const results = await Promise.all(uploadPromises);
    const imageUrls = results.map(result => result.secure_url);

    res.status(200).json({
      imageUrls,
    });

  } catch (error) {
    console.error('🔴 Cloudinary Upload Error:', error);

    res.status(500).json({
      message: "Multiple image upload failed",
      error: error.message
    });
  }
});

module.exports = router;