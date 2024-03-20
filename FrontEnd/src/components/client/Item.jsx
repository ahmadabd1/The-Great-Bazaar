import React, { useState, useEffect } from "react";
import axios from "axios";

const Item = () => {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get('http://localhost:8080/item/items');
        setItem(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching item:", error);
      }
    };

    fetchItem();
  }, []);

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h2>{item.name}</h2>
          <p>Description: {item.description}</p>
          <p>Price: ${item.price}</p>
          <div>
            {item.images.map((image, index) => (
              <img key={index} src={image.url} alt={`Item ${index + 1}`} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Item;
