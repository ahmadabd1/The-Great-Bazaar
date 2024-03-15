const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  buyPrice: {
    type: Number,
  },
  quantity: {
    type: Number,
    required: true,
  },
  category_id: {
    type: String,
    required: true,
  },
  image_id: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  vendor: {
    type: String,
  },

});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
