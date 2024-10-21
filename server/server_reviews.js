const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Use the environment variable for MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

const itemSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  quantity: { type: Number, required: true }
}, { _id: false }); // Prevent adding an _id for items

// Define the main schema for the customer review
const reviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contact: { type: String, required: true },
  items: [itemSchema], // Use the itemSchema here
  rating: { type: Number, required: true },
  review: String
});
// Prevent adding an _id to each item

const Review = mongoose.model('Review', reviewSchema);

// Route to handle form submissions
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

// Start the server
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});