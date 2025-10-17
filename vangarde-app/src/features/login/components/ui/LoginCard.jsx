"use client";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react"; 
import { useAuth } from "../../auth/useAuth";

export default function LoginCard() {
  const navigate = useNavigate();
  const { login, isLoggedIn, loading: authLoading, error: authError } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, [isLoggedIn, navigate]);

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    const result = await login(email, password);
    setLoading(false);

    if (result.ok) {
      navigate("/dashboard");
    } else {
      setError(result.error || "Invalid email or password.");
    }
  };

  
  const handleSocialLogin = (provider) => {
    console.log(`${provider} login clicked`);
  };

  
  const socialButton =
    "w-full flex items-center justify-start gap-3 border border-gray-300 text-gray-800 py-2.5 px-4 rounded-md hover:bg-gray-300 transition";

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg overflow-hidden">
       
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-6">
          <h2 className="text-2xl font-bold">Secure Access</h2>
          <p className="text-sm opacity-90">Enterprise-grade authentication</p>
        </div>

        
        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-5"
          aria-labelledby="login-heading"
        >
          <h3 id="login-heading" className="sr-only">
            Login form
          </h3>

        
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

          
          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>

            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-required="true"
              aria-invalid={error ? "true" : "false"}
              className="w-full border rounded-lg px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

          
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-3 top-9 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          
          {error && (
            <p
              className="text-red-500 text-sm"
              role="alert"
              aria-live="assertive"
            >
              {error}
            </p>
          )}

          
          <button
            type="submit"
            disabled={loading}
            aria-busy={loading}
            aria-label={loading ? "Logging in..." : "Continue to login"}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg font-medium hover:opacity-90 transition disabled:opacity-60"
          >
            {loading ? "Loading..." : "Inloggen →"}
          </button>

          
          <div className="flex items-center gap-2">
            <hr className="flex-1 border-gray-300" />
            <span className="text-gray-500 text-sm">or</span>
            <hr className="flex-1 border-gray-300" />
          </div>

          <div className="space-y-3">
            <button
              type="button"
              onClick={() => handleSocialLogin("Google")}
              className={socialButton}
            >
              <img src="/assets/google.png" alt="Google logo" className="w-5 h-5" />
              <span className="text-sm font-medium translate-x-3">
                Sign in with Google
              </span>
            </button>

            <button
              type="button"
              onClick={() => handleSocialLogin("Microsoft")}
              className={socialButton}
            >
              <img
                src="/assets/microsoft.png"
                alt="Microsoft logo"
                className="w-5 h-5"
              />
              <span className="text-sm font-medium translate-x-3">
                Sign in with Microsoft
              </span>
            </button>

            <button
              type="button"
              onClick={() => handleSocialLogin("Apple")}
              className={socialButton}
            >
              <img src="/assets/apple.png" alt="Apple logo" className="w-5 h-5" />
              <span className="text-sm font-medium translate-x-3">
                Sign in with Apple
              </span>
            </button>

            <button
              type="button"
              onClick={() => handleSocialLogin("Phone")}
              className={socialButton}
            >
              <img src="/assets/call.png" alt="Phone icon" className="w-5 h-5" />
              <span className="text-sm font-medium translate-x-3">
                Sign in with phone number
              </span>
            </button>
          </div>
        </form>

        {/* 🔹 Footer */}
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
