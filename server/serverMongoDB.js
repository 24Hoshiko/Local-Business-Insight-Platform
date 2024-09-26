/* Importing packages */
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const csv = require('csv-parser');
const multer = require('multer');
const stream = require('stream');
const path = require('path');

/* Load environment variables from .env file */
dotenv.config();

/* Get MongoDB connection string from .env */
const uri = process.env.MONGODB_CONNECTION;

const app = express();

/* Middleware to serve static files */
app.use(express.static(path.join(__dirname, 'public')));

/* Serve the HTML file on the root URL */
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'import.html')); // Adjust the path as needed
});

/* Async function to connect to MongoDB */
async function connect() {
    try {
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error occurred while connecting to MongoDB:", error);
    }
}

/* Configure Multer for file upload */
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

/* Function to dynamically create a Mongoose schema */
function createDynamicSchema(data) {
    const schemaFields = {};
    Object.keys(data).forEach(key => {
        schemaFields[key] = String; // Assuming all fields are strings, adjust as needed
    });
    return new mongoose.Schema(schemaFields);
}

/* Route to handle CSV file upload */
app.post('/upload', upload.single('csvFile'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send("No file uploaded.");
    }

    const salesData = [];
    const csvBufferStream = new stream.PassThrough();
    csvBufferStream.end(req.file.buffer); // End the stream with the uploaded file's buffer

    csvBufferStream
        .pipe(csv())
        .on('data', (row) => {
            salesData.push(row); // Store the row data
        })
        .on('end', async () => {
            try {
                if (salesData.length === 0) {
                    return res.status(400).send("No data found in CSV file.");
                }

                const Sale = mongoose.model('Sale', createDynamicSchema(salesData[0])); // Create schema from the first row
                await Sale.insertMany(salesData);
                console.log('CSV data has been successfully imported into MongoDB');
                res.send('CSV data has been successfully imported into MongoDB');
            } catch (error) {
                console.error('Error inserting data into MongoDB:', error);
                res.status(500).send('Error inserting data into MongoDB');
            }
        })
        .on('error', (error) => {
            console.error('Error parsing CSV file:', error);
            res.status(500).send('Error parsing CSV file');
        });
});

/* Connect to MongoDB */
connect();

/* Start the server */
app.listen(8000, () => {
    console.log("Server started on port 8000");
});
