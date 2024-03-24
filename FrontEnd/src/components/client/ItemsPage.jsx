import React, { useState } from "react";
import { Link } from "react-router-dom";

const ItemsPage = () => {
  const [audio] = useState(new Audio("../../src/assets/MunadiVoice.mp3"));

  const playAudio = () => {
    audio.volume = 1;
    audio.play();
  };

  const features = [
    {
      title: "All Items",
      desc: "Journey Around in the Bazaar",
    },
    {
      icon: "../../src/assets/BazaarCategory.jpg",
      title: "Antiques",
      desc: "The northern part of the Bazaar has all the Antiques",
    },
    {
      icon: "../../src/assets/BazaarCategory2.jpg",
      title: "Horses",
      desc: " Thank the Chineese for this one!",
    },
    {
      icon: "../../src/assets/BazaarCategory4.jpg",
      title: "Matresses",
      desc: "Persian, Asian, Arabic and pretty much everything",
    },
    {
      icon: "../../src/assets/BazaarCategory3.jpg",
      title: "Food",
      desc: "Just listen to our Munadi, He will tell you everything you need to know",
    },
    {
      icon: "../../src/assets/BazaarCategory.jpg",
      title: "Antiques",
      desc: "The northern part of the Bazaar has all the Antiques",
    },
    {
      icon: "../../src/assets/BazaarCategory2.jpg",
      title: "Swords",
      desc: " Shiny Swords to cut right through you fruits and veggies",
    },
    {
      icon: "../../src/assets/BazaarCategory4.jpg",
      title: "Matresses",
      desc: "Persian, Asian, Arabic and pretty much everything",
    },
    {
      icon: "../../src/assets/BazaarCategory3.jpg",
      title: "Food",
      desc: "Just listen to our Munadi, He will tell you everything you need to know",
    },
    // Two more items for each container
  ];

  return (
    <div
      className="relative mt-40"
      style={{ marginLeft: "41px", padding: "0 40px" }}
    >
      {/* Upper container */}
      <div className="mb-10 ml-[67vh] w-[30%] hover:bg-sky-200 hover:bg-opacity-45">
        <Link to={{ pathname: "/client/ItemsAll" }}>
          <div className="cursor-pointer space-y-3 rounded-lg border border-slate-400 p-4">
            <div className="text-center"></div>
            <h4 className="text-black-800 text-center font-mono text-3xl font-semibold text-white underline drop-shadow-[0_3.2px_3.2px_black]">
              {features[0].title}
            </h4>
            <p className="text-black-800 text-center font-mono text-lg font-semibold text-white drop-shadow-[0_3.2px_3.2px_black]">
              {features[0].desc}
            </p>
          </div>
        </Link>
      </div>

      <div className="mr-4 flex justify-between">
        {/* Left container */}
        <div className="m-2 flex w-[75%] flex-wrap ">
          {features.slice(1, 5).map((item, idx) => (
            <div key={idx} className="w-1/2 ">
              <Link
                to={{
                  pathname: `/FilteredItems/${item.title}`,
                  state: { category: item.title },
                }}
              >
                <div
                  className="bg m-4 mb-5 cursor-pointer space-y-3 rounded-lg border border-slate-400 p-4 hover:bg-sky-200 hover:bg-opacity-45"
                  style={{ height: "380px" }}
                >
                  <div className="text-center">
                    <img
                      src={item.icon}
                      alt={item.title}
                      style={{
                        height: "150px",
                        width: "100%",
                        border: "1px solid #ccc",
                        transition: "transform 0.3s ease-in-out",
                      }}
                      className="inline-block hover:scale-110 hover:transform"
                    />
                  </div>
                  <h4 className="text-black-800 text-center font-mono text-3xl font-semibold text-white underline drop-shadow-[0_3.2px_3.2px_black]">
                    {item.title}
                  </h4>
                  <p className="text-black-800 text-center font-mono text-lg font-semibold text-white drop-shadow-[0_3.2px_3.2px_black]">
                    {item.desc}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
        {/* Munadi */}
        <div className="mt-20   cursor-pointer">
          <p className="ml-[5vh] w-[40vh] font-mono text-3xl text-slate-200 hover:text-sky-400">
            {" "}
            Click The Munadi!{" "}
          </p>
          <img
            src="../../src/assets/Munadi.gif"
            alt="Munadi"
            style={{ width: "100%", height: "30%" }}
            onClick={playAudio}
          />
        </div>
        {/* Right container */}
        <div className="m-2 flex w-[75%] flex-wrap">
          {features.slice(5, 9).map((item, idx) => (
            <div key={idx} className="mb-8 w-1/2">
              <Link
                to={{
                  pathname: `/FilteredItems/${item.title}`,
                  state: { category: item.title },
                }}
              >
                <div
                  className="bg m-4 mb-5 cursor-pointer space-y-3 rounded-lg border border-slate-400 p-4 hover:bg-sky-200 hover:bg-opacity-45"
                  style={{ height: "380px" }}
                >
                  <div className="text-center">
                    <img
                      src={item.icon}
                      alt={item.title}
                      style={{
                        height: "150px",
                        width: "100%",
                        border: "1px solid #ccc",
                        transition: "transform 0.3s ease-in-out",
                      }}
                      className="inline-block hover:scale-110 hover:transform"
                    />
                  </div>
                  <h4 className="text-black-800 text-center font-mono text-3xl font-semibold text-white underline drop-shadow-[0_3.2px_3.2px_black]">
                    {item.title}
                  </h4>
                  <p className="text-black-800 text-center font-mono text-lg font-semibold text-white drop-shadow-[0_3.2px_3.2px_black]">
                    {item.desc}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ItemsPage;
