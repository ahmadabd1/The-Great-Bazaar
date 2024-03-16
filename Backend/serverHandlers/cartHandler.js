const Cart = require("../models/Cart");
const { errorMessages } = require("../config");
const cloudinary = require("../cloudinaryConfig");

exports.get_categories = async (req, res) => {
    try {
        // const categories = await category.find();
        // res.status(200).json(categories);
    } catch (error) {
        console.error("Error getting carts:", error);
        res.status(500).json({ message: errorMessages.internalServerError });
    }
};

exports.get_category = async (req, res) => {
    try {
        // const categoryId = req.body.categoryId;
        // const foundedCategory = await category.findById(categoryId)
        // res.status(200).json(foundedCategory)
    } catch (error) {
        console.error("Error getting category:", error)
        res.status(500).json({ message: errorMessages.internalServerError });
    }
}