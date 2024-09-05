const multer = require('multer');
const path = require('path');

class FileHandler {

  // let filename="";


  constructor(uploadDestination) {
    // Configure Multer storage
    this.storage = multer.diskStorage({
      destination: uploadDestination,
      filename: (req, file, cb) => {
        const fileName = `${Date.now()}_${file.originalname}`;
        cb(null, fileName);
      }
    });

    // Create Multer instance
    this.upload = multer({ storage: this.storage });
  }


  // Middleware for handling file upload
  uploadFile(req, res, next) {
    const uploadMiddleware = this.upload.single('file'); // 'file' is the field name in the form

    uploadMiddleware(req, res, err => {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred during upload
        return res.status(400).json({ error: err.message });
      } else if (err) {
        // An unknown error occurred during upload
        return res.status(500).json({ error: 'Unknown error occurred during file upload' });
      }

      // File upload successful
      next();
    });
  }

  uploadFileMultiple(req,res,next){
    const uploadMiddleware = this.upload.fields(req.fields); // 'file' is the field name in the form
    
    uploadMiddleware(req, res, err => {
        if (err) {
            // Handle any errors that occur during file upload
            return res.status(400).json({ error: err.message });
        }

        const uploadedFiles = {};
        for (const fieldName in req.files) {
            uploadedFiles[fieldName] = req.files[fieldName].map(file => file);
        }

        console.log('Uploaded Files:', uploadedFiles);

        // res.send('Files uploaded successfully.');
        next();
    })
  }

  // Download file by filename
  downloadFile(req, res, filePath) {
    const file = path.resolve(filePath);
    res.sendFile(file, err => {
      if (err) {
        // An error occurred during file download
        res.status(500).json({ error: 'Unknown error occurred during file download' });
      }
    });
  }

}

module.exports = FileHandler;


// const express = require('express');
// const FileHandler = require('./fileHandler'); // Replace with the path to your fileHandler.js file

// const app = express();
// const uploadDestination = './uploads'; // Specify the upload destination directory

// const fileHandler = new FileHandler(uploadDestination);

// // Upload file route
// app.post('/upload', fileHandler.uploadFile.bind(fileHandler), (req, res) => {
//   res.status(200).json({ message: 'File uploaded successfully' });
// });

// // Download file route
// app.get('/download/:filename', (req, res) => {
//   const filePath = path.join(uploadDestination, req.params.filename);
//   fileHandler.downloadFile(req, res, filePath);
// });

// // Start the server
// app.listen(3000, () => {
//   console.log('Server started on port 3000');
// });






