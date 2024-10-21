const express = require('express');
const { upload, importCSV } = require('../controllers/csvController');
const router = express.Router();

// POST route to upload CSV file
// router.get("/", (req, res) => {
//     res.send("Hello from Local Business Insight Platform");
// });
router.post('/upload-csv', upload.single('csvFile'), importCSV);

module.exports = router;
