import React, { useState, useEffect, useRef } from 'react';
import useGet from '../customHooks/useGet';
import useUserInfo from '../customHooks/useUserInfo';
import { Link } from 'react-router-dom';

export default function Payment() {
  const { userInfo } = useUserInfo();
  const { data: cart, loading, error } = useGet(userInfo ? `http://localhost:8080/cart/${userInfo._id}` : null);
  const [redirectToOrders, setRedirectToOrders] = useState(false);
  const linkRef = useRef(null); // Create a ref for the Link

  useEffect(() => {
    // If redirectToOrders is true, click the link programmatically
    if (redirectToOrders && linkRef.current) {
      linkRef.current.click();
    }
  }, [redirectToOrders]);

  const aggregateItems = (items) => {
    const itemMap = {};

    items.forEach((item) => {
      if (itemMap[item._id]) {
        itemMap[item._id].quantity += 1;
      } else {
        itemMap[item._id] = { ...item, quantity: 1 };
      }
    });

    return Object.values(itemMap);
  };

  const handleBuyClick = () => {
    console.log('Performing pre-navigation logic...');
    // Perform actions and then set redirectToOrders to true
    setRedirectToOrders(true);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!cart || !cart.itemsCart || cart.itemsCart.length === 0) return <div>Your cart is empty.</div>;

  const aggregatedItems = aggregateItems(cart.itemsCart);

  return (
    <div>
      <h2>Payment</h2>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {aggregatedItems.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.sellPrice}$</td>
              <td>{item.quantity}</td>
              <td>{(item.sellPrice * item.quantity).toFixed(2)}$</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th colSpan="3">Total</th>
            <th>{aggregatedItems.reduce((acc, item) => acc + item.sellPrice * item.quantity, 0).toFixed(2)}$</th>
          </tr>
        </tfoot>
      </table>
      {redirectToOrders ? (
        // Attach the ref to the Link and make it hidden
        <Link ref={linkRef} to="/orders" style={{ display: 'none' }}>Proceed to Orders</Link>
      ) : (
        <button className="Buy" onClick={handleBuyClick}>Buy</button>
      )}
    </div>
  );
}
