import React, { useState, useEffect } from "react";
import axios from "axios";
import useUserInfo from "../customHooks/useUserInfo";
import { useNavigate } from "react-router-dom";
export default function Home() {
  const [features, setFeatures] = useState([]);
  const [userName, setUserName] = useState(""); // State to store the user's full name
  const { userInfo, loading, error } = useUserInfo();
  const navigate = useNavigate();
  const fetchItems = async () => {
    try {
      const response = await axios.get("http://localhost:8080/item/items");
      const suggestedItems = response.data.filter((item) => item.suggestedItem);
      const itemsToDisplay = suggestedItems.map((item) => ({
        icon: item.image_id,
        title: item.name,
        desc: item.description,
        price: item.sellPrice,
      }));
      setFeatures(itemsToDisplay);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };
  // const fetchUserDetails = async () => {
  //   try {
  //     const userEmail = localStorage.getItem("userEmail");
  //     if (!userEmail) {
  //       console.error("User email not found");
  //       return;
  //     }
  //     // Specify the endpoint URL and pass the data as the second parameter
  //     const response = await axios.post("http://localhost:8080/user/details", {
  //       email: userEmail,
  //     });
  //     const { firstName, lastName } = response.data;
  //     setUserName(`${firstName} ${lastName}`);
  //   } catch (error) {
  //     console.error("Error fetching user details:", error);
  //   }
  // };

  useEffect(() => {
    fetchItems();
    // fetchUserDetails();
  }, []);
  useEffect(() => {
    fetchItems();
    // fetchUserDetails();
  }, []);
  const handleStartShoppingClick = () => {
    navigate("/client/ItemsPage");
  };
  const handleStartTour = () => {
    navigate("/Tour");
  };
  return (
    <>
      <div
        className="page content container text-center"
        style={{ marginTop: "150px" }}
      >
        <section>
          <div className="gap-12 overflow-hidden py-12 md:flex">
            <div className="flex-1 space-y-10">
              <h1 className=" mb-4 font-mono text-4xl leading-none tracking-tight text-white drop-shadow-[0_12px_1.2px_rgba(1.2,0,0.8)] md:text-5xl lg:text-8xl ">
                The Great Bazaar
              </h1>

              <p className="mb-4 font-mono text-4xl leading-none tracking-tight text-slate-400 md:text-3xl lg:text-4xl">
                {" "}
                Clothes, Food, Electronics and More
              </p>
              <div
                className="p-full flex-grow: 1; relative w-full items-center justify-center gap-x-3 sm:text-sm"
                style={{ marginTop: "30px", height: "auto" }}
              >
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    handleStartShoppingClick();
                  }}
                  className="flex items-center justify-center gap-x-5 rounded-full bg-gray-800 p-12 px-4 py-2 text-lg text-slate-200 duration-150 hover:bg-gray-700 active:bg-gray-900 md:inline-flex"
                >
                  Start Shopping
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-5 w-5 "
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>

                <a
                  onClick={(e) => {
                    e.preventDefault();
                    handleStartTour();
                  }}
                  className="flex items-center justify-center gap-y-5 rounded-full bg-gray-500 px-4 py-2 text-lg text-sky-200 duration-150 hover:bg-sky-500 active:bg-gray-900 md:inline-flex"
                >
                  Tour in the Bazaar
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>
        <div
          className="page content container justify-items-center text-center"
          style={{ marginTop: "150px" }}
        >
          <section
            className="p-25 py-50 bg-amber-950/20"
            style={{
              marginTop: "70px",
              border: "3px solid rgba(0, 0, 0, 0.3)",
            }}
          >
            <div className=" text-gray-600">
              <div className="relative z-10">
                <h3 className="mb-4  text-center font-mono text-4xl text-slate-200 md:text-4xl lg:text-4xl">
                  Preview Items
                </h3>
                <p className="md:text-1xl absloute mb-4 text-center font-mono text-3xl leading-none tracking-tight text-slate-400">
                  Enjoy all the goods from the Far East to the Abbasid Caliphate
                </p>
              </div>
              <div className="absolute inset-0 mx-auto h-44 max-w-xs"></div>
            </div>
            <div className="relative mt-12" style={{ marginLeft: "41px" }}>
              <ul className="grid justify-items-center gap-5 sm:grid-cols-1 xl:grid-cols-5">
                {features.map((item, idx) => (
                  <li
                    key={idx}
                    className="h-85 relative flex w-60 flex-col justify-between overflow-hidden rounded-lg border-2 border-r border-gray-300 border-gray-900 bg-black bg-opacity-50 shadow-lg backdrop-blur-md transition-shadow duration-300 hover:shadow-xl"
                    style={{
                      height: "270px",
                      width: "200px",
                    }}
                  >
                    <div className="w-full">
                      <img
                        src={item.icon}
                        alt={item.title}
                        style={{ height: "125px", width: "200px" }}
                      />
                    </div>
                    <div className="flex flex-col px-4 pb-2 pt-4 font-mono">
                      <h4 className=" p-2 font-mono text-xl text-slate-100 hover:text-sky-300">
                        {item.title}
                      </h4>
                    </div>
                    <div className="w-full border-b border-gray-500"></div>

                    <p className="overflow-hidden text-sm text-gray-300">
                      {" "}
                      {item.price}$
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
