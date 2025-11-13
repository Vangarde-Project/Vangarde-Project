import { signIn } from "next-auth/react";
import SocialButtons from "../../src/features/login/auth/SocialButtons"; // <— pad naar jouw component

const providerIdMap: Record<string, string> = {
  Google: "google",
  Microsoft: "azure-ad",
  Apple: "apple",
};

export default function SignInPage() {
  const handleSocialLogin = (label: string) => {
    const provider = providerIdMap[label];
    if (!provider) {
      console.warn("Onbekende provider:", label);
      return;
    }
    // redirect na login
    signIn(provider, { callbackUrl: "/dashboard" });
  };

  return (
    <main style={{ display: "grid", placeItems: "center", minHeight: "70vh" }}>
      <div style={{ width: 360 }}>
        <h1 style={{ marginBottom: 16 }}>Inloggen</h1>
        <SocialButtons handleSocialLogin={handleSocialLogin} />
      </div>
    </main>
  );
}
