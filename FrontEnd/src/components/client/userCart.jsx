import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/cart.css'; // Import your CSS file
export default function UserCart(props) {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get('http://localhost:8080/cart/allCart');
      setCartItems(response.data);
      calculateTotalPrice(response.data);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  const calculateTotalPrice = (items) => {
    const total = items.reduce((acc, item) => {
      // Ensure that itemsCart[0] exists before accessing its sellPrice
      return acc + (item.itemsCart && item.itemsCart[0] ? item.itemsCart[0].sellPrice : 0);
    }, 0);
    setTotalPrice(total);
  };

  const handleDeleteCartItem = async (itemId) => {
    try {
      await axios.delete(`/cart/deleteFromCart/${itemId}`);
      fetchCartItems();
    } catch (error) {
      console.error('Error deleting cart item:', error);
    }
  };

  return (
    <div className="cart-container">
      <h2 className="cart-header">My Cart</h2>
      <table className="cart-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            // Ensure that itemsCart[0] exists before rendering its properties
            item.itemsCart && item.itemsCart[0] ? (
              <tr key={item._id}>
                <td>{item.itemsCart[0].name}</td>
                <td>${item.itemsCart[0].sellPrice}</td>
                <td>
                  <button className="cart-button" onClick={() => handleDeleteCartItem(item.itemsCart[0]._id)}>Delete</button>
                </td>
              </tr>
            ) : null
          ))}
        </tbody>
      </table>
      <div className="cart-total">Total Price: ${totalPrice}</div>
      <button className="cart-button">Payment</button>
    </div>
  );
}
