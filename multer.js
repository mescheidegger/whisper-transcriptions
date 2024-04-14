const multer = require('multer');

// Configure storage options
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'audio_files'); // Destination folder
  },
  filename: function (req, file, cb) {
    const extension = file.mimetype.split('/')[1]; // Extract file extension from MIME type
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + extension); // Append file extension
  }
});

// Create multer instance with the storage config
const upload = multer({ storage: storage });

module.exports = upload;
