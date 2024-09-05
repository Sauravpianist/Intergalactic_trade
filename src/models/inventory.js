const mongoose = require('mongoose');
const inventorySchema = new mongoose.Schema({
  station_id: {
    type: String,
    unique: true
  },
  items: [{ item_id: String, quantity: Number }]
});
module.exports = mongoose.model('Inventory', inventorySchema);
