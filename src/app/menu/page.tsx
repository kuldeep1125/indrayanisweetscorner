"use client";

// [REFACTORED] Award-Winning Artisanal Halwai & Breakfast Catalog
// Overhauled with luxury confectionery aesthetics, multilingual live search,
// rich dietary badges, interactive weight/portion tickers, and comprehensive Halwai Craft dossiers.
import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { useShop } from "@/context/ShopContext";
import { PRODUCTS, ProductCategory, ProductItem } from "@/data/products";
import confetti from "canvas-confetti";
import {
  Search,
  ShoppingBag,
  Info,
  X,
  Flame,
  Sparkles,
  Award,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Star,
  ChevronRight,
  Plus,
  Minus,
} from "lucide-react";
// [ADDED] Verified Social Media & Authentic Craft Integration
import SocialGallerySection from "@/components/SocialGallerySection";
import { CURATED_SOCIAL_POSTS } from "@/data/socialMedia";

export default function MenuPage() {
  // [FIXED] Full cart state integration for quick-commerce add/stepper and floating bottom summary
  const { addToCart, updateQuantity, cart, totalItemCount, cartTotal, setIsCartOpen } = useShop();

  const [activeCategory, setActiveCategory] = useState<ProductCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPureGhee, setFilterPureGhee] = useState(false);
  const [filterBestseller, setFilterBestseller] = useState(false);
  const [selectedProductDetails, setSelectedProductDetails] = useState<ProductItem | null>(null);

  // Dynamic weight selections per item
  const [weights, setWeights] = useState<Record<string, string>>({});

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedProductDetails(null);
      }
    };
    if (selectedProductDetails) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedProductDetails]);

  const categories: { key: ProductCategory; label: string; count: number }[] = useMemo(() => {
    return [
      { key: "all", label: "All Items • संपूर्ण मेनू", count: PRODUCTS.length },
      { key: "traditional_mithai", label: "Traditional Mithai • पारंपरिक मिठाई", count: PRODUCTS.filter(p => p.category === "traditional_mithai").length },
      { key: "dry_fruit_specials", label: "Dry Fruit Specials • सुकामेवा", count: PRODUCTS.filter(p => p.category === "dry_fruit_specials").length },
      { key: "breakfast_snacks", label: "Morning Breakfast • गरमागरम नाश्ता", count: PRODUCTS.filter(p => p.category === "breakfast_snacks").length },
      { key: "namkeen_savouries", label: "Namkeen & Savouries • फरसाण", count: PRODUCTS.filter(p => p.category === "namkeen_savouries").length },
      { key: "bengali_delights", label: "Bengali Delights • बंगाली मिठाई", count: PRODUCTS.filter(p => p.category === "bengali_delights").length },
      { key: "festive_hampers", label: "Festive Hampers • उत्सव हॅम्पर", count: PRODUCTS.filter(p => p.category === "festive_hampers").length },
    ];
  }, []);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      // Category filter
      if (activeCategory !== "all" && p.category !== activeCategory) {
        return false;
      }
      // Pure Ghee filter
      if (filterPureGhee && !p.isPureGhee) {
        return false;
      }
      // Bestseller filter
      if (filterBestseller && !p.isBestseller) {
        return false;
      }
      // Search filter across English, Marathi, Hindi and descriptions
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          p.name.toLowerCase().includes(q) ||
          p.nameMr.toLowerCase().includes(q) ||
          p.nameHi.toLowerCase().includes(q) ||
          p.shortDesc.toLowerCase().includes(q) ||
          p.ingredients.some(ing => ing.toLowerCase().includes(q)) ||
          p.tags.some(tag => tag.toLowerCase().includes(q));
        if (!matches) return false;
      }
      return true;
    });
  }, [activeCategory, filterPureGhee, filterBestseller, searchQuery]);

  const getWeightForProduct = (p: ProductItem) => {
    return weights[p.id] || (p.unit === "kg" ? "500g" : p.unit === "plate" ? "1 plate" : "1 piece");
  };

  const handleWeightSelect = (productId: string, weight: string) => {
    setWeights(prev => ({ ...prev, [productId]: weight }));
  };

  const calculatePrice = (p: ProductItem, weight: string) => {
    if (p.fixedPrice) return p.fixedPrice;
    if (!p.pricePerKg) return 0;
    if (weight === "250g") return Math.round(p.pricePerKg * 0.25);
    if (weight === "500g") return Math.round(p.pricePerKg * 0.5);
    return p.pricePerKg;
  };

  // [ADDED] Quick-commerce cart lookup helper for fluid quantity steppers
  const getCartItemForProduct = (productId: string, weight: string) => {
    return cart.find(
      item => item.product?.id === productId && item.weightOption === weight
    );
  };

  const handleAddToCartWithCelebration = (p: ProductItem, weight: string) => {
    // [FIXED] Pass openDrawer=false to allow uninterrupted browsing on mobile while updating the live floating cart bar
    addToCart(p, weight, 1, false);
    try {
      confetti({
        particleCount: 35,
        spread: 45,
        origin: { y: 0.85 },
        colors: ["#D4AF37", "#D95D1E", "#681622"],
      });
    } catch {
      // Ignored
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Editorial Luxury Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
        <div className="inline-flex max-w-full flex-wrap items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gold-400/10 border border-gold-400/30 text-saffron-600 dark:text-gold-300 text-[11px] sm:text-xs font-bold tracking-wider uppercase text-center">
          <Sparkles className="w-3.5 h-3.5 flex-shrink-0" />
          <span>The Artisanal Halwai Collection • अस्सल पारंपरिक मिठाई</span>
        </div>

        <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-zinc-950 dark:text-zinc-50 tracking-tight leading-tight">
          Handcrafted Mithai & Morning Savouries
        </h1>

        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-2xl mx-auto">
          Simmered daily in Bhosari with 100% pure cow ghee, slow-reduced mawa, and single-origin saffron.
          Explore signature sweets, festive modaks, and morning breakfast heroes prepared fresh every dawn.
        </p>

        {/* Quality Pillars */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-[11px] font-semibold text-zinc-500">
          <span className="flex items-center gap-1.5 bg-white dark:bg-zinc-900 px-3 py-1.5 rounded-full border border-gold-400/20 shadow-xs">
            <Flame className="w-3.5 h-3.5 text-amber-500" /> 100% Desi Cow Ghee
          </span>
          <span className="flex items-center gap-1.5 bg-white dark:bg-zinc-900 px-3 py-1.5 rounded-full border border-gold-400/20 shadow-xs">
            <Clock className="w-3.5 h-3.5 text-emerald-500" /> Fresh Daily at 7:00 AM
          </span>
          <span className="flex items-center gap-1.5 bg-white dark:bg-zinc-900 px-3 py-1.5 rounded-full border border-gold-400/20 shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-500" /> 100% Eggless & Vegetarian
          </span>
        </div>
      </div>

      {/* Search & Filter Concierge */}
      <div className="bg-white dark:bg-zinc-900 p-4 sm:p-6 rounded-3xl border border-gold-400/25 shadow-luxury space-y-4">
        {/* Search Bar & Quick Toggles */}
        <div className="flex flex-col md:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search delicacies (Poha, Kaju Katli, Modak, Samosa... English, मराठी, हिंदी)"
              aria-label="Search delicacies"
              className="w-full pl-11 pr-10 py-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/60 text-base sm:text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 p-1"
                aria-label="Clear search query"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Filter Buttons */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <button
              onClick={() => setFilterPureGhee(!filterPureGhee)}
              className={`flex-1 md:flex-none flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2.5 sm:py-3 rounded-2xl text-xs font-bold transition-all border ${
                filterPureGhee
                  ? "bg-amber-600 text-white border-amber-600 shadow-sm"
                  : "bg-amber-50/80 dark:bg-zinc-800 text-amber-900 dark:text-amber-200 border-amber-300/40 hover:bg-amber-100"
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>Pure Ghee Only</span>
            </button>

            <button
              onClick={() => setFilterBestseller(!filterBestseller)}
              className={`flex-1 md:flex-none flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2.5 sm:py-3 rounded-2xl text-xs font-bold transition-all border ${
                filterBestseller
                  ? "bg-saffron-600 text-white border-saffron-600 shadow-sm"
                  : "bg-saffron-50/80 dark:bg-zinc-800 text-saffron-900 dark:text-saffron-200 border-saffron-300/40 hover:bg-saffron-100"
              }`}
            >
              <Star className="w-3.5 h-3.5" />
              <span>Bestsellers</span>
            </button>
          </div>
        </div>

        {/* [ADDED] Quick-Tap Search Inspiration Chips for One-Handed Mobile Browsing */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pt-1 text-[11px] text-zinc-500">
          <span className="font-bold text-maroon-700 dark:text-gold-400 shrink-0">Popular:</span>
          {["Kaju Katli", "Motichoor Ladoo", "Kanda Poha", "Ukadiche Modak", "Samosa", "Bhakarwadi"].map(item => (
            <button
              key={item}
              onClick={() => setSearchQuery(item)}
              className="px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 hover:text-gold-400 border border-zinc-200 dark:border-zinc-700 whitespace-nowrap active:scale-95 text-[10px] font-semibold"
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* [ADDED] Sticky Category Navigation Bar for Instant Mobile Quick-Jump */}
      <div className="sticky top-16 sm:top-20 z-30 bg-white/95 dark:bg-[#120B09]/95 backdrop-blur-xl p-2.5 sm:p-3.5 rounded-2xl border border-gold-400/30 shadow-md -mx-2 sm:mx-0">
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto scrollbar-none py-0.5">
          {categories.map(cat => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 active:scale-95 shrink-0 ${
                activeCategory === cat.key
                  ? "bg-gradient-to-r from-saffron-600 via-amber-600 to-gold-500 text-white shadow-md ring-1 ring-gold-300/40"
                  : "bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 hover:bg-gold-400/10 hover:text-gold-700 border border-zinc-200/60 dark:border-zinc-700"
              }`}
            >
              <span>{cat.label.split("•")[0].trim()}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                activeCategory === cat.key ? "bg-black/25 text-white" : "bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-400"
              }`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* [REFACTORED] High-Density Quick-Commerce 2-Column Mobile Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
        {filteredProducts.map(p => {
          const currentWeight = getWeightForProduct(p);
          const price = calculatePrice(p, currentWeight);
          const cartItem = getCartItemForProduct(p.id, currentWeight);

          return (
            <div
              key={p.id}
              className="bg-white dark:bg-zinc-900 rounded-2xl sm:rounded-3xl border border-gold-400/20 overflow-hidden shadow-luxury hover:shadow-luxury-hover flex flex-col justify-between group hover:-translate-y-1 transition-all duration-300"
            >
              {/* Product Visual Banner */}
              <div className="relative h-36 sm:h-52 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Badges Overlay */}
                <div className="absolute top-2 left-2 flex flex-wrap gap-1 z-10">
                  {p.isBestseller && (
                    <span className="bg-saffron-600 text-white text-[8px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full shadow-md flex items-center gap-0.5">
                      <Star className="w-2.5 h-2.5 fill-white" />
                      <span className="hidden xs:inline">Bestseller</span>
                    </span>
                  )}
                  {p.isPureGhee && (
                    <span className="bg-amber-600 text-white text-[8px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full shadow-md flex items-center gap-0.5">
                      <Flame className="w-2.5 h-2.5 fill-white" />
                      <span>Ghee</span>
                    </span>
                  )}
                  {p.isFestiveSpecial && (
                    <span className="bg-maroon-700 text-white text-[8px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full shadow-md hidden sm:inline">
                      Festive
                    </span>
                  )}
                </div>

                {/* Inspect Recipe/Nutrients Action */}
                <button
                  onClick={() => setSelectedProductDetails(p)}
                  className="absolute bottom-2 right-2 bg-black/75 hover:bg-black/90 backdrop-blur-md text-white w-7 h-7 sm:w-9 sm:h-9 rounded-full text-xs shadow-md transition-all hover:scale-110 z-10 flex items-center justify-center active:scale-90"
                  title="View Ingredients, Allergens & Halwai Notes"
                  aria-label={`View recipe dossier for ${p.name}`}
                >
                  <Info className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </div>

              {/* Product Information Body */}
              <div className="p-2.5 sm:p-5 flex-1 flex flex-col justify-between space-y-2.5 sm:space-y-4">
                <div>
                  <h3 className="font-serif font-bold text-xs sm:text-base text-zinc-900 dark:text-zinc-100 group-hover:text-maroon-700 dark:group-hover:text-gold-300 transition-colors line-clamp-1">
                    {p.name}
                  </h3>
                  <div className="text-[10px] sm:text-[11px] text-zinc-400 font-medium font-serif truncate mt-0.5">
                    {p.nameMr}
                  </div>
                  <p className="hidden sm:block text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 mt-2 leading-relaxed">
                    {p.shortDesc}
                  </p>
                </div>

                {/* Portions & Price Section */}
                <div className="space-y-2 sm:space-y-3 pt-2 sm:pt-3 border-t border-zinc-100 dark:border-zinc-800">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] sm:text-xs text-zinc-500 font-medium">{currentWeight}:</span>
                    <span className="font-serif font-bold text-sm sm:text-xl text-maroon-800 dark:text-gold-300">
                      ₹{price}
                    </span>
                  </div>

                  {/* Weight Options Selector */}
                  {p.unit === "kg" ? (
                    <div className="grid grid-cols-3 gap-1">
                      {["250g", "500g", "1kg"].map(w => (
                        <button
                          key={w}
                          onClick={() => handleWeightSelect(p.id, w)}
                          className={`min-h-[28px] sm:min-h-[38px] py-1 text-[9px] sm:text-xs font-bold rounded-lg sm:rounded-xl border transition-all active:scale-95 flex items-center justify-center ${
                            currentWeight === w
                              ? "bg-maroon-700 text-white border-maroon-700 shadow-xs"
                              : "bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:border-gold-400"
                          }`}
                        >
                          {w}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="text-[9px] sm:text-[11px] text-zinc-400 italic bg-zinc-50 dark:bg-zinc-800/40 p-1 rounded-lg text-center min-h-[28px] sm:min-h-[38px] flex items-center justify-center truncate">
                      Per {p.unit}
                    </div>
                  )}

                  {/* Quick-Commerce Stepper or Tactile ADD Button */}
                  {cartItem && cartItem.quantity > 0 ? (
                    <div className="w-full min-h-[36px] sm:min-h-[44px] py-1 px-2 bg-gradient-to-r from-maroon-700 to-maroon-800 text-white rounded-xl shadow-md flex items-center justify-between">
                      <button
                        onClick={() => updateQuantity(cartItem.id, -1)}
                        className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-lg hover:bg-black/30 active:scale-90 transition-transform text-white font-bold"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="font-extrabold text-xs sm:text-sm text-gold-300">
                        {cartItem.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(cartItem.id, 1)}
                        className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-lg hover:bg-black/30 active:scale-90 transition-transform text-white font-bold"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleAddToCartWithCelebration(p, currentWeight)}
                      className="w-full min-h-[36px] sm:min-h-[44px] py-2 sm:py-3 px-3 bg-gradient-to-r from-saffron-600 via-saffron-500 to-amber-500 hover:from-saffron-500 hover:to-amber-400 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1.5 active:scale-95"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>ADD</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* [ADDED] Blinkit / Swiggy Style Persistent Floating Cart Summary Bar */}
      {totalItemCount > 0 && (
        <div className="fixed bottom-[calc(68px+env(safe-area-inset-bottom,0px))] md:bottom-6 inset-x-3 sm:inset-x-6 max-w-lg mx-auto z-40 animate-slideUp">
          <button
            onClick={() => setIsCartOpen(true)}
            aria-label="View shopping cart"
            className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-maroon-800 via-maroon-900 to-saffron-800 text-white shadow-2xl border border-gold-400/50 flex items-center justify-between active:scale-[0.98] transition-transform backdrop-blur-md"
          >
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="w-8 h-8 rounded-xl bg-gold-400/20 text-gold-300 flex items-center justify-center font-bold text-xs border border-gold-400/30">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                  <span>{totalItemCount} {totalItemCount === 1 ? "Item" : "Items"}</span>
                  <span className="text-gold-300">•</span>
                  <span className="text-gold-300 font-serif">₹{cartTotal}</span>
                </div>
                <div className="text-[10px] text-zinc-300">
                  Tap to view sweets in box & checkout
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs font-bold text-gold-300 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-xl border border-gold-400/30">
              <span>View Cart</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </button>
        </div>
      )}

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-16 space-y-4 bg-white dark:bg-zinc-900 rounded-3xl border border-gold-400/20 p-8 shadow-sm">
          <p className="font-serif text-lg text-zinc-700 dark:text-zinc-300">
            No confections found matching your search.
          </p>
          <p className="text-xs text-zinc-500">
            Try adjusting your search terms or resetting dietary filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setActiveCategory("all");
              setFilterPureGhee(false);
              setFilterBestseller(false);
            }}
            className="px-5 py-2.5 bg-saffron-600 hover:bg-saffron-500 text-white text-xs font-bold rounded-xl transition-all shadow-md"
          >
            Reset All Filters
          </button>
        </div>
      )}

      {/* [ADDED] Behind the Halwai Kadhai • Instagram Craft Highlights */}
      <div className="pt-8 border-t border-gold-400/20">
        <SocialGallerySection
          title="Behind the Halwai Kadhai • Craft & Breakfast Highlights"
          titleMr="इंद्रायणी कढईतील अस्सल कला व नाश्ता"
          subtitle="Glimpse the dawn boiling of pure milk mawa, golden desi ghee boondi drops, and 7:00 AM steaming kanda poha as shared with our local Bhosari community."
          badgeText="AUTHENTIC INSTAGRAM DISPATCH • @indrayani_sweets_corner"
          posts={CURATED_SOCIAL_POSTS.filter(p => p.category === "craft" || p.category === "breakfast" || p.category === "festive")}
          ctaText="Watch Kitchen Reels on Instagram @indrayani_sweets_corner"
          ctaUrl="https://www.instagram.com/indrayani_sweets_corner/"
        />
      </div>

      {/* Confectionery Charter Banner */}
      <div className="bg-gradient-to-r from-gold-50/80 via-amber-50/50 to-white dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 rounded-3xl border border-gold-400/30 p-8 sm:p-10 shadow-luxury grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        <div className="space-y-2 md:col-span-2">
          <span className="text-xs font-bold uppercase tracking-wider text-saffron-600">
            Bhosari Kitchen Charter
          </span>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            The Indrayani Promise of Pure Cow Ghee & Daily Freshness
          </h3>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
            Every sweet on this menu is crafted under strict hygiene protocols using single-source dairy mawa, edible silver vark, and fresh spices. Zero hydrogenated oils, zero compromises.
          </p>
        </div>

        <div className="text-left md:text-right">
          <a
            href="/custom-box"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-maroon-700 hover:bg-maroon-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all hover:scale-105"
          >
            <span>Create Custom Gift Box</span>
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Ingredient & Halwai Craft Modal */}
      {selectedProductDetails && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-craft-title"
          className="fixed inset-0 z-50 overflow-y-auto p-4 flex items-center justify-center"
        >
          <div
            onClick={() => setSelectedProductDetails(null)}
            className="fixed inset-0 bg-black/70 backdrop-blur-md transition-opacity"
            aria-hidden="true"
          />
          <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white dark:bg-zinc-900 border border-gold-400/40 rounded-3xl p-5 sm:p-8 shadow-2xl z-10 space-y-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-gold-600 font-bold">
                  Halwai Craft Dossier
                </span>
                <h3 id="modal-craft-title" className="font-serif font-bold text-lg sm:text-xl text-zinc-900 dark:text-zinc-100 mt-0.5">
                  {selectedProductDetails.name}
                </h3>
                <p className="text-xs text-zinc-500 font-serif">{selectedProductDetails.nameMr}</p>
              </div>
              <button
                onClick={() => setSelectedProductDetails(null)}
                aria-label="Close craft dossier"
                className="w-10 h-10 flex items-center justify-center rounded-full text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors flex-shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative h-44 rounded-2xl overflow-hidden border border-gold-400/20">
              <Image
                src={selectedProductDetails.image}
                alt={selectedProductDetails.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <h4 className="font-bold text-zinc-800 dark:text-zinc-200 mb-1.5 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Sourced Ingredients:</span>
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProductDetails.ingredients.map((ing, i) => (
                    <span
                      key={i}
                      className="bg-gold-50 dark:bg-gold-950/40 text-gold-900 dark:text-gold-200 border border-gold-400/30 px-2.5 py-1 rounded-lg"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-zinc-800 dark:text-zinc-200 mb-1.5 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-600" />
                  <span>Allergen Information:</span>
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProductDetails.allergens.map((all, i) => (
                    <span
                      key={i}
                      className="bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-200 border border-amber-300/40 px-2.5 py-1 rounded-lg"
                    >
                      {all}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-zinc-800 dark:text-zinc-200 mb-1.5 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-saffron-600" />
                  <span>Culinary Tags:</span>
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProductDetails.tags.map((t, i) => (
                    <span
                      key={i}
                      className="bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-300/40 px-2.5 py-1 rounded-lg"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => setSelectedProductDetails(null)}
              className="w-full py-3 bg-maroon-700 hover:bg-maroon-800 text-white font-bold text-xs rounded-xl shadow-md transition-all"
            >
              Close Dossier
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
