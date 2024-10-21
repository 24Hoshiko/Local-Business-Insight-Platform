const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');
const DynamicModel = require('../models/DynamicModel');

// Set up Multer to handle file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// Parse and import CSV to MongoDB
const importCSV = (req, res) => {
  const results = [];
  const filePath = req.file.path;

  // Parse CSV file
  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', async () => {
      // Insert CSV data into 'import_data' collection
      try {
        await DynamicModel.insertMany(results);
        res.json({ message: 'CSV data imported successfully into import_data' });
      } catch (error) {
        res.status(500).json({ message: 'Error inserting data into MongoDB', error });
      }
      // Remove the CSV file after processing
      fs.unlinkSync(filePath);
    });
};

module.exports = {
  upload,
  importCSV,
};
