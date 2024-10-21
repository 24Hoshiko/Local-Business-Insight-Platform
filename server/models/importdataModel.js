const mongoose = require('mongoose');

// Dynamic schema to accept any fields from the CSV
const DynamicSchema = new mongoose.Schema({}, { strict: false });

// Explicitly define 'import_data' as the collection name
module.exports = mongoose.model('import_data', DynamicSchema, 'import_data');