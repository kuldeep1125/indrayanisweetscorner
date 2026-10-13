"use client";

// [ADDED] Crisp, accessible SVG icons for Instagram, Facebook, Zomato, Swiggy, and Justdial brand channels
// Eliminates external dependency issues while guaranteeing crisp rendering on any screen.
import React from "react";

export function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export function FacebookIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export function ZomatoIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.8 14.8h-7.6v-2l4.8-5.6H8.2V7.2h7.6v2l-4.8 5.6h4.8v2z" />
    </svg>
  );
}

export function SwiggyIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2C7.58 2 4 5.58 4 10c0 4.14 3.09 7.57 7.1 7.95v-4.1h-1.6v-2.1h1.6V9.8c0-1.6 1-2.5 2.4-2.5.7 0 1.4.1 1.4.1v1.6h-.8c-.8 0-1 .5-1 1v1.8h2.1l-.3 2.1h-1.8v4.15C16.91 17.57 20 14.14 20 10c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

export function JustdialIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 14.5a1.5 1.5 0 1 1-1.5-1.5 1.5 1.5 0 0 1 1.5 1.5zm1.5-5.3c-.6.6-.9.9-.9 1.8h-2.2c0-1.4.6-2.2 1.4-2.8l1.1-.9c.4-.3.7-.7.7-1.3a1.6 1.6 0 0 0-3.2 0H7.5a3.8 3.8 0 1 1 7.6 0c0 1.2-.6 2.3-1.6 3.2z" />
    </svg>
  );
}
