import React, { useState } from "react";

const ClientSideBar = ({ filterItems }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);

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
      className={`fixed left-0 top-[78px] h-full w-[15%] overflow-y-scroll border-r border-gray-900 bg-gray-800 bg-opacity-50`}
    >
      <ul className="p-2 uppercase">
        <li className="mb-2 border-b border-gray-600 p-1 font-mono text-2xl text-slate-200">
          DISPLAY IN START SHOPPING /Shop
        </li>
        <li className="mb-2 border-b border-gray-600 p-1 font-mono text-2xl text-slate-200">
          FILTER ITEMS
        </li>
        <li className="mb-2 border-b border-gray-600 p-1 font-mono text-sm text-slate-200">
          <label
            htmlFor="categorySelect"
            className="text-md mr-40 font-mono text-slate-200"
          >
            Category:
          </label>
          <select
            id="categorySelect"
            className="rounded bg-gray-700 p-1 text-sm text-slate-200"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="">All Items</option>
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
            <option value="books">Books</option>
          </select>
        </li>

        <li className="mb-2 border-b border-gray-600 p-1 font-mono text-sm">
          <label
            htmlFor="priceSelect"
            className="text-md mr-40 font-mono text-slate-200"
          >
            Price:
          </label>
          <select
            id="priceSelect"
            className="ml-1 rounded bg-gray-700 p-1 text-sm text-slate-200"
            value={selectedPrice}
            onChange={handlePriceChange}
          >
            <option value="">All Prices</option>
            <option value="low">0-2500</option>
            <option value="medium">2500-4000</option>
            <option value="high">4000 +</option>
          </select>
        </li>

        <li className="mb-2 border-b border-gray-600 p-1 font-mono text-sm text-slate-200">
          <label
            htmlFor="ratingSelect"
            className="text-md mr-40 font-mono text-slate-200"
          >
            Rating:
          </label>
          <select
            id="ratingSelect"
            className="ml-1 rounded bg-gray-700 p-1 text-sm text-slate-200"
            value={selectedRating}
            onChange={handleRatingChange}
          >
            <option value="">All Ratings</option>
            <option value="1">Rating 1</option>
            <option value="2">Rating 2</option>
            <option value="3">Rating 3</option>
          </select>
        </li>
      </ul>
    </div>
  );
};

export default ClientSideBar;
