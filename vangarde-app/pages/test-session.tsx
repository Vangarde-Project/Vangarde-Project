import { useEffect } from "react";
import { useSession, signOut } from "next-auth/react";

export default function TestSession() {
  const { data: session, status } = useSession();

  useEffect(() => {
    console.log("[CLIENT] status:", status);
    if (session) {
      console.log("[CLIENT] Session:", {
        name: session.user?.name,
        email: session.user?.email,
        image: (session.user as any)?.image,
        provider: (session as any)?.provider,
        providerId: (session as any)?.providerId,
      });
    }
  }, [session, status]);

  if (status === "loading") return <p>Loading…</p>;
  if (!session) return <p>Niet ingelogd. Ga naar <a href="/api/auth/signin">/api/auth/signin</a></p>;

  return (
    <main style={{ padding: 24 }}>
      <h1>Test Session ✅</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <button onClick={() => signOut({ callbackUrl: "/api/auth/signin" })}>Log uit</button>
    </main>
  );
}