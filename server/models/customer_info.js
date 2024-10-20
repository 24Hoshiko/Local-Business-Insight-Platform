const mongoose = require('mongoose');

const customerInfoSchema = new mongoose.Schema({
    cust_id: {type: Number, required: true, unique:true},
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
  });

  module.exports = mongoose.model('customerInfo', customerInfoSchema);