const Cart = require('../models/Cart');
const Order = require('../models/order');
const Item = require('../models/item');
const User = require('../models/user'); 

exports.processPaymentAndCreateOrder = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ message: 'User not found.' });
    }
    const userCart = await Cart.findOne({ userId: userId });
    if (!userCart || userCart.itemsCart.length === 0) {
      return res.status(404).send({ message: 'Cart is empty or not found.' });
    }

    if (!user.address) {
      return res.status(400).send({ message: 'User address is required to create an order.' });
    }
    const order = new Order({
      userId: userId,
      items: userCart.itemsCart, 
      address: user.address,
      userFirstname : user.firstName,
      userLastName : user.lastName,
      userPhoneNumber : user.phoneNumber,
    });

    await order.save();
    for (const cartItem of userCart.itemsCart) {
      const item = await Item.findById(cartItem._id);
      if (item) {
        item.quantity -= 1;
        item.soldQuantity += 1;
        item.income += item.sellPrice;
        await item.save();
      }
    }
    userCart.itemsCart = [];
    await userCart.save();
    res.status(200).send({ message: 'Order processed and cart cleared.', orderId: order._id });
  } catch (error) {
    res.status(500).send({ message: 'Error processing order', error: error.toString() });
  }
};


exports.changeOrderStatus = async (req, res) => {
  try {
    const orderId = req.body.orderId; // Assuming you pass orderId in the request body
    const newStatus = req.body.status;

    // Validate the new status
    const validStatuses = ['Processing', 'Shipped', 'Delivered', 'Cancelled'];
    if (!validStatuses.includes(newStatus)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    // Find the order in the database
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Update the order status
    order.orderStatus = newStatus;
    await order.save();

    // Send response
    res.status(200).json({ message: 'Order status updated successfully' });
  } catch (error) {
    console.error('Error changing order status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};




exports.getOrdersByUserId = async (req, res) => {
  try {
    const userId = req.params.id;
    const orders = await Order.find({ userId: userId });
    if (!orders) {
      return res.status(404).send({ message: 'No orders found for this user.' });
    }
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching orders', error: error.toString() });
  }
};


exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching orders', error: error.toString() });
  }
};

// Handler to delete a specific order by ID
exports.delete_order = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findByIdAndDelete(orderId);
    if (!order) {
      return res.status(404).send({ message: 'Order not found.' });
    }
    res.status(200).send({ message: 'Order deleted successfully.' });
  } catch (error) {
    res.status(500).send({ message: 'Error deleting order', error: error.toString() });
  }
};
