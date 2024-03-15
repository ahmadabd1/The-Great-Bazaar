import React, { useState, useEffect } from 'react';
import useUpdate from '../customHooks/useUpdate';
import '../style/UpdateItemModal.css';

export default function UpdateItemModal({ isOpen, closeModal, item, onUpdateSuccess }) {
  const [updatedItem, setUpdatedItem] = useState(item || {});
  const [selectedFile, setSelectedFile] = useState(null);
  const { update, isLoading, error, isSuccess } = useUpdate();

  useEffect(() => {
    if (item) {
      setUpdatedItem({ ...item, suggestedItem: item.suggestedItem || false });
    }
  }, [item]);

  useEffect(() => {
    let timeoutId;
    if (isSuccess) {
      timeoutId = setTimeout(() => {
        onUpdateSuccess();
      }, 2000);
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isSuccess, onUpdateSuccess]);

  if (!isOpen || !item) return null;

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setUpdatedItem({ ...updatedItem, [name]: type === 'checkbox' ? checked : value });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const validateForm = () => {
    if (!updatedItem.name) {
      alert("Name is missing");
      return false;
    }
    if (!updatedItem.description) {
      alert("Description is missing");
      return false;
    }
    if (!updatedItem.sellPrice) {
      alert("Sell Price is missing");
      return false;
    }
    if (!updatedItem.buyPrice) {
      alert("Buy Price is missing");
      return false;
    }
    if (!updatedItem.quantity) {
      alert("Quantity is missing");
      return false;
    }
    if (!updatedItem.vendor) {
      alert("Vendor is missing");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    const formData = new FormData();
    formData.append('_id', updatedItem._id);
    Object.keys(updatedItem).forEach(key => {
      if (key !== 'image_id' && key !== '_id') {
        formData.append(key, updatedItem[key]);
      }
    });

    if (selectedFile) {
      formData.append('image', selectedFile);
    }

    await update('http://localhost:8080/item/item/', formData);
  };

  return (
    <div className="update-item-modal">
      <h2 className='header'>Update Item: {updatedItem?.name}</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="text"
          name="name"
          value={updatedItem.name || ''}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          type="text"
          name="description"
          value={updatedItem.description || ''}
          onChange={handleChange}
          placeholder="Description"
        />
        <input
          type="number"
          name="sellPrice"
          value={updatedItem.sellPrice || ''}
          onChange={handleChange}
          placeholder="Sell Price"
        />
        <input
          type="number"
          name="buyPrice"
          value={updatedItem.buyPrice || ''}
          onChange={handleChange}
          placeholder="Buy Price"
        />
        <input
          type="number"
          name="quantity"
          value={updatedItem.quantity || ''}
          onChange={handleChange}
          placeholder="Quantity"
        />
        {updatedItem.image_id && (
          <img
            src={updatedItem.image_id}
            alt="Current"
            style={{ width: '100px', height: '100px' }}
          />
        )}
        <input
          type="file"
          name="image"
          onChange={handleFileChange}
        />
        <label className="checkbox-container">
          <input
            type="checkbox"
            name="suggestedItem"
            checked={updatedItem.suggestedItem || false}
            onChange={handleChange}
            className="checkbox-input"
          />
          Suggested Item
        </label>
        <input
          type="text"
          name="vendor"
          value={updatedItem.vendor || ''}
          onChange={handleChange}
          placeholder="Vendor"
        />
        <button className='update-button' type="submit">Update</button>
      </form>
      {isLoading && <div>Updating...</div>}
      {error && <div>Error: {error}</div>}
      {isSuccess && <div>Item updated successfully!</div>}
      <button className='close-button' onClick={closeModal}>Close</button>
    </div>
  );
}
