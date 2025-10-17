import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import { AuthProvider } from "./features/login/auth/useAuth.jsx";
import LoginCard from "./features/login/components/ui/LoginCard";
import Dashboard from "./pages/dashboard.jsx";
import PublicRoute from "./features/login/auth/PublicRoute.jsx";
import ProtectedRoute from "./features/login/auth/ProtectedRoute.jsx";
import FlashMessage from "./features/login/components/ui/FlashMessage.jsx";
import App from "./App";

// Start de React app en mount op #root
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <FlashMessage />
        <Routes>
          <Route path="/" element={<PublicRoute><LoginCard /></PublicRoute>}/>
          <Route path="/dashboard" element={<ProtectedRoute> <Dashboard /></ProtectedRoute>}/>
          <Route path="*" element={<LoginCard />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

