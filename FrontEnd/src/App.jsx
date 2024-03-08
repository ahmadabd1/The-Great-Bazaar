// App.js
import { Route, Routes, useLocation } from "react-router-dom";
import { useState } from "react";
import Footer from "./components/Footer";
import Home from "./components/Home";
import ClientMainPage from "./components/client/ClientMainPage";
import AdminMainPage from "./components/admin/AdminMainPage";
import LoginPage from "./components/outside/LoginPage";
import CategoryPage from './components/client/CategoryPage';
import ClientNavbar from './components/client/ClientNavbar';
import OutsideNavbar from './components/outside/OutsideNavbar';
import SideBar from "./components/admin/SideBar";

export default function App() {
  const location = useLocation();
  const [userType, setUserType] = useState(null);

  const renderNavbar = () => {
    switch (userType) {
      case 'admin':
        return <SideBar />;
      case 'client':
        return <ClientNavbar />;
      default:
        return <OutsideNavbar />;
    }
  };

  return (
    <>
      {renderNavbar()}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage handleUserType={setUserType} />} />
        <Route path="/admin" element={<AdminMainPage />} />
        <Route path="/client" element={<ClientMainPage />} />
        <Route path="/category" element={<CategoryPage />} />
      </Routes>
      <Footer />
    </>
  );
}
