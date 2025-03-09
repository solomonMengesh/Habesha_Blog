const multer = require("multer");
const path = require("path");

// Set up storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, "../uploads/"));  // Ensure absolute path
  },
  filename: (req, file, cb) => {
    // Prevent overwriting files with the same name by adding a timestamp
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// File filter function
const fileFilter = (req, file, cb) => {
  const allowedMimes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ];

  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPG, PNG, GIF, PDF, and DOCX files are allowed"));
  }
};

// Initialize multer with storage configuration
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Max file size: 5MB
  fileFilter,
}).single("image");  // The field name 'image' for the file in the form

module.exports = upload;
