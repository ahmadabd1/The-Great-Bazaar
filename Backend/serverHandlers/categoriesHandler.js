const category = require("../models/category");
const { errorMessages } = require("../config");
const cloudinary = require("../cloudinaryConfig");

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
    const foundedCategory = await category.findById(categoryId);
    res.status(200).json(foundedCategory);
  } catch (error) {
    console.error("Error getting category:", error);
    res.status(500).json({ message: errorMessages.internalServerError });
  }
};

exports.create_category = async (req, res) => {
  let newCategoryData = {
    name: req.body.name,
    description: req.body.description,
    parent_id: req.body.parent_id,
  };
  console.log(newCategoryData);
  if (req.file) {
    try {
      const result = await cloudinary.uploader.upload(req.file.path);
      newCategoryData.image_id = result.url; // Storing the URL returned by Cloudinary
    } catch (uploadError) {
      console.error("Error uploading image to Cloudinary:", uploadError);
      return res.status(500).json({ message: "Failed to upload image." });
    }
  }

  try {
    let newCategory = new category(newCategoryData);
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    console.error("Error creating category:", error);
    res
      .status(500)
      .json({ message: "An error occurred while creating the category." });
  }
};

exports.get_categoriesid = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const category = await category.findById(categoryId);

    if (category) {
      res.json(category);
    } else {
      res.status(404).send("Category not found");
    }
  } catch (error) {
    console.error("Error fetching category:", error);
    res.status(500).send("Internal server error");
  }
};

exports.update_category = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    let updatedData = {
      name: req.body.name,
      description: req.body.description,
    };

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      updatedData.image_id = result.url; // Ensure you have logic to handle this in your model
    }

    const updatedCategory = await category.findByIdAndUpdate(
      categoryId,
      updatedData,
      { new: true }
    );
    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({
      message: "Category updated successfully",
      category: updatedCategory,
    });
  } catch (error) {
    console.error("Error updating category:", error);
    res
      .status(500)
      .json({ message: "Error updating category", error: error.message });
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
