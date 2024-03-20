import React, { useState } from "react";
import useGet from "../customHooks/useGet"; // Import useGet hook if available

const ClientSideBar = ({ filterItems }) => {
  const { data: categories } = useGet(
    "http://localhost:8080/category/categories/",
  );
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    filterItems({
      category: category,
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
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="">All</option>
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
