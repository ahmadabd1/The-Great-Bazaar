import React, { useState, useEffect } from 'react';
import '../style/OrdersA.css';

export default function OrdersA() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:8080/order/');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const consolidateItems = (items) => {
    const consolidatedItems = {};
    items.forEach(item => {
      const { _id, name } = item;
      if (consolidatedItems[_id]) {
        consolidatedItems[_id].quantity++;
      } else {
        consolidatedItems[_id] = { ...item, quantity: 1, name };
      }
    });
    return Object.values(consolidatedItems);
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:8080/order`, { // Ensure this URL matches your back-end endpoint
        method: 'PUT', // Using PUT since we're updating an existing resource
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderId, status: newStatus }), // Sending orderId and the new status
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      // Assuming the response from the server indicates success
      console.log(`Status of order ${orderId} changed to ${newStatus}`);
  
      // Update the status in the orders state
      setOrders(orders.map(order => {
        if (order._id === orderId) {
          return { ...order, orderStatus: newStatus };
        }
        return order;
      }));
    } catch (error) {
      console.error('Error changing status:', error);
    }
  };
  

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="orders-container">
      {orders.map((order) => (
        <div key={order._id} className="order-card">
          <div className="order-header">
            <h3 className="order-title">Order Owner : {order.userFirstname} {order.userLastName}</h3>
            <div className="order-buttons">
              <select
                value={order.orderStatus}
                onChange={(e) => handleStatusChange(order._id, e.target.value)}
              >
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
              <button className="delete-button" onClick={() => handleDeleteOrder(order._id)}>Delete</button>
            </div>
          </div>
          <div className="order-details">
            <p className="order-address">Address: {order.address}</p>
            <div className="order-items">
              {consolidateItems(order.items).map((item, index) => (
                <div key={item._id} className="order-item">
                  <img src={item.image_id} alt={`Item ${index}`} className="item-image" />
                  <p className="item-name">Item: {item.name}</p>
                  <p className="item-price">Price: ${item.sellPrice}</p>
                  {item.quantity > 1 && <p className="item-quantity">Quantity: {item.quantity}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
