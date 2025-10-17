import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// Start de React app en mount op #root
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
