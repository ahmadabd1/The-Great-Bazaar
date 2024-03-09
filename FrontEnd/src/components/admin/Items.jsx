import React, { useState } from 'react';
import useGet from '../customHooks/useGet';
import useDelete from '../customHooks/useDelete';
import '../style/adminitems.css';
import AddItemModal from './AddItemModal';
import { Link } from 'react-router-dom';
export default function Items() {
  const { data: items, loading: loadingItems, error: itemsError, refetch } = useGet('http://localhost:8080/item/items');
  const [searchTerm, setSearchTerm] = useState('');
  const { deleteItem } = useDelete();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handleDeleteItem = async (itemId) => {
    const wasDeleted = await deleteItem(itemId);
    if (wasDeleted) {
      refetch();
    }
  };

  if (loadingItems) return <div>Loading...</div>;
  if (itemsError) return <div>Error: {itemsError.message}</div>;

  const filteredItems = items.filter(item =>
    item._id.toLowerCase().includes(searchTerm) ||
    item.name.toLowerCase().includes(searchTerm) ||
    item.description.toLowerCase().includes(searchTerm)
  );


  return (
    <div>
      
      <button onClick={()=>{}} className="add-item-button">Add New Item</button>
      <input
        type="text"
        placeholder="Search by ID, name, or description..."
        onChange={handleSearchChange}
        className="search-bar"
      />
      <div className='Items-Container'>
        {filteredItems.map(item => (
          <div key={item._id} className='item-container'>
            <h2 className='item-Name'>{item.name}</h2>
            <p className='item-id'>ID: {item._id}</p>
            <p className='item-desc'>{item.description}</p>
            <button onClick={() => handleDeleteItem(item._id)} className="delete-item-button">Delete Item</button>
          </div>
        ))}
      </div>
    </div>
  );
}
