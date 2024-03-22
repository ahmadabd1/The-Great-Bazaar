import React, { useState, useEffect } from "react";
import axios from "axios";
import useUserInfo from '../customHooks/useUserInfo';
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [features, setFeatures] = useState([]);
  const { userInfo, loading: userLoading, error: userError } = useUserInfo();
  const navigate = useNavigate();

  const fetchItems = async () => {
    try {
      const response = await axios.get("http://localhost:8080/item/items");
      const suggestedItems = response.data.filter((item) => item.suggestedItem);
      const itemsToDisplay = suggestedItems.map((item) => ({
        icon: item.image_id,
        title: item.name,
        desc: item.description,
        price: item.buyPrice,
      }));
      setFeatures(itemsToDisplay);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleStartShoppingClick = () => {
    navigate("/client/ItemsPage");
  };

  const userName = userInfo ? `${userInfo.firstName} ${userInfo.lastName}` : "";

  if (userLoading) return <div>Loading...</div>;
  if (userError) return <div>Error: {userError}</div>;

  return (
    <>
      <div className="page content container text-center" style={{ marginTop: "150px" }}>
        <section>
          <div className="gap-10 overflow-hidden py-10 md:flex">
            <div className="flex-1 space-y-10">
              <h1 className="mb-4 font-mono text-4xl leading-none tracking-tight text-slate-200 md:text-5xl lg:text-6xl">
                {userName ? `${userName}'s Great Bazaar` : "The Great Bazaar"}
              </h1>
              <p className="mb-4 font-mono text-4xl leading-none tracking-tight text-slate-400 md:text-5xl lg:text-2xl">
                Clothes, Food, Electronics and More
              </p>
              <a
                onClick={handleStartShoppingClick}
                className="flex items-center justify-center gap-x-5 rounded-full bg-gray-800 px-4 py-2 font-medium text-slate-200 duration-150 hover:bg-gray-700 active:bg-gray-900 md:inline-flex"
              >
                Start Shopping
              </a>
            </div>
          </div>
        </section>

        <section
          className="p-25 py-50"
          style={{
            marginTop: "70px",
            border: "3px solid rgba(0, 0, 0, 0.3)",
          }}
        >
          <h3 className="mb-4 font-mono text-4xl text-slate-200 md:text-4xl lg:text-4xl">
            Preview Items
          </h3>
          <p className="md:text-1xl mb-4 font-mono text-2xl leading-none tracking-tight text-slate-400 lg:text-2xl">
            Enjoy all the goods from the Far East to the Abbasid Caliphate
          </p>
          <div className="relative mt-12" style={{ marginLeft: "41px" }}>
            <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((item, idx) => (
                <li
                  key={idx}
                  className="space-y-3 rounded-lg p-4"
                  style={{
                    height: "270px",
                    width: "200px",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <div className="text-center">
                    <img
                      src={item.icon}
                      alt={item.title}
                      style={{ height: "130px", width: "130px" }}
                      className="inline-block"
                    />
                  </div>
                  <h4 className="text-black-800 text-lg font-semibold">
                    {item.title}
                  </h4>
                  <p>{item.desc}</p>
                  <p>{item.price}$</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </>
  );
}
