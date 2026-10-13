"use client";

// [ADDED] Top notification banner with live open/closed store status and festival announcements
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useShop } from "@/context/ShopContext";
import { Sparkles, X, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function NotificationBanner() {
  const pathname = usePathname();
  const { storeSettings } = useShop();
  const [isOpenNow, setIsOpenNow] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check local Indian time (IST) to dynamically determine if shop is currently open (7:00 AM to 10:00 PM)
    const checkStoreStatus = () => {
      const now = new Date();
      // Get IST hours
      const istHours = (now.getUTCHours() + 5.5) % 24;
      if (istHours >= 7 && istHours < 22) {
        setIsOpenNow(true);
      } else {
        setIsOpenNow(false);
      }
    };
    checkStoreStatus();
    const interval = setInterval(checkStoreStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  // [FIXED] On homepage, hide top notification banner to keep pure 100vh Rasrang slider experience
  if (pathname === "/" || !storeSettings.isAnnouncementActive || !isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-maroon-900 via-maroon-800 to-saffron-900 text-white text-xs py-2 px-4 border-b border-gold-400/30">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-black/40 border border-gold-400/30">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isOpenNow ? "bg-emerald-400 animate-pulse" : "bg-amber-400"
              }`}
            />
            {isOpenNow ? "OPEN NOW (7 AM – 10 PM)" : "OPENS 7:00 AM"}
          </span>

          <span className="flex items-center gap-1.5 text-gold-200">
            <Sparkles className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
            <span className="font-medium text-[11px] sm:text-xs">
              {storeSettings.announcement}
            </span>
          </span>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          <Link
            href="/menu?category=breakfast_snacks"
            className="hidden md:flex items-center gap-1 text-[11px] font-semibold text-gold-300 hover:text-white transition-colors"
          >
            <span>View Breakfast Menu</span>
            <ChevronRight className="w-3 h-3" />
          </Link>

          <button
            onClick={() => setIsVisible(false)}
            className="text-zinc-400 hover:text-white p-0.5"
            aria-label="Dismiss Announcement"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
