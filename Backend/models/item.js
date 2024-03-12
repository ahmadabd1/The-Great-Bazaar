const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  sellPrice: {
    type: Number,
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
  updated_at: {
    type: Date,
    default: Date.now,
  },
  vendor: {
    type: String,
  },
  soldQuantity: {
    type: Number,
    default: 0,
  },
  income: {
    type: Number,
    default: 0,
  },
  suggestedItem: {
    type: Boolean,
    default: false,
  },
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
