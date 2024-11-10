const Order = require('../models/formModel');


const createOrder = async (req, res) => {
  try {
    // Log the request body to check if data is coming in properly
    console.log("Incoming order data:", req.body);
    const review = convertJsonFormat({...req.body});

    const order = await Order.create(review);
    res.status(200).json(order); // Respond with the created order
  } catch (error) {
    // Log the error if the order creation fails
    console.error("Error creating order:", error.message);
    res.status(500).json({ message: error.message });
  }
};

function convertJsonFormat(input) {
    const output = {
        custName: input.name,
        custContact: input.contact,
        products: [],
        rating: input.rating,
        review: input.review,
    };

    if (typeof input.items === 'object' && typeof input.quantities === 'object') {
        for (const item in input.items) {
            if (input.items[item] && input.quantities.hasOwnProperty(item)) {
                output.products.push({
                    productName: item,
                    quantity: input.quantities[item],
                });
            }
        }
    }

    return output;
}
module.exports = createOrder;