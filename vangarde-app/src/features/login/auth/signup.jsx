"use client";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LegalLinks from "../components/ui/LegalLinks";

// ✅ correcte paden o.b.v. jouw mapstructuur
import useForm from "../hooks/useForm";
import useDebounce from "../hooks/useDebounce";
import { getCompanyDataByName } from "../services/kvkService";
import { useAuth } from "./useAuth";

// Icons
const EyeIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);
const EyeOffIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M3 3l18 18" stroke="currentColor" strokeWidth="1.5" />
    <path d="M2 12s4-7 10-7a9.77 9.77 0 015.11 1.36" stroke="currentColor" strokeWidth="1.5" />
    <path d="M21.5 16.5A9.77 9.77 0 0112 19c-6 0-10-7-10-7" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

export default function Signup() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const {
    values: form,
    handleChange,
    setValues,
    errors: fieldErrors,
    setErrors,
  } = useForm({
    firstName: "",
    lastName: "",
    email: "",
    functieTitel: "",
    kvkNummer: "",
    bedrijfsnaam: "",
    adres: "",
    website: "",
    sector: "",
    password: "",
    confirmPassword: "",
  });

  const [kvkStatus, setKvkStatus] = useState("idle");
  const [functieProfielFile, setFunctieProfielFile] = useState(null);
  const [cvFile, setCvFile] = useState(null);
  const [functieError, setFunctieError] = useState("");
  const [cvError, setCvError] = useState("");
  const [uploadProgress, setUploadProgress] = useState({ functie: 0, cv: 0 });
  const [uploadStatus, setUploadStatus] = useState({ functie: null, cv: null });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // KvK lookup (optioneel) — velden blijven bewerkbaar
  const [pendingName, setPendingName] = useState("");
  const debouncedName = useDebounce(pendingName, 600);

  useEffect(() => {
    if (!debouncedName || debouncedName.trim().length < 3) {
      setKvkStatus("idle");
      return;
    }

    let cancelled = false;
    (async () => {
      try {
        setError("");
        setKvkStatus("loading");

        const info = await getCompanyDataByName(debouncedName);
        if (!info || Object.keys(info).length === 0) {
          if (!cancelled) setKvkStatus("error");
          return;
        }

        if (cancelled) return;
        setKvkStatus("success");

        // Adres samenstellen
        let adres = "";
        if (info.straat || info.postcode || info.plaats) {
          adres = `${info.straat || ""} ${info.huisnummer || ""}, ${info.postcode || ""} ${info.plaats || ""}`.trim();
        }

        // Website normaliseren
        let website = info.website || "";
        if (website && !/^https?:\/\//i.test(website)) website = `https://${website}`;

        // Voorinvullen (maar bewerkbaar)
        setValues((prev) => ({
          ...prev,
          kvkNummer: info.kvkNummer || prev.kvkNummer,
          adres: adres || prev.adres,
          sector: info.sector || prev.sector,
          website: website || prev.website,
        }));
      } catch (e) {
        console.error("Bedrijfslookup error:", e);
        if (!cancelled) setKvkStatus("error");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [debouncedName, setValues]);

  const handleCompanyLookup = (e) => {
    handleChange(e);
    setPendingName(e.target.value);
  };

  // Bestandcontrole
  const handleFileValidation = (file, setter, errorSetter, label, key) => {
    errorSetter("");
    if (!file) return;
    const isPdf =
      file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
    if (!isPdf) {
      errorSetter(`${label} moet een PDF-bestand zijn.`);
      setter(null);
      setUploadStatus((s) => ({ ...s, [key]: "error" }));
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      errorSetter(`${label} mag maximaal 10 MB zijn.`);
      setter(null);
      setUploadStatus((s) => ({ ...s, [key]: "error" }));
      return;
    }
    setter(file);
    setUploadStatus((s) => ({ ...s, [key]: "uploading" }));
    setUploadProgress((p) => ({ ...p, [key]: 0 }));
    const simulate = setInterval(() => {
      setUploadProgress((p) => {
        const next = Math.min(p[key] + 25, 100);
        if (next === 100) {
          clearInterval(simulate);
          setUploadStatus((s) => ({ ...s, [key]: "success" }));
        }
        return { ...p, [key]: next };
      });
    }, 300);
  };

  const handleFunctieChange = (e) =>
    handleFileValidation(
      e.target.files[0],
      setFunctieProfielFile,
      setFunctieError,
      "Functieprofiel",
      "functie"
    );
  const handleCvChange = (e) =>
    handleFileValidation(e.target.files[0], setCvFile, setCvError, "CV", "cv");

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setErrors({});

    const errors = {};
    if (!form.bedrijfsnaam || form.bedrijfsnaam.trim().length < 2)
      errors.bedrijfsnaam = "Vul een geldige bedrijfsnaam in.";
    if (!form.email) errors.email = "Vul je e-mailadres in.";
    if (!form.password) errors.password = "Vul je wachtwoord in.";
    if (!form.confirmPassword) errors.confirmPassword = "Bevestig je wachtwoord.";
    if (form.password !== form.confirmPassword)
      errors.confirmPassword = "Wachtwoorden komen niet overeen.";

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([k, v]) => formData.append(k, v ?? ""));
      if (functieProfielFile) formData.append("functieProfiel", functieProfielFile);
      if (cvFile) formData.append("cv", cvFile);

      const result = await register(formData);
      if (result.ok) {
        // useAuth.register probeert auto-login; navigeer direct naar dashboard
        navigate("/dashboard");
      } else {
        setError(result.error || "Registratie mislukt.");
      }
    } catch (err) {
      console.error("Register error:", err);
      setError("Er ging iets mis bij het uploaden.");
    } finally {
      setLoading(false);
    }
  };

  const submitBtnClass =
    "w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg font-medium hover:opacity-90 transition disabled:opacity-60";

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white w-[420px] md:w-[520px] rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-6">
          <h2 className="text-2xl font-bold">Create Account</h2>
          <p className="text-sm opacity-90">Join Vangarde Intelligence</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Bedrijfsgegevens */}
          <h3 className="text-base font-semibold text-gray-800">Bedrijfsgegevens</h3>

          <div>
            <Input
              label="Bedrijfsnaam"
              name="bedrijfsnaam"
              value={form.bedrijfsnaam}
              onChange={handleCompanyLookup}
              error={fieldErrors.bedrijfsnaam}
            />

            {kvkStatus === "loading" && (
              <p className="text-sm text-blue-600 mt-1">
                🔄 Bedrijfsgegevens worden opgehaald...
              </p>
            )}
            {kvkStatus === "success" && (
              <p className="text-sm text-green-600 mt-1">
                ✅ Suggesties gevonden (velden zijn bewerkbaar).
              </p>
            )}
            {kvkStatus === "error" && (
              <p className="text-sm text-amber-600 mt-1">
                Geen KvK-gegevens gevonden — vul handmatig in.
              </p>
            )}

            <Input label="KvK-nummer" name="kvkNummer" value={form.kvkNummer} onChange={handleChange} />
            <Input label="Adres" name="adres" value={form.adres} onChange={handleChange} />
            <Input
              label="Bedrijfswebsite (URL)"
              name="website"
              value={form.website}
              onChange={handleChange}
              placeholder="https://www.jouwbedrijf.nl"
            />
            <Input label="Sector" name="sector" value={form.sector} onChange={handleChange} />
          </div>

          {/* Persoonsgegevens */}
          <div>
            <h3 className="text-base font-semibold text-gray-800 mb-3">Persoonsgegevens</h3>
            <Input label="Voornaam" name="firstName" value={form.firstName} onChange={handleChange} error={fieldErrors.firstName} />
            <Input label="Achternaam" name="lastName" value={form.lastName} onChange={handleChange} error={fieldErrors.lastName} />
            <Input label="Officiële functietitel" name="functieTitel" value={form.functieTitel} onChange={handleChange} error={fieldErrors.functieTitel} />
          </div>

          {/* Documenten */}
          <div>
            <h3 className="text-base font-semibold text-gray-800 mb-3">Documenten toevoegen</h3>
            <FileUpload
              label="Upload Functieprofiel"
              file={functieProfielFile}
              onChange={(e)=>handleFileValidation(e.target.files[0], setFunctieProfielFile, setFunctieError, "Functieprofiel", "functie")}
              error={functieError}
              progress={uploadProgress.functie}
              status={uploadStatus.functie}
              defaultText="Upload"
              buttonClass={submitBtnClass}
            />
            <FileUpload
              label="Upload CV"
              file={cvFile}
              onChange={(e)=>handleFileValidation(e.target.files[0], setCvFile, setCvError, "CV", "cv")}
              error={cvError}
              progress={uploadProgress.cv}
              status={uploadStatus.cv}
              defaultText="Upload"
              buttonClass={submitBtnClass}
            />
          </div>

          {/* Inloggegevens */}
          <div>
            <h3 className="text-base font-semibold text-gray-800 mb-3">Inloggegevens</h3>
            <Input label="E-mailadres" name="email" type="email" value={form.email} onChange={handleChange} error={fieldErrors.email} />
            <PasswordInput label="Wachtwoord" name="password" value={form.password} show={showPassword} toggle={() => setShowPassword(!showPassword)} onChange={handleChange} />
            <PasswordInput label="Bevestig wachtwoord" name="confirmPassword" value={form.confirmPassword} show={showConfirm} toggle={() => setShowConfirm(!showConfirm)} onChange={handleChange} />
          </div>

          {error && <p className="text-red-500 text-sm" role="alert">{error}</p>}

          <button
            type="submit"
            className={`${submitBtnClass} ${loading ? "opacity-70 cursor-wait" : ""}`}
            disabled={loading || uploadStatus.functie === "uploading" || uploadStatus.cv === "uploading"}
          >
            {loading ? "Even aanmaken..." : "Account aanmaken →"}
          </button>

          <LegalLinks />

          <p className="text-center text-sm text-gray-600 mt-4">
            Heb je al een account?{" "}
            <button type="button" onClick={() => navigate("/login")} className="text-blue-600 font-medium hover:underline">
              Inloggen
            </button>
          </p>
        </form>

        <div className="text-center text-xs text-gray-500 py-4 border-t">
          Problemen met registreren?{" "}
          <a href="#" className="text-blue-600 hover:underline">Neem contact op</a>
        </div>
      </div>
    </div>
  );
}

// Input component
function Input({ label, name, type = "text", value, onChange, error, readOnly, placeholder }) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        readOnly={readOnly}
        className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 ${error ? "border-red-400" : ""} ${readOnly ? "bg-gray-100 cursor-not-allowed" : ""}`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}

// Password input
function PasswordInput({ label, name, value, show, toggle, onChange }) {
  return (
    <div className="relative">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input id={name} name={name} type={show ? "text" : "password"} value={value} onChange={onChange} className="w-full border rounded-lg px-3 py-2 pr-10 focus:ring-2 focus:ring-blue-500" />
      <button type="button" onClick={toggle} className="absolute right-3 top-9 text-gray-500 hover:text-gray-700">{show ? <EyeOffIcon /> : <EyeIcon />}</button>
    </div>
  );
}

// File upload
function FileUpload({ label, file, onChange, error, progress, status, defaultText, buttonClass }) {
  const inputRef = useRef(null);

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-black mb-2">{label}</label>
      <button type="button" onClick={() => inputRef.current?.click()} className={`${buttonClass} w-full`}>
        {defaultText}
      </button>
      <input ref={inputRef} type="file" accept=".pdf,application/pdf" onChange={onChange} className="hidden" />
      {file && <p className="text-sm text-gray-600 mt-1 truncate">{file.name}</p>}
      {status === "uploading" && (
        <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
          <div className="bg-blue-600 h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
      )}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
