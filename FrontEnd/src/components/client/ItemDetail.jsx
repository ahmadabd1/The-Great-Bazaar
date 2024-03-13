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

  return (
    <div style={{ background: "#f0f0f0", padding: "20px", borderRadius: "5px" }}>
      <h1>{item.name}</h1>
      <p>Description: {item.description}</p>
      <p>Buy Price: {item.buyPrice}</p>
      <p>Sell Price: {item.sellPrice}</p>
      <button>Add to Cart</button>
    </div>
  );
};

export default ItemDetail;