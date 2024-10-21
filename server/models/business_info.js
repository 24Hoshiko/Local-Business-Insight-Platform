const mongoose = require('mongoose');

const businessInfoSchema = new mongoose.Schema({
    business_id: {type: Number, required: true, unique:true},
    business_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contact: { type: String, required: true, unique: true },
    password: { type: String, required: true }
    // business_logo: { type: String }
  });

  module.exports = mongoose.model('businessInfo', businessInfoSchema);