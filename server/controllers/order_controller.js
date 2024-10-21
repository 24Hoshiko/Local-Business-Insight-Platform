const Order = require('../models/orders_model');

const createOrder = async (req, res) => {
  try {
    // Log the request body to check if data is coming in properly
    console.log("Incoming order data:", req.body);
    
    const order = await Order.create(req.body);
    res.status(200).json(order); // Respond with the created order
  } catch (error) {
    // Log the error if the order creation fails
    console.error("Error creating order:", error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = createOrder;
