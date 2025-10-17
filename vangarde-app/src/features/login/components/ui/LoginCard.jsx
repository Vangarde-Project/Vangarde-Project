"use client";
import React, { useState, useEffect, useRef } from "react";
import useForm from "../../hooks/useForm";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";

export default function LoginCard() {
  const navigate = useNavigate();
  const { login, isLoggedIn } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  // Gebruik de useForm hook voor velden en validatie state
  const { values, errors: fieldErrors, handleChange, setErrors } = useForm({ email: "", password: "" });

  // Als gebruiker ingelogd is: doorsturen naar dashboard
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, [isLoggedIn, navigate]);

  // Formulier submit handler
  // - controleer of verplichte velden zijn ingevuld
  // - toon en focus het eerste foutveld
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
      return;
    }

    setLoading(true);
    const result = await login(values.email, values.password);
    setLoading(false);

    if (result.ok) {
      navigate("/dashboard");
    } else {
      setError(result.error || "Ongeldige e-mail of wachtwoord.");
    }
  };

  // Placeholder voor social login acties
  const handleSocialLogin = (provider) => {
    console.log(`${provider} login clicked`);
  };

  const socialButton =
    "w-full flex items-center justify-start gap-3 border border-gray-300 text-gray-800 py-2.5 px-4 rounded-md hover:bg-gray-300 transition";

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white w-[420px] md:w-[520px] rounded-2xl shadow-lg overflow-hidden">
        {/* Bovenste balk met titel */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-6">
          <h2 className="text-2xl font-bold">Secure Access</h2>
          <p className="text-sm opacity-90">Enterprise-grade authentication</p>
        </div>

        {/* Formulier */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5" aria-labelledby="login-heading">
          <h3 id="login-heading" className="sr-only">Login formulier</h3>

          {/* E-mail veld */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">E-mail of gebruikersnaam</label>
            <input
              id="email"
              ref={emailRef}
              name="email"
              type="email"
              placeholder="Voer je e-mail of gebruikersnaam in"
              value={values.email}
              onChange={handleChange}
              aria-invalid={fieldErrors.email ? "true" : "false"}
              aria-describedby={fieldErrors.email ? "email-error" : undefined}
              aria-required="true"
              className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${fieldErrors.email ? 'border-red-400' : ''}`}
            />
            {fieldErrors.email && <p id="email-error" className="text-red-500 text-sm mt-1" role="alert">{fieldErrors.email}</p>}
          </div>

          {/* Wachtwoord met toggles */}
          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Wachtwoord</label>
            <input
              id="password"
              ref={passwordRef}
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={values.password}
              onChange={handleChange}
              aria-invalid={fieldErrors.password ? "true" : "false"}
              aria-describedby={fieldErrors.password ? "password-error" : undefined}
              aria-required="true"
              className={`w-full border rounded-lg px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 ${fieldErrors.password ? 'border-red-400' : ''}`}
            />
            {fieldErrors.password && <p id="password-error" className="text-red-500 text-sm mt-1" role="alert">{fieldErrors.password}</p>}

            {/* Knop om wachtwoord te tonen/verbergen (tekst i.p.v. icoon) */}
            <button type="button" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? "Verberg wachtwoord" : "Toon wachtwoord"} className="absolute right-3 top-9 text-gray-500 hover:text-gray-700 focus:outline-none">
              {showPassword ? 'Verberg' : 'Toon'}
            </button>
          </div>

          {/* Globale foutmelding */}
          {error && <p className="text-red-500 text-sm" role="alert" aria-live="assertive">{error}</p>}

          {/* Submit knop */}
          <button type="submit" disabled={loading} aria-busy={loading} aria-label={loading ? "Aan het inloggen..." : "Inloggen"} className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg font-medium hover:opacity-90 transition disabled:opacity-60">
            {loading ? "Even laden..." : "Inloggen →"}
          </button>

          {/* Scheidingslijn */}
          <div className="flex items-center gap-2">
            <hr className="flex-1 border-gray-300" />
            <span className="text-gray-500 text-sm">of</span>
            <hr className="flex-1 border-gray-300" />
          </div>

          {/* Social buttons met logo's (plaats afbeeldingen in public/assets/) */}
          <div className="space-y-3">
            <button type="button" onClick={() => handleSocialLogin("Google")} className={socialButton} aria-label="Aanmelden met Google">
              <img src="/assets/google.png" alt="" className="w-5 h-5 object-contain" />
              <span className="ml-3">Aanmelden met Google</span>
            </button>

            <button type="button" onClick={() => handleSocialLogin("Microsoft")} className={socialButton} aria-label="Aanmelden met Microsoft">
              <img src="/assets/microsoft.png" alt="" className="w-5 h-5 object-contain" />
              <span className="ml-3">Aanmelden met Microsoft</span>
            </button>

            <button type="button" onClick={() => handleSocialLogin("Apple")} className={socialButton} aria-label="Aanmelden met Apple">
              <img src="/assets/apple.png" alt="" className="w-5 h-5 object-contain" />
              <span className="ml-3">Aanmelden met Apple</span>
            </button>

            <button type="button" onClick={() => handleSocialLogin("Phone")} className={socialButton} aria-label="Aanmelden met telefoonnummer">
              <img src="/assets/call.png" alt="" className="w-5 h-5 object-contain" />
              <span className="ml-3">Aanmelden met telefoonnummer</span>
            </button>
          </div>

          {/* Link naar registratie */}
          <p className="text-center text-sm text-gray-600 mt-4">Nog geen account? <button type="button" onClick={() => navigate("/signup")} className="text-blue-600 font-medium hover:underline">Registreren</button></p>
        </form>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500 py-4 border-t">Problemen met inloggen? <a href="#" className="text-blue-600 hover:underline">Neem contact op</a></div>
      </div>
    </div>
  );
}
