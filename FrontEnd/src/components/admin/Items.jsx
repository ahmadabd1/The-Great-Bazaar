import React, { useState, useEffect } from "react";
import useGet from "../customHooks/useGet";
import useDelete from "../customHooks/useDelete";
import usePost from "../customHooks/usePost2";
import "../style/adminitems.css";
import AddItemModal from "./AddItemModal";
import UpdateItemModal from "./UpdateItemModal";
export default function Items() {
  const { data: items, loading: loadingItems, error: itemsError, refetch } = useGet("http://localhost:8080/item/items");
  const { data: categories, loading: loadingCategories, error: categoriesError } = useGet("http://localhost:8080/category/categories/");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [expandedItemId, setExpandedItemId] = useState(null);

  const [selectedItem, setSelectedItem] = useState(null);
  const { deleteItem, isLoading: isDeleting, error: deleteError } = useDelete();
  const { postData, loading: posting, error: postError } = usePost();
  const handleDeleteItem = async (itemId) => {
    await deleteItem("http://localhost:8080/item/item", itemId);
    refetch();
  };
  const handleUpdateItem = (item) => {
    setSelectedItem(item);
    setIsUpdateModalOpen(true);
  };
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setIsUpdateModalOpen(false);
    setSelectedItem(null);
  };
const addItem = async (formData) => {
  try {
    await postData("http://localhost:8080/item/item", formData, true);
    refetch();
  } catch (error) {
    console.error("Error adding item:", error);
  }
};

  const handleUpdateSuccess = () => {
    closeModal();
    refetch();
  };
  const filteredItems = items?.filter(item =>
    (item.name.toLowerCase().includes(searchTerm) ||
    item.description.toLowerCase().includes(searchTerm) ||
    item._id.toLowerCase().includes(searchTerm)) &&
    (selectedCategory === "" || item.category_id === selectedCategory)
  );
  if (loadingItems || isDeleting || posting || loadingCategories) return <div>Loading...</div>;
  if (itemsError || deleteError || postError || categoriesError)
    return <div>Error: {itemsError?.message || deleteError?.message || postError?.message || categoriesError?.message}</div>;
  return (
    <div className="containerclass">
      <button onClick={openModal} className="add-item-button">Add New Item</button>
      <input type="text" placeholder="Search by ID, name, or description..." onChange={handleSearchChange} className="search-bar" />
      <select value={selectedCategory} onChange={handleCategoryChange} className="category-dropdown">
        <option value="">All Categories</option>
        {categories?.map(category => (
          <option key={category._id} value={category._id}>{category.name}</option>
        ))}
      </select>
      <table className="Items-Table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems?.length > 0 ? (
            filteredItems.map((item) => (
              <tr key={item._id}>
                <td>{item.image_id ? <img src={item.image_id} alt={item.name} className="item-image" /> : 'No image'}</td>
                <td>{item.name}</td>
<td className="description-cell">
  {expandedItemId !== item._id
    ? <>
        {item.description.split(" ").slice(0, 5).join(" ")}...
        <button className="read-more-button" onClick={() => setExpandedItemId(item._id)}>Read More</button>
      </>
    : <div className="description-expanded">
        {item.description}
        <button className="show-less-button" onClick={() => setExpandedItemId(null)}>Show Less</button>
      </div>
  }
</td>


                <td >
                <div className="buttons">
                  <button onClick={() => handleUpdateItem(item)} className="update-item-button">Update</button>
                  <button onClick={() => handleDeleteItem(item._id)} className="delete-item-button">Delete</button>
                </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No items found</td>
            </tr>
          )}
        </tbody>
      </table>
      <AddItemModal isOpen={isModalOpen} closeModal={closeModal} addItem={addItem} />
      <UpdateItemModal isOpen={isUpdateModalOpen} closeModal={closeModal} item={selectedItem} onUpdateSuccess={handleUpdateSuccess} />
    </div>
  );
}