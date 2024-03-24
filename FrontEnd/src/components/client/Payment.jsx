import React, { useState, useEffect, useRef } from "react";
import useGet from "../customHooks/useGet";
import useUserInfo from "../customHooks/useUserInfo";
import { Link } from "react-router-dom";
import "../style/Payment.css"; // Import the CSS file

export default function Payment() {
  const { userInfo } = useUserInfo();
  const {
    data: cart,
    loading,
    error,
  } = useGet(userInfo ? `http://localhost:8080/cart/${userInfo._id}` : null);
  const [redirectToOrders, setRedirectToOrders] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
    address: "",
  });
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
    console.log("Performing pre-navigation logic...");
    // Perform actions and then set redirectToOrders to true
    setRedirectToOrders(true);
    // Here you can send paymentInfo along with the order
    // For simplicity, I'll just log it for now
    console.log("Payment Info:", paymentInfo);
  };

  if (loading) return <div className="Loader">Loading...</div>;
  if (error) return <div className="Error">Error: {error.message}</div>;
  if (!cart || !cart.itemsCart || cart.itemsCart.length === 0)
    return <div className="EmptyCart">Your cart is empty.</div>;

  const aggregatedItems = aggregateItems(cart.itemsCart);

  return (
    <div className="PaymentContainer">
      <h2>Payment</h2>
      <form>
        <label>
          Card Number:
          <input
            type="text"
            value={paymentInfo.cardNumber}
            onChange={(e) =>
              setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })
            }
            maxLength="16"
          />
        </label>
        <label>
          Expiry Date:
          <input
            type="text"
            value={paymentInfo.expiryDate}
            onChange={(e) =>
              setPaymentInfo({ ...paymentInfo, expiryDate: e.target.value })
            }
            placeholder="MM/YYYY"
            maxLength="7"
          />
        </label>
        <label>
          CVV:
          <input
            type="text"
            value={paymentInfo.cvv}
            onChange={(e) =>
              setPaymentInfo({ ...paymentInfo, cvv: e.target.value })
            }
            maxLength="3"
          />
        </label>
        <label>
          Cardholder Name:
          <input
            type="text"
            value={paymentInfo.cardholderName}
            onChange={(e) =>
              setPaymentInfo({ ...paymentInfo, cardholderName: e.target.value })
            }
          />
        </label>
        <label>
          Address:
          <input
            type="text"
            value={paymentInfo.address}
            onChange={(e) =>
              setPaymentInfo({ ...paymentInfo, address: e.target.value })
            }
          />
        </label>
      </form>
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
            <th>
              {aggregatedItems
                .reduce((acc, item) => acc + item.sellPrice * item.quantity, 0)
                .toFixed(2)}
              $
            </th>
          </tr>
        </tfoot>
      </table>
      {redirectToOrders ? (
        // Attach the ref to the Link and make it hidden
        <Link ref={linkRef} to="/orders" style={{ display: "none" }}>
          Proceed to Orders
        </Link>
      ) : (
        <button className="Buy" onClick={handleBuyClick}>
          Buy
        </button>
      )}
    </div>
  );
}
