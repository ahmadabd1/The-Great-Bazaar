import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import UserCart from './userCart';

const ItemDetail = () => {
  const [item, setItem] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:8080/item/item/${id}`)
      .then(response => {
        console.log(response.data);
        setItem(response.data);
      })
      .catch(error => {
        console.error("Error fetching item details:", error);
      });
  }, [id]); 

  if (!item) {
    return <div>Loading...</div>;
  }
  // const addToCart = () => {
  //   // Here you can implement the logic to add the item to the cart
  //   // For simplicity, let's just log the item to the console
  //   console.log("Item added to cart:", item);
  // };
  const addToCart = (item) => {
    setCartItems([...cartItems, item]); // Add item to cartItems array
    console.log("Item added to cart:", item);
  };
  return (
    <div style={{ background: "#f0f0f0", padding: "20px", borderRadius: "5px" }}>
      <h1>{item.name}</h1>
      <p>Description: {item.description}</p>
      <p>Buy Price: {item.buyPrice}</p>
      <p>Sell Price: {item.sellPrice}</p>
      <button onClick={() => addToCart(item)}>Add to Cart</button>
    </div>
  );
};

export default ItemDetail;
