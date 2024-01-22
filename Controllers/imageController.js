const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();

// Set up storage for Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads"); // Destination folder for storing uploaded images
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + extension);
  },
});

const upload = multer({ storage: storage });

// Error handling middleware
const handleUploadError = (res, error) => {
  res.status(500).json({ message: error.message, data: null, status: false });
};

// Upload an image
router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({
        message: "No file uploaded.",
        data: null,
        status: false,
      });
    }

    const imageUrl = `${process.env.URL}:${process.env.PORT}/public/uploads/${file.filename}`;

    res.status(201).json({
      message: "Image uploaded successfully.",
      data: { imageUrl },
      status: true,
    });
  } catch (error) {
    handleUploadError(res, error);
  }
});

// Retrieve an image
router.get("/image/:filename", async (req, res) => {
  try {
    const filename = req.params.filename;
    const imagePath = path.join(__dirname, "../public/uploads", filename);

    res.sendFile(imagePath);
  } catch (error) {
    handleUploadError(res, error);
  }
});

module.exports = router;
