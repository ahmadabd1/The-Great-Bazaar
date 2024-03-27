const Item = require('../models/item');
const Category = require('../models/category')
const config = require('../config'); 

exports.getItemsData = async (req, res) => {
    try {
        const itemsData = await Item.aggregate([
            {
                $addFields: {
                    convertedCategoryId: { $toObjectId: "$category_id" }
                }
            },
            {
                $lookup: {
                    from: "categories", // Ensure this matches your actual collection name
                    localField: "convertedCategoryId",
                    foreignField: "_id",
                    as: "categoryData"
                }
            },
            {
                $unwind: {
                    path: "$categoryData",
                    preserveNullAndEmptyArrays: true // Include items even if there's no matching category
                }
            },
            {
                $project: {
                    name: 1,
                    soldQuantity: 1,
                    income: 1,
                    categoryName: "$categoryData.name"
                }
            },
            {
                $group: {
                    _id: "$name",
                    total_sold: { $sum: "$soldQuantity" },
                    total_income: { $sum: "$income" },
                    category: { $first: "$categoryName" }
                }
            },
            {
                $project: {
                    _id: 0,
                    name: "$_id",
                    total_sold: 1,
                    total_income: 1,
                    category: 1
                }
            }
        ]);

        res.status(200).json(itemsData);
    } catch (error) {
        console.error('Error fetching items data:', error);
        res.status(500).json({ message: "Error fetching items data" });
    }
};


