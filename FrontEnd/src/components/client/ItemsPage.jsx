import React, { useState } from "react";
import { Link } from "react-router-dom";

const ItemsPage = () => {
  const [audio] = useState(new Audio("../../src/assets/MunadiVoice.mp3"));

  const playAudio = () => {
    audio.volume = 1.0;
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
      title: "Books and Paper",
      desc: " The Abbasids abused the creation of paper to spread knowledge, you should too!",
    },
    {
      icon: "../../src/assets/BazaarCategory4.jpg",
      title: "Matresses",
      desc: "Persian, Asian, Arabic and pretty much everything",
    },
    {
      icon: "../../src/assets/BazaarCategory3.jpg",
      title: "Food",
      desc: "Just listen to our Munadi, He will tell you everything you need to know and hear about in the Bazaar",
    },
  ];

  return (
    <div
      className="relative mt-40"
      style={{ marginLeft: "41px", padding: "0 40px" }}
    >
      {/* Upper container */}
      <div className="mb-8   ml-96 w-[30%]">
        <Link
          to={{
            pathname: "/client/ItemsAll",
          }}
        >
          <div className="cursor-pointer space-y-3 rounded-lg border border-slate-400 p-4">
            <div className="text-center"></div>
            <h4 className="text-black-800 text-center font-mono text-3xl font-semibold text-white underline drop-shadow-[0_3.2px_3.2px_aqua]">
              {features[0].title}
            </h4>
            <p className="text-black-800 text-center font-mono text-lg font-semibold text-white drop-shadow-[0_3.2px_3.2px_aqua]">
              {features[0].desc}
            </p>
          </div>
        </Link>
      </div>

      <div className="gap-45 flex justify-center">
        {/* Left container */}
        <div className="flex w-64 flex-col justify-between">
          {features.slice(1, 3).map((item, idx) => (
            <div key={idx} className="mb-8">
              <Link
                to={{
                  pathname: `/FilteredItems/${item.title}`,
                  state: { category: item.title },
                }}
              >
                <div className="cursor-pointer space-y-3 rounded-lg border border-slate-400 p-4">
                  <div className="text-center">
                    <img
                      src={item.icon}
                      alt={item.title}
                      style={{
                        height: "150px",
                        width: "100%",
                        border: "1px solid #ccc",
                      }}
                      className="inline-block"
                    />
                  </div>
                  <h4 className="text-black-800 text-center font-mono text-3xl font-semibold text-white underline drop-shadow-[0_3.2px_3.2px_aqua]">
                    {item.title}
                  </h4>
                  <p className="text-black-800 text-center font-mono text-lg font-semibold text-white drop-shadow-[0_3.2px_3.2px_aqua]">
                    {item.desc}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Munadi */}
        <img
          className="mt-40 cursor-pointer"
          src="../../src/assets/Munadi.gif"
          alt="Munadi"
          style={{ width: "50%", height: "90%" }}
          onClick={playAudio}
        />

        {/* Right container */}
        <div className="flex w-64 flex-col justify-between">
          {features.slice(3, 5).map((item, idx) => (
            <div key={idx} className="mb-8">
              <Link to={`/FilteredItems/${item.title}`}>
                <div className="space-y-3 rounded-lg border border-slate-400 p-4">
                  <div className="text-center">
                    <img
                      src={item.icon}
                      alt={item.title}
                      style={{
                        height: "150px",
                        width: "100%",
                        border: "1px solid #ccc",
                      }}
                      className="inline-block"
                    />
                  </div>
                  <h4 className="text-black-800 text-center font-mono text-3xl font-semibold text-white underline drop-shadow-[0_3.2px_3.2px_aqua]">
                    {item.title}
                  </h4>
                  <p className="text-black-800 text-center font-mono text-lg font-semibold text-white drop-shadow-[0_3.2px_3.2px_aqua]">
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
