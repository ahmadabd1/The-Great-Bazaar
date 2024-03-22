const Cart = require("../models/Cart");
const { errorMessages } = require("../config");


exports.add_CartItem = async (req, res) => {
  try {
    const { userId, item } = req.body;
    if (!userId || !item) {
      return res.status(400).send({ message: "Missing userId or item in request" });
    }

    let cart = await Cart.findOne({ userId: userId });
    if (cart) {
      // Always add the new item as a separate entry
      cart.itemsCart.push(item);
    } else {
      // If there's no cart, create a new one and add the item
      const newCart = new Cart({
        userId: userId,
        itemsCart: [item],
      });
      cart = newCart;
    }
    await cart.save();
    return res.status(201).send(cart);
  } catch (error) {
    console.error('Error adding item to cart:', error);
    res.status(500).send({ message: "Failed to add item to cart" });
  }
};


exports.deleteFromCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    if (!userId || !itemId) {
      return res.status(400).send({ message: "Missing userId or itemId in request" });
    }

    const cart = await Cart.findOne({ userId: userId });

    if (!cart) {
      return res.status(404).send({ message: "Cart not found" });
    }

    // Find the index of the first item with the given itemId
    const itemIndex = cart.itemsCart.findIndex(item => item._id.toString() === itemId);

    // If the item is not found, send an error response
    if (itemIndex === -1) {
      return res.status(404).send({ message: "Item not found in cart" });
    }

    // Remove the item using its index
    cart.itemsCart.splice(itemIndex, 1);

    // Save the updated cart
    const updatedCart = await cart.save();

    // Return the updated cart
    res.status(200).send(updatedCart);
  } catch (error) {
    console.error('Error deleting item from cart:', error);
    res.status(500).send({ message: "Failed to delete item from cart" });
  }
};




exports.getCart = async (req, res) => {
  try {
    const { id } = req.params;
    // Assuming the Cart schema has a userId field to match against
    const cart = await Cart.findOne({ userId: id });

    if (!cart) {
      return res.status(200).send({ message: "Empty cart" });
    }

    res.status(200).send(cart);
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).send({ message: "Failed to fetch cart" });
  }
};
