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
import ContactUs  from "./components/client/ContactUs"
import ClientSideBar from "./components/client/ClientSideBar";
import SideBar from "./components/admin/SideBar";
import Items from "./components/admin/Items";
import Statics from "./components/admin/Statics";
import Categories from "./components/admin/Categories";
import ClientProfile from "./components/client/ClientProfile";
import UsersPage from "./components/admin/UsersPage";
import Item from "./components/client/Items";
import ItemDetail from "./components/client/ItemDetail";
import AboutUs from "./components/AboutUs"
import BottomPage from "./components/client/BottomPage";
import UserCart from "./components/client/userCart"
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
        <Route path="/client/item" element={<Item />} />
        <Route path="/client" element={<ClientMainPage />} />
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/admin/items" element={<Items />} />
        <Route path="/admin/statics" element={<Statics />} />
        <Route path="/client/Profile" element={<ClientProfile />} />
        <Route path="/admin/categories" element={<Categories />} />
        <Route path="/admin/clients" element={<UsersPage />} />
        <Route path="/item/:id" element={<ItemDetail />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/client/userCart" element={<UserCart/>}/>
      </Routes>
      
      <Footer />
       {/* <BottomPage id="contact-us"/> */}
    </>
  );
}
