import React, { useState } from 'react';
import '../../style/UpdateCategoryModal.css';
import usePut from '../../customHooks/usePut';

export default function UpdateCategoryModal({ category, onSave, onCancel }) {
  const [name, setName] = useState(category.name);
  const [description, setDescription] = useState(category.description);
  const [image, setImage] = useState(null);
  const { loading, error, putData } = usePut();
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    if (image) {
      formData.append('image', image);
    }
    try {
      const response = await putData(`http://localhost:8080/category/${category._id}`, formData);
      if (response && response.status === 200) {
        setMessage(response.data.message);
        setTimeout(() => {
          setMessage('');
          onSave();  // Call onSave to indicate success and potentially close the modal
        }, 2000);  // Clear the message after 2 seconds
      } else {
        // Handle non-200 responses
        throw new Error(`HTTP error! status: ${response ? response.status : 'unknown'}`);
      }
    } catch (error) {
      // Catch and set any errors
      setErrorMessage(error.message || 'Error updating category');
    }
  };

  return (
    <div className="update-category-modal">
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label>Image:</label>
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button type="submit" disabled={loading}>Update Category</button>
        <button type="button" onClick={onCancel}>Cancel</button>
        {message && <div className="success-message">{message}</div>}
        {errorMessage && <div className="error-message">Error: {errorMessage}</div>}
        {error && <div className="error-message">Error: {error.message}</div>}
      </form>
    </div>
  );
}
