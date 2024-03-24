import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom"; // Import Link
import useGet from "../customHooks/useGet";

export default function FilteredItems() {
  const { category: initialCategory } = useParams();

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

  // State for selected category and input value
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [categoryInput, setCategoryInput] = useState(initialCategory);

  // Handler for category input change
  const handleCategoryInputChange = (event) => {
    setCategoryInput(event.target.value);
  };

  // Find the ID of the category based on input value
  useEffect(() => {
    if (categories && categories.length > 0) {
      const selectedCategoryData = categories.find(
        (category) =>
          category.name.toLowerCase() === categoryInput.toLowerCase(),
      );
      if (selectedCategoryData) {
        setSelectedCategory(selectedCategoryData._id);
      }
    }
  }, [categories, categoryInput]);

  // Filter items based on selected category
  const filteredItems = items?.filter(
    (item) => item.category_id === selectedCategory,
  );

  // Render loading state while fetching data
  if (loadingItems || loadingCategories) return <div>Loading...</div>;

  // Render error if data fetching fails
  if (itemsError || categoriesError)
    return <div>Error: {itemsError?.message || categoriesError?.message}</div>;

  return (
    <div className="container mx-auto p-8">
        <Link
          to="/client/ItemsPage"
    className="mt-24 text-black-500 hover:text-gray-700 block font-bold text-left ml-8"
        >
          &lt; Back
        </Link>

      <input
        type="text"
        placeholder="Enter category name..."
        value={categoryInput}
        onChange={handleCategoryInputChange}
        readOnly
        style={{ display: "none" }}
        className="mb-4 w-full rounded-md border border-gray-300 px-4 py-2"
      />

      {/* Display selected category */}
      <div className="mb-4 text-lg font-semibold text-left ml-8">
        Category: {selectedCategory ? categoryInput : "None"}
      </div>
      {/* Display filtered items */}
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
}
