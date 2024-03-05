const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    category_id: {
        type: String,
        required: true
    },
    image_url: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    vendor: {
        type: String,
        required: true
    },
    soldQuantity: {
        type: Number,
        default: 0
    },
    income: {
        type: Number,
        default: 0
    }
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;