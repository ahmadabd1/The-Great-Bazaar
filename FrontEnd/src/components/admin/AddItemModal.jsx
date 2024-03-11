import React, { useState } from 'react';
import Modal from 'react-modal';
import "../style/ModalAddItem.css"
Modal.setAppElement('#root');

function AddItemModal({ isOpen, closeModal, addItem }) {
  const [showAdditionalFields, setShowAdditionalFields] = useState(false); // State to track if additional fields should be shown

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    sellPrice: '',
    buyPrice: '',
    quantity: '',
    category_id: '',
    image_url: '',
    vendor: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call addItem function with the formData
    addItem(formData);
    // Clear form data
    setFormData({
      name: '',
      description: '',
      sellPrice: '',
      buyPrice: '',
      quantity: '',
      category_id: '',
      image_url: '',
      vendor: '',
    });
    // Close the modal
    closeModal();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleShowAdditionalFields = () => {
    setShowAdditionalFields(true);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Add Item Modal"
      className="Modal"
    >
      <h2>Add New Item</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        
        <label>Description:</label>
        <input type="text" name="description" value={formData.description} onChange={handleChange} required />

        <label>Sell Price:</label>
        <input type="number" name="sellPrice" value={formData.sellPrice} onChange={handleChange} required />
        
        <label>Buy Price:</label>
        <input type="number" name="buyPrice" value={formData.buyPrice} onChange={handleChange} />

        <label>Quantity:</label>
        <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} required />
        
        {showAdditionalFields && (
          <>
            <label>Category ID:</label>
            <input type="text" name="category_id" value={formData.category_id} onChange={handleChange} required />
            
            <label>Image URL:</label>
            <input type="text" name="image_url" value={formData.image_url} onChange={handleChange} />
            
            <label>Vendor:</label>
            <input type="text" name="vendor" value={formData.vendor} onChange={handleChange} />
          </>
        )}

        {!showAdditionalFields && (
          <button type="button" onClick={handleShowAdditionalFields}>Show Additional Fields</button>
        )}

        <button type="submit" className="submit-button">Add Item</button>
        <button onClick={closeModal} className="cancel-button">Cancel</button>
      </form>
    </Modal>
  );
}

export default AddItemModal;
