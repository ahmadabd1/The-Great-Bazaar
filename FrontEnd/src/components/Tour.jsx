import React, { useState } from "react";

function Tour() {
  const [isEnglish, setIsEnglish] = useState(true);
  const [showMap, setShowMap] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [imageRendered, setImageRendered] = useState(false);
  const [districtImages, setDistrictImages] = useState({
    Northern: "../../src/assets/BazaarLive.gif",
    Eastern: "../../src/assets/BazaarCategory3.jpg",
    Western: "../../src/assets/BazaarCategory3.jpg",
    Southern: "../../src/assets/BazaarCategory3.jpg",
  });

  const toggleLanguage = () => {
    setIsEnglish((prev) => !prev);
  };

  const toggleView = () => {
    setShowMap((prev) => !prev);
    setSelectedDistrict(null); // Reset selected district
    setImageRendered(false); // Reset image rendered state
  };

  const handleDistrictClick = (district) => {
    setSelectedDistrict(district);
    setImageRendered(true); // Set image rendered to true when a district is clicked
  };

  const backToMap = () => {
    setSelectedDistrict(null);
    setImageRendered(false); // Set image rendered to false when going back to the map
  };

  return (
    <div className="h-screen overflow-y-auto">
      <div className="mt-20">
        <button
          className={`m-2 cursor-pointer rounded-lg bg-slate-950/70 p-2 font-mono text-sky-500 shadow-md ${
            !showMap ? "bg-sky-500/70 text-slate-100 hover:bg-sky-900" : ""
          }`}
          onClick={() => {
            toggleView();
          }}
        >
          Toggle Information
        </button>
        <button
          className={`m-2 cursor-pointer rounded-lg bg-slate-950/70 p-2 font-mono text-sky-500 shadow-md ${showMap ? "bg-sky-500/70 text-slate-100 hover:bg-sky-900" : ""}`}
          onClick={() => {
            toggleView();
            setIsEnglish(true);
          }}
        >
          Toggle Map
        </button>
      </div>
      <div className="relative h-[535px] w-[100%] rounded-xl bg-opacity-10 bg-gradient-to-b from-slate-900 to-sky-700/50 p-3 shadow-2xl">
        <div className="relative h-[100%] w-[100%]">
          {showMap && (
            <>
              <div
                className="absolute left-0 top-0 z-10 flex h-1/2 w-1/2 items-center justify-center bg-red-500/10 hover:bg-red-400/30 hover:text-xl"
                onClick={() => handleDistrictClick("Northern")}
              >
                <span className="z-12 absolute bottom-56 left-0 flex  font-mono text-sm text-slate-200">
                  (!) This Image Is Interactive
                </span>
                <span className="font-mono text-slate-300">
                  Northern District
                </span>
              </div>
              {/* Other district buttons */}
              <div
                className="absolute right-0 top-0 z-10 flex h-1/2 w-1/2 items-center justify-center bg-sky-500/10 hover:bg-sky-400/30 hover:text-xl"
                onClick={() => handleDistrictClick("Eastern")}
              >
                <span className="font-mono text-slate-300">
                  Eastern District
                </span>
              </div>
              <div
                className="absolute bottom-0 left-0 z-10 flex h-1/2 w-1/2 items-center justify-center bg-green-500/10 hover:bg-green-400/30 hover:text-xl"
                onClick={() => handleDistrictClick("Western")}
              >
                <span className="font-mono text-slate-300">
                  Western District
                </span>
              </div>
              <div
                className="absolute bottom-0 right-0 z-10 flex h-1/2 w-1/2 items-center justify-center  bg-yellow-500/10 hover:bg-yellow-400/30 hover:text-xl"
                onClick={() => handleDistrictClick("Southern")}
              >
                <span className="font-mono text-slate-300">
                  Southern District
                </span>
              </div>
            </>
          )}
          {selectedDistrict && (
            <div
              className="absolute inset-0 z-20 bg-cover bg-center"
              style={{
                backgroundImage: `url('${districtImages[selectedDistrict]}')`,
              }}
            >
              {imageRendered && (
                <button
                  className="0 hover: absolute left-[0vh] z-10 w-[20vh] cursor-pointer rounded-md bg-gradient-to-r from-slate-950 to-sky-600 p-2 font-mono text-slate-100 shadow-md"
                  onClick={backToMap}
                >
                  &lt; Map
                </button>
              )}
            </div>
          )}
          <img
            src={
              showMap
                ? "../../src/assets/Map.png"
                : isEnglish
                  ? "../../src/assets/BazaarInfo.png"
                  : "../../src/assets/BazaarInfo2.png"
            }
            className="h-[70vh] w-[100vh] object-cover opacity-80"
            style={{ zIndex: -1 }}
            alt={showMap ? "Map" : "Information"}
          />
        </div>
        {!showMap && (
          <button
            className="absolute left-[80.6vh] top-[0.4vh] z-10 m-2 w-[20vh] cursor-pointer rounded-md bg-gradient-to-r from-slate-700 to-sky-600 p-2 font-mono text-slate-100 shadow-md hover:bg-sky-900"
            onClick={toggleLanguage}
          >
            {isEnglish ? "عرض بالعربية" : "English"}
          </button>
        )}
      </div>
      <div className="h-10"></div>
      <div className="h-10"></div>
      <div className="h-10"></div>
      <div className="h-10"></div>
    </div>
  );
}

export default Tour;
