import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useUserInfo from "../customHooks/useUserInfo";
import useGet from "../customHooks/useGet";
import usePost from "../customHooks/usePost";
import { Link } from "react-router-dom";

const ItemDetail = () => {
  const { id } = useParams();
  const { userInfo } = useUserInfo();
  const {
    data: item,
    loading: itemLoading,
    error: itemError,
  } = useGet(`http://localhost:8080/item/item/${id}`);
  const { postData, loading: postLoading, error: postError } = usePost();
  const [responseMessage, setResponseMessage] = useState(""); // State to hold the response message

  const addToCart = async (itemToAdd) => {
    const cartData = {
      userId: userInfo._id,
      item: { ...itemToAdd },
    };

    try {
      const response = await postData(
        "http://localhost:8080/cart/addToCart",
        cartData,
      );
      console.log("Item added to cart:", response);
      setResponseMessage("Item added to cart"); // Update the message state
      // Clear message after 3 seconds
      setTimeout(() => setResponseMessage(""), 3000);
    } catch (error) {
      console.error("Error adding item to cart:", error);
      setResponseMessage("Error adding item to cart"); // Set error message
    }
  };

  if (itemLoading || postLoading) return <div>Loading...</div>;
  if (itemError) return <div>Error fetching item: {itemError.message}</div>;
  if (postError)
    return <div>Error adding item to cart: {postError.message}</div>;
  if (!item) return <div>Item not found</div>;

  return (
    <div className="mx-auto flex h-96 max-w-sm flex-col justify-between overflow-hidden rounded-lg border-2 border-black bg-black bg-opacity-50 p-5 shadow-lg backdrop-blur-md">
      <Link to="/client/">
        <label className="cursor-pointer border-gray-600 p-6 text-center font-mono text-xl text-slate-200">
          &lt; Back
        </label>
      </Link>
      {item.image_id && (
        <img
          src={item.image_id}
          alt={item.name}
          className="h-32 w-32 self-center rounded-md object-cover"
        />
      )}
      <h1 className="mt-4 self-center font-mono text-xl text-white">
        {item.name}
      </h1>
      <p className="mt-2 text-center font-mono text-base text-gray-300">
        {item.description}
      </p>
      <p className="mt-2 font-mono text-base text-white">
        Price: <span className="text-green-600">{item.sellPrice}$</span>
      </p>

      {/* Display the response message here */}
      {responseMessage && (
        <div className="text-center text-sm text-white">{responseMessage}</div>
      )}

      <button
        onClick={() => addToCart(item)}
        className="mt-4 cursor-pointer rounded bg-opacity-50 px-4 py-2 text-white shadow-lg backdrop-blur-md transition-shadow duration-300 hover:bg-green-600 hover:shadow-xl"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ItemDetail;
