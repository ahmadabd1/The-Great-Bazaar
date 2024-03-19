import React, { useState, useEffect } from "react";
import useGet from "../customHooks/useGet";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

const FilteredItems = () => {
  // Fetch items and categories data
  const {
    data: items,
    loading: loadingItems,
    error: itemsError,
  } = useGet("http://localhost:8080/item/items");

  const {
    data: categories,
    loading: loadingCategories,
    error: categoriesError,
  } = useGet("http://localhost:8080/category/categories/");

  // State for search term and selected category
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Handler for search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  // Handler for category dropdown change
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  // Filter items based on search term and selected category
  const filteredItems = items?.filter(
    (item) =>
      (item.name.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm)) &&
      (selectedCategory === "" || item.category_id === selectedCategory),
  );

  // Render loading state while fetching data
  if (loadingItems || loadingCategories) return <div>Loading...</div>;

  // Render error if data fetching fails
  if (itemsError || categoriesError)
    return <div>Error: {itemsError?.message || categoriesError?.message}</div>;

  return (
    <div className="container mx-auto p-8">
      {/* Client Side Bar */}
      <div
        className={`fixed left-0 top-[78px] h-full w-[13%] overflow-y-scroll border-r border-gray-900 bg-gray-800 bg-opacity-50`}
      >
        <ul className="border-b border-gray-600">
          <Link to="/client/ItemsPage">
            <FiArrowLeft />
            <label className="ml-auto mt-2 w-full border-b border-gray-600 p-6 text-center font-mono text-xl text-slate-200">
              &lt; Back
            </label>
          </Link>
          <label className="ml-auto mt-2 w-full border-b border-gray-600 p-6 text-center font-mono text-xl text-slate-200">
            FilterCategory
          </label>
          <select
            id="categorySelect"
            className="text-m p-l mb-20 ml-5 h-10 w-40 rounded bg-gray-700 text-center text-slate-400"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="">All</option>
            {categories &&
              categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
          </select>
        </ul>
      </div>

      {/* Search input */}
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="mb-4 w-full rounded-md border border-gray-300 px-4 py-2"
      />

      {/* Display filtered items */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      
        {filteredItems &&
          filteredItems.map((item) => (
            <div key={item._id} className="rounded-md border p-4">
           <Link to={`/item/${item._id}`} key={item._id} >
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p className="text-sm text-gray-600">{item.description}</p>
              {item.image_id && (
                <img
                  src={item.image_id}
                  alt={item.name}
                  className="mt-2 h-32 w-full object-cover"
                />
              )}
            </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default FilteredItems;
