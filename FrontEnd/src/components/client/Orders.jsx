import React, { useState, useEffect } from "react";
import useUserInfo from "../customHooks/useUserInfo";
import { FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function Orders() {
  const { userInfo, loading: userLoading, error: userError } = useUserInfo();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      if (userInfo) {
        try {
          const response = await fetch(
            `http://localhost:8080/order/${userInfo._id}`,
          );
          if (!response.ok) {
            throw new Error("Failed to fetch orders");
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")}`;
  };

  const aggregateItems = (order) => {
    const aggregatedItems = {};
    order.items.forEach((item) => {
      if (aggregatedItems[item._id]) {
        aggregatedItems[item._id].quantity++;
      } else {
        aggregatedItems[item._id] = { ...item, quantity: 1 };
      }
    });
    return Object.values(aggregatedItems);
  };

  const calculateTotalPrice = (order) => {
    return order.items.reduce((total, item) => total + item.sellPrice, 0);
  };

  if (userLoading) {
    return <div className="py-4 text-center">Loading user info...</div>;
  }

  if (userError) {
    return (
      <div className="py-4 text-center text-red-500">Error: {userError}</div>
    );
  }

  return (
    <div
      className="container mx-auto mt-8 font-mono text-gray-200 "
      style={{ paddingTop: "60px" }}
    >
      <Link to="/client/">
        <label className="ml-7 mt-2 border-gray-600 p-6 text-center font-mono text-xl text-slate-200">
          &lt; Back
        </label>
      </Link>
      <div className="grid grid-cols-1 gap-4 text-2xl sm:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <div className="py-2 text-center">Loading orders...</div>
        ) : error ? (
          <div className="py-2 text-center text-red-500">Error: {error}</div>
        ) : orders.length > 0 ? (
          orders.map((order) => (
            <div
              key={order._id}
              className="rounded-lg border-gray-300 border-gray-900 bg-black bg-opacity-50 p-4 shadow-lg  shadow-md backdrop-blur-md transition duration-300 hover:shadow-lg"
            >
              <div className="text-xl">Date: {formatDate(order.orderDate)}</div>
              <div className="text-xs italic">Status: {order.orderStatus}</div>
              <div className="text-sm">Address: {order.address}</div>
              <div className="text-sm">
                Items:
                {aggregateItems(order).map((item) => (
                  <div key={item._id} className="flex items-center py-1">
                    <img
                      src={item.image_id}
                      alt={item.name}
                      className="mr-2 h-12 w-12 flex-none rounded object-cover"
                    />
                    <div className="text-m">
                      <div className="font-bold">{item.name}</div>
                      <div>Description: {item.description}</div>
                      <div>Price: ${item.sellPrice.toFixed(2)}</div>
                      <div>Quantity: {item.quantity}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-sm font-bold">
                Total Price: ${calculateTotalPrice(order).toFixed(2)}
              </div>
            </div>
          ))
        ) : (
          <div className="py-2 text-center">No orders found</div>
        )}
      </div>
    </div>
  );
}
