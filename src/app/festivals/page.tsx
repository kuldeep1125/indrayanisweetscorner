"use client";

// [FIXED] Cleaned unused imports in src/app/festivals/page.tsx per master engineering rules
import React from "react";
import Image from "next/image";
import { useShop } from "@/context/ShopContext";
import { PRODUCTS } from "@/data/products";
import { Sparkles, Gift, MessageCircle, CheckCircle2 } from "lucide-react";

export default function FestivalsPage() {
  const { addToCart, generateWhatsAppOrderUrl } = useShop();

  const festiveProducts = PRODUCTS.filter(p => p.isFestiveSpecial || p.category === "festive_hampers");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-saffron-600 flex items-center justify-center gap-1.5">
          <Sparkles className="w-4 h-4" />
          <span>Celebrations of Maharashtra</span>
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-zinc-950 dark:text-zinc-50">
          Festival & Celebration Collections
        </h1>
        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
          From steaming Ukadiche Modak for Ganpati Bappa to royal Diwali Faral hampers and customized corporate gifting for MIDC organizations.
        </p>
      </div>

      {/* Ganesh Chaturthi Spotlight Banner */}
      <div className="bg-gradient-to-r from-amber-900 via-maroon-900 to-black text-white rounded-3xl border border-gold-400/40 p-8 sm:p-12 shadow-2xl overflow-hidden relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="inline-block px-3 py-1 rounded-full bg-saffron-600 text-white text-[10px] font-bold uppercase tracking-wider">
              गणेशोत्सव विशेष
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold leading-tight">
              Authentic Steamed Ukadiche Modak & Mawa Modak
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-xl">
              Prepared with aromatic freshly milled rice flour, stuffed with juicy freshly grated coconut, organic jaggery, nutmeg, and cardamom, and served with a dollop of pure cow ghee. Pre-book your 11, 21, or 51 modak prasad sets in advance.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href={generateWhatsAppOrderUrl("Namaskar! I would like to pre-book Ganesh Chaturthi Modaks for prasad.")}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Pre-Book Modaks via WhatsApp</span>
              </a>
              <span className="text-xs text-gold-300 font-semibold">
                Available in boxes of 6, 11, and 21 pieces
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 relative h-64 sm:h-80 rounded-2xl overflow-hidden border border-gold-400/30 shadow-lg">
            {/* [FIXED] Replaced external unsplash URL with verified local studio photo of authentic Ukadiche Modak */}
            <Image
              src="/images/dishes/ukadiche_modak.jpg"
              alt="Ganesh Festival Authentic Modak Prasad"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Festive Hampers Grid */}
      <div className="space-y-6">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-950 dark:text-zinc-50">
            Signature Festive Hampers
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1">
            Carefully curated gift boxes adorned with embossed gold foil and custom ribbons.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {festiveProducts.map(p => (
            <div
              key={p.id}
              className="bg-white dark:bg-zinc-900 rounded-3xl border border-gold-400/25 overflow-hidden shadow-luxury flex flex-col justify-between group hover:-translate-y-1 transition-all"
            >
              <div className="relative h-56 w-full overflow-hidden bg-zinc-100">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-saffron-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                  Festive Special
                </div>
              </div>

              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif font-bold text-lg text-zinc-900 dark:text-zinc-100">
                    {p.name}
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1.5 leading-relaxed">
                    {p.shortDesc}
                  </p>
                </div>

                <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                  <div className="font-serif font-bold text-xl text-maroon-700 dark:text-gold-300">
                    ₹{p.fixedPrice || p.pricePerKg}
                  </div>
                  <button
                    onClick={() => addToCart(p, p.unit === "box" ? "1 Box" : "500g", 1)}
                    className="px-4 py-2 bg-maroon-700 hover:bg-maroon-800 text-white font-bold text-xs rounded-xl shadow-md transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Corporate Gifting for MIDC Companies */}
      <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-gold-400/30 p-8 sm:p-12 shadow-luxury space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-saffron-600 flex items-center gap-1.5">
              <Gift className="w-4 h-4" />
              <span>MIDC Bhosari Corporate Solutions</span>
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100">
              Bulk Gifting for Industrial Offices & Corporate Teams
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              We specialize in fulfilling Diwali, New Year, and milestone corporate sweet orders for manufacturing units, engineering corporations, and tech offices across Bhosari, Chakan, and Pimpri-Chinchwad.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-zinc-700 dark:text-zinc-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Custom Company Logo Sleeves & Ribbons</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Direct Office Delivery in MIDC Bhosari</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Official GST Invoices Available</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Sample Tasting Boxes on Request</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 text-center lg:text-right">
            <a
              href={generateWhatsAppOrderUrl("Namaskar! I am inquiring regarding bulk corporate Diwali/Festival sweet hampers for our company in MIDC.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-saffron-600 hover:bg-saffron-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Inquire Corporate Gifting</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
