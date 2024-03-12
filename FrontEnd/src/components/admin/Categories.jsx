import React, { useState } from 'react';
import useGet from '../customHooks/useGet';
import useDelete from '../customHooks/useDelete';
import usePost from '../customHooks/usePost2'; 
import AddCategoryModal from './AddCategoryModal';
import '../style/admin_Categories.css';

export default function Categories() {
  const { data: categories, loading: loadingCategories, error: errorLoading, refetch } = useGet('http://localhost:8080/category/categories/');
  const { deleteItem, isLoading: deleting, error: errorDeleting } = useDelete();
  const { postData, loading: posting, error: postError } = usePost(); 
  const [showAddCategory, setShowAddCategory] = useState(false);

  const handleDelete = async (id) => {
    console.log(id);
    await deleteItem(`http://localhost:8080/category`, id);
    refetch(); 
  };

  const handleAddCategoryClick = () => {
    setShowAddCategory(true);
  };

  const handleSaveNewCategory = async (formData) => {
    try {
      await postData('http://localhost:8080/category/category/', formData, true); // Pass true for FormData
      setShowAddCategory(false);
      refetch(); // Refetch the categories to update the list
    } catch (error) {
      console.error('Error creating category:', error);
    }
  };

  const handleCancel = () => {
    setShowAddCategory(false);
  };

  if (loadingCategories || deleting || posting) return <div>Loading...</div>;
  if (errorLoading || errorDeleting || postError) return <div>Error: {errorLoading?.message || errorDeleting?.message || postError?.message}</div>;

  return (
    <div className="categories-container">
      <h1>Categories</h1>
      <button onClick={handleAddCategoryClick}>Add New Category</button>
      {showAddCategory && (
        <AddCategoryModal
          categories={categories}
          onSave={handleSaveNewCategory}
          onCancel={handleCancel}
        />
      )}
      <ul>
        {categories && categories.map(category => (
          <li key={category._id}>
            {category.name}
            {category.image_id && (
              <img src={category.image_id} alt={category.name} className="category-image" />
            )}
            <button onClick={() => handleDelete(category._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
