"use client";
import React from "react";
import { useRouter } from "next/router";
import { useAuth } from "./useAuth";

/**
 * PublicRoute:
 * Only accessible when not logged in. If logged in, redirect to /dashboard
 */
export default function PublicRoute({ children }) {
  const { isLoggedIn } = useAuth();

  const router = useRouter();
  if (isLoggedIn) {
    if (typeof window !== "undefined") router.replace("/dashboard");
    return null;
  }

  return children;
}
