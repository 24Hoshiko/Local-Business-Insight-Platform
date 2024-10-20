const Order = require('../models/orders.model');

const createOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.status(200).json(order); // Respond with the created order
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = createOrder;