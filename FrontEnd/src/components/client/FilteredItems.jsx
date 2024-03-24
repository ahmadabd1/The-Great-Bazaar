import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useGet from "../customHooks/useGet";
import useUserInfo from "../customHooks/useUserInfo";
import usePost from "../customHooks/usePost";
import { FiArrowLeft } from "react-icons/fi";

export default function FilteredItems() {
  const { category: initialCategory } = useParams();
  const { userInfo } = useUserInfo();
  const { postData, loading: postLoading, error: postError } = usePost();

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

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [categoryInput, setCategoryInput] = useState(initialCategory);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handleCategoryInputChange = (event) => {
    setCategoryInput(event.target.value);
  };

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

  const filteredItems = items?.filter(
    (item) =>
      item.category_id === selectedCategory &&
      item.name.toLowerCase().includes(searchTerm),
  );

  const addToCart = async (item) => {
    const cartData = {
      userId: userInfo._id,
      item: { ...item },
    };

    try {
      const response = await postData(
        "http://localhost:8080/cart/addToCart",
        cartData,
      );
      console.log("Item added to cart:", response);
      alert("Item added to cart");
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  if (loadingItems || loadingCategories || postLoading)
    return <div>Loading...</div>;

  if (itemsError || categoriesError || postError)
    return (
      <div>
        Error:{" "}
        {itemsError?.message || categoriesError?.message || postError?.message}
      </div>
    );

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
      <div
        className="relative mt-12 flex items-center justify-center"
        style={{ marginLeft: "200px" }}
      >
        <ul className="mx-auto  mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
          {filteredItems &&
            filteredItems.map((item, idx) => (
              <li
                key={item._id}
                className="h-85 relative flex w-60 flex-col justify-between overflow-hidden rounded-lg border-2 border-r border-gray-300 border-gray-900 bg-black bg-opacity-50 shadow-lg backdrop-blur-md transition-shadow duration-300 hover:shadow-xl"
              >
                <Link
                  to={`/item/${item._id}`}
                  className="flex h-full w-full flex-col justify-between text-center"
                >
                  <div className="w-full">
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
                      {item.buyPrice}$
                    </div>
                  </div>
                </Link>
                <button
                  onClick={() => addToCart(item)}
                  className="focus:shadow-outline focus:outline-noneborder-gray-300 mt-4 cursor-pointer rounded border-gray-900  bg-opacity-50 px-4 py-2 text-white shadow-lg backdrop-blur-md transition-shadow duration-300 hover:bg-green-600 hover:shadow-xl"
                >
                  Add to Cart
                </button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
