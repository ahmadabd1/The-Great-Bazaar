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

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:8080/order`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderId, status: newStatus }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const updatedOrders = orders.map(order => 
        order._id === orderId ? { ...order, orderStatus: newStatus } : order
      );
      setOrders(updatedOrders);
    } catch (error) {
      console.error('Error changing status:', error);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:8080/order/${orderId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const updatedOrders = orders.filter(order => order._id !== orderId);
      setOrders(updatedOrders);
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="orders-container">
      {orders.map((order) => (
        <OrderCard key={order._id} order={order} handleStatusChange={handleStatusChange} handleDeleteOrder={handleDeleteOrder} />
      ))}
    </div>
  );
}

function OrderCard({ order, handleStatusChange, handleDeleteOrder }) {
  const consolidateItems = (items) => {
    const consolidatedItems = {};
    items.forEach(item => {
      const { _id, name } = item;
      consolidatedItems[_id] = {
        ...item,
        quantity: (consolidatedItems[_id]?.quantity || 0) + 1,
        name
      };
    });
    return Object.values(consolidatedItems);
  };

  const calculateItemTotalPrice = (itemId, items) => {
    return items.reduce((total, item) => {
      return item._id === itemId ? total + item.sellPrice : total;
    }, 0);
  };

  const calculateTotalPrice = (order) => {
    return order.items.reduce((total, item) => {
      return total + calculateItemTotalPrice(item._id, order.items);
    }, 0);
  };

  return (
    <div className="order-card">
      <div className="order-header">
        <h3 className="order-title">Order Owner: {order.userFirstname} {order.userLastName}</h3>
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
        <p className="order-address">Owner Phone Number: {order.userPhoneNumber}</p>
        <div className="order-items">
          {consolidateItems(order.items).map((item) => (
            <div key={item._id} className="order-item">
              <img src={item.image_id} alt={`Item ${item._id}`} className="item-image" />
              <p className="item-name">Item: {item.name}</p>
              <p className="item-price">Price: ${calculateItemTotalPrice(item._id, order.items)}</p>
              {item.quantity > 1 && <p className="item-quantity">Quantity: {item.quantity}</p>}
            </div>
          ))}
        </div>
        <p className="order-total-price">Total Price: ${calculateTotalPrice(order)}</p>
      </div>
    </div>
  );
}

