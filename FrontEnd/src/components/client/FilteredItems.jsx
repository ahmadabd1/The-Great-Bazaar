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
        className="mb-4 text-blue-500 hover:text-blue-700"
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
      <div className="mb-4 text-lg font-semibold">
        Category: {selectedCategory ? categoryInput : "None"}
      </div>
      {/* Display filtered items */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredItems &&
          filteredItems.map((item) => (
            <div key={item._id} className="rounded-md border p-4">
                        <Link to={`/item/${item._id}`} style={{ textDecoration: 'none', color: 'black', display: 'flex', flexDirection: 'column', height: '100%' }}>

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
}
