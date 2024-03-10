import React, { useState } from 'react';
import useGet from '../customHooks/useGet';
import useDelete from '../customHooks/useDelete';
import '../style/adminitems.css';
import AddItemModal from './AddItemModal';
import { v4 as uuidv4 } from 'uuid'; // Import UUID library

export default function Items() {
  const { data: items, loading: loadingItems, error: itemsError, refetch } = useGet('http://localhost:8080/item/items');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const addItem = async (newItemData) => {

    try {
      const response = await fetch('http://localhost:8080/item/item', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItemData),
      });

      if (response.ok) {
        refetch();
        closeModal();
      } else {
        console.error('Failed to add the item');
      }
    } catch (error) {
      console.error('Error adding item:', error);
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
      <button onClick={openModal} className="add-item-button">Add New Item</button>
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
                          <img src={item.image_url}/>

            <button onClick={() => handleDeleteItem(item._id)} className="delete-item-button">Delete Item</button>
          </div>
        ))}
      </div>
      <AddItemModal isOpen={isModalOpen} closeModal={closeModal} addItem={addItem} />
    </div>
  );
}
