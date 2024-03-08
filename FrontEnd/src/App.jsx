import "./App.css";
import LoginPage from "../components/LoginPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AdminMainPage from '../components/admin/AdminMainPage';
import ClientMainPage from '../components/client/ClientMainPage';
import CategoryPage from "../components/client/CategoryPage";


function App() {
  return (
    <div className="App">
    <Router>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/AdminMainPage' element={<AdminMainPage />} />
        <Route path='/ClientMainPage' element={<ClientMainPage />} />
        <Route path='/CategoryPage' element={<CategoryPage />} />

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