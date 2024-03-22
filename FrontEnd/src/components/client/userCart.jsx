import React from 'react';
import '../style/cart.css';
import useGet from '../customHooks/useGet';
import useUserInfo from '../customHooks/useUserInfo';
import useDeleteIncludeBody from '../customHooks/useDeleteIncludeBody'; // Import the custom hook for deletion
import { Link } from 'react-router-dom';

export default function UserCart() {
  const { userInfo, loading: userLoading, error: userError } = useUserInfo();
  const cartUrl = userInfo ? `http://localhost:8080/cart/${userInfo._id}` : null;
  const { data: cart, loading: cartLoading, error: cartError, refetch: refetchCart } = useGet(cartUrl);
  const { sendDeleteRequest, isLoading: isDeleteLoading, error: deleteError } = useDeleteIncludeBody();

  const aggregateItems = (items) => {
    const itemMap = {};
7
    items.forEach((item) => {
      if (itemMap[item._id]) {
        itemMap[item._id].quantity += 1;
      } else {
        itemMap[item._id] = { ...item, quantity: 1 };
      }
    });

    return Object.values(itemMap);
  };

  const calculateTotalPrice = (aggregatedItems) => {
    return aggregatedItems.reduce((acc, item) => acc + item.sellPrice * item.quantity, 0);
  };

  const handleDeleteCartItem = async (itemId) => {
    if (!userInfo || !userInfo._id || !itemId) {
      console.error("Missing user info or item ID");
      return;
    }

    await sendDeleteRequest('http://localhost:8080/cart', {
      body: {
        userId: userInfo._id,
        itemId: itemId,
      },
    });

    refetchCart(); // Refresh the cart data
  };

  if (userLoading || cartLoading) {
    return <div>Loading...</div>;
  }

  if (userError || cartError) {
    return <div>Error: {userError || cartError.message}</div>;
  }

  const itemsCart = cart && cart.itemsCart ? cart.itemsCart : [];
  const aggregatedItems = aggregateItems(itemsCart);
  const totalPrice = calculateTotalPrice(aggregatedItems);
  const totalItems = itemsCart.length;

  if (totalItems === 0) {
    return <div className="cart-container">Your cart is empty.</div>;
  }

  return (
    <div className="cart-container">
      <h2 className="cart-header">My Cart</h2>
      <div>Total Items: {totalItems}</div>
      <table className="cart-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity in Cart</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {aggregatedItems.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.sellPrice}$</td>
              <td>{item.quantity}</td>
              <td>
                <button className="cart-button" onClick={() => handleDeleteCartItem(item._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="cart-total">Total Price: {totalPrice}$</div>
      <Link className='cart-button' to="/Payment">Payment</Link>
    </div>
  );
}
