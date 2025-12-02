// src/components/ui/card.jsx
import React from "react";

/**
 * Simple, Tailwind-friendly Card primitive used across the app.
 * - Keep it tiny so it can't break builds.
 * - Accepts `className` to allow the colorful styles used in the pages.
 */

export function Card({ children, className = "", ...props }) {
  return (
    <div
      {...props}
      className={`rounded-3xl bg-white/90 border border-gray-200 shadow-lg p-6 ${className}`}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = "" }) {
  return <div className={`mb-4 ${className}`}>{children}</div>;
}

export function CardTitle({ children, className = "" }) {
  return <h3 className={`text-xl font-bold ${className}`}>{children}</h3>;
}

export function CardContent({ children, className = "" }) {
  return <div className={className}>{children}</div>;
}

export default Card;
