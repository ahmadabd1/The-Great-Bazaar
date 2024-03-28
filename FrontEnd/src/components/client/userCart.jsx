import React from "react";
import "../style/cart.css";
import useGet from "../customHooks/useGet";
import useUserInfo from "../customHooks/useUserInfo";
import useDeleteIncludeBody from "../customHooks/useDeleteIncludeBody";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
export default function UserCart() {
  const { userInfo, loading: userLoading, error: userError } = useUserInfo();
  const cartUrl = userInfo
    ? `http://localhost:8080/cart/${userInfo._id}`
    : null;
  const {
    data: cart,
    loading: cartLoading,
    error: cartError,
    refetch: refetchCart,
  } = useGet(cartUrl);
  const {
    sendDeleteRequest,
    isLoading: isDeleteLoading,
    error: deleteError,
  } = useDeleteIncludeBody();

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

  const calculateTotalPrice = (aggregatedItems) => {
    return aggregatedItems.reduce(
      (acc, item) => acc + item.sellPrice * item.quantity,
      0,
    );
  };

  const handleDeleteCartItem = async (itemId) => {
    if (!userInfo || !userInfo._id || !itemId) {
      console.error("Missing user info or item ID");
      return;
    }

    await sendDeleteRequest("http://localhost:8080/cart", {
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
    <div className="flex border-2">
      <div className="h-[70vh] w-[49vh] overflow-auto rounded  border-white bg-slate-950 bg-opacity-80">
        <h2 className="mb-2 ml-4 mt-2 font-mono  text-3xl text-sky-500">
          My Cart
        </h2>

        <div className="ml-4 w-[60vh]">
          {aggregatedItems.map((item) => (
            <div
              key={item._id}
              className=" mt-3 w-full border md:w-3/4 md:pl-3"
            >
              <img
                src={item.image_id}
                alt={item.name}
                className="ml-[10vh] mt-2 h-28 w-40 rounded-3xl border object-cover"
              />
              <div className="flex w-full items-center justify-between pt-1">
                <p className="font-mono text-lg  text-sky-100">{item.name}</p>
                <p className="mr-2 font-mono text-lg text-sky-400">
                  ${item.sellPrice}
                </p>
              </div>

              <div className="bg-red mb-2 flex items-center justify-between pt-2">
                <div className="flex items-center">
                  <button
                    className="mb-2 ml-[17vh] bg-red-500  p-1 text-sm text-slate-50"
                    onClick={() => handleDeleteCartItem(item._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className=" h-[70vh] w-[40vh]  border-white bg-slate-950 bg-opacity-80">
        <div>
          <h2 className="mb-2 ml-2 mt-2 font-mono text-3xl text-sky-500">
            Order Summary
          </h2>{" "}
        </div>

        <div className="center ml-2 mt-12 flex w-[40vh] justify-between font-mono text-2xl text-slate-400">
          <div>
            <p className="mb-4">Items </p>
            <p className="mb-2">Subtotal </p>
            <p className="mb-4">Shipping </p>

            <p className="mt-[18vh] w-[27vh] border-t ">Total</p>
          </div>
          <div className="mb-5 mr-8 text-right text-slate-100">
            <p className="mb-2">{totalItems}</p>
            <p className="mb-4">{totalPrice}$</p>
            <p className="mb-4">20$</p>

            <p className="mt-[18vh] border-t ">{totalPrice + 20}$</p>
          </div>
        </div>
        <div className="ml-2">
          <Link
            to="/client/ItemsAll"
            className=" flex w-[37vh] items-center justify-center rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          >
            <FaArrowLeft className="mr-2" />{" "}
            {/* Replacing the cart icon with the back arrow icon */}
            Shop
          </Link>
          <Link
            to="/Payment"
            className="mt-5 flex w-[37vh] items-center justify-center rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          >
            <FaShoppingCart className="mr-2" />
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
