import React, { useState, useEffect } from "react";
import useGet from "../customHooks/useGet";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

const FilteredItems = () => {
  // tailwind.config.js


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
    <div
      className="absloutecontainer ml-56 mt-[13vh]"
      style={{ height: "80%", width: "80%" }}
    >
      {/* Client Side Bar */}
      <div
        className={`fixed left-0 top-[78px] h-full w-[13%] overflow-y-scroll border-r border-gray-900 bg-gray-800 bg-opacity-50`}
      >
        <ul className=" border-gray-600">
          <Link to="/client/ItemsPage">
            <FiArrowLeft />
            <label className="ml-auto mt-2 w-full border-b border-gray-600 p-6 text-center font-mono text-xl text-slate-200">
              &lt; Back
            </label>
          </Link>
          <div className="border-b-2 border-gray-600">
            <input
              type="text"
              placeholder="Search by name"
              value={searchTerm}
              onChange={handleSearchChange}
              className="mb-8 w-full rounded-md border-b-2"
            />
          </div>
          <label className="ml-auto mt-2 w-full  text-center font-mono text-xl text-slate-200">
            FilterCategory
          </label>
          <select
            id="categorySelect"
            className="text-m ml-5  h-10 w-40 rounded bg-gray-700 text-center text-slate-400"
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

      {/* Display filtered items */}
 <div className="relative mt-12" style={{ marginLeft: "41px" }}>
  <ul className="grid justify-items-center gap-12 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
    {filteredItems &&
      filteredItems.map((item, idx) => (
        <li
          key={item._id}
          className="flex flex-col justify-between h-85 w-60 rounded-lg border-2 border-gray-300 shadow-lg hover:shadow-xl border-r border-gray-900 bg-black bg-opacity-50 transition-shadow duration-300 relative overflow-hidden"
        >
          <Link to={`/item/${item._id}`} className="text-center w-full flex flex-col justify-between h-full">
            <div>
              <img
                src={item.image_id || 'path/to/default/image'}
                alt={item.name}
                className="h-40 w-full object-cover"
              />
              <div className="p-4 h-32 flex flex-col justify-between">
                <h4 className="text-lg font-bold text-white">{item.name}</h4>
                <p className="text-sm text-gray-300 overflow-hidden" style={{ textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: '3', WebkitBoxOrient: 'vertical' }}>{item.description}</p>
              </div>
            </div>
            <p className="mt-2 text-lg font-medium text-green-600 p-4">{item.buyPrice}$</p>
          </Link>
        </li>
      ))}
  </ul>
</div>


</div>
  );
};

export default FilteredItems;
