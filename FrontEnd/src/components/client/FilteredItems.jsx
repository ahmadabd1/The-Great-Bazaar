import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom"; // Import Link
import useGet from "../customHooks/useGet";
import { FiArrowLeft } from "react-icons/fi";


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
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };
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
  (item) =>
    item.category_id === selectedCategory &&
    item.name.toLowerCase().includes(searchTerm),  );

  // Render loading state while fetching data
  if (loadingItems || loadingCategories) return <div>Loading...</div>;

  // Render error if data fetching fails
  if (itemsError || categoriesError)
    return <div>Error: {itemsError?.message || categoriesError?.message}</div>;

  return (
    <div className="container mx-auto p-8">
          <div
        className={`fixed left-0 top-[78px] h-full w-[13%] overflow-y-scroll border-r border-gray-900 bg-gray-800 bg-opacity-50`}
      >
        <ul className="border-b border-gray-600">
          <Link to="/client/ItemsPage">
            <FiArrowLeft />
            <label className="ml-7 mt-2 border-gray-600 p-6 text-center font-mono text-xl text-slate-200">
              &lt; Back
            </label>
          </Link>
          <div className="mb-2 border-b-2 border-gray-600">
            <input
              type="text"
              placeholder="Search by name"
              value={searchTerm}
              onChange={handleSearchChange}
              className="mb-12 ml-5 mt-5 h-10 w-40 rounded-md "
            />
          </div>
         
         
        </ul>
      </div>
  

      <input
        type="text"
        placeholder="Enter category name..."
        value={categoryInput}
        onChange={handleCategoryInputChange}
        readOnly
        style={{ display: "none" }}
        className="mb-4 w-full rounded-md border border-gray-300 px-4 py-2"
      />


  {/* Display filtered items */}
  <div className="relative mt-12 flex justify-center items-center" style={{ marginLeft: "200px" }}>
  <ul className="grid  gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 mt-5 mx-auto">
    {filteredItems &&
      filteredItems.map((item, idx) => (
        <li
          key={item._id}
          className="flex flex-col justify-between h-85 w-60 rounded-lg border-2 border-gray-300 shadow-lg hover:shadow-xl border-r border-gray-900 bg-black bg-opacity-50 transition-shadow duration-300 relative overflow-hidden backdrop-blur-md"
        >
          <Link to={`/item/${item._id}`} className="text-center w-full flex flex-col justify-between h-full">
            <div className="w-full">
              <img
                src={item.image_id || 'path/to/default/image'}
                alt={item.name}
                className="h-40 w-full object-cover"
              />
              <div className="px-4 pt-4 pb-2 flex flex-col font-mono">
                <h4 className="text-lg font-bold text-white" style={{ height: '3rem' }}>{item.name}</h4>
              </div>
              <div className="border-b border-gray-500 w-full"></div>
              <div className="p-4 pt-2 flex-grow flex flex-col justify-between" style={{ height: '4rem' }}>
                <p className="text-sm text-gray-300 overflow-hidden" style={{ textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: '3', WebkitBoxOrient: 'vertical' }}>{item.description}</p>
              </div>
              <div className="p-4 text-lg font-medium text-green-600" style={{ height: '2.5rem' }}>{item.buyPrice}$</div>
            </div>
          </Link>
        </li>
      ))}
  </ul>
</div>

    
                   
     
    </div>
  );
}
