import "./App.css";
import LoginPage from "../components/LoginPage";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SideBar from "../components/admin/SideBar.jsx";


const admin =true

function App() {
  return (
    <>
      {admin ? (
        <Router>
          {/* // <Route path="/" element={<SideBar />} /> */}
          <SideBar />
          {/* <Routes>

          </Routes> */}

        </Router>
      ) : (
        <Router>
          <Navbar balance={balance} />
          <main className="main-content">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
            
            </Routes>
          </main>
          <Footer />
        </Router>
      )}
    </>
  );
}

export default App;
