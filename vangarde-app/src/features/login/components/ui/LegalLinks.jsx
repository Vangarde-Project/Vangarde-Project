import { Link } from "react-router-dom";

export default function LegalLinks() {
  return (
    <div className="flex justify-center items-center space-x-2 text-sm text-gray-600 mt-1">
      <Link
        to="/privacy-policy"
        target="_blank"
        rel="noopener noreferrer"
        className="underline hover:text-black transition-colors"
      >
        Privacybeleid
      </Link>
      <span className="text-gray-400">|</span>
      <Link
        to="/terms-of-service"
        target="_blank"
        rel="noopener noreferrer"
        className="underline hover:text-black transition-colors"
      >
        Gebruiksvoorwaarden
      </Link>
    </div>
  );
}

