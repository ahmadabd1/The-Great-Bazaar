import React, { useState } from "react";
import useGet from "../customHooks/useGet";
import useDelete from "../customHooks/useDelete";
import AddItemModal from "./AddItemModal";

export default function Items() {
  const {
    data: items,
    loading: loadingItems,
    error: itemsError,
    refetch,
  } = useGet("http://localhost:8080/item/items");
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { deleteItem } = useDelete();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handleDeleteItem = async (itemId) => {
    const wasDeleted = await deleteItem(itemId);
    if (wasDeleted) {
      refetch();
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const addItem = async (newItemData) => {
    try {
      const response = await fetch("http://localhost:8080/item/item", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItemData),
      });

      if (response.ok) {
        refetch();
        closeModal();
      } else {
        console.error("Failed to add the item");
      }
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  if (loadingItems) return <div>Loading...</div>;
  if (itemsError) return <div>Error: {itemsError.message}</div>;

  const filteredItems = items.filter(
    (item) =>
      item._id.toLowerCase().includes(searchTerm) ||
      item.name.toLowerCase().includes(searchTerm) ||
      item.description.toLowerCase().includes(searchTerm),
  );

  return (
    <div className="mb-20 ml-auto flex flex-col items-center">
      <button
        onClick={openModal}
        className="mb-10 w-2/5 rounded bg-blue-500 px-4 py-2 font-bold text-white"
      >
        Add New Item
      </button>
      <input
        type="text"
        placeholder="Search by ID, name, or description..."
        onChange={handleSearchChange}
        className="mb-10 w-2/5 rounded border border-gray-300 px-4 py-2"
      />

      <div className="items-right grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {" "}
        {filteredItems.map((item) => (
          <div
            key={item._id}
            className="rounded border border-gray-300 bg-slate-50 p-3 shadow-md"
            style={{ width: "200px" }}
          >
            <h2 className="mb-1 bg-slate-50 text-lg font-semibold">
              {item.name}
            </h2>{" "}
            <p className="mb-1 text-sm">ID: {item._id}</p>{" "}
            <p className="mb-2 text-sm">{item.description}</p>{" "}
            <img
              src={item.image_url}
              alt={item.name}
              className="mb-2 h-32 w-full rounded object-cover" // Adjust image size
            />
            <button
              onClick={() => handleDeleteItem(item._id)}
              className="w-full rounded bg-red-500 px-3 py-1 text-sm font-bold text-white" // Reduce button size
            >
              Delete Item
            </button>
          </div>
        ))}
      </div>
      <AddItemModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        addItem={addItem}
      />
    </div>
  );
}
