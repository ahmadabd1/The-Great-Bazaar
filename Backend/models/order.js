const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  userId: String,  
  items: [String], 
  address:String,
  orderStatus: { type: String, enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled'], default: 'Processing' },
  orderDate: { type: Date, default: Date.now },
  deliveryDate: Date
});

module.exports = mongoose.model('Order', orderSchema);
