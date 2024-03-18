

import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function AddItemModal({ isOpen, closeModal, addItem }) {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    sellPrice: "",
    buyPrice: "",
    quantity: "",
    category_id: "",
    image: null,
    vendor: '',
    suggestedItem:  false
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:8080/category/categories/');
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      } else {
        console.error('Error fetching categories:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.image) {
      alert("Please upload an image before adding an item.");
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
    const { name, value, files ,type, checked} = e.target;
 if (type === 'checkbox') {
    setFormData({ ...formData, [name]: checked });
  } else {
    setFormData({ ...formData, [name]: files ? files[0] : value });
  }  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Add Item Modal"
      className="Modal"
      overlayClassName="Overlay"
    >
      <form onSubmit={handleSubmit} className="form-group">
        {/* Left side */}
        <div className="w-full pr-2 md:w-1/2">
        <div class="form-group">

          <div className="flex w-full flex-col">
          
            <label className="mb-2">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
    className="input-field"
            />
            <label className="mb-2">Description:</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
    className="input-field"
            />
            <label>Sell Price:</label>
            <input
              type="number"
              name="sellPrice"
              value={formData.sellPrice}
              onChange={handleChange}
              required
                  className="input-field"

            />
            <label>Buy Price:</label>
            <input
              type="number"
              name="buyPrice"
              value={formData.buyPrice}
              onChange={handleChange}
                  className="input-field"

            />
            <label>Quantity:</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
                  className="input-field"

              required
            />
            
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
            <input type="file" name="image" onChange={handleChange}     className="input-field"
/>
            <label>Vendor:</label>
            <input type="text" name="vendor" value={formData.vendor} onChange={handleChange}     className="input-field"
/>
          <label>Suggested Item:</label>
<input
  type="checkbox"
  name="suggestedItem"
  checked={formData.suggestedItem}
  onChange={handleChange}
      className="input-field"

/>

            <button type="submit" className="submit-button">Add Item</button>
            <button onClick={closeModal} className="cancel-button">Cancel</button>
          </div>
          </div>
        </div>
      </form>
    </Modal>
  );
}
export default AddItemModal;
