

import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import '../style/ModalAddItem.css';
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
      <div className="modal-content">
        {/* <h2 className="modal-title">Add New Item</h2> */}
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label className="label">Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required className="input" />
          </div>

          <div className="form-group">
            <label className="label">Description:</label>
            <input type="text" name="description" value={formData.description} onChange={handleChange} required className="input" />
          </div>

          <div className="form-group">
            <label className="label">Sell Price:</label>
            <input type="number" name="sellPrice" value={formData.sellPrice} onChange={handleChange} required className="input" />
          </div>

          <div className="form-group">
            <label className="label">Buy Price:</label>
            <input type="number" name="buyPrice" value={formData.buyPrice} onChange={handleChange} className="input" />
          </div>

          <div className="form-group">
            <label className="label">Quantity:</label>
            <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} required className="input" />
          </div>

          <div className="form-group">
            <label className="label">Category:</label>
            <select name="category_id" value={formData.category_id} onChange={handleChange} required className="select">
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="label">Image:</label>
            <input type="file" name="image" onChange={handleChange} className="fileInput" />
          </div>

          <div className="form-group">
            <label className="label">Vendor:</label>
            <input type="text" name="vendor" value={formData.vendor} onChange={handleChange} className="input" />
          </div>

          <div className="form-group">
            <label className="label">Suggested Item:</label>
            <input type="checkbox" name="suggestedItem" checked={formData.suggestedItem} onChange={handleChange} className="checkbox" />
          </div>

         <div className="form-actions">
  <button type="submit" className="addButton">Add Item</button>
  <button type="button" onClick={closeModal} className="cancelButton">Cancel</button>
</div>

        </form>
      </div>
    </Modal>
  );

              }
export default AddItemModal;
