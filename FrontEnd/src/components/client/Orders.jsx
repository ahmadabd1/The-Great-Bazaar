import React, { useState, useEffect } from 'react';
import useUserInfo from '../customHooks/useUserInfo'; // Adjust the path as needed
import '../style/clientOrders.css'
export default function Orders() {
  const { userInfo, loading: userLoading, error: userError } = useUserInfo();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      if (userInfo) {
        try {
          const response = await fetch(`http://localhost:8080/order/${userInfo._id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch orders');
          }

          const ordersData = await response.json();
          setOrders(ordersData);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      }
    };

    if (userInfo) {
      fetchOrders();
    }
  }, [userInfo]);

  // Function to format date string
  const formatDate = dateString => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${day}/${month}/${year} - ${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
  };

  // Function to aggregate items by their _id and count quantity
  const aggregateItems = order => {
    const aggregatedItems = {};
    order.items.forEach(item => {
      if (aggregatedItems[item._id]) {
        aggregatedItems[item._id].quantity++;
      } else {
        aggregatedItems[item._id] = { ...item, quantity: 1 };
      }
    });
    return Object.values(aggregatedItems);
  };

  // Function to calculate total price of an order
  const calculateTotalPrice = order => {
    return order.items.reduce((total, item) => total + item.buyPrice, 0);
  };

  if (userLoading) {
    return <div className="loading">Loading user info...</div>;
  }

  if (userError) {
    return <div className="error">Error: {userError}</div>;
  }

  return (
    <div className="orders-container">
      {loading ? (
        <div className="loading">Loading orders...</div>
      ) : error ? (
        <div className="error">Error: {error}</div>
      ) : (
        <div className="orders-list">
          {orders.length > 0 ? (
            orders.map(order => (
              <div key={order._id} className="order-item">
                <div className="order-date">Date: {formatDate(order.orderDate)}</div>
                <div className="order-status">Status: {order.orderStatus}</div>
                <div className="order-address">Address: {order.address}</div>
                <div className="order-items">
                  Items:
                  {aggregateItems(order).map(item => (
                    <div key={item._id} className="order-item-details">
                      <img src={item.image_id} alt={item.name} className="item-image" />
                      <div className="item-name">Name: {item.name}</div>
                      <div className="item-description">Description: {item.description}</div>
                      <div className="item-buyPrice"> Price: {item.buyPrice}</div>
                      <div className="item-quantity">Quantity: {item.quantity}</div>
                    </div>
                  ))}
                </div>
                <div className="order-total-price">
                  Total Price: {calculateTotalPrice(order)}
                </div>
              </div>
            ))
          ) : (
            <div className="no-orders">No orders found</div>
          )}
        </div>
      )}
    </div>
  );
}
