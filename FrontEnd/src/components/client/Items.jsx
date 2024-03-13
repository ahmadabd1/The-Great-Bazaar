import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link
const Item = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/item/items")
      .then(response => {
        setItems(response.data);
      })
      .catch(error => {
        console.error("Error fetching items:", error);
      });
  }, []);

  return (
    <div style={{ background: "#f0f0f0", padding: "20px", borderRadius: "5px" }}>
      <h1>Items</h1>
      <ul>
        {items.map(item => (
          <li key={item._id} style={{ background: "white", margin: "10px", padding: "10px", borderRadius: "5px" }}>
            <Link to={`/item/${item._id}`} style={{ textDecoration: 'none', color: 'black' }}>
            
              <p>Name: {item.name}</p>
              <p>Description: {item.description}</p>
              <p>Buy Price: {item.buyPrice}</p>
              <p>Sell Price: {item.sellPrice}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Item