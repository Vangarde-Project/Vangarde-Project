"use client";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";

export default function LoginCard() {
  const navigate = useNavigate();
  const { login, isLoggedIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, [isLoggedIn, navigate]);

  
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);

    
    setTimeout(() => {
      if (email === "test@vangarde.ai" && password === "1234") {
        login();
        navigate("/dashboard");
      } else {
        setError("Invalid email or password.");
      }
      setLoading(false);
    }, 1000);
  };

  const handleSocialLogin = (provider) => {
    console.log(`${provider} login clicked`);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-6">
          <h2 className="text-2xl font-bold">Secure Access</h2>
          <p className="text-sm opacity-90">Enterprise-grade authentication</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5" aria-labelledby="login-heading">
          <h3 id="login-heading" className="sr-only">
            Login form
          </h3>

          {/* Organization */}
          <div>
            <label
              htmlFor="organization"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Organization
            </label>
            <select
              id="organization"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Select your organization"
            >
              <option>Acme Corporation</option>
            </select>
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email or Username
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email or username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-required="true"
              aria-invalid={error ? "true" : "false"}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-required="true"
              aria-invalid={error ? "true" : "false"}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Error message */}
          {error && (
            <p
              className="text-red-500 text-sm"
              role="alert"
              aria-live="assertive"
            >
              {error}
            </p>
          )}

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            aria-busy={loading}
            aria-label={loading ? "Logging in..." : "Continue to login"}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg font-medium hover:opacity-90 transition disabled:opacity-60"
          >
            {loading ? "Loading..." : "Inloggen →"}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-2">
            <hr className="flex-1 border-gray-300" />
            <span className="text-gray-500 text-sm">or</span>
            <hr className="flex-1 border-gray-300" />
          </div>

          {/* Social Buttons */}
          <div className="space-y-3">
            <button
              type="button"
              onClick={() => handleSocialLogin("Google gekilikt")}
              className="w-full flex items-center justify-start gap-3 border border-gray-300 text-gray-800 py-2.5 px-4 rounded-md hover:bg-green-500 transition"
            >
              <img
                src="/assets/google.png"
                alt=""
                className="w-5 h-5 object-contain"
              />
              <span className="text-sm font-medium translate-x-3">Sign in with Google</span>
            </button>
            <button
              type="button"
              onClick={() => handleSocialLogin("microsoft gekilikt")}
              className="w-full flex items-center justify-start gap-3 border border-gray-300 text-gray-800 py-2.5 px-4 rounded-md hover:bg-red-500 transition"
            >
              <img
                src="/assets/microsoft.png"
                alt=""
                className="w-5 h-5 object-contain"
              />
              <span className="text-sm font-medium translate-x-3">Sign in with Microsoft </span>
            </button>
           <button
              type="button"
              onClick={() => handleSocialLogin("Apple gekilikt")}
              className="w-full flex items-center justify-start gap-3 border border-gray-300 text-gray-800 py-2.5 px-4 rounded-md hover:bg-black hover:text-white hover:border-transparent transition"
              >
              <img
                src="/assets/apple.png"
                alt=""
                className="w-5 h-5 object-contain"
              />
              <span className="text-sm font-medium translate-x-3">Sign in with Apple</span>
            </button>
            <button
              type="button"
              onClick={() => handleSocialLogin("phonenumber gekilikt")}
              className="w-full flex items-center justify-start gap-3 border border-gray-300 text-gray-800 py-2.5 px-4 rounded-md hover:bg-blue-800 hover:text-white hover:border-transparent"
            >
              <img
                src="/assets/call.png"
                alt=""
                className="w-5 h-5 object-contain"
              />
              <span className="text-sm font-medium translate-x-3">Sign in with phone number</span>
            </button>

          </div>
        </form>

          {/* Voorbereid voor OIDC-integratoe
      <div style={{ marginTop: 10 }}>
        <button
          type="button"
          onClick={() => {
            // TODO: OIDC-integratie
            // Hier kun je straks redirecten naar je OIDC provider login
            console.log(" TODO: Start OIDC login flow...");
          }}
        >
          Login met OIDC Provider
        </button>
      </div>
    </div> */}

        {/* Footer */}
        <div className="text-center text-xs text-gray-500 py-4 border-t">
          New to Vangarde Intelligence?{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Contact your administrator
          </a>
        </div>
      </div>
    </div>
  );
}
