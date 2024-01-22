const multer = require("multer");
const path = require("path");

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

// Upload an image
router.post("/upload", upload.single("image"), (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({
        message: "No file uploaded.",
        data: null,
        status: false,
      });
    }

    const imageUrl = `${process.env.URL}:${process.env.PORT}/public/uploads/${file.filename}`; // Replace with your server URL

    res.status(201).json({
      message: "Image uploaded successfully.",
      data: { imageUrl },
      status: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, data: null, status: false });
  }
});

// Retrieve an image
router.get("/image/:filename", (req, res) => {
  try {
    const filename = req.params.filename;
    const imagePath = path.join(__dirname, "../uploads", filename);

    res.sendFile(imagePath);
  } catch (error) {
    res.status(500).json({ message: error.message, data: null, status: false });
  }
});

module.exports = router;
