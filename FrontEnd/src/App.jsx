import "./App.css";
import LoginPage from "../components/LoginPage";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SideBar from "../components/admin/SideBar.jsx";
import HomaPage from "../components/client/HomePage.jsx"

const admin =false

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
        {/*   <Navbar balance={balance} /> */}
          <main className="main-content">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
                    <Route path="/home" element={<HomaPage/>} />

            </Routes>
          </main>
        {/*   <Footer /> */}
        </Router>
      )}
    </>
  );
}

export default App;
