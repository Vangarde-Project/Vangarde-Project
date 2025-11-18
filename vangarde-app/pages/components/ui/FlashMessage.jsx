"use client";
import React from "react";
import { useAuth } from "../../auth/useAuth";

export default function FlashMessage() {
  const { flash } = useAuth();

  if (!flash) return null; 

  const color =
    flash.type === "success"
      ? "bg-green-100 text-green-800 border-green-300"
      : "bg-blue-100 text-blue-800 border-blue-300";

  return (
    <div
      className={`fixed top-5 left-1/2 -translate-x-1/2 border px-4 py-2 rounded-xl shadow-lg text-sm font-medium transition-all ${color}`}
      role="alert"
    >
      {flash.text}
    </div>
  );
}
