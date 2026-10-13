"use client";

// [REFACTORED] Award-Winning Patron Chronicles & 1-Click Google Business Trust Suite
// Features: Direct Google review popup trigger, dynamic combinatorial 5-star review synthesis (200,000+ unique variations),
// automatic 1-click clipboard pre-fill, automatically pre-filled on-page & modal review forms, verified social proof scorecard,
// category-wise rating benchmarks, and bilingual customer excerpts.
import React, { useState, useMemo, useEffect } from "react";
import { REVIEWS, REVIEW_AUDIT } from "@/data/reviews";
import { SHOP_DATA } from "@/data/shopData";
import { generateUnique5StarReview, GeneratedReview } from "@/data/uniqueReviewGenerator";
import confetti from "canvas-confetti";
import {
  Star,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Send,
  ThumbsUp,
  Sparkles,
  Copy,
  RefreshCw,
  X,
  ArrowDown,
} from "lucide-react";
// [ADDED] Verified Social Media & Authentic Instagram Proof
import SocialGallerySection from "@/components/SocialGallerySection";
import { CURATED_SOCIAL_POSTS } from "@/data/socialMedia";

type ReviewCategoryFilter = "all" | "breakfast" | "mithai" | "festival";

export default function ReviewsPage() {
  const [activeFilter, setActiveFilter] = useState<ReviewCategoryFilter>("all");

  // [ADDED] 1-Click Unique Review Concierge State
  const [activeUniqueReview, setActiveUniqueReview] = useState<GeneratedReview>(() => generateUnique5StarReview("all"));
  const [copiedToast, setCopiedToast] = useState(false);
  const [isGoogleModalOpen, setIsGoogleModalOpen] = useState(false);
  const [isPreFilledModalOpen, setIsPreFilledModalOpen] = useState(false);
  const [presetCategory, setPresetCategory] = useState<string>("all");

  // [FIXED] Automatically pre-fill the form on initial render with 5 stars and unique text
  const [formName, setFormName] = useState(() => activeUniqueReview.suggestedName);
  const [formRating, setFormRating] = useState(5);
  const [formCategory, setFormCategory] = useState<string>("Traditional Mithai");
  const [formFeedback, setFormFeedback] = useState(() => activeUniqueReview.text);
  const [submitted, setSubmitted] = useState(false);

  // [ADDED] Keyboard navigation & Escape key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsGoogleModalOpen(false);
        setIsPreFilledModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filteredReviews = useMemo(() => {
    if (activeFilter === "all") return REVIEWS;
    return REVIEWS.filter(r => r.highlightCategory === activeFilter);
  }, [activeFilter]);

  // [ADDED] Regenerate a completely unique, non-repeating 5-star review on demand
  const handleRegenerate = (category = presetCategory) => {
    setPresetCategory(category);
    const newRev = generateUnique5StarReview(category);
    setActiveUniqueReview(newRev);
    setFormFeedback(newRev.text);
    setFormName(newRev.suggestedName);
    setFormRating(5);
    setCopiedToast(false);
  };

  // [ADDED] 1-Click Automated Google Review Flow:
  // 1. Copies the unique 5-star text to clipboard
  // 2. Triggers celebratory confetti
  // 3. Opens Google's direct write-review dialog (#lrd=CID,3) in new tab
  // 4. Displays clear step-by-step guidance modal (Select 5 stars -> Paste review)
  const handleOneClickGoogleReview = (customText?: string) => {
    const textToCopy = customText || formFeedback || activeUniqueReview.text;

    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        navigator.clipboard.writeText(textToCopy);
      }
    } catch {
      // Handled silently
    }

    setCopiedToast(true);
    setIsGoogleModalOpen(true);
    setIsPreFilledModalOpen(false);

    try {
      confetti({
        particleCount: 65,
        spread: 75,
        origin: { y: 0.6 },
        colors: ["#D4AF37", "#D95D1E", "#10B981", "#681622"],
      });
    } catch {
      // Ignored
    }

    if (typeof window !== "undefined") {
      window.open(SHOP_DATA.googleWriteReviewUrl, "_blank", "noopener,noreferrer");
    }
  };

  // [ADDED] Scroll smoothly to the on-page pre-filled review form
  const handleScrollToPreFilledForm = () => {
    const formEl = document.getElementById("local-review-form");
    if (formEl) {
      formEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formFeedback.trim()) return;
    setSubmitted(true);
    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.7 },
        colors: ["#D4AF37", "#D95D1E", "#681622"],
      });
    } catch {
      // Ignored
    }
  };

  const getRatingReaction = (rating: number) => {
    switch (rating) {
      case 5:
        return "Royal Excellence! We are deeply honored by your love.";
      case 4:
        return "Wonderful! Thank you for trusting Indrayani Sweet Corner.";
      case 3:
        return "Good. We will continue striving for perfection.";
      default:
        return "Thank you for helping us improve our halwai craft.";
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Editorial Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
        <div className="inline-flex max-w-full flex-wrap items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gold-400/10 border border-gold-400/30 text-saffron-600 dark:text-gold-300 text-[11px] sm:text-xs font-bold tracking-wider uppercase text-center">
          <ShieldCheck className="w-3.5 h-3.5 flex-shrink-0" />
          <span>Patron Chronicles & Trust • ग्राहक अनुभव व विश्वास</span>
        </div>

        <h1 className="font-serif text-xl xs:text-2xl sm:text-4xl lg:text-5xl font-bold text-zinc-950 dark:text-zinc-50 tracking-tight leading-tight break-words text-balance">
          Voices of Bhosari & Pimpri-Chinchwad
        </h1>

        <p className="font-script text-xl sm:text-2xl text-maroon-700 dark:text-gold-300">
          Honest feedback that has shaped our kitchen since dawn.
        </p>

        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-2xl mx-auto">
          Read transparent, verified testimonials from local residents, MIDC industrial engineers, and festive families who savor our pure cow ghee sweets and morning breakfast daily.
        </p>
      </div>

      {/* Verified Google Business Profile Scorecard */}
      <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-gold-400/35 p-5 sm:p-10 shadow-luxury">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Rating Big Number & Pre-Filled Launch */}
          <div className="lg:col-span-5 text-center lg:text-left space-y-3.5 border-b lg:border-b-0 lg:border-r border-zinc-200 dark:border-zinc-800 pb-6 lg:pb-0 lg:pr-8">
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
              Verified Google Business Profile
            </span>

            <div className="flex items-center justify-center lg:justify-start gap-4">
              <span className="font-serif font-bold text-5xl sm:text-6xl text-maroon-800 dark:text-gold-300">
                {SHOP_DATA.rating.average}
              </span>
              <div>
                <div className="flex text-amber-400">
                  {[...Array(4)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400" />
                  ))}
                  <Star className="w-5 h-5 text-amber-400 fill-amber-400/30" />
                </div>
                <div className="text-xs text-zinc-500 font-semibold mt-1">
                  Based on {SHOP_DATA.rating.reviewCount} Local Google Reviews
                </div>
              </div>
            </div>

            <p className="text-xs text-zinc-500 leading-relaxed">
              Serving Indrayani Nagar, S-Block, and MIDC Bhosari with fresh sweets daily.
            </p>

            {/* [ADDED] 1-Click 5-Star Actions: Open Modal & Scroll to Auto-Filled Form */}
            <div className="pt-2 space-y-2">
              <button
                onClick={() => setIsPreFilledModalOpen(true)}
                className="w-full min-h-[46px] px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-white text-xs font-bold shadow-lg transition-all flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-95"
              >
                <Star className="w-4 h-4 fill-white" />
                <span>Open Pre-Filled 5★ Review Form ⚡</span>
                <Sparkles className="w-3.5 h-3.5" />
              </button>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                <button
                  onClick={handleScrollToPreFilledForm}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-maroon-50 dark:bg-zinc-800 border border-maroon-400/30 text-[11px] font-bold text-maroon-800 dark:text-gold-300 hover:bg-maroon-100 transition-colors shadow-xs"
                >
                  <span>Go to Auto-Filled Form Below</span>
                  <ArrowDown className="w-3 h-3" />
                </button>

                <a
                  href={SHOP_DATA.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gold-50 dark:bg-zinc-800 border border-gold-400/30 text-[11px] font-bold text-maroon-700 dark:text-gold-300 hover:bg-gold-100 transition-colors shadow-xs"
                >
                  <span>Verify on Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Category Breakdown Matrices */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="font-serif font-bold text-sm sm:text-base text-zinc-900 dark:text-zinc-100">
              Category Rating Benchmarks:
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-700/80 flex items-center justify-between">
                <div>
                  <div className="font-serif font-bold text-xs text-zinc-900 dark:text-zinc-100">
                    Morning Breakfast & Poha
                  </div>
                  <div className="text-[10px] text-zinc-400">7:00 AM Fresh Batch</div>
                </div>
                <div className="text-right">
                  <span className="font-serif font-bold text-sm text-emerald-600 dark:text-emerald-400">
                    4.9 ★
                  </span>
                  <div className="text-[9px] text-zinc-400">Bhosari Favorite</div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-700/80 flex items-center justify-between">
                <div>
                  <div className="font-serif font-bold text-xs text-zinc-900 dark:text-zinc-100">
                    Shuddh Desi Ghee Mithai
                  </div>
                  <div className="text-[10px] text-zinc-400">Motichoor & Kaju Katli</div>
                </div>
                <div className="text-right">
                  <span className="font-serif font-bold text-sm text-emerald-600 dark:text-emerald-400">
                    4.8 ★
                  </span>
                  <div className="text-[9px] text-zinc-400">Pure Ghee Rating</div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-700/80 flex items-center justify-between">
                <div>
                  <div className="font-serif font-bold text-xs text-zinc-900 dark:text-zinc-100">
                    Festive Hampers & Modak
                  </div>
                  <div className="text-[10px] text-zinc-400">Diwali & Ganesh Utsav</div>
                </div>
                <div className="text-right">
                  <span className="font-serif font-bold text-sm text-emerald-600 dark:text-emerald-400">
                    4.7 ★
                  </span>
                  <div className="text-[9px] text-zinc-400">Pre-Order Trust</div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-700/80 flex items-center justify-between">
                <div>
                  <div className="font-serif font-bold text-xs text-zinc-900 dark:text-zinc-100">
                    Service & Packaging
                  </div>
                  <div className="text-[10px] text-zinc-400">Counter Hygiene</div>
                </div>
                <div className="text-right">
                  <span className="font-serif font-bold text-sm text-emerald-600 dark:text-emerald-400">
                    4.6 ★
                  </span>
                  <div className="text-[9px] text-zinc-400">Speed & Courtesy</div>
                </div>
              </div>
            </div>

            {/* Official Hygiene & Evolution Guarantee */}
            <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-400/30 text-xs text-emerald-900 dark:text-emerald-200 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong>Transparency & Hygiene Evolution:</strong> {REVIEW_AUDIT.officialCommitment}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          [ADDED] 1-CLICK 5-STAR GOOGLE REVIEW CONCIERGE (COMBINATORIAL SYNTHESIS)
      ========================================================================== */}
      <section className="bg-gradient-to-br from-amber-500/10 via-maroon-900/5 to-amber-600/10 dark:from-amber-950/30 dark:via-zinc-900 dark:to-amber-900/20 rounded-3xl border-2 border-gold-400/40 p-5 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gold-400/20 pb-5">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-saffron-500/15 border border-saffron-400/40 text-saffron-600 dark:text-gold-300 text-[10px] sm:text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 flex-shrink-0" />
              <span>1-Click 5-Star Google Review Concierge • झटपट ५-स्टार गुगल रिव्ह्यू</span>
            </div>
            <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-zinc-900 dark:text-zinc-50">
              Leave a 5-Star Google Review in 1 Click
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 max-w-2xl leading-relaxed">
              Every click automatically generates a 100% unique, authentic review from over 200,000+ combinations, automatically copies it to your clipboard, and launches the official Google Review form!
            </p>
          </div>

          <div className="shrink-0 flex flex-wrap gap-2">
            <button
              onClick={() => setIsPreFilledModalOpen(true)}
              className="w-full sm:w-auto min-h-[48px] px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-white font-bold text-xs sm:text-sm shadow-xl transition-all flex items-center justify-center gap-2.5 active:scale-95 hover:scale-105"
            >
              <Star className="w-4 h-4 fill-white" />
              <span>Open Pre-Filled Review ⚡</span>
              <Sparkles className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Category Perspective Filters */}
        <div className="space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
            Choose Your Review Perspective / अभिप्राय प्रकार:
          </span>
          <div className="flex flex-wrap gap-2">
            {[
              { key: "all", label: "👑 All-Round Favorites", labelMr: "सर्वोत्तम अनुभव" },
              { key: "mithai", label: "🪔 Shuddh Desi Ghee Mithai", labelMr: "शुद्ध तुपातील मिठाई" },
              { key: "breakfast", label: "☕ Morning Breakfast & Poha", labelMr: "गरमागरम नाश्ता" },
              { key: "gifting", label: "🎁 Festive & Corporate Gifting", labelMr: "सण-उत्सव भेट" },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => handleRegenerate(tab.key)}
                className={`min-h-[40px] px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  presetCategory === tab.key
                    ? "bg-maroon-800 text-white shadow-md border border-gold-400"
                    : "bg-white/80 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:border-gold-400"
                }`}
              >
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Live Generated Unique Review Showcase Card */}
        <div className="bg-white/95 dark:bg-zinc-900/95 rounded-2xl border border-gold-400/40 p-4 sm:p-6 shadow-md space-y-3.5">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-3">
            <div className="flex items-center gap-2">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-md border border-emerald-300/40">
                5.0 ★ Guaranteed Unique
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] text-zinc-500 font-medium">
              <span>Suggested Patron:</span>
              <span className="font-bold text-zinc-800 dark:text-zinc-200">{activeUniqueReview.suggestedName}</span>
            </div>
          </div>

          <blockquote className="text-xs sm:text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed italic font-serif">
            &ldquo;{activeUniqueReview.text}&rdquo;
          </blockquote>

          <div className="pt-2 flex flex-wrap items-center justify-between gap-2.5">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => handleOneClickGoogleReview()}
                className="min-h-[44px] px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 active:scale-95"
              >
                {copiedToast ? <CheckCircle2 className="w-4 h-4 text-emerald-200" /> : <Copy className="w-4 h-4" />}
                <span>{copiedToast ? "Copied! Launching Google..." : "Copy & Open Google (1-Click)"}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => handleRegenerate()}
                className="min-h-[44px] px-3.5 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 font-semibold text-xs transition-all flex items-center gap-1.5 active:scale-95"
                title="Synthesize a completely new non-repeating review text"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Generate Another Unique Review</span>
              </button>
            </div>

            <button
              onClick={handleScrollToPreFilledForm}
              className="min-h-[44px] px-3 py-2 rounded-xl text-maroon-700 dark:text-gold-300 hover:bg-gold-50 dark:hover:bg-zinc-800 font-semibold text-xs transition-all flex items-center gap-1.5"
            >
              <span>View in Form Below ↓</span>
            </button>
          </div>
        </div>
      </section>

      {/* Review Category Filter Bar */}
      <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none px-1">
        {[
          { key: "all" as const, label: "All Reviews • सर्व प्रतिक्रिया" },
          { key: "mithai" as const, label: "Traditional Mithai • मिठाई" },
          { key: "breakfast" as const, label: "Morning Breakfast • नाश्ता" },
          { key: "festival" as const, label: "Festive Modaks • सण-उत्सव" },
        ].map(cat => (
          <button
            key={cat.key}
            onClick={() => setActiveFilter(cat.key)}
            className={`min-h-[40px] px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeFilter === cat.key
                ? "bg-maroon-700 text-white shadow-sm ring-1 ring-gold-400/40"
                : "bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 hover:border-gold-400"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReviews.map(rev => (
          <div
            key={rev.id}
            className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-gold-400/25 shadow-luxury hover:shadow-luxury-hover transition-all duration-300 flex flex-col justify-between space-y-4 group hover:-translate-y-1"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="font-serif font-bold text-base text-zinc-900 dark:text-zinc-100">
                    {rev.author}
                  </h4>
                  <div className="text-[11px] text-zinc-400 flex items-center gap-1.5 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{rev.source} • {rev.date}</span>
                  </div>
                </div>

                <div className="flex text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
              </div>

              <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed italic">
                &ldquo;{rev.text}&rdquo;
              </p>

              {rev.textMr && (
                <p className="text-[11px] text-zinc-500 leading-relaxed pt-1 border-t border-zinc-100 dark:border-zinc-800">
                  {rev.textMr}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between text-[11px] text-zinc-400 pt-3 border-t border-zinc-100 dark:border-zinc-800">
              <span className="font-medium text-maroon-700 dark:text-gold-300/80 capitalize">
                {rev.highlightCategory}
              </span>
              <div className="flex items-center gap-1 text-zinc-400">
                <ThumbsUp className="w-3 h-3" />
                <span>Verified Patron</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* [ADDED] Authentic Social Proof & Visual Patron Highlights */}
      <div className="pt-8 border-t border-gold-400/20">
        <SocialGallerySection
          title="Community Highlights & Instagram Patron Chronicles"
          titleMr="इंद्रायणी ग्राहक व समाज माध्यम संवाद"
          subtitle="Explore authentic festive moments, customer orders, and culinary dispatches direct from our verified Instagram account."
          badgeText="VERIFIED SOCIAL PROOF • @indrayani_sweets_corner"
          posts={CURATED_SOCIAL_POSTS}
          ctaText="Join Patrons on Instagram @indrayani_sweets_corner"
          ctaUrl="https://www.instagram.com/indrayani_sweets_corner/"
        />
      </div>

      {/* =========================================================================
          [FIXED] ON-PAGE REVIEW FORM (AUTOMATICALLY PRE-FILLED WITH 5 STARS & UNIQUE REVIEW)
      ========================================================================== */}
      <div id="local-review-form" className="bg-gradient-to-br from-gold-50/80 via-amber-50/50 to-white dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-800 rounded-3xl border-2 border-gold-400/40 p-6 sm:p-12 shadow-luxury max-w-2xl mx-auto space-y-6 scroll-mt-24">
        <div className="text-center space-y-2">
          {/* [ADDED] Clear Visual Auto-Fill Banner */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/40 text-emerald-700 dark:text-emerald-300 text-[11px] font-bold uppercase tracking-wider">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Form Pre-Filled with 5 Stars & Unique Review • ५-स्टार आधीच भरलेले</span>
          </div>

          <h3 className="font-serif font-bold text-2xl text-zinc-900 dark:text-zinc-100">
            Share Your Experience
          </h3>
          <p className="text-xs text-zinc-600 dark:text-zinc-400">
            This review has been pre-filled with 5-star praise. You can submit it directly to our kitchen, shuffle to another unique variation, or post directly to Google Business!
          </p>
        </div>

        {submitted ? (
          <div className="p-8 bg-emerald-100/80 dark:bg-emerald-950/70 rounded-2xl border border-emerald-400/50 text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <h4 className="font-serif font-bold text-lg text-emerald-900 dark:text-emerald-200">
              Dhanyawaad! Thank You for Your Feedback!
            </h4>
            <p className="text-xs text-emerald-800 dark:text-emerald-300 max-w-md mx-auto">
              Your 5-star review has been received with gratitude. We would love if you also shared this on our Google Business Profile so more people in Bhosari can find us!
            </p>
            <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => handleOneClickGoogleReview(formFeedback)}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-xs rounded-xl shadow-md transition-all active:scale-95"
              >
                <Star className="w-4 h-4 fill-white" />
                <span>Post This Review to Google (1-Click)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {/* Interactive Star Rating Selector (Pre-selected 5 stars) */}
            <div className="text-center space-y-2 p-4 rounded-2xl bg-white/80 dark:bg-zinc-800/70 border border-gold-400/30 shadow-xs">
              <div className="flex items-center justify-between text-xs font-semibold text-zinc-700 dark:text-zinc-300 px-2">
                <span>Rating (Pre-Selected):</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">5.0 / 5.0 ★★★★★</span>
              </div>
              <div className="flex items-center justify-center gap-1.5 sm:gap-2">
                {[1, 2, 3, 4, 5].map(starVal => (
                  <button
                    key={starVal}
                    type="button"
                    onClick={() => setFormRating(starVal)}
                    aria-label={`Rate ${starVal} out of 5 stars`}
                    className="w-11 h-11 flex items-center justify-center rounded-xl hover:scale-110 active:scale-95 transition-all text-amber-400"
                  >
                    <Star
                      className={`w-7 h-7 ${
                        starVal <= formRating
                          ? "fill-amber-400 text-amber-400"
                          : "text-zinc-300 dark:text-zinc-600"
                      }`}
                    />
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-maroon-700 dark:text-gold-300 font-semibold">
                {getRatingReaction(formRating)}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="review-name" className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Your Name / नाव (Pre-Filled):
                </label>
                <input
                  id="review-name"
                  type="text"
                  required
                  placeholder="e.g. Anand Joshi"
                  value={formName}
                  onChange={e => setFormName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-base sm:text-xs focus:border-gold-400 outline-none"
                />
              </div>

              <div>
                <label htmlFor="review-category" className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Dish / Experience Category:
                </label>
                <select
                  id="review-category"
                  value={formCategory}
                  onChange={e => setFormCategory(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-base sm:text-xs focus:border-gold-400 outline-none"
                >
                  <option value="Traditional Mithai">Traditional Mithai (Motichoor, Peda, Kaju Katli)</option>
                  <option value="Morning Breakfast">Morning Breakfast (Kanda Poha, Misal, Samosa)</option>
                  <option value="Festive Prasad">Ganesh Festival Modaks / Festive Hampers</option>
                  <option value="Corporate Gifting">Corporate Bulk Boxes</option>
                </select>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="review-feedback" className="block font-semibold text-zinc-700 dark:text-zinc-300">
                  Your Review / आपला अभिप्राय (Pre-Filled):
                </label>
                <button
                  type="button"
                  onClick={() => handleRegenerate()}
                  className="text-[11px] font-bold text-saffron-600 dark:text-gold-300 hover:underline flex items-center gap-1"
                  title="Shuffle to another non-repeating unique review"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Shuffle New Unique Review</span>
                </button>
              </div>
              <textarea
                id="review-feedback"
                required
                rows={4}
                placeholder="Share your thoughts on the taste, pure ghee aroma, breakfast freshness, or service..."
                value={formFeedback}
                onChange={e => setFormFeedback(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-base sm:text-xs focus:border-gold-400 outline-none leading-relaxed italic font-serif"
              />
            </div>

            {/* Dual 1-Click Action Cluster */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => handleOneClickGoogleReview(formFeedback)}
                className="w-full min-h-[46px] py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-95"
              >
                <Star className="w-4 h-4 fill-white" />
                <span>Post to Google Business (1-Click)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>

              <button
                type="submit"
                className="w-full min-h-[46px] py-3 bg-gradient-to-r from-maroon-700 to-maroon-800 hover:from-maroon-800 hover:to-maroon-900 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-95"
              >
                <Send className="w-4 h-4 text-gold-300" />
                <span>Submit to Indrayani Shop</span>
              </button>
            </div>
          </form>
        )}
      </div>

      {/* =========================================================================
          [ADDED] PRE-FILLED 5-STAR REVIEW MODAL POPUP DIALOG
      ========================================================================== */}
      {isPreFilledModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="prefilled-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setIsPreFilledModalOpen(false)}
        >
          <div
            onClick={e => e.stopPropagation()}
            className="bg-white dark:bg-zinc-900 rounded-3xl border-2 border-gold-400/50 p-6 sm:p-8 max-w-lg w-full shadow-2xl relative space-y-4 max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={() => setIsPreFilledModalOpen(false)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 flex items-center justify-center text-zinc-600 dark:text-zinc-300 transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2.5">
              <span className="p-2 rounded-xl bg-amber-500/20 text-amber-600 dark:text-gold-300">
                <Sparkles className="w-5 h-5" />
              </span>
              <div>
                <h3 id="prefilled-modal-title" className="font-serif font-bold text-lg sm:text-xl text-zinc-950 dark:text-zinc-50">
                  Pre-Filled 5-Star Review Form
                </h3>
                <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>5 Stars & Unique Review Automatically Filled</span>
                </p>
              </div>
            </div>

            {/* Pre-Selected 5 Stars */}
            <div className="p-3.5 rounded-2xl bg-amber-50/60 dark:bg-zinc-800/60 border border-amber-300/40 text-center space-y-1">
              <div className="flex justify-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-amber-400" />
                ))}
              </div>
              <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">
                5.0 Royal Excellence Rating
              </span>
            </div>

            {/* Editable Pre-Filled Name */}
            <div>
              <label htmlFor="modal-rev-name" className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                Your Name / नाव:
              </label>
              <input
                id="modal-rev-name"
                type="text"
                value={formName}
                onChange={e => setFormName(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-base sm:text-xs focus:border-gold-400 outline-none"
              />
            </div>

            {/* Editable Pre-Filled Textarea with Shuffle Button */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="modal-rev-feedback" className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Unique 5-Star Review:
                </label>
                <button
                  type="button"
                  onClick={() => handleRegenerate()}
                  className="text-[11px] font-bold text-saffron-600 dark:text-gold-300 hover:underline flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Shuffle Another Review</span>
                </button>
              </div>
              <textarea
                id="modal-rev-feedback"
                rows={4}
                value={formFeedback}
                onChange={e => setFormFeedback(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-base sm:text-xs focus:border-gold-400 outline-none leading-relaxed italic font-serif"
              />
            </div>

            {/* Modal Actions */}
            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={() => handleOneClickGoogleReview(formFeedback)}
                className="w-full min-h-[46px] py-3 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-white font-bold text-xs sm:text-sm shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <Star className="w-4 h-4 fill-white" />
                <span>Post to Google Business (1-Click)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={e => {
                  handleSubmit(e);
                  setIsPreFilledModalOpen(false);
                }}
                className="w-full min-h-[42px] py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 font-bold text-xs transition-all flex items-center justify-center gap-1.5 active:scale-95"
              >
                <Send className="w-3.5 h-3.5 text-maroon-700 dark:text-gold-300" />
                <span>Submit to Indrayani Shop Only</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          [ADDED] 1-CLICK GOOGLE REVIEW INSTRUCTION MODAL & CONFIRMATION
      ========================================================================== */}
      {isGoogleModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="google-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setIsGoogleModalOpen(false)}
        >
          <div
            onClick={e => e.stopPropagation()}
            className="bg-white dark:bg-zinc-900 rounded-3xl border-2 border-gold-400/50 p-6 sm:p-8 max-w-lg w-full shadow-2xl relative space-y-5"
          >
            {/* Modal Close Button */}
            <button
              onClick={() => setIsGoogleModalOpen(false)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 flex items-center justify-center text-zinc-600 dark:text-zinc-300 transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header Badge */}
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-amber-500/15 text-amber-600 dark:text-gold-300">
                <Sparkles className="w-5 h-5" />
              </span>
              <div>
                <h3 id="google-modal-title" className="font-serif font-bold text-lg sm:text-xl text-zinc-950 dark:text-zinc-50">
                  5-Star Review Ready & Copied!
                </h3>
                <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Google Review Window Opened in New Tab</span>
                </p>
              </div>
            </div>

            {/* Copied Review Preview Box */}
            <div className="p-4 rounded-2xl bg-gold-50/50 dark:bg-zinc-800/80 border border-gold-400/30 space-y-2">
              <div className="flex items-center justify-between text-[11px] text-zinc-500">
                <span className="font-semibold text-maroon-700 dark:text-gold-300">
                  Copied Text (Ready to Paste):
                </span>
                <span className="text-[10px] bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 px-2 py-0.5 rounded font-bold">
                  Copied ✓
                </span>
              </div>
              <p className="text-xs text-zinc-800 dark:text-zinc-200 italic leading-relaxed max-h-36 overflow-y-auto font-serif">
                &ldquo;{formFeedback || activeUniqueReview.text}&rdquo;
              </p>
            </div>

            {/* Two Simple Steps Checklist */}
            <div className="space-y-2.5 bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-700/60">
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 block">
                Two Quick Steps on Google:
              </span>
              <div className="space-y-2 text-xs text-zinc-700 dark:text-zinc-300">
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-amber-500 text-white font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                    1
                  </span>
                  <div>
                    <strong>Tap 5 Stars (★★★★★):</strong> Select the 5th star on the Google pop-up window.
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                    2
                  </span>
                  <div>
                    <strong>Paste & Post:</strong> Press <kbd className="px-1.5 py-0.5 bg-zinc-200 dark:bg-zinc-700 rounded text-[10px]">Ctrl+V</kbd> (or long-press <em>Paste</em> on phone) and hit <strong>Post</strong>!
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
              <a
                href={SHOP_DATA.googleWriteReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-h-[44px] px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2 active:scale-95 text-center"
              >
                <span>Re-Open Google Review Tab</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                type="button"
                onClick={() => {
                  if (typeof navigator !== "undefined" && navigator.clipboard) {
                    navigator.clipboard.writeText(formFeedback || activeUniqueReview.text);
                  }
                  setCopiedToast(true);
                }}
                className="min-h-[44px] px-4 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-bold transition-all flex items-center justify-center gap-1.5 active:scale-95"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Text Again</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
