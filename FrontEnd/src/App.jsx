import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import ClientNavBar from "./components/client/ClientNavBar";
import ClientMainPage from "./components/client/ClientMainPage";
import AdminMainPage from "./components/admin/AdminMainPage"
import LoginPage from "./components/outside/LoginPage";
import OutsideNavbar from './components/outside/OutsideNavbar';
import { useNavigate } from 'react-router-dom';

import SideBar from './components/admin/SideBar';
import CategoryPage from './components/client/CategoryPage';
export default function App() {
 /*  const [userType, setUserType] = useState("");

  const handleUserType = (type) => {
    setUserType(type);
  }; */

  return (
    <>
      <NavBar />
      <Routes>
       
          <Route path="/" element={<Home />} />
              <Route path="/Login" element={<LoginPage  />}/>
              <Route path="/admin" element={<AdminMainPage />} />
              <Route path="/client" element={<ClientMainPage />} />
              <Route path="/CategoryPage" element={<CategoryPage />} />

      </Routes>

      <Footer />
    </>
  );
}
