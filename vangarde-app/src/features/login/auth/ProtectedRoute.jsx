"use client";
import React from "react";
import { Navigate } from "react-router-dom";
import { useSession } from "next-auth/react";
import { useAuth } from "./useAuth";

export default function ProtectedRoute({ children }) {
  const { isLoggedIn: localLoggedIn } = useAuth();
  const { data: session, status } = useSession();

  // Allow if either local auth OR NextAuth session exists
  const isAuthenticated = localLoggedIn || session;
  const isLoading = status === "loading";

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}
