"use client";
import React, { useState, useRef, useEffect } from "react";
import useForm from "../hooks/useForm";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";
import { getKvKData } from "../services/authService";

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
const PdfIcon = ({ className = "w-5 h-5 text-green-600" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M6 2h7l5 5v15a1 1 0 01-1 1H6a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M13 2v6h5" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

export default function Signup() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const { values: form, handleChange, setValues, errors: fieldErrors, setErrors } = useForm({
    firstName: "",
    lastName: "",
    email: "",
    functieTitel: "",
    kvkNummer: "",
    bedrijfsnaam: "",
    adres: "",
    sector: "",
    password: "",
    confirmPassword: "",
  });

  const [functieProfielFile, setFunctieProfielFile] = useState(null);
  const [cvFile, setCvFile] = useState(null);
  const [functieError, setFunctieError] = useState("");
  const [cvError, setCvError] = useState("");
  const [uploadProgress, setUploadProgress] = useState({ functie: 0, cv: 0 });
  const [uploadStatus, setUploadStatus] = useState({ functie: null, cv: null });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const [kvkLoading, setKvkLoading] = useState(false);

  const successBtnRef = useRef(null);
  const kvkLookupTimer = useRef(null);

  useEffect(() => {
    if (success) successBtnRef.current?.focus();
  }, [success]);

  // Improved KvK lookup: tolerant parsing for many response shapes
  const handleKvKLookup = (e) => {
    const raw = String(e.target.value || "");
    // update the kvk input in form immediately
    handleChange(e);

    if (kvkLookupTimer.current) {
      clearTimeout(kvkLookupTimer.current);
      kvkLookupTimer.current = null;
    }

    const digits = raw.replace(/\D/g, "");
    // clear auto fields until valid number length
    if (digits.length < 8) {
      setValues((prev) => ({ ...prev, bedrijfsnaam: "", adres: "", sector: "" }));
      return;
    }

    // debounce
    kvkLookupTimer.current = setTimeout(async () => {
      setError("");
      setKvkLoading(true);
      try {
        const info = await getKvKData(digits);
        // defensive check: allow various shapes
        // possible keys: handelsnaam / bedrijfsnaam, straat/huisnummer/postcode/plaats, sbiOmschrijving, adres (string)
        if (!info || (Object.keys(info).length === 0)) {
          setValues((prev) => ({ ...prev, bedrijfsnaam: "", adres: "", sector: "" }));
          setError("Geen gegevens gevonden voor dit KvK-nummer.");
          setKvkLoading(false);
          return;
        }

        // extract company name
        const handelsnaam = info.handelsnaam || info.bedrijfsnaam || info.naam || info.name || "";

        // build address string robustly
        let adres = "";
        if (info.adres && typeof info.adres === "string") {
          adres = info.adres;
        } else {
          const straat = info.straat || info.straatNaam || info.street || "";
          const huisnummer =
            info.huisnummer ||
            info.huisnummerToev ||
            info.huisnr ||
            (info.huisnummer && info.huisnummer.toString()) ||
            "";
          const toevoeging = info.huisnummerToevoeging || info.hnrToevoeging || "";
          const postcode = info.postcode || info.postcodeFormat || info.zip || "";
          const plaats = info.plaats || info.woonplaats || info.city || "";
          const parts = [straat, huisnummer + (toevoeging ? " " + toevoeging : ""), postcode, plaats].filter(Boolean);
          adres = parts.join(", ");
        }

        // sector description
        const sector = info.sbiOmschrijving || info.sbi?.[0]?.omschrijving || info.sector || info.primaryActivity || "";

        // ensure kvkNummer normalized
        const kvkNum = info.kvkNummer || info.kvknummer || info.kvk || digits;

        // set into form
        setValues((prev) => ({
          ...prev,
          kvkNummer: kvkNum,
          bedrijfsnaam: handelsnaam || prev.bedrijfsnaam || "",
          adres: adres || prev.adres || "",
          sector: sector || prev.sector || "",
        }));
      } catch (err) {
        console.error("KvK lookup error:", err);
        setError("Fout bij ophalen KvK-gegevens (controleer server-configuratie).");
      } finally {
        setKvkLoading(false);
      }
    }, 450);
  };

  const handleFileValidation = (file, setter, errorSetter, label, fieldKey) => {
    errorSetter("");
    if (!file) return null;
    const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
    if (!isPdf) {
      errorSetter(`${label} moet een PDF-bestand zijn (.pdf).`);
      setter(null);
      setUploadStatus((prev) => ({ ...prev, [fieldKey]: "error" }));
      return null;
    }
    if (file.size > 10 * 1024 * 1024) {
      errorSetter(`${label} mag maximaal 10 MB zijn.`);
      setter(null);
      setUploadStatus((prev) => ({ ...prev, [fieldKey]: "error" }));
      return null;
    }
    setter(file);
    setUploadStatus((prev) => ({ ...prev, [fieldKey]: "uploading" }));
    setUploadProgress((prev) => ({ ...prev, [fieldKey]: 0 }));

    const simulate = setInterval(() => {
      setUploadProgress((prev) => {
        const next = Math.min(prev[fieldKey] + 25, 100);
        if (next === 100) {
          clearInterval(simulate);
          setUploadStatus((s) => ({ ...s, [fieldKey]: "success" }));
        }
        return { ...prev, [fieldKey]: next };
      });
    }, 300);
  };

  const handleFunctieChange = (e) =>
    handleFileValidation(e.target.files[0], setFunctieProfielFile, setFunctieError, "Functieprofiel", "functie");
  const handleCvChange = (e) =>
    handleFileValidation(e.target.files[0], setCvFile, setCvError, "CV", "cv");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setErrors({});
    setFunctieError("");
    setCvError("");

    const errors = {};
    if (!form.firstName || form.firstName.trim().length < 3) errors.firstName = "Voornaam moet minimaal 3 karakters bevatten.";
    if (!form.lastName || form.lastName.trim().length < 3) errors.lastName = "Achternaam moet minimaal 3 karakters bevatten.";
    if (!form.email) errors.email = "Vul je e-mailadres in.";
    if (!form.kvkNummer || form.kvkNummer.trim().length < 8) errors.kvkNummer = "Vul een geldig KvK-nummer in.";
    if (!form.functieTitel || form.functieTitel.trim().length < 3) errors.functieTitel = "Functietitel moet minimaal 3 karakters bevatten.";
    if (!form.password) errors.password = "Vul je wachtwoord in.";
    if (!form.confirmPassword) errors.confirmPassword = "Bevestig je wachtwoord.";
    if (form.password !== form.confirmPassword) errors.confirmPassword = "Wachtwoorden komen niet overeen.";

    if (!functieProfielFile) setFunctieError("Upload je functieprofiel (PDF, max 10 MB).");
    if (!cvFile) setCvError("Upload je CV (PDF, max 10 MB).");

    if (Object.keys(errors).length > 0 || functieError || cvError || !functieProfielFile || !cvFile) {
      setErrors(errors);
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([k, v]) => formData.append(k, v));
      if (functieProfielFile) formData.append("functieProfiel", functieProfielFile);
      if (cvFile) formData.append("cv", cvFile);

      const result = await register(formData);
      if (result.ok) {
        setSuccess(true);
        setTimeout(() => navigate("/login"), 1500);
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
    "w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-2 rounded-lg font-medium shadow-md transition-all duration-300 hover:from-indigo-600 hover:to-purple-600";

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-center py-6 shadow-inner">
          <h2 className="text-2xl font-bold tracking-tight">Create Account</h2>
          <p className="text-sm opacity-90">Join Vangarde Intelligence</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <Input label="Voornaam" name="firstName" value={form.firstName} onChange={handleChange} error={fieldErrors.firstName} />
          <Input label="Achternaam" name="lastName" value={form.lastName} onChange={handleChange} error={fieldErrors.lastName} />
          <Input label="E-mailadres" name="email" type="email" value={form.email} onChange={handleChange} error={fieldErrors.email} />
          <Input label="Officiële functietitel" name="functieTitel" value={form.functieTitel} onChange={handleChange} error={fieldErrors.functieTitel} />
          <Input label="Bedrijfsnaam" name="bedrijfsnaam" value={form.bedrijfsnaam} onChange={handleChange} error={fieldErrors.bedrijfsnaam} />

          <div className="mt-4 border-t border-gray-200 pt-6">
            <h3 className="text-base font-semibold text-gray-800">Bedrijfsinformatie</h3>
            <p className="text-sm text-gray-500 mb-4">Vul je KvK-nummer in. Bedrijfsnaam, adres en sector worden automatisch opgehaald.</p>

            <div>
              <label htmlFor="kvkNummer" className="block text-sm font-medium text-gray-700 mb-1">KvK-nummer</label>
              <input id="kvkNummer" name="kvkNummer" value={form.kvkNummer} onChange={handleKvKLookup} className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500" />
              {kvkLoading && <p className="text-sm text-gray-500 mt-1">Ophalen KvK-gegevens…</p>}
              {fieldErrors.kvkNummer && <p className="text-red-500 text-sm mt-1">{fieldErrors.kvkNummer}</p>}
            </div>

            <Input label="Bedrijfsnaam (auto)" name="bedrijfsnaam_auto" value={form.bedrijfsnaam} readOnly />
            <Input label="Adres" name="adres" value={form.adres} readOnly />
            <Input label="Sector" name="sector" value={form.sector} readOnly />
          </div>

          <div className="mt-6 border-t border-gray-200 pt-6">
            <h3 className="text-base font-semibold text-gray-800">Documenten toevoegen</h3>
            <p className="text-sm text-gray-500 mb-4">Voeg je officiële functieprofiel en je actuele CV toe in PDF-formaat (max. 10 MB).</p>

            <FileUpload
              label="Functieprofiel (PDF)"
              file={functieProfielFile}
              onChange={handleFunctieChange}
              onRemove={() => {
                setFunctieProfielFile(null);
                setUploadStatus((p) => ({ ...p, functie: null }));
                setFunctieError("");
              }}
              error={functieError}
              progress={uploadProgress.functie}
              status={uploadStatus.functie}
              defaultText="Kies Functieprofiel"
              buttonClass={submitBtnClass}
            />

            <FileUpload
              label="CV (PDF)"
              file={cvFile}
              onChange={handleCvChange}
              onRemove={() => {
                setCvFile(null);
                setUploadStatus((p) => ({ ...p, cv: null }));
                setCvError("");
              }}
              error={cvError}
              progress={uploadProgress.cv}
              status={uploadStatus.cv}
              defaultText="Kies CV"
              buttonClass={submitBtnClass}
            />
          </div>

          <PasswordInput label="Wachtwoord" name="password" value={form.password} show={showPassword} toggle={() => setShowPassword(!showPassword)} onChange={handleChange} />
          <PasswordInput label="Bevestig wachtwoord" name="confirmPassword" value={form.confirmPassword} show={showConfirm} toggle={() => setShowConfirm(!showConfirm)} onChange={handleChange} />

          {error && <p className="text-red-500 text-sm" role="alert">{error}</p>}

          {success && (
            <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
              <div className="bg-white rounded-xl p-6 w-[320px] md:w-[420px] text-center shadow-lg">
                <div className="mx-auto text-green-600 text-4xl">✓</div>
                <h3 className="mt-4 text-lg font-semibold">Account aangemaakt!</h3>
                <p className="mt-2 text-sm text-gray-600">Je account is succesvol aangemaakt. Je wordt doorgestuurd naar de loginpagina.</p>
                <div className="mt-4">
                  <button ref={successBtnRef} type="button" onClick={() => navigate("/login")} className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-md hover:from-indigo-600 hover:to-purple-600 transition-all duration-300">Ga naar login</button>
                </div>
              </div>
            </div>
          )}

          <button type="submit" className={`${submitBtnClass} ${loading ? "opacity-70 cursor-wait" : ""}`}>
            {loading ? "Even aanmaken..." : "Account aanmaken →"}
          </button>

          <p className="text-center text-sm text-gray-600 mt-4">Heb je al een account? <button type="button" onClick={() => navigate("/login")} className="text-indigo-600 font-medium hover:underline">Inloggen</button></p>
        </form>
      </div>
    </div>
  );
}

// Subcomponents
function Input({ label, name, type = "text", value, onChange, error, readOnly }) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input id={name} name={name} type={type} value={value} onChange={onChange} readOnly={readOnly} className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 ${error ? "border-red-400" : ""} ${readOnly ? "bg-gray-100 cursor-not-allowed" : ""}`} />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}

function PasswordInput({ label, name, value, show, toggle, onChange }) {
  return (
    <div className="relative">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input id={name} name={name} type={show ? "text" : "password"} value={value} onChange={onChange} className="w-full border rounded-lg px-3 py-2 pr-10 focus:ring-2 focus:ring-indigo-500" />
      <button type="button" onClick={toggle} className="absolute right-3 top-9 text-gray-500 hover:text-gray-700">{show ? <EyeOffIcon /> : <EyeIcon />}</button>
    </div>
  );
}

function FileUpload({ label, file, onChange, onRemove, error, progress, status, defaultText = "Kies bestand", buttonClass = "" }) {
  const inputRef = useRef(null);

  return (
    <div className="mb-4 bg-gray-50 rounded-lg p-4 shadow-sm">
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>

      <div className="flex flex-col gap-2">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className={buttonClass || "w-full px-3 py-2 bg-white border rounded-md shadow-sm hover:bg-gray-50 text-sm"}
        >
          {defaultText}
        </button>

        <div className="flex items-center justify-between text-sm text-gray-600">
          <div>
            {status === "uploading" && "Uploaden..."}
            {status === "success" && file?.name}
            {status === "error" && "Fout bestand"}
            {!status && file ? file.name : ""}
          </div>

          <div className="flex items-center gap-2">
            {status === "success" && (
              <button
                type="button"
                onClick={() => onRemove && onRemove()}
                className="text-xs text-red-500 hover:underline"
              >
                Verwijder
              </button>
            )}
          </div>
        </div>

        <input ref={inputRef} type="file" accept=".pdf,application/pdf" onChange={onChange} className="hidden" />
      </div>

      <p className="text-gray-500 text-xs mt-2">Alleen PDF-bestanden (max. 10 MB).</p>

      {status === "uploading" && (
        <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
          <div className="bg-indigo-500 h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
        </div>
      )}

      {status === "error" && <p className="text-red-500 text-sm mt-1">❌ Upload mislukt of ongeldig bestand.</p>}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}