import React from 'react';
import { useParams } from 'react-router-dom';
import useUserInfo from '../customHooks/useUserInfo';
import useGet from '../customHooks/useGet';
import usePost from '../customHooks/usePost'; // Import your custom usePost hook

const ItemDetail = () => {
  const { id } = useParams();
  const { userInfo } = useUserInfo();
  const { data: item, loading: itemLoading, error: itemError } = useGet(`http://localhost:8080/item/item/${id}`);
  const { postData, loading: postLoading, error: postError } = usePost();

  const addToCart = async (item) => {
    const cartData = {
      userId: userInfo._id,
      item: {
        ...item,
      },
    };

    try {
      const response = await postData('http://localhost:8080/cart/addToCart', cartData);
      console.log("Item added to cart:", response);
      alert("Item added to cart");
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  if (itemLoading || postLoading) return <div>Loading...</div>;
  if (itemError) return <div>Error fetching item: {itemError.message}</div>;
  if (postError) return <div>Error adding item to cart: {postError.message}</div>;
  if (!item) return <div>Item not found</div>;

  return (
  <div className="max-w-sm mx-auto bg-black bg-opacity-50 border-2  border-black rounded-lg shadow-lg overflow-hidden flex flex-col justify-between h-96 p-5 backdrop-blur-md">
    {item.image_id && (
      <img 
        src={item.image_id} 
        alt={item.name} 
        className="h-32 w-32 object-cover rounded-md self-center"
      />
    )}
    <h1 className="text-xl text-white font-mono self-center mt-4">{item.name}</h1>
    <p className="text-base text-gray-300 font-mono text-center mt-2">{item.description}</p>
<p className="text-base text-white font-mono mt-2">
  Buy Price: <span className="text-green-600">{item.buyPrice}$</span>
</p>
<p className="text-base text-white font-mono mt-2">
  Sell Price: <span className="text-green-600">{item.sellPrice}$</span>
</p>

    <button 
      onClick={() => addToCart(item)}
      className="mt-4 py-2 px-4 bg-green-500 text-white rounded focus:outline-none focus:shadow-outline hover:bg-green-600 cursor-pointer"
    >
      Add to Cart
    </button>
</div>

  );
};

export default ItemDetail;
