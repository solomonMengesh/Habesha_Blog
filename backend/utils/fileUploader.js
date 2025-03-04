const multer = require("multer");
const path = require("path");

// Set up storage engine (you can also use cloud storage like AWS S3, etc.)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/"); // Folder to save the uploaded files
  },
  filename: (req, file, cb) => {
    // Prevent overwriting files with the same name by adding a timestamp
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Initialize multer with the storage configuration and file filter
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Max file size: 5MB
  fileFilter: (req, file, cb) => {
    // Allow only images, pdfs, and word documents (you can add more types)
    const allowedTypes = /jpg|jpeg|png|gif|pdf|docx/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      return cb(new Error("Only image, pdf, and doc files are allowed"));
    }
  },
}).single("file"); // 'file' is the name of the field in the form

module.exports = upload;
