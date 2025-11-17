import Link from "next/link";

export default function LegalLinks() {
  return (
    <div className="flex justify-center items-center space-x-2 text-sm text-gray-600 mt-1">
      <Link href="/privacy-policy" className="underline hover:text-black transition-colors">
        Privacybeleid
      </Link>
      <span className="text-gray-400">|</span>
      <Link href="/terms-of-service" className="underline hover:text-black transition-colors">
        Gebruiksvoorwaarden
      </Link>
    </div>
  );
}

