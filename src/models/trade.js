const mongoose = require('mongoose');
const tradeSchema = new mongoose.Schema({
  buyer_id: {
    type:String,
    required:true
  },
  seller_id: {
    type:String,
    required:true
  },
  cargo_id:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Cargo',
    required:true
  },
  status: { type: String, default: 'pending' },
  timestamp: { type: Date, default: Date.now }
},);
module.exports = mongoose.model('Trade', tradeSchema);
