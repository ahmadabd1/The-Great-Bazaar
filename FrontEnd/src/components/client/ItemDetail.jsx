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
    <div style={{ height: '350px', width: '250px', backdropFilter: 'blur(10px)', padding: "20px", borderRadius: "5px", display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '300px', margin: 'auto' }}>
      {item.image_id && (
        <img 
          src={item.image_id} 
          alt={item.name} 
          style={{ height: '130px', width: '130px' }}
        />
      )}
      <h1 style={{ fontSize: '24px', margin: '10px 0' }}>{item.name}</h1>
      <p style={{ fontSize: '16px', textAlign: 'center', margin: '5px 0' }}>{item.description}</p>
      <p style={{ fontSize: '16px', margin: '5px 0' }}>Buy Price: {item.buyPrice}$</p>
      <p style={{ fontSize: '16px', margin: '5px 0' }}>Sell Price: {item.sellPrice}$</p>
      <button onClick={() => addToCart(item)} style={{ padding: '8px 16px', fontSize: '14px', cursor: 'pointer', marginTop: '10px' }}>Add to Cart</button>
    </div>
  );
};

export default ItemDetail;
