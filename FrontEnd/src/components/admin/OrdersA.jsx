import React, { useState, useEffect } from 'react';
import '../style/OrdersA.css'
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="orders-container">
      {orders.length > 0 ? (
        orders.map((order) => (
          <div key={order._id} className="order-card">
            <h3 className="order-title">Order ID: {order._id}</h3>
            <div className="order-details">
              <p className="order-userId">User ID: {order.userId}</p>
              <p className="order-address">Address: {order.address}</p>
              <div className="order-items">
                {order.items.map((item, index) => (
                  <div key={index} className="order-item">
                    <p className="item-name">Item: {item.name}</p>
                    <p className="item-quantity">Quantity: {item.quantity}</p>
                    <p className="item-price">Price: ${item.sellPrice}</p>
                  </div>
                ))}
              </div>
              <p className="order-status">Status: {order.orderStatus}</p>
            </div>
          </div>
        ))
      ) : (
        <div>No orders found.</div>
      )}
    </div>
  );
}
