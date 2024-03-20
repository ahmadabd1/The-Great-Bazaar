import React, { useState } from 'react';
import useGet from '../customHooks/useGet';
import useDelete from '../customHooks/useDelete';
import usePost from '../customHooks/usePost2';
import AddCategoryModal from './AddCategoryModal';
import UpdateCategoryModal from './UpdateCategoryModal';
import '../style/admin_Categories.css';

export default function Categories() {
  const { data: categories, loading: loadingCategories, error: errorLoading, refetch } = useGet('http://localhost:8080/category/categories/');
  const { deleteItem, isLoading: deleting, error: errorDeleting } = useDelete();
  const { postData, loading: posting, error: postError } = usePost();
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showUpdateCategory, setShowUpdateCategory] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);

  const handleDelete = async (id) => {
    console.log(id);
    await deleteItem(`http://localhost:8080/category`, id);
    refetch();
  };

  const handleAddCategoryClick = () => {
    setShowAddCategory(true);
  };

  const handleUpdateClick = (category) => {
    setCurrentCategory(category);
    setShowUpdateCategory(true);
  };

  const handleSaveNewCategory = async (formData) => {
    try {
      await postData('http://localhost:8080/category/category/', formData, true);
      setShowAddCategory(false);
      refetch();
    } catch (error) {
      console.error('Error creating category:', error);
    }
  };

  const handleUpdateSave = () => {
    setShowUpdateCategory(false);
    refetch();
  };

  const handleCancel = () => {
    setShowAddCategory(false);
  };

  const handleUpdateCancel = () => {
    setShowUpdateCategory(false);
  };

  if (loadingCategories || deleting || posting) return <div>Loading...</div>;
  if (errorLoading || errorDeleting || postError) return <div>Error: {errorLoading?.message || errorDeleting?.message || postError?.message}</div>;

  return (
    <div className="categoriesclass">
      <h1>Categories</h1>
      <button className='add-new-category' onClick={handleAddCategoryClick}>Add New Category</button>
      {showAddCategory && (
        <AddCategoryModal
          categories={categories}
          onSave={handleSaveNewCategory}
          onCancel={handleCancel}
        />
      )}
        <table className="categories-Table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories && categories.map(category => (
              <tr key={category._id}>
                <td><img src={category.image_id} alt={category.name} className="category-image"/></td>
                <td>{category.name}</td>
      <td >
         <div className="buttons">
                  <button className='update-item-button' onClick={() => handleUpdateClick(category)}>Update</button>

                  <button className='delete-item-button' onClick={() => handleDelete(category._id)}>Delete</button>
                </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      {showUpdateCategory && (
        <UpdateCategoryModal
          category={currentCategory}
          onSave={handleUpdateSave}
          onCancel={handleUpdateCancel}
        />
      )}
            </div>

  );
}
