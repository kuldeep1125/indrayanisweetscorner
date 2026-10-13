"use client";

// [REFACTORED] Strictly 100vh full-screen vertical slider homepage exactly matching https://www.rasrangsweets.com/index.html
import React from "react";
import RasrangSlider from "@/components/rasrang/RasrangSlider";

export default function HomePage() {
  return (
    <div className="w-full h-screen overflow-hidden">
      <RasrangSlider />
    </div>
  );
}
