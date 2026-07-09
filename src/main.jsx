import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { CoinsProvider } from "./context/CoinsContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <CoinsProvider>
        <App />
      </CoinsProvider>
    </BrowserRouter>
  </React.StrictMode>
);