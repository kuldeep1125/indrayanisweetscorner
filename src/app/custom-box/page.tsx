"use client";

// [REFACTORED] Award-Winning Bespoke Luxury Gifting Atelier & Pack Creator
// Redesigned with a mobile-first, 4-step progressive creation flow:
// Step 1: Occasion & Presentation Case Finish + Size
// Step 2: Halwai Sweet Pantry & Partitioned Velvet Tray Visualizer
// Step 3: Satin Silk Ribbon & Live Calligraphy Card Personalization
// Step 4: Final Presentation Review, Itemized Calculation & One-Click Dispatch
// Ergonomically optimized for one-handed mobile navigation with a persistent compact action bar.

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { useShop } from "@/context/ShopContext";
import { PRODUCTS, ProductItem } from "@/data/products";
import confetti from "canvas-confetti";
import {
  Sparkles,
  Plus,
  Minus,
  ShoppingBag,
  MessageCircle,
  RotateCcw,
  Check,
  Gift,
  Palette,
  ShieldCheck,
  Award,
  ArrowRight,
  ArrowLeft,
  Search,
} from "lucide-react";
// [ADDED] Verified Social Media Lookbook & Content Showcase
import SocialGallerySection from "@/components/SocialGallerySection";
import { CURATED_SOCIAL_POSTS, CuratedSocialPost } from "@/data/socialMedia";

type BoxStyleId = "royal-crimson" | "maharani-emerald" | "imperial-navy" | "artisan-brass";
type RibbonColorId = "gold" | "crimson" | "emerald" | "navy";

interface BoxStyle {
  id: BoxStyleId;
  name: string;
  nameMr: string;
  desc: string;
  bgClass: string;
  borderClass: string;
  accentText: string;
  trayBg: string;
  goldAccent: string;
}

const BOX_STYLES: BoxStyle[] = [
  {
    id: "royal-crimson",
    name: "Royal Crimson & Gold Foil",
    nameMr: "शाही जांभळी व सुवर्ण नक्षी",
    desc: "Opulent deep maroon velvet chest embossed with 24k gold leaf filigree patterns.",
    bgClass: "from-[#4B0F17] to-[#2D0A0E]",
    borderClass: "border-amber-400/60",
    accentText: "text-amber-300",
    trayBg: "bg-[#380B11]",
    goldAccent: "#D4AF37",
  },
  {
    id: "maharani-emerald",
    name: "Maharani Emerald & Saffron",
    nameMr: "महाराणी पाचू व केशर",
    desc: "Regal peacock-emerald velvet box framed with warm saffron silk border accents.",
    bgClass: "from-[#143423] to-[#0A1D13]",
    borderClass: "border-emerald-400/60",
    accentText: "text-emerald-300",
    trayBg: "bg-[#0E261A]",
    goldAccent: "#E8D075",
  },
  {
    id: "imperial-navy",
    name: "Imperial Midnight & Silver Vark",
    nameMr: "शाही नील व चांदीचा वर्ख",
    desc: "Midnight navy blue textured board adorned with pure silver foil celestial motifs.",
    bgClass: "from-[#0E1F3D] to-[#071122]",
    borderClass: "border-blue-400/50",
    accentText: "text-blue-200",
    trayBg: "bg-[#0A162B]",
    goldAccent: "#C0C0C0",
  },
  {
    id: "artisan-brass",
    name: "Artisan Heirloom Brass Platter",
    nameMr: "वारसा पितळी थाळी हॅम्पर",
    desc: "Warm hand-hammered antique brass presentation with marigold floral trims.",
    bgClass: "from-[#4D3811] to-[#2B1F08]",
    borderClass: "border-yellow-500/60",
    accentText: "text-yellow-300",
    trayBg: "bg-[#38280B]",
    goldAccent: "#F3E5AB",
  },
];

const RIBBON_OPTIONS: { id: RibbonColorId; name: string; colorHex: string }[] = [
  { id: "gold", name: "Saffron Gold Zari", colorHex: "#D4AF37" },
  { id: "crimson", name: "Imperial Crimson Velvet", colorHex: "#8C2434" },
  { id: "emerald", name: "Maharani Emerald Silk", colorHex: "#2D5A27" },
  { id: "navy", name: "Midnight Navy Satin", colorHex: "#1E3A8A" },
];

const OCCASIONS = [
  { id: "Festive Blessing", label: "Diwali & Festive Blessings", labelMr: "दिवाळी व सण उत्सव", icon: "🪔" },
  { id: "Wedding Mubarak", label: "Wedding & Shubh Vivah", labelMr: "शुभ विवाह व साखरपुडा", icon: "💐" },
  { id: "Corporate Appreciation", label: "Corporate & Executive", labelMr: "व्यावसायिक भेट", icon: "💼" },
  { id: "Heartiest Congratulations", label: "Milestone Celebration", labelMr: "आनंद सोहळा", icon: "✨" },
  { id: "Happy Birthday", label: "Birthday Joy", labelMr: "वाढदिवस", icon: "🎉" },
];

const STEPS = [
  { num: 1, title: "Occasion & Box", titleMr: "सण व बॉक्स", icon: Palette },
  { num: 2, title: "Pick Sweets", titleMr: "मिठाई निवड", icon: Sparkles },
  { num: 3, title: "Personalize", titleMr: "सदिच्छा पत्र", icon: Gift },
  { num: 4, title: "Review & Gift", titleMr: "अंतिम आढावा", icon: ShoppingBag },
];

export default function CustomBoxPage() {
  const { addCustomBoxToCart, generateWhatsAppOrderUrl } = useShop();

  // Step Management
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);

  // Box Configuration State
  const [boxSize, setBoxSize] = useState<4 | 6 | 9>(6);
  const [selectedStyle, setSelectedStyle] = useState<BoxStyleId>("royal-crimson");
  const [selectedRibbon, setSelectedRibbon] = useState<RibbonColorId>("gold");

  // Sweet selections: productId -> compartment count
  const [sweetCounts, setSweetCounts] = useState<Record<string, number>>({
    "kaju-katli-royal": 2,
    "motichoor-ladoo-ghee": 2,
    "pista-kesar-peda": 2,
  });

  // Filter & Search inside Pantry
  const [pantrySearch, setPantrySearch] = useState("");
  const [pantryCategory, setPantryCategory] = useState<string>("all");

  // Calligraphy Gift Card State
  const [cardOccasion, setCardOccasion] = useState<string>("Festive Blessing");
  const [cardRecipient, setCardRecipient] = useState<string>("");
  const [cardSender, setCardSender] = useState<string>("");
  const [cardMessage, setCardMessage] = useState<string>(
    "Wishing you and your family abundant joy, prosperity, and sweetness on this auspicious celebration!"
  );

  // Eligible sweets for boxing
  const boxableSweets = useMemo(() => {
    return PRODUCTS.filter(
      p =>
        p.category === "traditional_mithai" ||
        p.category === "dry_fruit_specials" ||
        p.category === "bengali_delights" ||
        p.category === "festive_hampers" ||
        p.id === "puneri-bhakarwadi"
    );
  }, []);

  const filteredBoxableSweets = useMemo(() => {
    return boxableSweets.filter(sweet => {
      if (pantryCategory === "pure_ghee" && !sweet.isPureGhee) return false;
      if (pantryCategory === "dry_fruit" && sweet.category !== "dry_fruit_specials") return false;
      if (pantrySearch.trim()) {
        const q = pantrySearch.toLowerCase();
        const matches =
          sweet.name.toLowerCase().includes(q) ||
          sweet.nameMr.toLowerCase().includes(q) ||
          sweet.tags.some(t => t.toLowerCase().includes(q));
        if (!matches) return false;
      }
      return true;
    });
  }, [boxableSweets, pantryCategory, pantrySearch]);

  const totalAssigned = Object.values(sweetCounts).reduce((sum, c) => sum + c, 0);
  const remainingSlots = boxSize - totalAssigned;

  const currentStyleObj = useMemo(() => {
    return BOX_STYLES.find(s => s.id === selectedStyle) || BOX_STYLES[0];
  }, [selectedStyle]);

  const handleSweetCountChange = (productId: string, delta: number) => {
    const current = sweetCounts[productId] || 0;
    const next = current + delta;

    if (next < 0) return;
    if (delta > 0 && totalAssigned >= boxSize) return;

    setSweetCounts(prev => {
      const updated = { ...prev, [productId]: next };
      if (next === 0) delete updated[productId];
      return updated;
    });
  };

  const handleBoxSizeSelect = (newSize: 4 | 6 | 9) => {
    setBoxSize(newSize);
    if (totalAssigned > newSize) {
      const keys = Object.keys(sweetCounts);
      const newCounts: Record<string, number> = {};
      let allocated = 0;
      for (const k of keys) {
        if (allocated < newSize) {
          newCounts[k] = Math.min(sweetCounts[k], newSize - allocated);
          allocated += newCounts[k];
        }
      }
      setSweetCounts(newCounts);
    }
  };

  const handleReset = () => {
    setSweetCounts({});
  };

  // Quick Curation Presets
  const applyPreset = (presetType: "royal" | "pureGhee" | "dryfruit") => {
    if (presetType === "royal") {
      if (boxSize === 4) {
        setSweetCounts({ "kaju-katli-royal": 2, "motichoor-ladoo-ghee": 1, "pista-kesar-peda": 1 });
      } else if (boxSize === 6) {
        setSweetCounts({ "kaju-katli-royal": 2, "motichoor-ladoo-ghee": 2, "pista-kesar-peda": 1, "malai-barfi-kesar": 1 });
      } else {
        setSweetCounts({ "kaju-katli-royal": 3, "motichoor-ladoo-ghee": 2, "pista-kesar-peda": 2, "malai-barfi-kesar": 2 });
      }
    } else if (presetType === "pureGhee") {
      if (boxSize === 4) {
        setSweetCounts({ "motichoor-ladoo-ghee": 2, "pista-kesar-peda": 2 });
      } else if (boxSize === 6) {
        setSweetCounts({ "motichoor-ladoo-ghee": 3, "pista-kesar-peda": 2, "gulab-jamun-shahi": 1 });
      } else {
        setSweetCounts({ "motichoor-ladoo-ghee": 4, "pista-kesar-peda": 3, "gulab-jamun-shahi": 2 });
      }
    } else if (presetType === "dryfruit") {
      if (boxSize === 4) {
        setSweetCounts({ "kaju-katli-royal": 3, "malai-barfi-kesar": 1 });
      } else if (boxSize === 6) {
        setSweetCounts({ "kaju-katli-royal": 4, "malai-barfi-kesar": 2 });
      } else {
        setSweetCounts({ "kaju-katli-royal": 6, "malai-barfi-kesar": 3 });
      }
    }
  };

  // Estimated Price Calculation
  const packagingFee = boxSize === 4 ? 90 : boxSize === 6 ? 140 : 190;
  const sweetsPrice = useMemo(() => {
    let price = 0;
    Object.entries(sweetCounts).forEach(([pId, count]) => {
      const p = PRODUCTS.find(item => item.id === pId);
      if (p && p.pricePerKg) {
        const portionCost = p.pricePerKg * 0.125 * count;
        price += portionCost;
      }
    });
    return Math.round(price);
  }, [sweetCounts]);

  const estimatedPrice = packagingFee + sweetsPrice;

  // Compartment Array for Visual Slot Rendering
  const compartmentSlots = useMemo(() => {
    const slots: { index: number; sweet?: ProductItem }[] = [];
    const flattenedList: ProductItem[] = [];

    Object.entries(sweetCounts).forEach(([pId, count]) => {
      const p = PRODUCTS.find(item => item.id === pId);
      if (p) {
        for (let i = 0; i < count; i++) {
          flattenedList.push(p);
        }
      }
    });

    for (let i = 0; i < boxSize; i++) {
      slots.push({
        index: i,
        sweet: flattenedList[i] || undefined,
      });
    }
    return slots;
  }, [boxSize, sweetCounts]);

  const selectedSweetsArray = useMemo(() => {
    return Object.entries(sweetCounts)
      .map(([pId, count]) => {
        const prod = PRODUCTS.find(p => p.id === pId);
        return prod ? { product: prod, count } : null;
      })
      .filter(Boolean) as { product: ProductItem; count: number }[];
  }, [sweetCounts]);

  const handleAddToCart = () => {
    addCustomBoxToCart(boxSize, selectedSweetsArray, estimatedPrice);
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#D4AF37", "#BA4914", "#681622", "#F3E5AB"],
      });
    } catch {
      // Ignored
    }
  };

  const handleWhatsAppOrder = () => {
    const sweetsListStr = selectedSweetsArray
      .map(s => `${s.product.name} (${s.count} slots)`)
      .join(", ");
    const note = `*Bespoke Gifting Pack Pre-Order*\n• Occasion: ${cardOccasion}\n• Presentation: ${currentStyleObj.name}\n• Size: ${boxSize} Compartments (~${boxSize === 4 ? "500g" : boxSize === 6 ? "750g" : "1.2kg"})\n• Ribbon: ${RIBBON_OPTIONS.find(r => r.id === selectedRibbon)?.name}\n• Curated Sweets: ${sweetsListStr}\n• Estimated Total: ₹${estimatedPrice}\n• Gift Card To: ${cardRecipient || "Dear One"}\n• From: ${cardSender || "Well-wisher"}\n• Message: "${cardMessage}"`;
    const url = generateWhatsAppOrderUrl(note);
    window.open(url, "_blank");
  };

  // [ADDED] Pre-load Curated Social Media Gifting Inspiration into Step 2
  const handlePreloadGiftingPost = (post: CuratedSocialPost) => {
    if (post.id === "post-gifting-1") {
      setSelectedStyle("royal-crimson");
      setBoxSize(9);
      setSelectedRibbon("gold");
      setSweetCounts({
        "kaju-katli-royal": 5,
        "motichoor-ladoo-ghee": 4,
      });
    } else if (post.id === "post-gifting-2") {
      setSelectedStyle("maharani-emerald");
      setBoxSize(4);
      setSelectedRibbon("crimson");
      setSweetCounts({
        "kaju-katli-royal": 2,
        "pista-kesar-peda": 2,
      });
    } else if (post.id === "post-gifting-3") {
      setSelectedStyle("artisan-brass");
      setBoxSize(6);
      setSelectedRibbon("gold");
      setSweetCounts({
        "pista-kesar-peda": 3,
        "motichoor-ladoo-ghee": 3,
      });
    }

    setCurrentStep(2);

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.5 },
        colors: ["#D4AF37", "#681622", "#10B981"],
      });
    } catch {
      // Ignored
    }

    if (typeof window !== "undefined") {
      window.scrollTo({ top: 120, behavior: "smooth" });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 sm:space-y-12 pb-28 md:pb-16">
      {/* Editorial Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
        <div className="inline-flex max-w-full flex-wrap items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gold-400/10 border border-gold-400/30 text-saffron-600 dark:text-gold-300 text-[11px] sm:text-xs font-bold tracking-wider uppercase text-center">
          <Sparkles className="w-3.5 h-3.5 flex-shrink-0" />
          <span>The Royal Gifting Atelier • शाही भेटवस्तू संग्रह</span>
        </div>

        <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-zinc-950 dark:text-zinc-50 tracking-tight leading-tight">
          Create Your Bespoke Sweet Hamper
        </h1>

        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-2xl mx-auto">
          Hand-curate your heirloom sweet box for weddings, Diwali, Ganesh Chaturthi, or corporate gifting.
          Select your royal presentation case, fill each compartment with fresh pure ghee delicacies, and personalize with a handwritten calligraphy card.
        </p>

        {/* Quality Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-[11px] font-semibold text-zinc-500">
          <span className="flex items-center gap-1.5 bg-white dark:bg-zinc-900 px-3 py-1 rounded-full border border-gold-400/20 shadow-xs">
            <Award className="w-3.5 h-3.5 text-gold-500" /> 100% Shuddh Cow Ghee
          </span>
          <span className="flex items-center gap-1.5 bg-white dark:bg-zinc-900 px-3 py-1 rounded-full border border-gold-400/20 shadow-xs">
            <Palette className="w-3.5 h-3.5 text-saffron-500" /> Embossed Gold Foil Finish
          </span>
          <span className="flex items-center gap-1.5 bg-white dark:bg-zinc-900 px-3 py-1 rounded-full border border-gold-400/20 shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Daily Fresh Confectionery
          </span>
        </div>
      </div>

      {/* Stepped Creation Progress Bar */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl sm:rounded-3xl border border-gold-400/25 p-2 sm:p-3 shadow-luxury">
        <nav aria-label="Gifting creation steps" className="grid grid-cols-4 gap-1 sm:gap-2">
          {STEPS.map(step => {
            const Icon = step.icon;
            const isCurrent = currentStep === step.num;
            const isCompleted = currentStep > step.num;

            return (
              <button
                key={step.num}
                onClick={() => setCurrentStep(step.num as 1 | 2 | 3 | 4)}
                className={`py-2.5 sm:py-3.5 px-1.5 sm:px-3 rounded-xl sm:rounded-2xl flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2.5 transition-all text-center ${
                  isCurrent
                    ? "bg-maroon-700 text-white shadow-md ring-1 ring-gold-400/50"
                    : isCompleted
                    ? "bg-gold-50/80 dark:bg-zinc-800 text-maroon-800 dark:text-gold-300 hover:bg-gold-100"
                    : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
                }`}
              >
                <div
                  className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold ${
                    isCurrent
                      ? "bg-gold-400 text-black"
                      : isCompleted
                      ? "bg-emerald-600 text-white"
                      : "bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300"
                  }`}
                >
                  {isCompleted ? <Check className="w-3 h-3" /> : step.num}
                </div>
                <div className="text-left hidden sm:flex items-center gap-1.5">
                  <Icon className="w-3.5 h-3.5 flex-shrink-0 opacity-80" />
                  <div>
                    <div className="text-xs font-bold leading-tight">{step.title}</div>
                    <div className={`text-[10px] ${isCurrent ? "text-gold-200" : "text-zinc-400"}`}>
                      {step.titleMr}
                    </div>
                  </div>
                </div>
                <span className="sm:hidden text-[10px] font-bold truncate max-w-full">
                  {step.title.split(" ")[0]}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* =========================================================================
          STEP 1: OCCASION, BOX SIZE & PRESENTATION CASE FINISH
      ========================================================================== */}
      {currentStep === 1 && (
        <div className="space-y-8 animate-fadeIn">
          {/* 1A: Choose Gifting Occasion */}
          <div className="bg-white dark:bg-zinc-900 p-5 sm:p-7 rounded-3xl border border-gold-400/25 shadow-luxury space-y-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-saffron-600 dark:text-gold-400">
                Part 1A
              </span>
              <h2 className="font-serif text-lg sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                Select Gifting Celebration & Sentiment
              </h2>
              <p className="text-xs text-zinc-500 mt-0.5">
                Each occasion features tailored presentation cards and ceremonial blessings.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
              {OCCASIONS.map(occ => (
                <button
                  key={occ.id}
                  onClick={() => setCardOccasion(occ.id)}
                  className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                    cardOccasion === occ.id
                      ? "bg-gradient-to-br from-gold-50 via-amber-50 to-white dark:from-zinc-800 dark:to-zinc-800/80 border-gold-400 shadow-md ring-1 ring-gold-400"
                      : "bg-zinc-50/70 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-800 hover:border-gold-300"
                  }`}
                >
                  <span className="text-2xl mb-2">{occ.icon}</span>
                  <div>
                    <div className="font-serif font-bold text-xs text-zinc-900 dark:text-zinc-100 leading-snug">
                      {occ.label}
                    </div>
                    <div className="text-[10px] text-zinc-400 font-serif mt-0.5">{occ.labelMr}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 1B: Choose Box Size & Net Weight */}
          <div className="bg-white dark:bg-zinc-900 p-5 sm:p-7 rounded-3xl border border-gold-400/25 shadow-luxury space-y-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-saffron-600 dark:text-gold-400">
                Part 1B
              </span>
              <h2 className="font-serif text-lg sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                Select Box Compartment Capacity
              </h2>
              <p className="text-xs text-zinc-500 mt-0.5">
                Choose the perfect portion for intimate blessings or grand festive hampers.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {[
                { size: 4 as const, label: "4 Compartments", sub: "~500g Net Confectionery", note: "Petit Personal Gifting", fee: "₹90 Case Fee" },
                { size: 6 as const, label: "6 Compartments", sub: "~750g Net Confectionery", note: "Our Most Cherished Pack", fee: "₹140 Case Fee", popular: true },
                { size: 9 as const, label: "9 Compartments", sub: "~1.2kg Net Confectionery", note: "Imperial Royal Hamper", fee: "₹190 Case Fee" },
              ].map(opt => (
                <button
                  key={opt.size}
                  onClick={() => handleBoxSizeSelect(opt.size)}
                  className={`p-4 sm:p-5 rounded-2xl border text-left transition-all relative flex flex-col justify-between ${
                    boxSize === opt.size
                      ? "bg-maroon-700 text-white border-maroon-700 shadow-luxury ring-1 ring-gold-400"
                      : "bg-zinc-50 dark:bg-zinc-800/80 border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 hover:border-gold-400"
                  }`}
                >
                  {opt.popular && (
                    <span className="absolute -top-2.5 right-4 bg-amber-500 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-md">
                      ★ Most Popular
                    </span>
                  )}
                  <div>
                    <div className="font-serif font-bold text-base sm:text-lg">{opt.label}</div>
                    <div className={`text-xs font-semibold mt-1 ${boxSize === opt.size ? "text-gold-200" : "text-maroon-700 dark:text-gold-400"}`}>
                      {opt.sub}
                    </div>
                    <p className={`text-[11px] mt-1.5 leading-relaxed ${boxSize === opt.size ? "text-zinc-200" : "text-zinc-500"}`}>
                      {opt.note}
                    </p>
                  </div>
                  <div className={`mt-4 pt-3 border-t text-xs font-bold flex justify-between items-center ${boxSize === opt.size ? "border-white/20 text-gold-300" : "border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300"}`}>
                    <span>Packaging: {opt.fee}</span>
                    {boxSize === opt.size && <Check className="w-4 h-4 text-gold-300" />}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 1C: Presentation Case Finish */}
          <div className="bg-white dark:bg-zinc-900 p-5 sm:p-7 rounded-3xl border border-gold-400/25 shadow-luxury space-y-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-saffron-600 dark:text-gold-400">
                Part 1C
              </span>
              <h2 className="font-serif text-lg sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                Select Presentation Case Texture & Finish
              </h2>
              <p className="text-xs text-zinc-500 mt-0.5">
                Hand-assembled rigid boxes finished with velvet, brocade, and gold foil stamping.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {BOX_STYLES.map(style => (
                <button
                  key={style.id}
                  onClick={() => setSelectedStyle(style.id)}
                  className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                    selectedStyle === style.id
                      ? "ring-2 ring-gold-400 border-transparent shadow-luxury"
                      : "border-zinc-200 dark:border-zinc-800 hover:border-gold-300"
                  }`}
                >
                  <div
                    className={`w-full h-16 rounded-xl bg-gradient-to-br ${style.bgClass} border ${style.borderClass} mb-3 shadow-inner flex items-center justify-center`}
                  >
                    {selectedStyle === style.id && (
                      <div className="w-7 h-7 rounded-full bg-black/40 backdrop-blur-sm border border-gold-400 flex items-center justify-center">
                        <Check className="w-4 h-4 text-gold-300 drop-shadow" />
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="font-serif font-bold text-sm text-zinc-900 dark:text-zinc-100">
                      {style.name}
                    </div>
                    <div className="text-[10px] text-zinc-400 font-serif mt-0.5">{style.nameMr}</div>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-2 leading-relaxed">
                      {style.desc}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 1 Actions */}
          <div className="flex items-center justify-between pt-2">
            <div className="text-xs text-zinc-500">
              Selected: <strong className="text-zinc-900 dark:text-zinc-100">{boxSize} slots</strong> in{" "}
              <strong className="text-zinc-900 dark:text-zinc-100">{currentStyleObj.name}</strong>
            </div>
            <button
              onClick={() => setCurrentStep(2)}
              className="px-6 py-3.5 rounded-2xl bg-maroon-700 hover:bg-maroon-800 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 hover:scale-105 active:scale-95"
            >
              <span>Continue to Pick Sweets</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          STEP 2: PICK SWEETS & PARTITIONED VELVET TRAY VISUALIZER
      ========================================================================== */}
      {currentStep === 2 && (
        <div className="space-y-8 animate-fadeIn">
          {/* Top: The Partitioned Velvet Tray Visualizer */}
          <div
            className={`rounded-3xl p-5 sm:p-8 bg-gradient-to-b ${currentStyleObj.bgClass} border-2 ${currentStyleObj.borderClass} shadow-2xl relative overflow-hidden`}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.18),transparent_70%)] pointer-events-none" />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 sm:pb-6 border-b border-white/10 relative z-10 gap-2">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-gold-300">
                  Tactile Velvet Tray • {boxSize} Compartments (~{boxSize === 4 ? "500g" : boxSize === 6 ? "750g" : "1.2kg"})
                </span>
                <h3 className="font-serif font-bold text-lg sm:text-xl text-white mt-0.5">
                  {currentStyleObj.name}
                </h3>
              </div>

              {/* Status Pill */}
              <div
                className={`px-3 py-1.5 rounded-full text-xs font-bold border backdrop-blur-md self-start sm:self-auto flex items-center gap-1.5 ${
                  remainingSlots === 0
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-400/40"
                    : "bg-amber-500/20 text-amber-200 border-amber-400/40"
                }`}
              >
                <span>{totalAssigned} / {boxSize} Filled</span>
                {remainingSlots === 0 ? "✓ Complete" : `(${remainingSlots} open slots)`}
              </div>
            </div>

            {/* Compartment Grid */}
            <div className="pt-4 sm:pt-6 relative z-10">
              <div
                className={`grid gap-2.5 sm:gap-4 p-3 sm:p-6 rounded-2xl ${currentStyleObj.trayBg} border border-gold-400/30 shadow-inner ${
                  boxSize === 4
                    ? "grid-cols-2"
                    : boxSize === 6
                    ? "grid-cols-2 sm:grid-cols-3"
                    : "grid-cols-3"
                }`}
              >
                {compartmentSlots.map(slot => (
                  <div
                    key={slot.index}
                    className={`relative rounded-2xl overflow-hidden aspect-square border transition-all duration-300 flex flex-col items-center justify-center text-center p-2 group ${
                      slot.sweet
                        ? "border-gold-400/50 bg-black/40 shadow-md"
                        : "border-dashed border-gold-400/30 bg-black/20 hover:border-gold-300/70"
                    }`}
                  >
                    {slot.sweet ? (
                      <>
                        <Image
                          src={slot.sweet.image}
                          alt={slot.sweet.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-2 sm:p-2.5">
                          <span className="font-serif font-bold text-xs sm:text-sm text-white leading-tight drop-shadow-md truncate">
                            {slot.sweet.name}
                          </span>
                          <span className="text-[10px] text-gold-300 font-medium mt-0.5 truncate">
                            ~125g • {slot.sweet.nameMr}
                          </span>
                        </div>

                        {/* Remove single slot button */}
                        <button
                          onClick={() => handleSweetCountChange(slot.sweet!.id, -1)}
                          className="absolute top-2 right-2 w-7 h-7 rounded-full bg-red-600/90 hover:bg-red-600 text-white flex items-center justify-center shadow-md active:scale-95"
                          title="Remove from this compartment"
                          aria-label={`Remove ${slot.sweet.name} from slot`}
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center gap-1 text-zinc-400 p-1">
                        <div className="w-8 h-8 rounded-full border border-dashed border-gold-400/40 flex items-center justify-center text-gold-400">
                          <Plus className="w-4 h-4" />
                        </div>
                        <span className="text-[11px] font-semibold text-gold-200/80">
                          Slot {slot.index + 1}
                        </span>
                        <span className="text-[9px] text-zinc-400">Choose below</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Presets & Reset */}
            <div className="pt-4 flex flex-wrap items-center justify-between gap-2 relative z-10 text-xs border-t border-white/10 mt-4">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-zinc-300 text-[11px] font-bold mr-1">Auto-Fill:</span>
                <button
                  onClick={() => applyPreset("royal")}
                  className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-gold-200 border border-gold-400/30 text-[11px] font-semibold transition-colors active:scale-95"
                >
                  👑 Royal Bestsellers
                </button>
                <button
                  onClick={() => applyPreset("pureGhee")}
                  className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-gold-200 border border-gold-400/30 text-[11px] font-semibold transition-colors active:scale-95"
                >
                  🪔 Desi Ghee Classics
                </button>
                <button
                  onClick={() => applyPreset("dryfruit")}
                  className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-gold-200 border border-gold-400/30 text-[11px] font-semibold transition-colors active:scale-95"
                >
                  ✨ Kaju & Vark
                </button>
              </div>

              <button
                onClick={handleReset}
                className="text-[11px] text-zinc-300 hover:text-red-300 flex items-center gap-1 transition-colors px-2 py-1.5 rounded-lg hover:bg-white/10"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All Slots</span>
              </button>
            </div>
          </div>

          {/* Sweet Selection Pantry (The Halwai Counter) */}
          <div className="bg-white dark:bg-zinc-900 p-5 sm:p-7 rounded-3xl border border-gold-400/25 shadow-luxury space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-100 dark:border-zinc-800">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-saffron-600 dark:text-gold-400">
                  Halwai Counter
                </span>
                <h3 className="font-serif font-bold text-lg sm:text-xl text-zinc-900 dark:text-zinc-100">
                  Select Confections for Remaining Slots
                </h3>
                <p className="text-xs text-zinc-500">
                  Each compartment holds ~125g of freshly prepared sweet.
                </p>
              </div>

              <span
                className={`text-xs font-bold px-3 py-1 rounded-full self-start sm:self-auto ${
                  remainingSlots === 0
                    ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                    : "bg-amber-100 text-amber-800 border border-amber-300"
                }`}
              >
                {remainingSlots === 0 ? "✓ Box is Full" : `${remainingSlots} slots available`}
              </span>
            </div>

            {/* Pantry Filter & Search */}
            <div className="flex flex-col sm:flex-row gap-2.5">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={pantrySearch}
                  onChange={e => setPantrySearch(e.target.value)}
                  placeholder="Search sweets (Kaju Katli, Modak, Peda...)"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-base sm:text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-gold-400"
                />
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                {[
                  { id: "all", label: "All Sweets" },
                  { id: "pure_ghee", label: "Pure Ghee" },
                  { id: "dry_fruit", label: "Dry Fruit" },
                ].map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setPantryCategory(cat.id)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                      pantryCategory === cat.id
                        ? "bg-maroon-700 text-white shadow-xs"
                        : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-gold-400/20"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sweet Pantry Items Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredBoxableSweets.map(sweet => {
                const count = sweetCounts[sweet.id] || 0;
                const portionPrice = sweet.pricePerKg ? Math.round(sweet.pricePerKg * 0.125) : 80;

                return (
                  <div
                    key={sweet.id}
                    className="flex items-center justify-between p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/60 hover:border-gold-400/40 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-zinc-200 flex-shrink-0 border border-gold-400/20">
                        <Image src={sweet.image} alt={sweet.name} fill className="object-cover" />
                      </div>
                      <div className="min-w-0">
                        <div className="font-serif font-bold text-xs text-zinc-900 dark:text-zinc-100 truncate">
                          {sweet.name}
                        </div>
                        <div className="text-[10px] text-zinc-400 truncate mt-0.5">{sweet.nameMr}</div>
                        <div className="text-[10px] text-saffron-600 dark:text-gold-300 font-bold mt-1">
                          ₹{portionPrice} / slot
                        </div>
                      </div>
                    </div>

                    {/* Counter Controls */}
                    <div className="flex items-center gap-1.5 bg-white dark:bg-zinc-900 rounded-xl p-1 border border-zinc-200 dark:border-zinc-700 shadow-xs flex-shrink-0 ml-2">
                      <button
                        onClick={() => handleSweetCountChange(sweet.id, -1)}
                        disabled={count === 0}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-500 hover:text-black dark:hover:text-white disabled:opacity-30 transition-colors active:scale-95"
                        aria-label={`Decrease ${sweet.name}`}
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="font-bold text-xs w-5 text-center text-zinc-900 dark:text-zinc-100">
                        {count}
                      </span>
                      <button
                        onClick={() => handleSweetCountChange(sweet.id, 1)}
                        disabled={remainingSlots <= 0}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-500 hover:text-black dark:hover:text-white disabled:opacity-30 transition-colors active:scale-95"
                        aria-label={`Increase ${sweet.name}`}
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 2 Actions */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setCurrentStep(1)}
              className="px-5 py-3 rounded-2xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 text-zinc-700 dark:text-zinc-300 font-bold text-xs sm:text-sm transition-all flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Box Selection</span>
            </button>

            <button
              onClick={() => setCurrentStep(3)}
              className="px-6 py-3.5 rounded-2xl bg-maroon-700 hover:bg-maroon-800 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 hover:scale-105 active:scale-95"
            >
              <span>Continue to Personalize</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          STEP 3: SATIN RIBBON & CALLIGRAPHY GREETING CARD
      ========================================================================== */}
      {currentStep === 3 && (
        <div className="space-y-8 animate-fadeIn">
          {/* Ribbon Selector */}
          <div className="bg-white dark:bg-zinc-900 p-5 sm:p-7 rounded-3xl border border-gold-400/25 shadow-luxury space-y-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-saffron-600 dark:text-gold-400">
                Finishing Touch
              </span>
              <h2 className="font-serif text-lg sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                Select Satin Silk Ribbon & Tie
              </h2>
              <p className="text-xs text-zinc-500 mt-0.5">
                Every hamper is hand-tied with double-faced woven satin and sealed with gold foil wax.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {RIBBON_OPTIONS.map(ribbon => (
                <button
                  key={ribbon.id}
                  onClick={() => setSelectedRibbon(ribbon.id)}
                  className={`p-3.5 rounded-2xl border flex items-center gap-3 text-xs transition-all ${
                    selectedRibbon === ribbon.id
                      ? "border-gold-500 bg-gold-50/60 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-bold shadow-sm ring-1 ring-gold-400"
                      : "border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300"
                  }`}
                >
                  <span
                    className="w-5 h-5 rounded-full shadow-xs flex-shrink-0 border border-black/10"
                    style={{ backgroundColor: ribbon.colorHex }}
                  />
                  <span className="truncate">{ribbon.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Calligraphy Card Form & Live Preview */}
          <div className="bg-white dark:bg-zinc-900 p-5 sm:p-7 rounded-3xl border border-gold-400/25 shadow-luxury space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
              <div className="flex items-center gap-2.5">
                <Gift className="w-5 h-5 text-maroon-700 dark:text-gold-400" />
                <div>
                  <h2 className="font-serif font-bold text-base sm:text-xl text-zinc-900 dark:text-zinc-100">
                    Complimentary Calligraphy Greeting Card
                  </h2>
                  <p className="text-xs text-zinc-500">
                    Hand-inscribed and tucked beneath the satin ribbon of your sweet box.
                  </p>
                </div>
              </div>
              <span className="text-[10px] uppercase tracking-wider text-emerald-600 font-bold bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-md border border-emerald-300/40">
                Included Free
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Form Inputs */}
              <div className="lg:col-span-6 space-y-3.5 text-xs">
                <div>
                  <label className="block text-zinc-700 dark:text-zinc-300 font-semibold mb-1">
                    Occasion Header:
                  </label>
                  <select
                    value={cardOccasion}
                    onChange={e => setCardOccasion(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-base sm:text-xs font-medium focus:border-gold-400 outline-none"
                  >
                    {OCCASIONS.map(occ => (
                      <option key={occ.id} value={occ.id}>
                        {occ.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-zinc-700 dark:text-zinc-300 font-semibold mb-1">
                      To (Recipient):
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Ramesh Kaka & Family"
                      value={cardRecipient}
                      onChange={e => setCardRecipient(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-base sm:text-xs focus:border-gold-400 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-700 dark:text-zinc-300 font-semibold mb-1">
                      From (Sender):
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Deshmukh Family"
                      value={cardSender}
                      onChange={e => setCardSender(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-base sm:text-xs focus:border-gold-400 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-zinc-700 dark:text-zinc-300 font-semibold mb-1">
                    Personalized Handwritten Note:
                  </label>
                  <textarea
                    rows={3}
                    value={cardMessage}
                    onChange={e => setCardMessage(e.target.value)}
                    placeholder="Write your personal blessing or festive message..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-base sm:text-xs focus:border-gold-400 outline-none leading-relaxed"
                  />
                </div>
              </div>

              {/* Real-Time Calligraphy Preview Card */}
              <div className="lg:col-span-6 p-6 rounded-3xl bg-[#FFFDF9] dark:bg-[#1A1614] border border-amber-300/40 shadow-luxury flex flex-col justify-between min-h-[220px] relative overflow-hidden">
                <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-gold-400/20 border border-gold-400/50 flex items-center justify-center text-gold-700 dark:text-gold-300 text-[10px] font-bold">
                  Seal
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-gold-600 dark:text-gold-400 font-bold">
                    {cardOccasion}
                  </div>
                  <div className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 mt-2">
                    Dearest {cardRecipient || "Family & Friends"},
                  </div>
                  <div className="font-script text-xl sm:text-2xl text-maroon-800 dark:text-gold-300 leading-snug my-3">
                    &ldquo;{cardMessage}&rdquo;
                  </div>
                </div>
                <div className="text-right border-t border-amber-200/50 dark:border-zinc-800 pt-2.5 text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                  With Warmth, {cardSender || "Indrayani Confectioners"}
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 Actions */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setCurrentStep(2)}
              className="px-5 py-3 rounded-2xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 text-zinc-700 dark:text-zinc-300 font-bold text-xs sm:text-sm transition-all flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Sweets</span>
            </button>

            <button
              onClick={() => setCurrentStep(4)}
              className="px-6 py-3.5 rounded-2xl bg-maroon-700 hover:bg-maroon-800 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 hover:scale-105 active:scale-95"
            >
              <span>Review Complete Hamper</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          STEP 4: GRAND REVIEW, ITEMIZED SUMMARY & DISPATCH
      ========================================================================== */}
      {currentStep === 4 && (
        <div className="space-y-8 animate-fadeIn">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Presentation Review Card */}
            <div className="lg:col-span-7 space-y-6">
              <div
                className={`rounded-3xl p-6 sm:p-8 bg-gradient-to-b ${currentStyleObj.bgClass} border-2 ${currentStyleObj.borderClass} shadow-2xl relative overflow-hidden`}
              >
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gold-300">
                      Bespoke Royal Presentation
                    </span>
                    <h3 className="font-serif font-bold text-xl text-white mt-0.5">
                      {currentStyleObj.name}
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-gold-300 block">
                      {boxSize} Compartments
                    </span>
                    <span className="text-[10px] text-zinc-300">
                      {boxSize === 4 ? "~500g Net" : boxSize === 6 ? "~750g Net" : "~1.2kg Net"}
                    </span>
                  </div>
                </div>

                {/* Selected Sweets Roster */}
                <div className="py-4 space-y-2">
                  <div className="text-xs font-bold text-gold-300 uppercase tracking-wider">
                    Curated Delicacies:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedSweetsArray.map(item => (
                      <div
                        key={item.product.id}
                        className="flex items-center gap-2.5 p-2 rounded-xl bg-black/40 border border-gold-400/20"
                      >
                        <div className="relative w-9 h-9 rounded-lg overflow-hidden flex-shrink-0">
                          <Image src={item.product.image} alt={item.product.name} fill className="object-cover" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-white truncate">
                            {item.product.name}
                          </div>
                          <div className="text-[10px] text-gold-300">
                            {item.count} slot{item.count > 1 ? "s" : ""} (~{item.count * 125}g)
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ribbon & Card Notes */}
                <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-300">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3.5 h-3.5 rounded-full"
                      style={{
                        backgroundColor: RIBBON_OPTIONS.find(r => r.id === selectedRibbon)?.colorHex,
                      }}
                    />
                    <span>Ribbon: {RIBBON_OPTIONS.find(r => r.id === selectedRibbon)?.name}</span>
                  </div>
                  <div className="text-gold-300 font-serif">
                    Card: &ldquo;{cardOccasion}&rdquo; to {cardRecipient || "Dear One"}
                  </div>
                </div>
              </div>

              {/* Calligraphy Card Highlight */}
              <div className="p-5 rounded-3xl bg-white dark:bg-zinc-900 border border-gold-400/25 shadow-luxury">
                <span className="text-[10px] uppercase font-bold text-gold-600 tracking-wider">
                  Enclosed Calligraphy Message
                </span>
                <blockquote className="font-script text-xl text-maroon-800 dark:text-gold-200 mt-2">
                  &ldquo;{cardMessage}&rdquo;
                </blockquote>
                <div className="text-right text-xs text-zinc-500 font-semibold mt-1">
                  — {cardSender || "Indrayani Confectioners"}
                </div>
              </div>
            </div>

            {/* Right: Itemized Cost Breakdown & Dispatch */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-gradient-to-br from-gold-50/80 via-amber-50/50 to-white dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-800 p-6 sm:p-7 rounded-3xl border border-gold-400/40 shadow-luxury space-y-5">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-saffron-600 dark:text-gold-400 block mb-1">
                    Transparent Itemized Billing
                  </span>
                  <div className="space-y-2 text-xs text-zinc-600 dark:text-zinc-400 pt-2">
                    <div className="flex justify-between">
                      <span>Presentation Case ({currentStyleObj.name}):</span>
                      <span className="font-semibold text-zinc-800 dark:text-zinc-200">₹{packagingFee}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sweets Cost ({totalAssigned} compartments):</span>
                      <span className="font-semibold text-zinc-800 dark:text-zinc-200">₹{sweetsPrice}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Estimated Net Weight:</span>
                      <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                        {boxSize === 4 ? "~500g Net" : boxSize === 6 ? "~750g Net" : "~1.2kg Net"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Satin Ribbon & Calligraphy Card:</span>
                      <span className="text-emerald-600 font-bold">Complimentary (₹0)</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gold-300/40 dark:border-zinc-700 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-zinc-500 block">Total Gifting Value:</span>
                    <span className="font-serif font-bold text-3xl text-maroon-800 dark:text-gold-300">
                      ₹{estimatedPrice}
                    </span>
                  </div>

                  <div className="text-right">
                    <span
                      className={`text-xs font-bold block ${
                        remainingSlots === 0 ? "text-emerald-600" : "text-amber-600"
                      }`}
                    >
                      {remainingSlots === 0 ? "✓ Ready to Handcraft" : `${remainingSlots} open slots`}
                    </span>
                    <span className="text-[10px] text-zinc-400">All Taxes Included</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-3 pt-2">
                  <button
                    onClick={handleAddToCart}
                    disabled={totalAssigned === 0}
                    className="w-full py-4 bg-gradient-to-r from-maroon-700 via-maroon-800 to-maroon-900 hover:from-maroon-800 hover:to-black disabled:opacity-50 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-luxury hover:shadow-luxury-hover transition-all flex items-center justify-center gap-2 active:scale-95"
                  >
                    <ShoppingBag className="w-4 h-4 text-gold-300" />
                    <span>Add Custom Box to Cart</span>
                  </button>

                  <button
                    onClick={handleWhatsAppOrder}
                    className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Pre-Order & Send Hamper on WhatsApp</span>
                  </button>
                </div>
              </div>

              <div className="text-center">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="text-xs text-zinc-500 hover:text-maroon-700 underline font-medium"
                >
                  Edit Configuration from Step 1
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* [ADDED] Authentic Instagram Gifting Lookbook & Inspiration */}
      <div className="pt-12 border-t border-gold-400/20">
        <SocialGallerySection
          title="Royal Gifting Lookbook & Instagram Hamper Inspiration"
          titleMr="इंद्रायणी खास भेटपेटी व हॅम्पर प्रेरणा"
          subtitle="Authentic bespoke gift hampers hand-tied with zari ribbons and crafted for Bhosari MIDC corporate honors and grand Pune weddings. Tap 'Pre-load Into Box' to immediately personalize any curated design."
          badgeText="AUTHENTIC INSTAGRAM DISPATCH • @indrayani_sweets_corner"
          posts={CURATED_SOCIAL_POSTS.filter(p => p.category === "gifting")}
          onSelectPost={handlePreloadGiftingPost}
          ctaText="Follow @indrayani_sweets_corner for Festive Collections"
          ctaUrl="https://www.instagram.com/indrayani_sweets_corner/"
        />
      </div>

      {/* =========================================================================
          PERSISTENT MOBILE ACTION BAR (Fixed on Steps 1-3 for One-Handed Ergonomics)
      ========================================================================== */}
      {/* [FIXED] Positioned cleanly above native mobile bottom navigation bar with safe area inset */}
      {currentStep < 4 && (
        <div className="md:hidden fixed bottom-[calc(60px+env(safe-area-inset-bottom,0px))] inset-x-0 z-40 bg-zinc-950/95 backdrop-blur-xl border-t border-gold-400/30 p-3 shadow-2xl">
          <div className="flex items-center justify-between gap-3 max-w-lg mx-auto">
            <div>
              <div className="font-serif font-bold text-lg text-gold-300 leading-tight">
                ₹{estimatedPrice}
              </div>
              <div className="text-[10px] text-zinc-300">
                {totalAssigned}/{boxSize} slots filled
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentStep(4)}
                className="px-3 py-2.5 rounded-xl bg-white/10 text-white text-xs font-semibold border border-white/20"
              >
                Review
              </button>
              <button
                onClick={() => setCurrentStep((currentStep + 1) as 1 | 2 | 3 | 4)}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-saffron-600 to-amber-500 text-white text-xs font-bold shadow-md flex items-center gap-1.5 active:scale-95"
              >
                <span>Next</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
