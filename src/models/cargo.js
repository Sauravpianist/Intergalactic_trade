const mongoose = require('mongoose');
const cargoSchema = new mongoose.Schema({
  origin: String,
  destination: String,
  weight: Number,
  status: { type: String, default: 'in-transit' },
  timestamp: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Cargo', cargoSchema);
