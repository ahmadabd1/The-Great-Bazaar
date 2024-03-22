const mongoose = require("mongoose");
const itemSchema = require('./item');

const cartSchema = new mongoose.Schema({
  userId: String,
  itemsCart: [itemSchema.schema], // Reference the schema definition of itemSchema
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
