import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
// import UserCart from './userCart';
// import Item from '../../../../Backend/models/item';
import useUserInfo from '../customHooks/useUserInfo';
const ItemDetail = () => {
  const [item, setItem] = useState(null);
  const { id } = useParams();
  const { userInfo, loading, error, updateUserInfo } = useUserInfo();
  useEffect(() => {
    axios.get(`http://localhost:8080/item/item/${id}`)
      .then(response => {
        console.log(response.data.buyPrice);
        console.log("added item")
        setItem(response.data);
      })
      .catch(error => {
        console.error("Error fetching item details:", error);
      });
  }, [id]);

  if (!item) {
    return <div>Loading...</div>;
  }
  const cartData ={
    userId : userInfo._id,
    itemsCart : [],
    totalItems: 0,
    totalPrice: 0

  }
  // const addToCart = () => {
  //   // Here you can implement the logic to add the item to the cart
  //   // For simplicity, let's just log the item to the console
  //   console.log("Item added to cart:", item);
  // };
  const addToCart =async (item) => {
    // setCartItems([...cartItems, item]); // Add item to cartItems array
    cartData.itemsCart=[...cartData.itemsCart,item]
    cartData.totalItems+=1
    cartData.totalPrice=cartData.totalItems*cartData.itemsCart.sellPrice
    try {

      const response = await axios.post('http://localhost:8080/cart/addToCart',cartData); // Adjust endpoint as needed
      setCartItems(response.data); // Assuming the response data is an array of cart items
      calculateTotalPrice(response.data);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
    console.log("Item added to cart:", item);
    alert("item added to cart")
  };
  return (
    <div style={{  height: '350px', width: '250px', backdropFilter: 'blur(10px)', padding: "20px", borderRadius: "5px", display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '300px', margin: 'auto' }}>
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
      <button onClick={()=>addToCart(item)} style={{ padding: '8px 16px', fontSize: '14px', cursor: 'pointer', marginTop: '10px' }}>Add to Cart</button>
    </div>
  );
};

export default ItemDetail;
