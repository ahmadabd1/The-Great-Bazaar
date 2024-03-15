import React, { useState, useEffect } from "react";
import useGet from "../customHooks/useGet";
import useDelete from "../customHooks/useDelete";
import usePost from "../customHooks/usePost2";
import "../style/adminitems.css";
import AddItemModal from "./AddItemModal";
import UpdateItemModal from "./UpdateItemModal";

export default function Items() {
  const { data: items, loading: loadingItems, error: itemsError, refetch } = useGet("http://localhost:8080/item/items");
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const { deleteItem, isLoading: isDeleting, error: deleteError } = useDelete();
  const { postData, loading: posting, error: postError } = usePost();

  const handleDeleteItem = async (itemId) => {
    await deleteItem("http://localhost:8080/item/item", itemId);
    if (!deleteError) {
      refetch();
    }
  };

  const handleUpdateItem = (item) => {
    setSelectedItem(item);
    setIsUpdateModalOpen(true);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
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
    item.name.toLowerCase().includes(searchTerm) ||
    item.description.toLowerCase().includes(searchTerm) ||
    item._id.toLowerCase().includes(searchTerm)
  );

  if (loadingItems || isDeleting || posting) return <div>Loading...</div>;
  if (itemsError || deleteError || postError)
    return <div>Error: {itemsError?.message || deleteError?.message || postError?.message}</div>;

  return (
    <div className="mb-20 ml-auto flex flex-col items-center">
      <button onClick={openModal} className="mb-10 w-2/5 rounded bg-blue-500 px-4 py-2 font-bold text-white">Add New Item</button>
      <input type="text" placeholder="Search by ID, name, or description..." onChange={handleSearchChange} className="mb-10 w-2/5 rounded border border-gray-300 px-4 py-2" />
      <div className="Items-Container">
        {filteredItems && filteredItems.map((item) => (
          <div key={item._id} className="item-container">
            <h2 className="item-Name">{item.name}</h2>
            <p className="item-id">ID: {item._id}</p>
            <p className="item-desc">{item.description}</p>
            {item.image_id && <img src={item.image_id} alt={item.name} className="item-image" />}
            <button onClick={() => handleUpdateItem(item)} className="update-item-button">Update</button>
            <button onClick={() => handleDeleteItem(item._id)} className="delete-item-button">Delete Item</button>
          </div>
        ))}
      </div>
      <AddItemModal isOpen={isModalOpen} closeModal={closeModal} addItem={addItem} />
      <UpdateItemModal isOpen={isUpdateModalOpen} closeModal={closeModal} item={selectedItem} onUpdateSuccess={handleUpdateSuccess} />
    </div>
  );
}
