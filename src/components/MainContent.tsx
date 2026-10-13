"use client";

// [ADDED] Unified page content wrapper providing consistent offset for fixed royal navbar on non-home pages
import React from "react";
import { usePathname } from "next/navigation";

export default function MainContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <main className={`flex-grow ${isHome ? "" : "pt-16 sm:pt-20"}`}>
      {children}
    </main>
  );
}
