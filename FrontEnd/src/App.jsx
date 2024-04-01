import React, { useState, useEffect, useRef } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Home from "./components/Home";
import ClientMainPage from "./components/client/ClientMainPage";
import AdminMainPage from "./components/admin/AdminMainPage";
import LoginPage from "./components/outside/LoginPage";
import CategoryPage from "./components/client/CategoryPage";
import ClientNavbar from "./components/client/ClientNavBar";
import NavBar from "./components/NavBar";
import ContactUs from "./components/client/ContactUs";
import ClientSideBar from "./components/client/ClientSideBar";
import SideBar from "./components/admin/SideBar";
import Items from "./components/admin/Items";
import Statics from "./components/admin/Statics";
import Categories from "./components/admin/Categories";
import ClientProfile from "./components/client/ClientProfile";
import UsersPage from "./components/admin/UsersPage";
import Item from "./components/client/Items";
import ItemsPage from "./components/client/ItemsPage";
import ItemDetail from "./components/client/ItemDetail";
import ItemsAll from "./components/client/ItemsAll";
import AboutUs from "./components/AboutUs";
import BottomPage from "./components/client/BottomPage";
import UserCart from "./components/client/userCart";
import FilteredItems from "./components/client/FilteredItems"; // Import the FilteredItems component
import Payment from "./components/client/Payment";
import Tour from "./components/Tour";

import Orders from "./components/client/Orders";
import OrdersA from "./components/admin/OrdersA";

export default function App() {
  const [totalItems, setTotalItems] = useState(0); // Step 1: Create state for totalItems
  const [isBlurred, setIsBlurred] = useState(false);
  const location = useLocation();
  // const isVideoEnabledForDisplay = true; // Controls whether the video should be displayed
  const isVideoEnabledForVolume = true; // Controls whether the video volume should be reduced

  const handleAddToCart = () => {
    // Logic to add item to cart
    // Update totalItems state
    setTotalItems((prevTotalItems) => prevTotalItems + 1);
  };

  const handleRemoveFromCart = () => {
    // Logic to remove item from cart
    // Update totalItems state
    setTotalItems((prevTotalItems) => prevTotalItems - 1);
  };

  const fetchTotalItems = async () => {
    try {
      const response = await fetch("http://localhost:8080/totalItems");
      if (!response.ok) {
        throw new Error(
          "Failed to fetch total items data: " + response.statusText,
        );
      }
      const data = await response.json();
      setTotalItems(data.totalItems);
    } catch (error) {
      console.error("Error fetching total items data:", error.message);
    }
  };

  const updateTotalItems = (newTotalItems) => {
    setTotalItems(newTotalItems);
  };

  const renderNavbar = () => {
    switch (localStorage.getItem("userType")) {
      case "admin":
        return <SideBar />;
      case "client":
        return (
          <>
            <ClientNavbar totalItems={totalItems} />
            {location.pathname.includes("/client/item") && <ClientSideBar />}
          </>
        );
      default:
        return <NavBar />;
    }
  };

  const shouldBlurBackground = () => {
    return location.pathname === "/login" || location.pathname === "/AboutUs";
  };

  useEffect(() => {
    setIsBlurred(shouldBlurBackground());
    fetchTotalItems();
  }, [location.pathname]);

  useEffect(() => {
    const video = document.getElementById("bgvid");
    if (video) {
      video.play().catch((error) => {
        console.error("Autoplay was prevented:", error);
        // Update state to show a play button, for example
      });
    }
  }, []);

  useEffect(() => {
    if (isVideoEnabledForVolume) {
      const video = document.getElementById("bgvid");
      if (video) {
        video.volume = 0.4; // Adjust the volume between 0 and 1 (0 being muted, 1 being full volume)
      }
    }
  }, [isVideoEnabledForVolume]);

  const isVideoEnabled =
    location.pathname === "/client" || location.pathname === "/";

  console.log("Total items in App.jsx:", totalItems);

  return (
    <>
      <div className="app">
        {isVideoEnabled && (
          <video autoPlay loop id="bgvid" muted>
            <source src="https://firebasestorage.googleapis.com/v0/b/bazaar-3fb26.appspot.com/o/BazaarBGMarket.mp4?alt=media&token=33ccf538-ab5e-4ea9-8a98-be7ff4fb46c0" />
            Your browser does not support HTML5 video.
          </video>
        )}

        <div className="container">
          <div
            className={`background-image ${isBlurred ? "blur-background" : ""}`}
          ></div>
          {renderNavbar()}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/admin" element={<AdminMainPage />} />
            <Route path="/client/item" element={<Item />} />
            <Route path="/client" element={<ClientMainPage />} />
            <Route path="/category" element={<CategoryPage />} />
            <Route path="/admin/items" element={<Items />} />
            <Route path="/admin/statics" element={<Statics />} />
            <Route path="/client/Profile" element={<ClientProfile />} />
            <Route path="/admin/categories" element={<Categories />} />
            <Route path="/Tour" element={<Tour />} />
            <Route path="/admin/clients" element={<UsersPage />} />
            <Route path="/item/:id" element={<ItemDetail />} />
            <Route path="/client/ItemsPage" element={<ItemsPage />} />
            <Route path="/admin/orders" element={<OrdersA />} />
            <Route path="/AboutUs" element={<AboutUs />} />
            <Route
              path="/userCart"
              element={
                <UserCart
                  updateTotalItems={updateTotalItems}
                  onRemoveFromCart={handleRemoveFromCart}
                />
              } // Pass totalItems as a prop
            />
            <Route path="/payment" element={<Payment />} />
            <Route path="/orders" element={<Orders />} />

            <Route
              path="/filtereditems/:category"
              element={<FilteredItems />}
            />
            <Route
              path="/client/ItemsAll"
              element={<ItemsAll onAddToCart={handleAddToCart} />}
            />
          </Routes>

          <Footer />
        </div>
      </div>

      {location.pathname === "/client" && <BottomPage />}
    </>
  );
}
