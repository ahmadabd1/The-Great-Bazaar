import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import useGet from "../customHooks/useGet";
import usePost from "../customHooks/usePost"; // Import usePost
import useUserInfo from "../customHooks/useUserInfo"; // Import useUserInfo if needed for cart data

const FilteredItems = () => {
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

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [activeItemId, setActiveItemId] = useState(null);
  const [cartMessages, setCartMessages] = useState({}); // Stores messages for each item

  const { postData } = usePost(); // Using the postData function from usePost
  const { userInfo } = useUserInfo(); // Assuming userInfo contains user data

  const addToCart = async (item) => {
    const cartData = {
      userId: userInfo._id,
      item: { ...item },
    };

    try {
      await postData("http://localhost:8080/cart/addToCart", cartData);
      setCartMessages((prevMessages) => ({
        ...prevMessages,
        [item._id]: "Item added to cart",
      }));
      setTimeout(() => {
        setCartMessages((prevMessages) => ({
          ...prevMessages,
          [item._id]: "",
        }));
      }, 3000);
    } catch (error) {
      console.error("Error adding item to cart:", error);
      setCartMessages((prevMessages) => ({
        ...prevMessages,
        [item._id]: "Error adding item to cart",
      }));
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const filteredItems = items?.filter(
    (item) =>
      (item.name.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm)) &&
      (selectedCategory === "" || item.category_id === selectedCategory),
  );

  if (loadingItems || loadingCategories) return <div>Loading...</div>;
  if (itemsError || categoriesError)
    return <div>Error: {itemsError?.message || categoriesError?.message}</div>;

  return (
    <div
      className="absloute container ml-56 mt-[13vh]"
      style={{ height: "80%", width: "80%" }}
    >
      {/* Sidebar with search and category filter */}
      <div className="fixed left-0 top-[78px] h-full w-[13%] overflow-y-scroll border-r border-gray-900 bg-gray-800 bg-opacity-50">
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
              className="mb-12 ml-5 mt-5 h-10 w-40 rounded-md"
            />
          </div>
          <p className="ml-auto mt-2 w-full text-center font-mono text-xl text-slate-200">
            FilterCategory
          </p>
          <select
            id="categorySelect"
            className="text-m p-l m-12 ml-5 mt-10 h-10 w-40 rounded bg-gray-700 text-center text-slate-400"
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

      {/* Main content area */}
      <div className="relative mt-12" style={{ marginLeft: "41px" }}>
        <ul className="grid justify-items-center gap-12 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
          {filteredItems &&
            filteredItems.map((item) => (
              <li
                key={item._id}
                className="h-85 relative flex w-60 flex-col justify-between overflow-hidden rounded-lg border-2 border-r border-gray-300 border-gray-900 bg-black bg-opacity-50 shadow-lg backdrop-blur-md transition-shadow duration-300 hover:shadow-xl"
              >
                <Link
                  to={`/item/${item._id}`}
                  className="flex h-full w-full flex-col justify-between text-center"
                >
                  <img
                    src={item.image_id || "path/to/default/image"}
                    alt={item.name}
                    className="h-40 w-full object-cover"
                  />
                  <div className="flex flex-col px-4 pb-2 pt-4 font-mono">
                    <h4
                      className="text-lg font-bold text-white"
                      style={{ height: "3rem" }}
                    >
                      {item.name}
                    </h4>
                  </div>
                  <div className="w-full border-b border-gray-500"></div>
                  <div
                    className="flex flex-grow flex-col justify-between p-4 pt-2"
                    style={{ height: "4rem" }}
                  >
                    <p
                      className="overflow-hidden text-sm text-gray-300"
                      style={{
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: "3",
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {item.description}
                    </p>
                  </div>

                  <div
                    className="p-4 text-lg font-medium text-green-600"
                    style={{ height: "2.5rem" }}
                  >
                    {item.sellPrice}$
                  </div>
                </Link>
                {cartMessages[item._id] && (
                  <div className="text-center text-sm text-white">
                    {cartMessages[item._id]}
                  </div>
                )}
                <button
                  onClick={() => addToCart(item)}
                  className="focus:shadow-outline mt-4 cursor-pointer rounded border-gray-300 border-gray-900 bg-opacity-50 px-4 py-2 text-white shadow-lg backdrop-blur-md transition-shadow duration-300 hover:bg-green-600 hover:shadow-xl focus:outline-none"
                >
                  Add to Cart
                </button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default FilteredItems;
