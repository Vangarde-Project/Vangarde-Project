import React from "react";
import { signIn } from "next-auth/react";

export default function SocialButtons({  handleSocialLogin }) {
  const socialButtons =
    "w-full flex items-center justify-start gap-3 border border-gray-300 text-gray-800 py-2.5 px-4 rounded-md hover:bg-gray-300 transition";

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={() => signIn("google", { callbackUrl: "http://localhost:3000/dashboard" })}
        className={socialButtons}
      >
        <img src="/assets/google.png" alt="Google logo" className="w-5 h-5" />
        <span className="text-sm font-medium translate-x-3">
          Sign in with Google
        </span>
      </button>

      <button
        type="button"
        onClick={() => handleSocialLogin("Microsoft")}
        className={socialButtons}
      >
        <img src="/assets/microsoft.png" alt="Microsoft logo" className="w-5 h-5" />
        <span className="text-sm font-medium translate-x-3">
          Sign in with Microsoft
        </span>
      </button>

      <button
        type="button"
        onClick={() => handleSocialLogin("Apple")}
        className={socialButtons}
      >
        <img src="/assets/apple.png" alt="Apple logo" className="w-5 h-5" />
        <span className="text-sm font-medium translate-x-3">
          Sign in with Apple
        </span>
      </button>

      <button
        type="button"
        onClick={() => handleSocialLogin("Phone")}
        className={socialButtons}
      >
        <img src="/assets/call.png" alt="Phone icon" className="w-5 h-5" />
        <span className="text-sm font-medium translate-x-3">
          Sign in with phone number
        </span>
      </button>
    </div>
  );
}
