"use client";

// [ADDED] World-Class Native Mobile App Bottom Navigation Bar
// Inspired by Blinkit, Zepto, Swiggy, and Apple Store mobile ergonomics:
// - Thumb-zone reachability for one-handed operation
// - Safe-area inset resilience (iPhone home indicator & Android navigation)
// - Tactile visual feedback with active indicator capsules
// - Dynamic live Cart notification badge
// - High-contrast accessibility (WCAG 2.2 AA)

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useShop } from "@/context/ShopContext";
import {
  Home,
  BookOpen,
  Gift,
  Star,
  MapPin,
  ShoppingBag,
} from "lucide-react";

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { totalItemCount, setIsCartOpen } = useShop();

  const navItems = [
    {
      href: "/",
      label: "Home",
      icon: Home,
      exact: true,
    },
    {
      href: "/menu",
      label: "Menu",
      icon: BookOpen,
      exact: false,
    },
    {
      href: "/custom-box",
      label: "Gift Box",
      icon: Gift,
      highlight: true,
      exact: false,
    },
    {
      href: "/reviews",
      label: "Reviews",
      icon: Star,
      badge: "3.9★",
      exact: false,
    },
    {
      href: "/contact",
      label: "Visit",
      icon: MapPin,
      exact: false,
    },
  ];

  return (
    <nav
      role="navigation"
      aria-label="Mobile Bottom Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#120B09]/95 backdrop-blur-xl border-t border-gold-400/30 shadow-[0_-8px_30px_rgba(0,0,0,0.7)] select-none pb-[calc(env(safe-area-inset-bottom,0px)+6px)] pt-1.5 transition-all"
    >
      <div className="max-w-md mx-auto px-2 flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);

          const Icon = item.icon;

          if (item.highlight) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative -top-2 flex flex-col items-center group active:scale-95 transition-transform"
                aria-label="Create Custom Mithai Gift Box"
              >
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transition-all border ${
                    isActive
                      ? "bg-gradient-to-tr from-saffron-600 via-amber-500 to-gold-400 text-white border-gold-300 ring-2 ring-gold-400/40 shadow-saffron-950/60"
                      : "bg-gradient-to-tr from-maroon-800 to-maroon-700 text-gold-300 border-gold-400/50 hover:border-gold-300"
                  }`}
                >
                  <Icon className="w-5 h-5 drop-shadow-sm" />
                </div>
                <span
                  className={`text-[10px] font-bold mt-1 tracking-tight transition-colors ${
                    isActive ? "text-gold-300 font-extrabold" : "text-zinc-300 group-hover:text-white"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex-1 min-h-[48px] flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all active:scale-95 relative group ${
                isActive ? "text-gold-300 font-bold" : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <div className="relative flex items-center justify-center">
                <div
                  className={`p-1 rounded-lg transition-all ${
                    isActive ? "bg-gold-400/15 text-gold-300" : "text-zinc-400 group-hover:text-zinc-200"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>

                {/* Live micro-badge for reviews or cart */}
                {item.badge && !isActive && (
                  <span className="absolute -top-1 -right-2 bg-gold-400/20 text-gold-300 text-[8px] font-bold px-1 rounded-full border border-gold-400/30">
                    {item.badge}
                  </span>
                )}
              </div>

              <span
                className={`text-[10px] tracking-tight mt-0.5 leading-none transition-colors ${
                  isActive ? "text-gold-300 font-bold" : "text-zinc-400 group-hover:text-zinc-200 font-medium"
                }`}
              >
                {item.label}
              </span>

              {/* Active Indicator Micro-dot */}
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-gold-400 mt-0.5 shadow-xs animate-pulse" />
              )}
            </Link>
          );
        })}

        {/* Quick Cart Floating Button if items are added */}
        {totalItemCount > 0 && (
          <button
            onClick={() => setIsCartOpen(true)}
            aria-label={`Open Cart (${totalItemCount} items)`}
            className="flex-none ml-1 p-2 rounded-xl bg-saffron-600 hover:bg-saffron-500 text-white relative active:scale-90 transition-transform shadow-md"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="absolute -top-1.5 -right-1.5 bg-maroon-700 text-white text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center border border-gold-400/50">
              {totalItemCount}
            </span>
          </button>
        )}
      </div>
    </nav>
  );
}
