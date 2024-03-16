const Cart = require("../models/Cart");
const { errorMessages } = require("../config");
const cloudinary = require("../cloudinaryConfig");


exports.get_allCartItems = async (req, res) => {
    try {
      const cartItems = await Cart.find();
      res.json(cartItems);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  exports.add_CartItem = async (req, res) => {
    try {
      const cartItem = await Cart.create(req.body);
      res.status(201).json(cartItem);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  exports.deleteFromCart = async (req, res) => {
    try {
      await res.cart.remove();
      res.json({ message: 'Cart deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
exports.updateCart =  async (req, res) => {
    try {
      const updatedCart = await res.cart.set(req.body).save();
      res.json(updatedCart);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
 

// Middleware function to retrieve cart by ID
exports.getCart = async (req, res, next)=> {
    let cart;
    try {
      cart = await Cart.findById(req.params.id);
      if (cart == null) {
        return res.status(404).json({ message: 'Cart not found' });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  
    res.cart = cart;
    next();
  }