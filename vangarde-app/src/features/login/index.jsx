import React from "react";
import LoginCard from "./components/ui/LoginCard";
import { AuthProvider } from "./useAuth";

// Export a component instead of mounting here. The app's entry file mounts once (main.jsx).
export default function LoginFeature() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <LoginCard />
      </div>
    </AuthProvider>
  );
}
