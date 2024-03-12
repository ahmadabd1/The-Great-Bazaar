import React, { useState } from "react";
import Modal from "react-modal";
import "../style/ModalAddItem.css";
Modal.setAppElement("#root");

function AddItemModal({ isOpen, closeModal, addItem }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    sellPrice: "",
    buyPrice: "",
    quantity: "",
    category_id: "",
    image_url: "",
    vendor: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call addItem function with the formData
    addItem(formData);
    // Clear form data
    setFormData({
      name: "",
      description: "",
      sellPrice: "",
      buyPrice: "",
      quantity: "",
      category_id: "",
      image_url: "",
      vendor: "",
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

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Add Item Modal"
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

            <label className="mb-2">Sell Price:</label>
            <input
              type="number"
              name="sellPrice"
              value={formData.sellPrice}
              onChange={handleChange}
              required
              className="mb-4 w-full"
            />

            <label className="mb-2">Buy Price:</label>
            <input
              type="number"
              name="buyPrice"
              value={formData.buyPrice}
              onChange={handleChange}
              className="mb-4 w-full"
            />
          </div>
        </div>
        {/* Right side */}
        <div className="w-full pl-2 md:w-1/2">
          <label className="mb-2">Category ID:</label>
          <input
            type="text"
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
            required
            className="mb-4 w-full"
          />
          <div className="flex w-full flex-col">
            <label className="mb-2">Image URL:</label>
            <input
              type="text"
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
              className="mb-4 w-full"
            />

            <label className="mb-2">Vendor:</label>
            <input
              type="text"
              name="vendor"
              value={formData.vendor}
              onChange={handleChange}
              className="mb-4 w-full"
            />
            <label className="mb-2">Quantity:</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
              className="mb-4 w-full"
            />
          </div>
        </div>
        {/* Buttons */}
        <div className="w-full">
          <div className="mt-4 flex justify-between">
            <button type="submit" className="submit-button">
              Add Item
            </button>
            <button onClick={closeModal} className="cancel-button">
              Cancel
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
}

export default AddItemModal;
