import React from "react";
import ReactDOM from "react-dom/client"; // Updated import here
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import BottomPage from "./components/client/BottomPage";

// Use createRoot from react-dom/client
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.Suspense fallback="Loading">
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.Suspense>,
);
