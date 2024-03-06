import "./App.css";
import LoginPage from "../components/LoginPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SideBar from "../components/admin/SideBar.jsx";
import HomaPage from "../components/client/HomePage.jsx"
import AdminMainPage from '../components/admin/AdminMainPage';
import ClientMainPage from '../components/client/ClientMainPage';


const admin =false

function App() {
  return (
    <div className="App">
    <Router>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/adminMainPage' element={<AdminMainPage />} />
        <Route path='/ClientMainPage' element={<ClientMainPage />} />
      </Routes>
    </Router>
  </div>

  );
}

export default App;


// {admin ? (
//   <Router>
//     {/* // <Route path="/" element={<SideBar />} /> */}
//     <SideBar />
//     {/* <Routes>

//     </Routes> */}

//   </Router>
// ) : (
//   <Router>
//   {/*   <Navbar balance={balance} /> */}
//     <main className="main-content">
//       <Routes>
//         <Route path="/login" element={<LoginPage />} />
//               <Route path="/home" element={<HomaPage/>} />

//       </Routes>
//     </main>
//   {/*   <Footer /> */}
//   </Router>
// )}