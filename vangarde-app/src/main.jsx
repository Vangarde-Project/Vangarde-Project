import React from "react";
import ReactDOM from "react-dom/client";
import { SessionProvider } from "next-auth/react";
import App from "./App";
import "./index.css";

// Start de React app en mount op #root
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SessionProvider>
      <App />
    </SessionProvider>
  </React.StrictMode>
);

