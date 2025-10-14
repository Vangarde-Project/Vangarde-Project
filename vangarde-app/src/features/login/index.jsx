import React from "react";
import { createRoot } from "react-dom/client";
import LoginCard from "./components/ui/LoginCard";

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <LoginCard />
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
