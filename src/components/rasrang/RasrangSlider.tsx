"use client";

// [REFACTORED] Premium 100vh Vertical Slider & Smooth Parallax Experience
// Aligned with user requirements:
// - Frame video canvas & toggle mode buttons completely removed
// - Prev/Next/Dots vertical navigation completely removed
// - Silky smooth, responsive hero parallax with ambient ingredient floating
// - Full mobile and tablet responsiveness with dynamic viewport height clamping
import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useShop } from "@/context/ShopContext";
import { MessageCircle, MapPin, ChevronDown } from "lucide-react";

interface Tukada {
  id: string;
  src: string;
  depth: number;
  style: React.CSSProperties;
  className?: string;
}

// Peripheral floating ingredients that never block the central title or buttons
const TUKADAS: Tukada[] = [
  { id: "tukada1", src: "/rasrang_elements/rsz_almonds.png", depth: 0.12, style: { left: "4%", top: "18%" }, className: "w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20" },
  { id: "tukada2", src: "/rasrang_elements/1.png", depth: 0.18, style: { left: "8%", top: "38%" }, className: "hidden sm:block w-14 h-14 md:w-20 md:h-20" },
  { id: "tukada3", src: "/rasrang_elements/2.png", depth: 0.22, style: { right: "6%", top: "18%" }, className: "w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20" },
  { id: "tukada4", src: "/rasrang_elements/3.png", depth: 0.26, style: { right: "5%", top: "42%" }, className: "hidden sm:block w-14 h-14 md:w-20 md:h-20" },
  { id: "tukada5", src: "/rasrang_elements/4.png", depth: 0.18, style: { right: "12%", top: "6%" }, className: "w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16" },
  { id: "tukada6", src: "/rasrang_elements/5.png", depth: 0.32, style: { left: "5%", bottom: "12%" }, className: "w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20" },
  { id: "tukada7", src: "/rasrang_elements/6.png", depth: 0.28, style: { right: "8%", bottom: "15%" }, className: "w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20" },
  { id: "tukada8", src: "/rasrang_elements/2.png", depth: 0.15, style: { left: "2%", bottom: "35%" }, className: "hidden md:block w-16 h-16" },
  { id: "tukada9", src: "/rasrang_elements/3.png", depth: 0.20, style: { left: "14%", top: "8%" }, className: "w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16" },
];

export default function RasrangSlider() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { setHomeActiveSlide } = useShop();

  const TOTAL_SLIDES = 5;
  const isTransitioningRef = useRef(false);

  // [FIXED] Lock document scrolling on home page to enforce 100vh app feel matching Rasrang Sweets
  useEffect(() => {
    setHomeActiveSlide(0);
    document.documentElement.classList.add("home_html");
    document.body.classList.add("home_body");
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.classList.remove("home_html");
      document.body.classList.remove("home_body");
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [setHomeActiveSlide]);

  // Transition controller with 800ms debounce
  const goToSlide = useCallback((index: number) => {
    if (isTransitioningRef.current) return;
    if (index < 0 || index >= TOTAL_SLIDES) return;

    isTransitioningRef.current = true;
    setActiveSlide(index);
    // [FIXED] Synchronize navbar color on home page with active slide
    setHomeActiveSlide(index);

    setTimeout(() => {
      isTransitioningRef.current = false;
    }, 800);
  }, [TOTAL_SLIDES, setHomeActiveSlide]);

  const nextSlide = useCallback(() => {
    goToSlide(activeSlide + 1);
  }, [activeSlide, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide(activeSlide - 1);
  }, [activeSlide, goToSlide]);

  // Full page mousewheel navigation (throttled)
  useEffect(() => {
    let deltaAccum = 0;
    const threshold = 35;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      deltaAccum += e.deltaY;

      if (Math.abs(deltaAccum) >= threshold) {
        if (deltaAccum > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
        deltaAccum = 0;
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [nextSlide, prevSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        nextSlide();
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        prevSlide();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Touch swipe support (Hammer.js logic)
  const touchStartY = useRef(0);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY.current - touchEndY;
    if (Math.abs(diff) > 30) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  };

  // Silky smooth mouse parallax handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const x = (e.clientX - width / 2) / (width / 2);
    const y = (e.clientY - height / 2) / (height / 2);
    setMousePos({ x, y });
  };

  return (
    <div
      className="relative w-screen h-screen overflow-hidden select-none bg-[#110D0B]"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* =========================================================================
          SECTION 1: PARALLAX HERO BANNER SCENE (.bannerscene)
      ========================================================================== */}
      <section
        onMouseMove={handleMouseMove}
        className={`absolute inset-0 w-full h-full transition-all duration-700 ease-in-out bannerscene flex items-center justify-center ${
          activeSlide === 0
            ? "opacity-100 translate-y-0 z-20 pointer-events-auto"
            : "opacity-0 -translate-y-12 z-0 pointer-events-none"
        }`}
      >
        <div className="relative w-full h-full overflow-hidden flex items-center justify-center px-4">
          
          {/* Floating Parallax Ingredient Pieces */}
          {TUKADAS.map((item, idx) => {
            const translateX = mousePos.x * item.depth * 80;
            const translateY = mousePos.y * item.depth * 80;
            const animClass = idx % 2 === 0 ? "animate-float-slow" : "animate-float-reverse";
            return (
              <div
                key={item.id}
                id={item.id}
                className={`absolute pointer-events-none z-20 transition-transform duration-200 ease-out ${animClass} ${item.className || ""}`}
                style={{
                  ...item.style,
                  transform: `translate3d(${translateX}px, ${translateY}px, 0)`,
                }}
              >
                <Image
                  src={item.src}
                  alt="Ingredient"
                  width={100}
                  height={100}
                  className="w-full h-auto drop-shadow-2xl"
                  priority
                />
              </div>
            );
          })}

          {/* [FIXED] Authentic Indrayani Sweet Corner Centerpiece with High-Contrast Royal Glass Showcase */}
          <div
            className="relative z-10 w-full max-w-2xl max-h-[85vh] flex flex-col items-center justify-center text-center transition-transform duration-300 ease-out pt-16 sm:pt-14 px-4"
            style={{
              transform: `translate3d(${mousePos.x * -10}px, ${mousePos.y * -10}px, 0)`,
            }}
          >
            {/* Royal Frosted Glass Card guaranteeing 100% contrast & readability */}
            <div className="w-full rounded-3xl bg-[#140306]/80 backdrop-blur-md border border-gold-400/35 p-6 sm:p-8 md:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.85)] flex flex-col items-center">
              
              {/* Royal Crest Emblem */}
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-maroon-700 via-maroon-800 to-saffron-800 border-2 border-gold-400 flex items-center justify-center shadow-2xl mb-2 sm:mb-3">
                <span className="font-serif text-gold-300 font-bold text-2xl sm:text-3xl select-none">
                  इ
                </span>
              </div>

              {/* Eyebrow in Shimmering Gold */}
              <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-gold-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                इंद्रायणी स्वीट कॉर्नर • भोसरी, पुणे
              </p>

              {/* Signature Jumbo Title */}
              <h1 className="jumbo_title mt-1 sm:mt-2 text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
                Pitara Khushiyo Ka
              </h1>

              {/* Traditional Ornamental Divider */}
              <span className="sweet_divider block my-1 sm:my-2">
                <Image
                  src="/rasrang_elements/divider.png"
                  alt="Divider"
                  width={260}
                  height={26}
                  className="mx-auto w-40 sm:w-56 md:w-64"
                  priority
                />
              </span>

              {/* High-Contrast Description Paragraph */}
              <p className="text-xs sm:text-sm md:text-base text-amber-50 max-w-xl mx-auto font-medium leading-relaxed drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] px-2">
                Handcrafted Pure Desi Ghee Indian Mithai, Festive Hampers & Morning Breakfast Fresh Batches Daily at MIDC Bhosari.
              </p>

              {/* Action Buttons with Signature Corner Border Hover Animation */}
              <div className="mt-4 sm:mt-5 flex flex-wrap items-center justify-center gap-3 sm:gap-4 z-30">
                <Link href="/menu" className="slider_btn">
                  Explore Menu
                </Link>
                <a
                  href="https://wa.me/919876543210?text=Hello%20Indrayani%20Sweet%20Corner,%20I%20would%20like%20to%20order%20sweets"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="slider_btn flex items-center gap-1.5"
                >
                  <MessageCircle className="w-4 h-4 inline-block -mt-0.5 text-emerald-400" />
                  <span>WhatsApp Order</span>
                </a>
              </div>
            </div>

            {/* Subtle Scroll Hint */}
            <div className="mt-4 sm:mt-6 flex flex-col items-center gap-1 text-zinc-300 text-[11px] font-semibold tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
              <span className="uppercase">Scroll to Explore</span>
              <ChevronDown className="w-4 h-4 text-gold-400 animate-bounce" />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: SWEETS (.movable_bg1, #594f10)
      ========================================================================== */}
      <section
        className={`absolute inset-0 w-full h-full transition-all duration-700 ease-in-out movable_bg1 flex flex-col justify-center items-center overflow-hidden ${
          activeSlide === 1
            ? "opacity-100 translate-y-0 z-20 pointer-events-auto"
            : activeSlide < 1
            ? "opacity-0 translate-y-full z-0 pointer-events-none"
            : "opacity-0 -translate-y-1/2 z-0 pointer-events-none"
        }`}
      >
        <div className="coloredsect sweets">
          <div className="max-w-4xl text-center space-y-1 sm:space-y-2 px-4 my-auto pt-14 sm:pt-16">
            <h4 className="jumbo_title">
              Celebrate the most happy day of your life with Indrayani
            </h4>

            <span className="sweet_divider block">
              <Image
                src="/rasrang_elements/divider.png"
                alt="Divider"
                width={260}
                height={26}
                className="mx-auto w-36 sm:w-48 md:w-60"
              />
            </span>

            <h3>Sweets</h3>

            <div className="biscuit_block text-center">
              <Image
                src="/rasrang_elements/sweets.png"
                alt="Royal Sweets"
                width={750}
                height={440}
                className="mx-auto drop-shadow-2xl max-h-[26vh] sm:max-h-[36vh] md:max-h-[42vh] w-auto object-contain"
                priority
              />
            </div>

            <div className="pt-1">
              <Link href="/menu?category=traditional_mithai" className="slider_btn">
                Explore Sweets
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: DRY FRUIT (.movable_bg2, #3a124e)
      ========================================================================== */}
      <section
        className={`absolute inset-0 w-full h-full transition-all duration-700 ease-in-out movable_bg2 flex flex-col justify-center items-center overflow-hidden ${
          activeSlide === 2
            ? "opacity-100 translate-y-0 z-20 pointer-events-auto"
            : activeSlide < 2
            ? "opacity-0 translate-y-full z-0 pointer-events-none"
            : "opacity-0 -translate-y-1/2 z-0 pointer-events-none"
        }`}
      >
        <div className="coloredsect dryfruit">
          <div className="max-w-4xl text-center space-y-1 sm:space-y-2 px-4 my-auto pt-14 sm:pt-16">
            <h1 className="jumbo_title">
              Pitara Khushiyo Ka
            </h1>

            <span className="sweet_divider block">
              <Image
                src="/rasrang_elements/divider.png"
                alt="Divider"
                width={260}
                height={26}
                className="mx-auto w-36 sm:w-48 md:w-60"
              />
            </span>

            <h3>Dry fruit</h3>

            <div className="biscuit_block text-center">
              <Image
                src="/rasrang_elements/dryfruit.png"
                alt="Dry Fruit Mithai"
                width={750}
                height={440}
                className="mx-auto drop-shadow-2xl max-h-[26vh] sm:max-h-[36vh] md:max-h-[42vh] w-auto object-contain"
                priority
              />
            </div>

            <div className="pt-1">
              <Link href="/menu?category=dry_fruit_specials" className="slider_btn">
                Dry Fruit Collection
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: FESTIVAL ATTRACTION (.movable_bg3, #dd8a00)
      ========================================================================== */}
      <section
        className={`absolute inset-0 w-full h-full transition-all duration-700 ease-in-out movable_bg3 flex flex-col justify-center items-center overflow-hidden ${
          activeSlide === 3
            ? "opacity-100 translate-y-0 z-20 pointer-events-auto"
            : activeSlide < 3
            ? "opacity-0 translate-y-full z-0 pointer-events-none"
            : "opacity-0 -translate-y-1/2 z-0 pointer-events-none"
        }`}
      >
        <div className="coloredsect festival">
          <div className="max-w-4xl text-center space-y-1 sm:space-y-2 px-4 my-auto pt-14 sm:pt-16">
            <h1 className="jumbo_title">
              Make your every function a little sweet with Indrayani
            </h1>

            <span className="sweet_divider block">
              <Image
                src="/rasrang_elements/divider.png"
                alt="Divider"
                width={260}
                height={26}
                className="mx-auto w-36 sm:w-48 md:w-60"
              />
            </span>

            <h3>Festival Attraction</h3>

            {/* High-Resolution Professional Festival Gift Box Photo */}
            <div className="biscuit_block text-center">
              <Image
                src="/images/dishes/mithai_hamper.jpg"
                alt="Festival Sweet Hamper"
                width={750}
                height={440}
                className="mx-auto drop-shadow-2xl rounded-2xl max-h-[26vh] sm:max-h-[36vh] md:max-h-[42vh] w-auto object-contain"
                priority
              />
            </div>

            <div className="pt-1">
              <Link href="/festivals" className="slider_btn">
                Festival Specials
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: NAMKEENS (.movable_bgdokala, #d25d0a) + COMPACT RESPONSIVE FOOTER
      ========================================================================== */}
      <section
        className={`absolute inset-0 w-full h-full transition-all duration-700 ease-in-out movable_bgdokala flex flex-col justify-between items-center overflow-hidden ${
          activeSlide === 4
            ? "opacity-100 translate-y-0 z-20 pointer-events-auto"
            : "opacity-0 translate-y-full z-0 pointer-events-none"
        }`}
      >
        <div className="coloredsect namkeens">
          <div className="max-w-4xl text-center space-y-1 sm:space-y-2 px-4 my-auto pt-14 sm:pt-16">
            <h1 className="jumbo_title">
              Authentic Morning Breakfast & Crispy Savouries
            </h1>

            <span className="sweet_divider block">
              <Image
                src="/rasrang_elements/divider.png"
                alt="Divider"
                width={260}
                height={26}
                className="mx-auto w-36 sm:w-48 md:w-60"
              />
            </span>

            <h3>Namkeens</h3>

            <div className="biscuit_block text-center">
              <Image
                src="/rasrang_elements/namkeens.png"
                alt="Namkeens"
                width={750}
                height={440}
                className="mx-auto drop-shadow-2xl max-h-[26vh] sm:max-h-[36vh] md:max-h-[42vh] w-auto object-contain"
                priority
              />
            </div>

            <div className="pt-1">
              <Link href="/menu?category=breakfast_snacks" className="slider_btn">
                Explore Namkeens
              </Link>
            </div>
          </div>

          {/* [FIXED] Luxury Frosted Glass Royal Footer */}
          <footer className="homefooter">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2.5 px-3">
              {/* Brand & Copyright */}
              <div className="flex items-center gap-2 text-zinc-300 text-center md:text-left text-[11px] sm:text-xs">
                <span className="w-2 h-2 rounded-full bg-gold-400 inline-block animate-pulse" />
                <span className="font-semibold text-white">© 2026 Indrayani Sweet Corner</span>
                <span className="hidden sm:inline text-zinc-500">•</span>
                <span className="hidden sm:inline text-gold-300/90 text-[10px] uppercase tracking-wider">MIDC Bhosari, Pune</span>
              </div>

              {/* Verified Location & Timing Badge */}
              <div className="flex items-center gap-2 text-[10px] sm:text-[11px] text-zinc-200 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                <MapPin className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                <span className="truncate max-w-[240px] sm:max-w-none">Plot No. 13, 3, Indrayani Nagar, MIDC, Bhosari</span>
                <span className="text-zinc-500">•</span>
                <span className="text-emerald-400 font-semibold">Opens 7 AM</span>
              </div>

              {/* Navigation Links & WhatsApp */}
              <div className="flex items-center gap-3 text-[11px] sm:text-xs font-semibold">
                <Link href="/story" className="text-zinc-300 hover:text-gold-300 transition-colors uppercase tracking-wider">
                  About
                </Link>
                <Link href="/menu" className="text-zinc-300 hover:text-gold-300 transition-colors uppercase tracking-wider">
                  Menu
                </Link>
                <Link href="/reviews" className="text-zinc-300 hover:text-gold-300 transition-colors uppercase tracking-wider">
                  Reviews (3.9★)
                </Link>
                <Link href="/contact" className="text-zinc-300 hover:text-gold-300 transition-colors uppercase tracking-wider">
                  Contact
                </Link>
                <a
                  href="https://wa.me/919876543210?text=Hello%20Indrayani%20Sweet%20Corner,%20I%20would%20like%20to%20order"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all shadow-sm"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </footer>
        </div>
      </section>
    </div>
  );
}
