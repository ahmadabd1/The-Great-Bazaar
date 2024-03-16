import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

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
  const addToCart = () => {
    // Here you can implement the logic to add the item to the cart
    // For simplicity, let's just log the item to the console
    console.log("Item added to cart:", item);
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
      <button style={{ padding: '8px 16px', fontSize: '14px', cursor: 'pointer', marginTop: '10px' }}>Add to Cart</button>
    </div>
  );
};

export default ItemDetail;
