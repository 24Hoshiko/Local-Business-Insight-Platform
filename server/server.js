const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const multer = require('multer');
const csv = require('csv-parser');
const stream = require('stream');
const path = require('path');

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Serve uploaded files

// Connect to MongoDB with the Insight_go database
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected to Insight_go'))
.catch(err => console.log('MongoDB connection error:', err));

// Item schema for reviews
const itemSchema = new mongoose.Schema({
    itemName: { type: String, required: true },
    quantity: { type: Number, required: true }
}, { _id: false }); // Prevent adding an _id for items

// Review schema
const reviewSchema = new mongoose.Schema({
    name: { type: String, required: true },
    contact: { type: String, required: true },
    items: [itemSchema], // Use the itemSchema here
    rating: { type: Number, required: true },
    review: String
});

const Review = mongoose.model('Review', reviewSchema); // Mongoose model for reviews

// Configure Multer for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Function to dynamically create a Mongoose schema
function createDynamicSchema(data) {
    const schemaFields = {};
    Object.keys(data).forEach(key => {
        schemaFields[key] = String; // Assuming all fields are strings, adjust as needed
    });
    return new mongoose.Schema(schemaFields);
}

// Route to handle form submissions for reviews
app.post('/submit', async (req, res) => {
    const { name, contact, items, rating, review, quantities } = req.body;

    // Basic validation
    if (!name || !contact || !rating) {
        return res.status(400).json({ message: 'Please fill in all required fields.' });
    }

    try {
        // Transform items and quantities into the desired format
        const itemsWithQuantities = Object.keys(items).map(item => ({
            itemName: item,
            quantity: quantities[item] || 0 // Default to 0 if not set
        })).filter(item => item.quantity > 0); // Only include items with quantities greater than 0

        // Create a new review document
        const newReview = new Review({
            name,
            contact,
            items: itemsWithQuantities, // Save the transformed items
            rating,
            review
        });

        // Save the review to MongoDB
        await newReview.save();
        res.status(200).json({ message: 'Review submitted successfully!' });
    } catch (error) {
        console.error('Error saving review:', error); // Log the error for debugging
        res.status(500).json({ message: 'Error saving review' });
    }
});

// Route to handle CSV file upload
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

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
