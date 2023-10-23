const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Function to generate the destination path based on the route
const destinationFunction = (req, file, cb) => {
  const subfolder = req.subfolder; // Use the subfolder value from the request
  const subfolderPath = path.join('uploads', subfolder);
  
  // Create the subfolder if it doesn't exist
  if (!fs.existsSync(subfolderPath)) {
    fs.mkdirSync(subfolderPath, { recursive: true });
  }
  
  cb(null, subfolderPath);
};




// Set up storage for uploaded images
const storage = multer.diskStorage({
  destination: destinationFunction,
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extname = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + extname);
  }
});

const upload = multer({ storage: storage });

exports.Multer = upload;
