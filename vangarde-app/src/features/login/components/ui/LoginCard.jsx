"use client";
import React, { useState, useEffect, useRef } from "react";
import useForm from "../../hooks/useForm";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";
import SocialButtons from "../../auth/SocialButtons";
import LegalLinks from "./LegalLinks";

export default function LoginCard() {
  const navigate = useNavigate();
  const { login, signInWithProvider, isLoggedIn } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const functieRef = useRef(null);

  // Voeg functieTitel toe aan de useForm state
  const { values, errors: fieldErrors, handleChange, setErrors } = useForm({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setErrors({});

    const errors = {};
    if (!values.email) errors.email = "Vul je e-mail of gebruikersnaam in.";
    if (!values.password) errors.password = "Vul je wachtwoord in.";

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      if (errors.email) emailRef.current?.focus();
      else if (errors.password) passwordRef.current?.focus();
      else if (errors.functieTitel) functieRef.current?.focus();
      return;
    }

  setLoading(true);
  const result = await login({ email: values.email, password: values.password });
  setLoading(false);

    if (result.ok) {
      navigate("/dashboard");
    } else {
      setError(result.error || "Ongeldige e-mail of wachtwoord.");
    }
  };

  const EyeIcon = ({ className = 'w-5 h-5' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  const EyeOffIcon = ({ className = 'w-5 h-5' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 3l18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10.47 10.47A3 3 0 0113.53 13.53" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 12s4-7 10-7a9.77 9.77 0 015.11 1.36" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M21.5 16.5A9.77 9.77 0 0112 19c-6 0-10-7-10-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white w-[420px] md:w-[520px] rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-6">
          <h2 className="text-2xl font-bold">Secure Access</h2>
          <p className="text-sm opacity-90">Enterprise-grade authentication</p>
        </div>

        {/* Formulier */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5" aria-labelledby="login-heading">
          <h3 id="login-heading" className="sr-only">Login formulier</h3>

          {/* E-mail veld */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              E-mail of gebruikersnaam
            </label>
            <input
              id="email"
              ref={emailRef}
              name="email"
              type="email"
              placeholder="Voer je e-mail of gebruikersnaam in"
              value={values.email}
              onChange={handleChange}
              className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${fieldErrors.email ? 'border-red-400' : ''}`}
            />
            {fieldErrors.email && <p className="text-red-500 text-sm mt-1">{fieldErrors.email}</p>}
          </div>

          {/* Wachtwoord veld */}
          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Wachtwoord
            </label>
            <input
              id="password"
              ref={passwordRef}
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={values.password}
              onChange={handleChange}
              className={`w-full border rounded-lg px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 ${fieldErrors.password ? 'border-red-400' : ''}`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-gray-500 hover:text-gray-700 focus:outline-none"
              aria-label={showPassword ? "Verberg wachtwoord" : "Toon wachtwoord"}
            >
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
            {fieldErrors.password && <p className="text-red-500 text-sm mt-1">{fieldErrors.password}</p>}
          </div>

          {/* Globale foutmelding */}
          {error && <p className="text-red-500 text-sm" role="alert">{error}</p>}

          {/* Submit knop */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg font-medium hover:opacity-90 transition disabled:opacity-60"
          >
            {loading ? "Even laden..." : "Inloggen →"}
          </button>

          <LegalLinks />

          {/* Scheiding + social login */}
          <div className="flex items-center gap-2">
            <hr className="flex-1 border-gray-300" />
            <span className="text-gray-500 text-sm">of</span>
            <hr className="flex-1 border-gray-300" />
          </div>

          {/* ✅ Enige functionele aanpassing:
              SocialButtons kliks -> ga direct naar /dashboard */}
          <SocialButtons handleSocialLogin={() => navigate("")} />

          <p className="text-center text-sm text-gray-600 mt-4">
            Nog geen account?{" "}
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="text-blue-600 font-medium hover:underline"
            >
              Registreren
            </button>
          </p>
        </form>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500 py-4 border-t">
          Problemen met inloggen?{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Neem contact op
          </a>
        </div>
      </div>
    </div>
  );
}
