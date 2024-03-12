const category = require('../models/category');
const { errorMessages } = require('../config');

exports.get_categories = async (req, res) => {
    try {
        const categories = await category.find();
        res.status(200).json(categories);
    } catch (error) {
        console.error("Error getting categories:", error);
        res.status(500).json({ message: errorMessages.internalServerError });
    }
};

exports.get_category = async (req, res) => {
    try {
        const categoryId = req.body.categoryId;
        const foundedCategory = await category.findById(categoryId)
        res.status(200).json(foundedCategory)
    } catch (error) {
        console.error("Error getting category:", error)
        res.status(500).json({ message: errorMessages.internalServerError });
    }
}


exports.create_category = async (req, res) => {
    try {
        const { name, description, parent_id } = req.body;
        if (!name) {
            return res.status(400).json({ message: errorMessages.nameIsRequired });
        }
        if (!description) {
            return res.status(400).json({ message: errorMessages.descriptionIsRequired });
        }
        const newCategory = new category({ name, description, parent_id });
        await newCategory.save();
        res.status(201).json({ message: "Category created successfully" });
    } catch (error) {
        console.error("Error creating category:", error);
        res.status(500).json({ message: errorMessages.internalServerError });
    }
};

exports.update_category = async (req, res) => {
    try {
        const categoryId = req.body.categoryId;
        const updatedData = req.body.updatedData;
        await category.findByIdAndUpdate(categoryId, updatedData);
        res.status(200).json({ message: "Category updated successfully" });
    } catch (error) {
        console.error("Error updating category:", error);
        res.status(500).json({ message: errorMessages.internalServerError });
    }
};


exports.delete_category = async (req, res) => {
    try {
        const { categoryId } = req.params;
        await category.findByIdAndDelete(categoryId);
        res.status(200).json({ message: "Category deleted successfully." });
    } catch (error) {
        console.error("Error deleting category:", error);
        res.status(500).json({ message: errorMessages.internalServerError });
    }
};
