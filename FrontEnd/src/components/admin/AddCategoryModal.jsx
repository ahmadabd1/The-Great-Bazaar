import React, { useState } from 'react';
import '../style/AddCategoryModal.css' 

export default function AddCategoryModal({ categories, onSave, onCancel }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [parentId, setParentId] = useState('');

  const handleSave = () => {
    onSave({ name, description, parent_id: parentId });
  };

  return (
    <div className="modal">
      <h2>Add Category</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select
        value={parentId}
        onChange={(e) => setParentId(e.target.value)}
      >
        <option value="">Select Parent Category</option>
        {categories.map(category => (
          <option key={category._id} value={category._id}>
            {category.name}
          </option>
        ))}
      </select>
      <button onClick={handleSave}>Create</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
}
