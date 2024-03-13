// App.js
import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Home from "./components/Home";
import ClientMainPage from "./components/client/ClientMainPage";
import AdminMainPage from "./components/admin/AdminMainPage";
import LoginPage from "./components/outside/LoginPage";
import CategoryPage from "./components/client/CategoryPage";
import ClientNavbar from "./components/client/ClientNavBar";
import NavBar from "./components/NavBar";
import ClientSideBar from "./components/client/ClientSideBar";
import SideBar from "./components/admin/SideBar";
import Items from "./components/admin/Items";
import Statics from "./components/admin/Statics";
import Categories from "./components/admin/Categories";
export default function App() {
  const location = useLocation();

  const renderNavbar = () => {
    switch (localStorage.getItem("userType")) {
      case "admin":
        return <SideBar />;
      case "client":
        return (
          <>
            <ClientNavbar />
            <ClientSideBar />
          </>
        );
      default:
        return <NavBar />;
    }
  };

  return (
    <>
      {renderNavbar()}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminMainPage />} />
        <Route path="/client" element={<ClientMainPage />} />
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/admin/items" element={<Items />} />
        <Route path="/admin/statics" element={<Statics />} />
        <Route path="/admin/categories" element={<Categories />} />
      </Routes>
      <Footer />
    </>
  );
}
