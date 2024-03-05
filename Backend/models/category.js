const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
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
    parent_id: {
        type: String,
        required: false // It's optional, as it might not have a parent
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    income: {
        type: Number,
        default: 0
    }
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
