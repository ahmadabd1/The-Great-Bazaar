const Item = require('../models/item');
const { errorMessages } = require('../config');


exports.get_item_byid = async (req, res) => {
    const  Id  = req.params.Id;
    console.log(Id)
    try {
        const item = await Item.findOne({ _id : Id});
        if (!item) {
            return res.status(404).json({ message: errorMessages.NOT_FOUND });
        }
        res.status(200).json(item);
    } catch (error) {
        console.error("Error fetching item by ID:", error);
        res.status(500).json({ message: errorMessages.SERVER_ERROR });
    }
}
exports.get_all_items = async (req, res) => {
    try {
        const items = await Item.find();
        res.status(200).json(items);
    } catch (error) {
        console.error("Error fetching items:", error);
        res.status(500).json({ message: errorMessages.SERVER_ERROR });
    }
};



exports.get_items_byCategoryId = async (req, res) => {
    const { categoryId } = req.params;
    try {
        const items = await Item.find({ category_id: categoryId });
        res.status(200).json(items);
    } catch (error) {
        console.error("Error fetching items by category ID:", error);
        res.status(500).json({ message: errorMessages.SERVER_ERROR });
    }
}

exports.delete_item = async (req, res) => {
    const { Id } = req.params;
    try {
        const deletedItem = await Item.findOneAndDelete({ _id: Id });
        if (!deletedItem) {
            return res.send({ message: errorMessages.NOT_FOUND });
        }
        res.status(200).json(deletedItem);
    } catch (error) {
        console.error("Error deleting item:", error);
        res.status(500).json({ message: errorMessages.SERVER_ERROR });
    }
}

exports.create_item = async (req, res) => {
    const newItemData = req.body;
    const { errorMessages } = require("../config");
    const requiredFields = ['name', 'description', 'sellPrice', 'quantity', 'category_id'];
    const missingFields = [];

    requiredFields.forEach(field => {
        if (newItemData[field] === undefined || newItemData[field] === '') {
            missingFields.push(field + ' is required'); // Direct message, adjust as necessary
        }
    });

    if (missingFields.length > 0) {
        return res.status(400).json({ message: "Missing fields: " + missingFields.join(", ") });
    }

    try {
        const newItem = new Item(newItemData);
        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        console.error("Error creating item:", error);
        if (error.code === 11000) {
            // Adjust this condition based on your DB's error structure
            return res.status(400).json({ message: "Item with this ID already exists" });
        }
        // Send back a more generic error message (or specific if in development)
        res.status(500).json({ message: "An error occurred while creating the item" });
    }
};





exports.update_item = async (req, res) => {
    const updatedItemData = req.body;
    const { id } = updatedItemData;

    try {
        const existingItem = await Item.findOne({ id });
        if (!existingItem) {
            return res.status(404).json({ message: errorMessages.NOT_FOUND });
        }
        // Update fields
        Object.assign(existingItem, updatedItemData);
        await existingItem.save();
        res.status(200).json(existingItem);
    } catch (error) {
        console.error("Error updating item:", error);
        res.status(500).json({ message: errorMessages.SERVER_ERROR });
    }
}

