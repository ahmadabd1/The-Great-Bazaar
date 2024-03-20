import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/cart.css'; // Import your CSS file

export default function UserCart(props) {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // Fetch cart items from backend when component mounts
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get('http://localhost:8080/cart/allCart'); // Adjust endpoint as needed
      setCartItems(response.data); // Assuming the response data is an array of cart items
      calculateTotalPrice(response.data);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  const calculateTotalPrice = (items) => {
    const total = items.reduce((acc, item) => acc + item.itemsCart[0].sellPrice, 0);
    setTotalPrice(total);
  };

  const handleDeleteCartItem = async (itemId) => {
    try {
      await axios.delete(`/cart/deleteFromCart/${itemId}`); // Adjust endpoint as needed
      fetchCartItems(); // Refetch cart items after deletion
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
            <tr key={item._id}>
              <td>{item.itemsCart[0].name}</td>
              <td>${item.itemsCart[0].sellPrice}</td>
              <td>
                <button className="cart-button" onClick={() => handleDeleteCartItem(item.itemsCart[0]._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="cart-total">Total Price: ${totalPrice}</div>
      <button className="cart-button">Payment</button>
    </div>
  );
}
