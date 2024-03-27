import React, { useState, useEffect, useRef } from "react";
import useGet from "../customHooks/useGet";
import useUserInfo from "../customHooks/useUserInfo";
import { Link } from "react-router-dom";

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
  const [paymentError, setPaymentError] = useState(""); // State to store payment error message
  const linkRef = useRef(null);

  useEffect(() => {
    if (redirectToOrders && linkRef.current) {
      linkRef.current.click();
    }
  }, [redirectToOrders]);

  const handleBuyClick = async () => {
    if (userInfo && userInfo._id) {
      try {
        const response = await fetch(
          `http://localhost:8080/order/payment/${userInfo._id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(paymentInfo),
          },
        );
        const result = await response.json();
        if (response.ok) {
          setRedirectToOrders(true);
        } else {
          setPaymentError(result.message || "Failed to create order.");
        }
      } catch (e) {
        setPaymentError(
          e.message || "An error occurred during the payment process.",
        );
      }
    } else {
      setPaymentError("User info is not available.");
    }
  };

  if (loading) return <div className="Loader">Loading...</div>;
  if (error) return <div className="Error">Error: {error.message}</div>;
  if (!cart || !cart.itemsCart || cart.itemsCart.length === 0)
    return <div className="EmptyCart">Your cart is empty.</div>;

  return (
    <section
      style={{ width: "950px" }}
      className="PaymentContainer mb-4 mt-8 border-2 border-white bg-slate-950 bg-opacity-80 p-1"
    >
      <div className="container py-1">
        <h2 className="mb-2 ml-[285px] font-mono text-xl text-sky-500">
          Payment
        </h2>
        {paymentError && <div className="text-red-500">{paymentError}</div>}
        <div className="-mx-2 flex flex-wrap border-t-2 border-white">
          {/* Payment Information Section */}
          <div className="w-full p-2 lg:w-1/2">
            <div className="bg-slate-00 rounded-lg p-4 opacity-85">
              <form className="space-y-3">
                {/* Payment Information Fields */}
                {/* Card Number */}
                <div className="flex items-center">
                  <label className="block w-1/3 font-mono text-lg capitalize text-sky-400">
                    Card Number:
                  </label>
                  <input
                    type="text"
                    value={paymentInfo.cardNumber}
                    onChange={(e) =>
                      setPaymentInfo({
                        ...paymentInfo,
                        cardNumber: e.target.value,
                      })
                    }
                    maxLength="16"
                    className="w-2/3 rounded border px-2 py-1 font-mono text-sm text-slate-300"
                  />
                </div>
                {/* Expiry Date */}
                <div className="flex items-center">
                  <label className="block w-1/3 font-mono text-lg capitalize text-sky-400">
                    Expiry Date:
                  </label>
                  <input
                    type="text"
                    value={paymentInfo.expiryDate}
                    onChange={(e) =>
                      setPaymentInfo({
                        ...paymentInfo,
                        expiryDate: e.target.value,
                      })
                    }
                    placeholder="MM/YYYY"
                    maxLength="7"
                    className="w-2/3 rounded border px-2 py-1 font-mono text-sm text-slate-300"
                  />
                </div>
                {/* CVV */}
                <div className="flex items-center">
                  <label className="block w-1/3 font-mono text-lg capitalize text-sky-400">
                    CVV:
                  </label>
                  <input
                    type="text"
                    value={paymentInfo.cvv}
                    onChange={(e) =>
                      setPaymentInfo({ ...paymentInfo, cvv: e.target.value })
                    }
                    maxLength="3"
                    className="w-2/3 rounded border px-2 py-1 font-mono text-sm text-slate-300"
                  />
                </div>
                {/* Cardholder Name */}
                <div className="flex items-center">
                  <label className="block w-1/3 font-mono text-lg capitalize text-sky-400">
                    Cardholder Name:
                  </label>
                  <input
                    type="text"
                    value={paymentInfo.cardholderName}
                    onChange={(e) =>
                      setPaymentInfo({
                        ...paymentInfo,
                        cardholderName: e.target.value,
                      })
                    }
                    className="w-2/3 rounded border px-2 py-1 font-mono text-sm text-slate-300"
                  />
                </div>
                {/* Address */}
                <div className="flex items-center">
                  <label className="block w-1/3 font-mono text-lg capitalize text-sky-400">
                    Address:
                  </label>
                  <input
                    type="text"
                    value={paymentInfo.address}
                    onChange={(e) =>
                      setPaymentInfo({
                        ...paymentInfo,
                        address: e.target.value,
                      })
                    }
                    className="w-2/3 rounded border px-2 py-1 font-mono text-sm text-slate-300"
                  />
                </div>
              </form>
            </div>
          </div>

          {/* Cart Summary Section */}
          <div className="w-full p-2 lg:w-1/2">
            <div className="mb-5 rounded bg-opacity-85 p-4">
              <h3 className="mb-3 font-mono text-xl text-sky-500">
                Cart Summary
              </h3>
              <table className="mb-3 w-full border-collapse">
                <thead>
                  <tr>
                    {/* Table headers */}
                    <th className="border border-gray-300 bg-gray-200 p-1 text-left font-mono text-sky-500">
                      Item
                    </th>
                    <th className="border border-gray-300 bg-gray-200 p-1 text-left font-mono text-sky-500">
                      Price
                    </th>

                    <th className="border border-gray-300 bg-gray-200 p-1 text-left font-mono text-sky-500">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Mapping through cart items */}
                  {cart.itemsCart.map((item) => (
                    <tr key={item._id}>
                      <td className="border border-gray-300 p-1 text-left font-mono text-sky-500">
                        {item.name}
                      </td>
                      <td className="border border-gray-300 p-1 text-left font-mono text-sky-500">
                        {item.sellPrice}$
                      </td>

                      <td className="border border-gray-300 p-1 text-left font-mono text-sky-500">
                        {item.sellPrice.toFixed(2)}$
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    {/* Table footer */}
                    <th
                      colSpan="2"
                      className="border border-gray-300 p-1 text-left font-mono text-sky-500"
                    >
                      Total
                    </th>
                    <td className="border border-gray-300 p-1 text-left font-mono text-sky-500">
                      {cart.itemsCart
                        .reduce((acc, item) => acc + item.sellPrice, 0)
                        .toFixed(2)}
                      $
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
        <div className="mt-4 flex justify-center">
          {/* Button to trigger payment */}
          {redirectToOrders ? (
            <Link ref={linkRef} to="/orders" className="hidden">
              Proceed to Orders
            </Link>
          ) : (
            <button
              style={{ width: "150px" }}
              className="rounded-lg bg-sky-500 p-2 font-mono text-white hover:bg-sky-600"
              onClick={handleBuyClick}
            >
              Buy
            </button>
          )}
        </div>
        {/* Error message display */}
        {paymentError && (
          <div className="text-center text-red-500">{paymentError}</div>
        )}
      </div>
    </section>
  );
}
