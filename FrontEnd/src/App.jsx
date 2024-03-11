// App.js
import { Route, Routes, useLocation } from "react-router-dom";
import { useState } from "react";
import Footer from "./components/Footer";
import Home from "./components/Home";
import ClientMainPage from "./components/client/ClientMainPage";
import AdminMainPage from "./components/admin/AdminMainPage";
import LoginPage from "./components/outside/LoginPage";
import CategoryPage from "./components/client/CategoryPage";
import ClientNavbar from "./components/client/ClientNavBar";
import NavBar from "./components/NavBar";
import SideBar from "./components/admin/SideBar";
import Items from "./components/admin/Items";
import Statics from "./components/admin/Statics";
import CategiryPage from "./components/admin/CategiryPage";
export default function App() {
  const location = useLocation();
  const [userType, setUserType] = useState(null);

  const renderNavbar = () => {
    switch (userType) {
      case "admin":
        return <SideBar />;
      case "client":
        return <ClientNavbar />;
      default:
        return <NavBar />;
    }
  };

  return (
    <>
      {renderNavbar()}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={<LoginPage handleUserType={setUserType} />}
        />
        <Route path="/admin" element={<AdminMainPage />} />
        <Route path="/client" element={<ClientMainPage />} />
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/admin/items" element={<Items />} />
        <Route path="/admin/statics" element={<Statics />} />
        <Route path="/admin/categories" element={<CategiryPage />} />
      </Routes>
      <Footer />
    </>
  );
}
