"use client";
import React, { useState, useRef, useEffect } from "react";
import useForm from "../hooks/useForm";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";

export default function Signup() {
  console.log("Signup rendered");
  const navigate = useNavigate();

  // Formulier state via useForm hook
  const { values: form, handleChange, setValues, errors: fieldErrors, setErrors } = useForm({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // Auth functions uit de provider
  const { register } = useAuth();

  // Refs om focus te zetten bij validatie fouten
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmRef = useRef(null);
  const successBtnRef = useRef(null);

  // Als registratie succesvol is: verplaats focus naar knop in overlay
  useEffect(() => {
    if (success) {
      successBtnRef.current?.focus();
    }
  }, [success]);

  // Submit handler
  // - valideer velden
  // - toon eerste fout en zet focus
  // - roep register() aan uit useAuth
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setErrors({});

    const errors = {};
    if (!form.firstName) errors.firstName = "Vul je voornaam in.";
    if (!form.lastName) errors.lastName = "Vul je achternaam in.";
    if (!form.email) errors.email = "Vul je e-mail in.";
    if (!form.password) errors.password = "Vul je wachtwoord in.";
    if (!form.confirmPassword) errors.confirmPassword = "Bevestig je wachtwoord.";

    if (form.password && form.confirmPassword && form.password !== form.confirmPassword) {
      errors.confirmPassword = "Wachtwoorden komen niet overeen.";
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      // Focus het eerste foutveld in een vaste volgorde
      const order = ['firstName','lastName','email','password','confirmPassword'];
      for (const key of order) {
        if (errors[key]) {
          const refMap = { firstName: firstNameRef, lastName: lastNameRef, email: emailRef, password: passwordRef, confirmPassword: confirmRef };
          refMap[key].current?.focus();
          break;
        }
      }
      return;
    }

    // Call register uit de auth provider (mock)
    setLoading(true);
    const result = await register({
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      password: form.password,
    });
    setLoading(false);

    if (result.ok) {
      setSuccess(true);
      // korte vertraging en dan naar login
      setTimeout(() => navigate("/login"), 1200);
    } else {
      setError(result.error || "Registratie mislukt.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white w-[420px] md:w-[520px] rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-6">
          <h2 className="text-2xl font-bold">Create Account</h2>
          <p className="text-sm opacity-90">Join Vangarde Intelligence</p>
        </div>

        {/* Formulier */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Voornaam */}
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">Voornaam</label>
            <input id="firstName" name="firstName" ref={firstNameRef} type="text" value={form.firstName} onChange={handleChange} aria-invalid={fieldErrors.firstName ? 'true' : 'false'} aria-describedby={fieldErrors.firstName ? 'firstName-error' : undefined} aria-required="true" className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${fieldErrors.firstName ? 'border-red-400' : ''}`} />
            {fieldErrors.firstName && <p id="firstName-error" className="text-red-500 text-sm mt-1">{fieldErrors.firstName}</p>}
          </div>

          {/* Achternaam */}
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Achternaam</label>
            <input id="lastName" name="lastName" ref={lastNameRef} type="text" value={form.lastName} onChange={handleChange} aria-invalid={fieldErrors.lastName ? 'true' : 'false'} aria-describedby={fieldErrors.lastName ? 'lastName-error' : undefined} aria-required="true" className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${fieldErrors.lastName ? 'border-red-400' : ''}`} />
            {fieldErrors.lastName && <p id="lastName-error" className="text-red-500 text-sm mt-1">{fieldErrors.lastName}</p>}
          </div>

          {/* E-mail */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">E-mailadres</label>
            <input id="email" name="email" ref={emailRef} type="email" value={form.email} onChange={handleChange} aria-invalid={fieldErrors.email ? 'true' : 'false'} aria-describedby={fieldErrors.email ? 'email-error' : undefined} aria-required="true" className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${fieldErrors.email ? 'border-red-400' : ''}`} />
            {fieldErrors.email && <p id="email-error" className="text-red-500 text-sm mt-1">{fieldErrors.email}</p>}
          </div>

          {/* Wachtwoord */}
          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Wachtwoord</label>
            <input id="password" name="password" ref={passwordRef} type={showPassword ? "text" : "password"} value={form.password} onChange={handleChange} aria-invalid={fieldErrors.password ? 'true' : 'false'} aria-describedby={fieldErrors.password ? 'password-error' : undefined} aria-required="true" className={`w-full border rounded-lg px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 ${fieldErrors.password ? 'border-red-400' : ''}`} />
            {fieldErrors.password && <p id="password-error" className="text-red-500 text-sm mt-1">{fieldErrors.password}</p>}
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-9 text-gray-500 hover:text-gray-700">{showPassword ? 'Verberg' : 'Toon'}</button>
          </div>

          {/* Bevestig wachtwoord */}
          <div className="relative">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Bevestig wachtwoord</label>
            <input id="confirmPassword" name="confirmPassword" ref={confirmRef} type={showConfirm ? "text" : "password"} value={form.confirmPassword} onChange={handleChange} aria-invalid={fieldErrors.confirmPassword ? 'true' : 'false'} aria-describedby={fieldErrors.confirmPassword ? 'confirmPassword-error' : undefined} aria-required="true" className={`w-full border rounded-lg px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 ${fieldErrors.confirmPassword ? 'border-red-400' : ''}`} />
            {fieldErrors.confirmPassword && <p id="confirmPassword-error" className="text-red-500 text-sm mt-1">{fieldErrors.confirmPassword}</p>}
            <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-9 text-gray-500 hover:text-gray-700">{showConfirm ? 'Verberg' : 'Toon'}</button>
          </div>

          {/* Globale foutmelding */}
          {error && <p className="text-red-500 text-sm" role="alert">{error}</p>}

          {/* Succes overlay (mock) */}
          {success && (
            <div aria-live="polite" className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
              <div role="dialog" aria-modal="true" aria-labelledby="signup-success-title" className="bg-white rounded-xl p-6 w-[320px] md:w-[420px] text-center shadow-lg">
                <div className="mx-auto text-green-600 text-4xl">✓</div>
                <h3 id="signup-success-title" className="mt-4 text-lg font-semibold">Account aangemaakt!</h3>
                <p className="mt-2 text-sm text-gray-600">Je account is succesvol aangemaakt. Je wordt binnen enkele seconden doorgestuurd naar de loginpagina.</p>
                <div className="mt-4">
                  <button ref={successBtnRef} type="button" onClick={() => navigate("/login")} className="bg-green-600 text-white px-4 py-2 rounded-md">Ga naar login</button>
                </div>
              </div>
            </div>
          )}

          {/* Submit knop */}
          <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg font-medium hover:opacity-90 transition disabled:opacity-60">{loading ? "Even aanmaken..." : "Account aanmaken →"}</button>

          {/* Terug naar login */}
          <p className="text-center text-sm text-gray-600 mt-4">Heb je al een account? <button type="button" onClick={() => navigate("/login")} className="text-blue-600 font-medium hover:underline">Inloggen</button></p>
        </form>
      </div>
    </div>
  );
}
