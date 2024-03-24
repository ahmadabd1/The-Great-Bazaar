const mongoose = require('mongoose');
const itemSchema = require('./item'); // Make sure this is correctly imported

const orderSchema = new mongoose.Schema({
  userId: String,
  userFirstname: String,
  userLastName:String,
  items: [itemSchema.schema],  // Using itemSchema.schema to store full item objects
  address: String,
  orderStatus: { type: String, enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled'], default: 'Processing' },
  orderDate: { type: Date, default: Date.now },
  deliveryDate: Date,
});

module.exports = mongoose.model('Order', orderSchema);
