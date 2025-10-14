import React from "react";
import { createRoot } from "react-dom/client";
import LoginCard from "./components/ui/LoginCard";
import { AuthProvider } from "./useAuth";

function App() {
  return (
    <AuthProvider>
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <LoginCard />
    </div>
    </AuthProvider>
  );
}

createRoot(document.getElementById("root")).render(<App />);
