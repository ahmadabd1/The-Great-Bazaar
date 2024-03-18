import React, { useEffect } from 'react';
import { BrowserRouter as Router ,Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Footer from './components/Footer';
import Home from './components/Home';
import ClientMainPage from './components/client/ClientMainPage';
import AdminMainPage from './components/admin/AdminMainPage';
import LoginPage from './components/outside/LoginPage';
import CategoryPage from './components/client/CategoryPage';
import ClientNavbar from './components/client/ClientNavBar';
import NavBar from './components/NavBar';
import SideBar from './components/admin/SideBar';
import Items from './components/admin/Items';
import Statics from './components/admin/Statics';
import Categories from './components/admin/Categories';
import ClientProfile from './components/client/ClientProfile';
import Item from './components/client/Item';
import ProtectedRoute from './ProtectedRoute';
export default function App() {
  const navigate = useNavigate();

 




  const location = useLocation();

  const renderNavbar = () => {
    switch (localStorage.getItem('userType')) {
      case 'admin':
        return <SideBar />;
      case 'client':
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
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminMainPage/>} />
        <Route path="/client/item" element={<ProtectedRoute><Item/></ProtectedRoute>} />
        <Route path="/client" element={<ProtectedRoute><ClientMainPage/></ProtectedRoute>} />
        <Route path="/category" element={<ProtectedRoute><CategoryPage/></ProtectedRoute>} />
        <Route path="/admin/items" element={<ProtectedRoute><Items/></ProtectedRoute>} />
        <Route path="/admin/statics" element={<ProtectedRoute><Statics/></ProtectedRoute>} />
        <Route path="/client/Profile" element={<ProtectedRoute><ClientProfile/></ProtectedRoute>} />
        <Route path="/admin/categories" element={<ProtectedRoute><Categories/></ProtectedRoute>} />


      </Routes>
      <Footer />
    </>
  );
};

