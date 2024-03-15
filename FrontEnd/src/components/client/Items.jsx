import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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
    <div style={{ padding: "20px", borderRadius: "5px" }}>
      <h1 style={{ fontSize: '18px' }}>Items</h1> 
      {/* Adjusted styles for ul */}
      <ul style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          listStyle: 'none', 
          padding: 0, 
          maxWidth: '50%', // Limiting maximum width
          margin: 'auto' // Centering the list
        }}>
        {items.map(item => (
          // Adjusted styles for li
          <li key={item._id} style={{ 
              background: "white", 
              margin: "4px", 
              padding: "1px", 
              borderRadius: "5px", 
              flex: "0 1 calc(25% - 10px)" // Adjusted flex basis for smaller items
            }}> 
            <Link to={`/item/${item._id}`} style={{ textDecoration: 'none', color: 'black' }}>
              <p style={{ margin: '5px 0', fontSize: '14px' }}>Name: {item.name}</p>
              <p style={{ margin: '5px 0', fontSize: '14px' }}>Description: {item.description}</p>
              <p style={{ margin: '5px 0', fontSize: '14px' }}>Buy Price: {item.buyPrice}</p>
              <p style={{ margin: '5px 0', fontSize: '14px' }}>Sell Price: {item.sellPrice}</p> 
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Item;
