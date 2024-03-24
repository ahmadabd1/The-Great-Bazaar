import React from "react";
import "../style/cart.css";
import useGet from "../customHooks/useGet";
import useUserInfo from "../customHooks/useUserInfo";
import useDeleteIncludeBody from "../customHooks/useDeleteIncludeBody"; // Import the custom hook for deletion
import { Link } from "react-router-dom";

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
    7;
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
    <div className="mt-10 flex bg-gradient-to-b from-slate-950/70 to-sky-300/50 p-2">
      <div className="w-full rounded bg-slate-600 shadow-md">
        <h2 className="mt-2 text-center font-mono text-3xl text-sky-600">
          My Cart
        </h2>
        <div className="mt-3 border-b-2 border-slate-950"></div>
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
          {aggregatedItems.map((item) => (
            <div key={item._id} className="w-full md:w-3/4 md:pl-3">
              <p className="pt-4 text-xs leading-3 text-gray-800 md:pt-0">
                RF293
              </p>
              <div className="flex w-full items-center justify-between pt-1">
                <p className="text-base font-black leading-none text-gray-800">
                  {item.name}
                </p>
                {/* <select className="mr-6 border border-gray-200 px-1 py-2 focus:outline-none">
                  <option>01</option>
                  <option>02</option>
                  <option>03</option>
                </select> */}
              </div>
              <p className="pt-2 text-xs leading-3 text-gray-600">
                Height: 10 inches
              </p>
              <p className="py-4 text-xs leading-3 text-gray-600">
                Color: Black
              </p>
              <p className="w-96 text-xs leading-3 text-gray-600">
                Composition: 100% calf leather
              </p>
              <div className="flex items-center justify-between pr-6 pt-5">
                <div className="flex items-center">
                  <p className="cursor-pointer text-xs leading-3 text-gray-800 underline">
                    Add to favorites
                  </p>
                  <p
                    className="cursor-pointer pl-5 text-xs leading-3 text-red-500 underline"
                    onClick={() => handleDeleteCartItem(item._id)}
                  >
                    Remove
                  </p>
                </div>
                <p className="text-base font-black leading-none text-gray-800">
                  ${item.sellPrice}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="h-[70vh] w-[55vh] rounded bg-slate-950 shadow-md">
        <div className="mb-4">Total Price: {totalPrice}$</div>
        <div className="mb-2">Total Items: {totalItems}</div>
        <Link
          to="/Payment"
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        >
          Payment
        </Link>
        <Link
          to="/Payment"
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        >
          Payment
        </Link>
      </div>
    </div>
  );
}
