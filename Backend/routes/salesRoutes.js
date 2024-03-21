const express = require('express');
const router = express.Router();
const Order = require('../models/order');

router.get('/sales-summary', async (req, res) => {
  try {
    const salesSummaryByCustomer = await Order.aggregate([
      {
        $lookup: {
          from: 'users',
          let: { orderCustomerId: "$customer_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: [ "$_id", { $toObjectId: "$$orderCustomerId" } ]
                }
              }
            },
            {
              $project: { firstName: 1, lastName: 1 }
            }
          ],
          as: 'customerDetails'
        }
      },
      { $unwind: "$customerDetails" },
      {
        $group: {
          _id: "$customerDetails._id",
          name: { $first: { $concat: ["$customerDetails.firstName", " ", "$customerDetails.lastName"] } },
          totalIncome: { $sum: "$total_price" },
          totalOrders: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 1,
          name: 1,
          totalIncome: 1,
          totalOrders: 1
        }
      }
    ]);

    res.json(salesSummaryByCustomer);
  } catch (error) {
    console.error("Error fetching sales summary by customer:", error);
    res.status(500).json({ message: "Error fetching sales summary by customer." });
  }
});

router.get('/transactions', async (req, res) => {
  const { user } = req.query;

  try {
    const transactions = await Order.find({ customer_id: user });
    res.json(transactions);
  } catch (error) {
    console.error("Error fetching transactions by user:", error);
    res.status(500).json({ message: "Error fetching transactions by user." });
  }
});

module.exports = router;
