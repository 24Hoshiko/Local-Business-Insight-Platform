// server/models/data.js
const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({}, { strict: false }); // Schema that allows any fields
const DataModel = mongoose.model('Data', DataSchema);

module.exports = DataModel;
