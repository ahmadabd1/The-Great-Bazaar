const mongoose = require('mongoose');
const Order = require('../models/order');
const Cart = require('../models/Cart');
const Item = require('../models/item');
const User = require('../models/user'); // Import the User model

exports.processPaymentAndCreateOrder = async (req,res)=>{

}

// Handler to fetch a specific order by ID
exports.getOrders = async (req, res) => {
    try {
      const userId = req.params.id; // Get the user ID from the URL parameters
  
      if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
      }
  
      const orders = await Order.find({ userId: userId });
      if (!orders.length) {
        return res.status(404).json({ message: 'No orders found for this user' });
      }
  
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching orders', error: error.message });
    }
  };

// Handler to create a new order
exports.create_Order = async (req, res) => {
  try {
    const { userId, items, shippingDetails, orderStatus, deliveryDate } = req.body;
    
    // Validate the necessary information
    if (!userId || !items || items.length === 0 || !shippingDetails) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newOrder = new Order({
      userId,
      items,
      shippingDetails,
      orderStatus: orderStatus || 'Processing', // Default to 'Processing' if not provided
      orderDate: new Date(),
      deliveryDate
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Error creating order', error: error.message });
  }
};

exports.delete_order = async (req, res) => {
    try {
      const orderId = req.params.id; // Get the order ID from the URL parameters
  
      if (!orderId) {
        return res.status(400).json({ message: 'Order ID is required' });
      }
  
      const deletedOrder = await Order.findByIdAndDelete(orderId);
      if (!deletedOrder) {
        return res.status(404).json({ message: 'Order not found' });
      }
      res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting order', error: error.message });
    }
  };