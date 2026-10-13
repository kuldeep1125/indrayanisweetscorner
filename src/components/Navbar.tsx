"use client";

// [REFACTORED] Strictly single-line, fully responsive royal navbar with smooth mobile drawer
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useShop } from "@/context/ShopContext";
import { Language } from "@/data/translations";
import {
  ShoppingBag,
  Menu as MenuIcon,
  X,
  MessageCircle,
  ShieldCheck,
  Clock,
  Sparkles,
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const {
    language,
    setLanguage,
    t,
    totalItemCount,
    setIsCartOpen,
    setIsDossierOpen,
    generateWhatsAppOrderUrl,
    homeActiveSlide,
  } = useShop();

  const isHome = pathname === "/";
  // [FIXED] Dynamic slide color on home page matching active parallax slide, solid royal obsidian on all inner pages
  const navThemeClass = isHome
    ? `royal-navbar-slide-${homeActiveSlide}`
    : "royal-navbar-solid";

  // Streamlined primary links for single-line desktop navigation
  const primaryNavLinks = [
    { href: "/", label: t.nav.home },
    { href: "/menu", label: t.nav.menu },
    { href: "/custom-box", label: t.nav.customBox },
    { href: "/story", label: t.nav.story },
    { href: "/reviews", label: t.nav.reviews },
    { href: "/contact", label: t.nav.visitUs },
  ];

  // Full links list for mobile drawer
  const allNavLinks = [
    { href: "/", label: t.nav.home },
    { href: "/menu", label: t.nav.menu },
    { href: "/custom-box", label: t.nav.customBox },
    { href: "/story", label: t.nav.story },
    { href: "/festivals", label: t.nav.festivals },
    { href: "/gallery", label: t.nav.gallery },
    { href: "/reviews", label: t.nav.reviews },
    { href: "/contact", label: t.nav.visitUs },
  ];

  return (
    <header className={`royal-navbar ${navThemeClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Strictly single-line flex row with balanced spacing across all pages */}
        <div className="flex items-center justify-between h-16 sm:h-20 flex-nowrap gap-2 sm:gap-4">
          
          {/* Brand Logo & Title */}
          <Link href="/" className="flex items-center gap-2 sm:gap-2.5 group shrink min-w-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-maroon-700 via-maroon-800 to-saffron-800 border-2 border-gold-400 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform shrink-0">
              <span className="font-serif text-gold-300 font-bold text-sm sm:text-lg select-none">
                इ
              </span>
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="font-serif text-xs sm:text-base md:text-lg font-bold tracking-tight transition-colors text-white group-hover:text-gold-300 drop-shadow-sm truncate max-w-[130px] xs:max-w-[190px] sm:max-w-none">
                  Indrayani Sweet Corner
                </span>
                <span className="hidden 2xl:inline-block text-[10px] bg-saffron-500/20 text-saffron-300 px-1.5 py-0.5 rounded-full font-medium border border-saffron-400/40">
                  भोसरी
                </span>
              </div>
              <p className="text-[10px] hidden 2xl:block font-medium tracking-wide text-gold-300/90 drop-shadow-xs">
                इंद्रायणी स्वीट कॉर्नर • शुद्ध तुपातील मिठाई
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links — Strictly Identical Across All Pages */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-2 shrink-0">
            {primaryNavLinks.map(link => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-2 xl:px-3 py-1.5 text-xs font-semibold tracking-wider uppercase transition-all border-b-2 drop-shadow-sm ${
                    isActive
                      ? "border-gold-400 text-gold-300 font-bold"
                      : "border-transparent text-white/95 hover:text-gold-300 hover:border-gold-400/70"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Header Actions — Strictly Identical Across All Pages */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Compact Multilingual Pill: EN | MR | HI */}
            <div className="flex items-center rounded-full p-0.5 border text-[10px] sm:text-xs shrink-0 bg-black/60 border-gold-400/30 text-white">
              {(["en", "mr", "hi"] as Language[]).map(lang => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-1.5 sm:px-2 py-0.5 rounded-full font-bold transition-all text-[10px] sm:text-[11px] ${
                    language === lang
                      ? "bg-saffron-600 text-white shadow-xs"
                      : "hover:text-gold-300 opacity-80 hover:opacity-100"
                  }`}
                >
                  {lang === "en" ? "EN" : lang === "mr" ? "MR" : "HI"}
                </button>
              ))}
            </div>

            {/* Cart & Sweet Box Drawer Toggle */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-full border transition-all active:scale-95 shrink-0 bg-white/10 hover:bg-white/20 border-gold-400/30 text-white"
              aria-label="View Cart and Custom Boxes"
            >
              <ShoppingBag className="w-4 h-4 text-gold-300" />
              {totalItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-saffron-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                  {totalItemCount}
                </span>
              )}
            </button>

            {/* WhatsApp Quick Order Action (Visible on tablet & desktop, featured inside mobile drawer on phones) */}
            <a
              href={generateWhatsAppOrderUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md transition-all active:scale-95 shrink-0"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>

            {/* Mobile Hamburger Menu Toggle with 44px touch target */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl transition-colors shrink-0 text-white hover:bg-white/10 active:scale-95 flex items-center justify-center"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-gold-300" /> : <MenuIcon className="w-5 h-5 text-white" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu — Full Screen Blur Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-16 sm:top-20 bg-black/90 backdrop-blur-xl border-b border-gold-400/30 text-white px-5 py-6 space-y-4 animate-fadeIn shadow-2xl z-50 max-h-[85vh] overflow-y-auto">
          <div className="flex flex-col space-y-1 divide-y divide-white/10">
            {allNavLinks.map(link => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-3 text-sm font-semibold tracking-wide flex items-center justify-between transition-colors ${
                    isActive ? "text-gold-300 font-bold" : "text-zinc-200 hover:text-white"
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <Sparkles className="w-4 h-4 text-gold-400" />}
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-white/15 space-y-3">
            <div className="flex items-center justify-between text-xs text-zinc-300">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-gold-400" />
                <span>Opens 7:00 AM Daily</span>
              </span>
              <span className="text-gold-300 font-medium">Bhosari MIDC, Pune</span>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsDossierOpen(true);
                }}
                className="w-full py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-center border border-white/15 flex items-center justify-center gap-1.5"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Shop Audit (3.9★)</span>
              </button>

              <a
                href={generateWhatsAppOrderUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-center text-white flex items-center justify-center gap-1.5"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
