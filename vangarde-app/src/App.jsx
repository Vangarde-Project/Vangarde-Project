import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginCard from "./features/login/components/ui/LoginCard";
import Signup from "./features/login/auth/signup.jsx";
import Dashboard from "./pages/dashboard.jsx";
import { AuthProvider } from "./features/login/auth/useAuth.jsx";
import PublicRoute from "./features/login/auth/PublicRoute.jsx";
import ProtectedRoute from "./features/login/auth/ProtectedRoute.jsx";
import FlashMessage from "./features/login/components/ui/FlashMessage.jsx";
import { fetchCompanyData } from "./features/login/services/kvkService.js";
import TermsOfService from "./pages/terms-of-service.jsx";
import PrivacyPolicy from "./pages/privacy-policy.jsx";
import { getCompanyDataByName } from "./features/login/services/kvkService.js";

export default function App() {
  // 🔎 Kleine rooktest voor KvK-lookup (veilig om te verwijderen in productie)
  useEffect(() => {
    async function testKvK() {
      try {
        const data = await getCompanyDataByName("Vangarde");
        console.log("KVK RESULT:", data);
      } catch (e) {
        console.error("KVK test failed:", e);
      }
    }
    testKvK();
  }, []);

  return (
    <Router>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        {/* AuthProvider zorgt voor login/register functies en state */}
        <AuthProvider>
          <FlashMessage />
          <Routes>
            {/* Homepage -> login (public) */}
            <Route
              path="/"
              element={
                <PublicRoute>
                  <LoginCard />
                </PublicRoute>
              }
            />

            {/* Login route (ook publiek) */}
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <LoginCard />
                </PublicRoute>
              }
            />

            {/* Registratie pagina */}
            <Route path="/signup" element={<Signup />} />

            {/* Dashboard (private) */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* Fallback -> toon login */}
            <Route
              path="*"
              element={
                <PublicRoute>
                  <LoginCard />
                </PublicRoute>
              }
            />

            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          </Routes>
        </AuthProvider>
      </div>
    </Router>
  );
}
