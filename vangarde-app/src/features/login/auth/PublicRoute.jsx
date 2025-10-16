"use client";
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./useAuth";

/**
 * PublicRoute:
 * Only accessible when not logged in. If logged in, redirect to /dashboard
 */
export default function PublicRoute({ children }) {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
