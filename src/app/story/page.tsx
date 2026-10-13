"use client";

// [REFACTORED] Award-Winning Heritage & Halwai Craft Story
// Overhauled with editorial magazine typography, the Bhosari MIDC Industrial-Artisanal Chronicle,
// a 24-Hour Halwai Crucible visual timeline, and the 4 Golden Principles of Purity.
import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Flame,
  Clock,
  Heart,
  ArrowRight,
  Sparkles,
  Award,
  ShieldCheck,
  Sun,
  Moon,
} from "lucide-react";
// [ADDED] Verified Social Media Chronicle
import SocialGallerySection from "@/components/SocialGallerySection";
import { CURATED_SOCIAL_POSTS } from "@/data/socialMedia";

interface TimelineStep {
  time: string;
  title: string;
  titleMr: string;
  desc: string;
  tag: string;
  icon: typeof Sun;
}

const HALWAI_TIMELINE: TimelineStep[] = [
  {
    time: "04:30 AM",
    title: "The Dawn Milk Crucible",
    titleMr: " पहाटेची खवा आटवणी",
    desc: "Single-origin fresh whole cow milk arrives at our Bhosari kitchen. Master confectioners begin slow-simmering the milk in heavy brass kadhais to prepare velvety fresh mawa (khoya) for the day's pedas and barfis.",
    tag: "Pure Dairy Craft",
    icon: Moon,
  },
  {
    time: "06:30 AM",
    title: "The Mustard & Curry Leaf Temper",
    titleMr: "खमंग फोडणी व कांदा पोहे",
    desc: "Thick Indrayani flattened rice is rinsed and tempered with black mustard seeds, crunchy peanuts, fragrant curry leaves, and green chillies. Topped with freshly grated coconut and ruby pomegranate seeds.",
    tag: "Breakfast Benchmark",
    icon: Sun,
  },
  {
    time: "07:00 AM",
    title: "Doors Open to Bhosari MIDC",
    titleMr: "कामगार व नागरिकांचे स्वागत",
    desc: "The morning shift begins. Automotive plant managers, CNC engineers, and local residents queue up for hot Kanda Poha, freshly fried samosas, and spiced cutting chai before clocking into work.",
    tag: "Community Fuel",
    icon: Clock,
  },
  {
    time: "11:00 AM",
    title: "The Pure Ghee Boondi Shower",
    titleMr: "शुद्ध तुपातील मोतीचूर",
    desc: "Finely strained besan batter is tapped through perforated brass ladles into simmering pure cow ghee. Golden pearls puff up instantaneously, drained, and immersed in warm Kashmiri saffron and cardamom syrup.",
    tag: "Heirloom Halwai Tradition",
    icon: Flame,
  },
  {
    time: "03:30 PM",
    title: "Diamond Cutting & Silver Vark",
    titleMr: "काजू कतली हिरे-काप",
    desc: "Finely ground premium cashew dough is rolled by hand into precise sheets. Edible vegetable silver vark is gently pressed onto the surface, followed by artisan diamond slicing with geometric accuracy.",
    tag: "Precision Confectionery",
    icon: Sparkles,
  },
  {
    time: "07:30 PM",
    title: "Festive Gifting & Family Evenings",
    titleMr: "संध्याकाळची गोड भेट",
    desc: "Custom velvet hampers, wedding prasad boxes, and evening snack parcels are hand-tied with gold ribbons for families and corporate celebrations across Pimpri-Chinchwad and Pune.",
    tag: "Bespoke Packaging",
    icon: Heart,
  },
];

export default function StoryPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Editorial Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
        <div className="inline-flex max-w-full flex-wrap items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gold-400/10 border border-gold-400/30 text-saffron-600 dark:text-gold-300 text-[11px] sm:text-xs font-bold tracking-wider uppercase text-center">
          <Sparkles className="w-3.5 h-3.5 flex-shrink-0" />
          <span>The Indrayani Heritage • आमचा वारसा</span>
        </div>

        <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-zinc-950 dark:text-zinc-50 tracking-tight leading-tight">
          Where Precision Engineering Meets Pure Desi Cow Ghee
        </h1>

        <p className="font-script text-xl sm:text-2xl text-maroon-700 dark:text-gold-300">
          Handcrafted in Bhosari with warmth, honesty, and uncompromising tradition.
        </p>

        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-2xl mx-auto">
          Born in Indrayani Nagar, S-Block, MIDC Bhosari, Indrayani Sweet Corner was founded on a simple pledge:
          to create sweets that taste like they were prepared in an aristocratic home kitchen—slowly, honestly, and without industrial shortcuts.
        </p>
      </div>

      {/* Visual Showcase Platter */}
      <div className="relative h-72 sm:h-96 lg:h-[480px] rounded-3xl overflow-hidden border border-gold-400/40 shadow-2xl">
        <Image
          src="/images/dishes/mithai_hamper.jpg"
          alt="Indrayani Sweet Corner Royal Mithai Showcase Platter"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 1200px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-5 sm:p-10 text-white">
          <div className="max-w-2xl space-y-2.5">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-gold-400">
              The Artisan Sanctuary
            </span>
            <h2 className="font-serif text-xl sm:text-3xl font-bold leading-tight">
              An Oasis of Warmth in Pune&apos;s Industrial Capital
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              Bhosari MIDC is world-renowned for precision engineering, heavy stamping presses, and relentless industry.
              Amidst the machines, Indrayani Sweet Corner serves as a comforting haven—greeting early morning commuters with steaming Poha and celebrating life&apos;s biggest milestones with pure ghee mithai.
            </p>
          </div>
        </div>
      </div>

      {/* The 24-Hour Halwai Chronicle (Interactive Visual Timeline) */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-saffron-600">
            Daily Ritual of Craft
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-zinc-950 dark:text-zinc-50">
            The 24-Hour Halwai Chronicle
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
            A look into how our confectioners and morning cooks handcraft every delicacy before the sun rises.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {HALWAI_TIMELINE.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-zinc-900 rounded-3xl border border-gold-400/25 p-6 shadow-luxury hover:shadow-luxury-hover transition-all duration-300 flex flex-col justify-between space-y-4 group hover:-translate-y-1"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-maroon-700 dark:text-gold-300 bg-gold-50 dark:bg-zinc-800 px-2.5 py-1 rounded-lg border border-gold-400/30">
                      {step.time}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider font-bold text-zinc-400">
                      {step.tag}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif font-bold text-base sm:text-lg text-zinc-900 dark:text-zinc-100 group-hover:text-maroon-700 dark:group-hover:text-gold-300 transition-colors">
                      {step.title}
                    </h3>
                    <div className="text-[11px] text-zinc-400 font-serif mt-0.5">
                      {step.titleMr}
                    </div>
                  </div>

                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-[11px] text-gold-600 dark:text-gold-400 font-semibold">
                  <span>Step {idx + 1} of 6</span>
                  <Icon className="w-4 h-4 text-saffron-500" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* The 4 Golden Pillars of Purity */}
      <div className="bg-gradient-to-br from-gold-50/70 via-amber-50/40 to-white dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-800 p-8 sm:p-12 rounded-3xl border border-gold-400/30 shadow-luxury space-y-8">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-saffron-600">
            Uncompromising Standards
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            The Four Pillars of Indrayani Purity
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
            Why families and engineers across Bhosari trust our counters every single morning.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-zinc-800/80 p-6 rounded-2xl border border-gold-400/20 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-600 flex items-center justify-center">
              <Flame className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-bold text-sm text-zinc-900 dark:text-zinc-100">
              100% Shuddh Cow Ghee
            </h4>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Zero hydrogenated vegetable oils (Dalda). Our motichoor laddoos, pedas, and modaks are cooked exclusively in golden desi cow ghee.
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-800/80 p-6 rounded-2xl border border-gold-400/20 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-bold text-sm text-zinc-900 dark:text-zinc-100">
              Zero Yesterday Leftovers
            </h4>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Every plate of Kanda Poha, every batch of samosas, and all chhena sweets are made fresh daily. Stale sweets are never re-sold.
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-800/80 p-6 rounded-2xl border border-gold-400/20 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-maroon-100 dark:bg-maroon-950/80 text-maroon-600 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-bold text-sm text-zinc-900 dark:text-zinc-100">
              Single-Source Raw Nuts
            </h4>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              High-yield grade whole cashews for Kaju Katli, whole Iranian pistachios, and pure Kashmiri saffron threads with no artificial coloring.
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-800/80 p-6 rounded-2xl border border-gold-400/20 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/80 text-blue-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-bold text-sm text-zinc-900 dark:text-zinc-100">
              Strict Glove & Hygiene Protocols
            </h4>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              All sweet shaping and box packing is performed on sanitized stainless-steel counters with protective head coverings and food-grade gloves.
            </p>
          </div>
        </div>
      </div>

      {/* [ADDED] The Bhosari Landmark in Action • Visual Social Chronicle */}
      <div className="pt-8 border-t border-gold-400/20">
        <SocialGallerySection
          title="The Bhosari Landmark in Action • Visual Social Chronicle"
          titleMr="इंद्रायणी नगरची वास्तव दृश्ये व परंपरा"
          subtitle="Real moments captured from our early morning brass boiling crucibles to evening family gifting at Plot No. 13, Sector 3, Indrayani Nagar, Bhosari."
          badgeText="AUTHENTIC INSTAGRAM DISPATCH • @indrayani_sweets_corner"
          posts={CURATED_SOCIAL_POSTS}
          ctaText="Explore Our Story on Instagram @indrayani_sweets_corner"
          ctaUrl="https://www.instagram.com/indrayani_sweets_corner/"
        />
      </div>

      {/* Halwai Master's Personal Calligraphy Note */}
      <div className="max-w-3xl mx-auto p-8 sm:p-10 rounded-3xl bg-white dark:bg-zinc-900 border border-gold-400/30 shadow-luxury text-center space-y-4 relative overflow-hidden">
        <div className="absolute top-4 left-6 text-gold-300 text-5xl font-serif select-none pointer-events-none opacity-40">
          &ldquo;
        </div>
        <span className="text-[11px] font-bold uppercase tracking-widest text-gold-600 dark:text-gold-400">
          Master Confectioner&apos;s Word
        </span>
        <blockquote className="font-script text-2xl sm:text-3xl text-maroon-800 dark:text-gold-200 leading-relaxed">
          &ldquo;A sweet should not just satisfy a sugar craving; it should bring back the warmth of your grandmother&apos;s kitchen during Diwali.&rdquo;
        </blockquote>
        <div className="pt-2 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
          — The Halwai Collective at Indrayani Sweet Corner, Bhosari
        </div>
      </div>

      {/* Call to Action Navigation */}
      <div className="text-center pt-4 space-y-4">
        <h3 className="font-serif text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          Ready to Experience Authentic Indian Mithai?
        </h3>
        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3">
          <Link
            href="/menu"
            className="w-full sm:w-auto min-h-[44px] px-6 py-3.5 bg-maroon-700 hover:bg-maroon-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 hover:scale-105 active:scale-95"
          >
            <span>Explore Complete Menu</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/custom-box"
            className="w-full sm:w-auto min-h-[44px] px-6 py-3.5 bg-gradient-to-r from-saffron-600 to-amber-500 hover:from-saffron-500 hover:to-amber-400 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 hover:scale-105 active:scale-95"
          >
            <Sparkles className="w-4 h-4" />
            <span>Create Custom Gift Box</span>
          </Link>
          <Link
            href="/contact"
            className="w-full sm:w-auto min-h-[44px] px-6 py-3.5 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 font-bold text-xs sm:text-sm rounded-xl hover:border-gold-400 transition-all flex items-center justify-center"
          >
            Visit Our Shop in Bhosari
          </Link>
        </div>
      </div>
    </div>
  );
}
