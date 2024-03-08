import React, { useState } from 'react';
import './App.css';
import Home from '../components/outside/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import OutsideNavbar from '../components/outside/OutsideNavbar';
import ClientNavBar from '../components/client/ClientNavBar';
import LoginPage from '../components/outside/LoginPage';
import AdminMainPage from '../components/admin/AdminMainPage';
import ClientMainPage from '../components/client/ClientMainPage';
import SideBar from '../components/admin/SideBar'
function App() {
  const [userType, setUserType] = useState(null);

  const handleUserType = (type) => {
    setUserType(type);
  };

  return (
    <div>
      <Router>
        {userType === 'client' ? <ClientNavBar /> : userType=='admin'? <SideBar/>:  <OutsideNavbar  />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<LoginPage handleUserType={handleUserType} />} />
          <Route path="/admin" element={<AdminMainPage />} />
          <Route path="/client" element={<ClientMainPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
