import React, { useState } from "react";
import AddCategoryModal from "../admin/AddCategoryModal"; // Adjust the import path as needed
import useGet from "../customHooks/useGet"; // Import useGet hook if available

const ClientSideBar = ({ filterItems }) => {
  const { data: categories } = useGet(
    "http://localhost:8080/category/categories/",
  );
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // useEffect(() => {
  //   // You may want to do something with categories once they are fetched, like set default category filters
  //   // For example, setSelectedCategory(categories[0]?.name);
  // }, [categories]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    filterItems({
      category: e.target.value,
      price: selectedPrice,
      rating: selectedRating,
    });
  };

  const handlePriceChange = (e) => {
    setSelectedPrice(e.target.value);
    filterItems({
      category: selectedCategory,
      price: e.target.value,
      rating: selectedRating,
    });
  };

  const handleRatingChange = (e) => {
    setSelectedRating(e.target.value);
    filterItems({
      category: selectedCategory,
      price: selectedPrice,
      rating: e.target.value,
    });
  };

  return (
    <div
      className={`fixed left-0 top-[78px] h-full w-[13%] overflow-y-scroll border-r border-gray-900 bg-gray-800 bg-opacity-50`}
    >
      <ul className="border-b border-gray-600">
        <label className="ml-auto mt-2 w-full border-b border-gray-600 p-6 text-center font-mono text-xl text-slate-200">
          FilterCategory
        </label>
        <select
          id="categorySelect"
          className="text-m p-l mb-20 ml-5 h-10 w-40 rounded bg-gray-700 text-center text-slate-400"
          value={"selectedCategory"}
          onChange={handleCategoryChange}
        >
          {categories &&
            categories.map((category) => (
              <option key={category._id} value={category.name}>
                {category.name}
              </option>
            ))}
        </select>
      </ul>
    </div>
  );
};

export default ClientSideBar;
