import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
// import AzureADProvider from "next-auth/providers/azure-ad";
// import AppleProvider from "next-auth/providers/apple";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  pages: {
    signIn: "/",
    error: "/",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    // AzureADProvider({...}) // zodra je keys hebt
    // AppleProvider({...})   // zodra je keys hebt
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Only redirect to dashboard if url is the signin page with callback
      if (url.includes("/api/auth/signin")) {
        return baseUrl + "/dashboard";
      }
      // Allow callback urls on the same origin
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
    async jwt({ token, account, profile, user }) {
      if (account) {
        token.provider = account.provider;
        token.providerId = account.providerAccountId;
      }
      if (profile) {
        token.name = (profile as any).name ?? token.name;
        token.email = (profile as any).email ?? token.email;
        token.picture = (profile as any).picture ?? token.picture;
      }
      if (user) {
        token.name = user.name ?? token.name;
        token.email = user.email ?? token.email;
      }
      // custom claims (tenant/rol) – voorbeeld
      const domain = (token.email?.split("@")[1] ?? "").toLowerCase();
      token.tenantId = domain === "vangarde.nl" ? "vangarde-nl-1" : "public";
      token.role = domain === "vangarde.nl" ? "architect" : "user";
      return token;
    },
    async session({ session, token }) {
      if (!session.user) session.user = {} as any;
      session.user.name = token.name as string | undefined;
      session.user.email = token.email as string | undefined;
      (session.user as any).image = token.picture as string | undefined;
      (session as any).provider = token.provider;
      (session as any).providerId = token.providerId;
      (session as any).tenantId = token.tenantId;
      (session as any).role = token.role;
      return session;
    },
  },
};

export default NextAuth(authOptions);