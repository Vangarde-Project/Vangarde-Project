import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// 🔐 Auth & login
import LoginCard from "./features/login/components/ui/LoginCard.jsx";
import Signup from "./features/login/auth/signup.jsx";
import PublicRoute from "./features/login/auth/PublicRoute.jsx";
import ProtectedRoute from "./features/login/auth/ProtectedRoute.jsx";
import { AuthProvider } from "./features/login/auth/useAuth.jsx";
import FlashMessage from "./features/login/components/ui/FlashMessage.jsx";
import TermsOfService from "./pages/terms-of-service.jsx";
import PrivacyPolicy from "./pages/privacy-policy.jsx";

// 🧩 App layouts & pages
import DashboardLayout from "./features/login/components/layout/DashboardLayout.jsx";
import Dashboard from "./pages/dashboard.jsx";

// 🔧 Services
import { getCompanyDataByName } from "./features/login/services/kvkService";

// ⬇️ Layout wrapper voor alle publieke pagina’s (login/signup)
function AuthShell({ children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {children}
    </div>
  );
}

export default function App() {
  // Test KvK (mock mode)
  useEffect(() => {
    // small dev/test helper — use the imported service instead of an undefined function
    async function testKvK() {
      try {
        const data = await getCompanyDataByName("69599084", true);
        console.log("KVK RESULT:", data);
      } catch (err) {
        console.warn("KVK test failed:", err);
      }
    }
    testKvK();
  }, []);

  return (
    <Router>
      <AuthProvider>
        {/* Globale notificaties */}
        <FlashMessage />

        <Routes>
          {/* --- 🔓 Publieke routes --- */}
          <Route
            path="/"
            element={
              <PublicRoute>
                <AuthShell>
                  <LoginCard />
                </AuthShell>
              </PublicRoute>
            }
          />

          <Route
            path="/login"
            element={
              <PublicRoute>
                <AuthShell>
                  <LoginCard />
                </AuthShell>
              </PublicRoute>
            }
          />

          <Route
            path="/signup"
            element={
              <PublicRoute>
                <AuthShell>
                  <Signup />
                </AuthShell>
              </PublicRoute>
            }
          />

          {/* --- 🔒 Beveiligde routes --- */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Dashboard />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />

          {/* --- ⛔ Catch-all --- */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}
