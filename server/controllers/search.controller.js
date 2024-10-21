//My Last try
const Order = require("../models/orders.model.js"); 
const searchOrders = async (req, res) => {
    try {
        const { custName, order_id, rating } = req.query;

        let filter = {};

        if (custName) {
            filter.custName = { $regex: custName, $options: "i" }; // Case insensitive
        }

        if (order_id) {
            filter.order_id = order_id;
        }

        if (rating) {
            filter.rating = rating; 
        }

        const orders = await Order.find(filter);

        if (orders.length > 0) {
            res.status(200).json(orders); 
        } else {
            res.status(404).json({ message: "No orders found with the given criteria" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders", error }); 
    }
};

module.exports = {
    searchOrders,
};