const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const OrderSchema = mongoose.Schema(
    {
        custName: {
            type: String,
            required: [true, "Please enter your name"],
        },
        custContact: {
            type: Number,
            required: [true, "Please enter your contact number"],
        },
        products: [
            {
              productName: {
                type: String,
                required: [true, "Product name is required"],
              },
              quantity: {
                type: Number,
                required: [true, "Please enter the quantity"],
                min: [1, "Quantity must be at least 1"],
              },
            },
        ],
        rating: {
            type: Number,
            min: [1, "Rating must be at least 1 star"],
            max: [5, "Rating can be at most 5 stars"],
            required: [true, "Please provide a rating"], // Optionally required
        },
        order_id: {
            type: String,
            required: true,
            unique: true,
            default: () => uuidv4(),
        },
    },
    { 
        timestamps: true 
    }
);

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;