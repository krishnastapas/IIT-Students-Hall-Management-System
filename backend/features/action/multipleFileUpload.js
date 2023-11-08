const multer = require('multer');

class FileUploaderMultiple {
    constructor(uploadDir) {
        this.upload = multer({ dest: uploadDir });
    }

    uploadFiles(fields) {
        return this.upload.fields(fields);
    }

    handleUpload(req, res, next) {

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
        // return this.uploadFiles(fields)(req, res, (err) => {
        //     if (err) {
        //         // Handle any errors that occur during file upload
        //         return res.status(400).json({ error: err.message });
        //     }

        //     const uploadedFiles = {};
        //     for (const fieldName in req.files) {
        //         uploadedFiles[fieldName] = req.files[fieldName].map(file => file);
        //     }

        //     console.log('Uploaded Files:', uploadedFiles);

        //     res.send('Files uploaded successfully.');
        // });
    }
}


module.exports = FileUploaderMultiple