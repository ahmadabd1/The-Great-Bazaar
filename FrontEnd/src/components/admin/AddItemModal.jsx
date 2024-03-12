import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import '../style/ModalAddItem.css';

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
    image: null,
    vendor: '',
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/category/categories/')
      .then(response => response.json())
      .then(data => {
        setCategories(data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.image) {
      alert('Please upload an image before adding an item.');
      return;
    }

    const data = new FormData();
    for (let key in formData) {
      data.append(key, formData[key]);
    }

    addItem(data);
    closeModal();
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Add Item Modal"
      className="Modal"
      overlayClassName="Overlay"
    >
      <h2>Add New Item</h2>
      <form onSubmit={handleSubmit} className="flex flex-wrap">
        {/* Left side */}
        <div className="w-full pr-2 md:w-1/2">
          <div className="flex w-full flex-col">
            <label className="mb-2">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mb-4 w-full"
            />

            <label className="mb-2">Description:</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="mb-4 w-full"
            />

        <label>Sell Price:</label>
        <input type="number" name="sellPrice" value={formData.sellPrice} onChange={handleChange} required />
        
        <label>Buy Price:</label>
        <input type="number" name="buyPrice" value={formData.buyPrice} onChange={handleChange} />

        <label>Quantity:</label>
        <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} required />
        
        <label>Category:</label>
        <select name="category_id" value={formData.category_id} onChange={handleChange} required>
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
        
        <label>Image:</label>
        <input type="file" name="image" onChange={handleChange} />
        
        <label>Vendor:</label>
        <input type="text" name="vendor" value={formData.vendor} onChange={handleChange} />

        <button type="submit" className="submit-button">Add Item</button>
        <button onClick={closeModal} className="cancel-button">Cancel</button>
      </form>
    </Modal>
  );
}

export default AddItemModal;
