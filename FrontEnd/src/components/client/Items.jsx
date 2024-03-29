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
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto", position: 'relative' }}>
      <h1 style={{ fontSize: '24px', textAlign: 'center', margin: '20px 0' }}>Items</h1>
      <ul style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          listStyle: 'none', 
          padding: 0,
          justifyContent: 'center',
          position: 'relative',
        }}>
        {items.map(item => (
          <li key={item._id} style={{ 
              backdropFilter: 'blur(10px)', 
              margin: "10px", 
              padding: "20px", 
              borderRadius: "8px", 
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              width: "calc(25% - 20px)",
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              position: 'relative', 
            }}>
            <Link to={`/item/${item._id}`} style={{ textDecoration: 'none', color: 'black', display: 'flex', flexDirection: 'column', height: '100%' }}>
              {item.image_id && (
                <div style={{ flex: 1 }}>
                  <img 
                    src={item.image_id} 
                    alt={item.name} 
                    style={{ width: '100%', height: 'auto', marginBottom: '15px', borderRadius: '4px' }} 
                  />
                </div>
              )}
              <div style={{ textAlign: 'center', marginTop: 'auto' }}>
                <h2 style={{ fontSize: '16px', marginBottom: '10px' }}>{item.name}</h2>
                <p style={{ fontSize: '14px', color: '#000',fontWeight:'bold' }}>{item.description}</p>
                <p style={{ fontSize: '14px', marginTop: '10px' }}><strong>Buy:</strong> {item.buyPrice}$</p>
                <p style={{ fontSize: '14px' }}><strong>Sell:</strong> {item.sellPrice}$</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Item;
