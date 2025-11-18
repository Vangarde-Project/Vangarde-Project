"use client";
import React from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useAuth } from "./useAuth";

export default function ProtectedRoute({ children }) {
  const { isLoggedIn: localLoggedIn } = useAuth();
  const { data: session, status } = useSession();

  // Allow if either local auth OR NextAuth session exists
  const isAuthenticated = localLoggedIn || session;
  const isLoading = status === "loading";

  const router = useRouter();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    if (typeof window !== "undefined") {
      router.replace("/");
    }
    return null;
  }

  return children;
}
