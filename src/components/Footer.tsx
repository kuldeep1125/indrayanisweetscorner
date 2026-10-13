"use client";

// [ADDED] Royal Footer with verified shop details, LocalBusiness JSON-LD schema, and cultural blessings
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SHOP_DATA } from "@/data/shopData";
import { useShop } from "@/context/ShopContext";
import {
  MapPin,
  Clock,
  MessageCircle,
  ShieldCheck,
  Star,
  ExternalLink,
} from "lucide-react";
// [FIXED] Use crisp inline SVG for brand social icons
import { InstagramIcon, FacebookIcon, ZomatoIcon, SwiggyIcon, JustdialIcon } from "@/components/SocialIcons";

export default function Footer() {
  const pathname = usePathname();
  const { setIsDossierOpen, generateWhatsAppOrderUrl } = useShop();

  // [FIXED] On homepage, hide global footer because Slide 5 has the authentic Rasrang .homefooter
  if (pathname === "/") return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Bakery",
    "name": "Indrayani Sweet Corner",
    "alternateName": "इंद्रायणी स्वीट कॉर्नर",
    "image": "https://indrayanisweetcorner.com/images/dishes/kaju_katli.jpg",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Plot No. 13, 3, Indrayani Nagar, S Block, MIDC, Bhosari",
      "addressLocality": "Pimpri-Chinchwad, Pune",
      "addressRegion": "Maharashtra",
      "postalCode": "411026",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "18.6298",
      "longitude": "73.8447"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "opens": "07:00",
        "closes": "22:00"
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "3.9",
      "reviewCount": "37"
    },
    "servesCuisine": "Indian Confectionery, Maharashtrian Sweets, Breakfast",
    "priceRange": "₹₹",
    "telephone": "+91 99222 10909",
    "sameAs": [
      "https://www.instagram.com/indrayani_sweets_corner/",
      "https://www.facebook.com/people/Indrayani-sweets-croner/100064049584834/",
      // [FIXED] Updated sameAs with verified Google Maps place, Justdial, and Zomato URLs
      "https://www.google.com/maps/place/Indrayani+sweet+corner/@18.6327983,73.8337161,17z/data=!4m10!1m2!2m1!1sIndrayani+Sweet+Corner+Plot+No+13+Indrayani+Nagar+Bhosari+Pune+411026!3m6!1s0x3bc2b9004059518f:0x8d8be128ce79facd!8m2!3d18.6327983!4d73.8384797!15sCkVJbmRyYXlhbmkgU3dlZXQgQ29ybmVyIFBsb3QgTm8gMTMgSW5kcmF5YW5pIE5hZ2FyIEJob3NhcmkgUHVuZSA0MTEwMjZaRyJFaW5kcmF5YW5pIHN3ZWV0IGNvcm5lciBwbG90IG5vIDEzIGluZHJheWFuaSBuYWdhciBiaG9zYXJpIHB1bmUgNDExMDI2kgEMZGVzc2VydF9zaG9w4AEA!16s%2Fg%2F11vwxv7933?entry=ttu",
      "https://www.justdial.com/Pune/Indrayani-Sweets-Corner-Near-Indrayni-Sweets-Corner-Pimpri/020PXX20-XX20-190719231030-V5F8_BZDET",
      "https://www.zomato.com/pune/indrayani-sweet-corner-bhosari",
      "https://www.swiggy.com/restaurants?query=Indrayani+Sweets+Bhosari"
    ]
  };

  return (
    <footer className="relative bg-[#14100F] text-[#F8F5EC] border-t border-gold-400/30 pt-16 pb-12 overflow-hidden">
      {/* JSON-LD Structured Data for Local SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Decorative Traditional Border Accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-saffron-600 via-gold-400 to-maroon-700" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Column 1: Brand & Heritage */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-maroon-700 to-saffron-700 border-2 border-gold-400 flex items-center justify-center text-gold-300 font-serif font-bold text-xl shadow-lg">
                इ
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-white">
                  Indrayani Sweet Corner
                </h3>
                <p className="text-xs text-gold-400/90 font-medium">
                  इंद्रायणी स्वीट कॉर्नर • भोसरी, पुणे
                </p>
              </div>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed">
              Handcrafting traditional pure ghee mithai, festive modaks, and morning Maharashtrian breakfast since early dawn. A cherished neighborhood landmark in MIDC Bhosari.
            </p>

            {/* Google Rating Badge */}
            <div className="flex items-center gap-2 bg-white/5 border border-gold-400/20 px-3 py-2 rounded-xl text-xs">
              <div className="flex text-amber-400">
                {[...Array(4)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
                <Star className="w-3.5 h-3.5 text-amber-400" />
              </div>
              <span className="font-bold text-gold-200">3.9 / 5.0</span>
              <span className="text-[11px] text-zinc-400">
                ({SHOP_DATA.rating.reviewCount} Google Reviews)
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-gold-300 tracking-wider uppercase">
              Explore Offerings
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li>
                <Link href="/menu" className="hover:text-gold-300 transition-colors">
                  • Full Sweets & Breakfast Menu
                </Link>
              </li>
              <li>
                <Link href="/custom-box" className="hover:text-gold-300 transition-colors">
                  • Interactive 3D Sweet Box Builder
                </Link>
              </li>
              <li>
                <Link href="/story" className="hover:text-gold-300 transition-colors">
                  • Our Bhosari Heritage & Craft
                </Link>
              </li>
              <li>
                <Link href="/festivals" className="hover:text-gold-300 transition-colors">
                  • Ganesh Chaturthi & Diwali Hampers
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-gold-300 transition-colors">
                  • Food Photography Gallery
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="hover:text-gold-300 transition-colors">
                  • Customer Testimonials & Reviews
                </Link>
              </li>
              <li>
                <button
                  onClick={() => setIsDossierOpen(true)}
                  className="text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1 text-left"
                >
                  <ShieldCheck className="w-3 h-3" />
                  <span>• Verified Business Transparency Dossier</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Hours & Timing */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-gold-300 tracking-wider uppercase">
              Store Timings & Breakfast
            </h4>
            <div className="space-y-2.5 text-xs text-zinc-300">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-saffron-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Daily Operating Hours:</div>
                  <div className="text-zinc-400">7:00 AM – 10:00 PM (Monday to Sunday)</div>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0 mt-1.5" />
                <div>
                  <div className="font-semibold text-white">Morning Breakfast Hours:</div>
                  <div className="text-zinc-400">7:00 AM – 11:30 AM (Poha, Misal, Samosa)</div>
                </div>
              </div>
              <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-[11px] text-zinc-300">
                <span className="font-semibold text-saffron-400">Advance Festival Orders:</span> Pre-booking recommended 24 hours prior for Ganesh Chaturthi Modaks & Diwali Faral.
              </div>
            </div>
          </div>

              {/* Column 4: Location, Socials & WhatsApp */}
              <div className="space-y-3">
                <h4 className="font-serif font-bold text-sm text-gold-300 tracking-wider uppercase">
                  Visit or Connect
                </h4>
                <div className="space-y-2.5 text-xs text-zinc-400">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-saffron-400 flex-shrink-0 mt-0.5" />
                    <span>
                      {SHOP_DATA.address.formatted}
                    </span>
                  </div>

                  {/* [ADDED] Verified Social & Delivery Channels */}
                  <div className="flex items-center gap-2 pt-1">
                    <a
                      href={SHOP_DATA.socials.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-lg bg-pink-950/40 hover:bg-pink-900/60 text-pink-300 border border-pink-500/30 text-[11px] font-semibold transition-colors"
                      aria-label="Follow Indrayani Sweet Corner on Instagram"
                    >
                      <InstagramIcon className="w-3.5 h-3.5" />
                      <span>Instagram</span>
                    </a>
                    <a
                      href={SHOP_DATA.socials.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-lg bg-blue-950/40 hover:bg-blue-900/60 text-blue-300 border border-blue-500/30 text-[11px] font-semibold transition-colors"
                      aria-label="Connect on Facebook"
                    >
                      <FacebookIcon className="w-3.5 h-3.5" />
                      <span>Facebook</span>
                    </a>
                  </div>

                  {/* Delivery & Directory Hub */}
                  <div className="flex items-center gap-1.5 pt-0.5 text-[10px]">
                    <a
                      href={SHOP_DATA.socials.zomato}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1 px-1.5 py-1 rounded-md bg-red-950/50 hover:bg-red-900/60 text-red-300 border border-red-500/30 font-semibold transition-colors"
                      title="Order on Zomato"
                    >
                      <ZomatoIcon className="w-3 h-3 text-red-400" />
                      <span>Zomato</span>
                    </a>
                    <a
                      href={SHOP_DATA.socials.swiggy}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1 px-1.5 py-1 rounded-md bg-orange-950/50 hover:bg-orange-900/60 text-orange-300 border border-orange-500/30 font-semibold transition-colors"
                      title="Order on Swiggy"
                    >
                      <SwiggyIcon className="w-3 h-3 text-orange-400" />
                      <span>Swiggy</span>
                    </a>
                    <a
                      href={SHOP_DATA.socials.justdial}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1 px-1.5 py-1 rounded-md bg-amber-950/50 hover:bg-amber-900/60 text-amber-300 border border-amber-500/30 font-semibold transition-colors"
                      title="View on Justdial"
                    >
                      <JustdialIcon className="w-3 h-3 text-amber-400" />
                      <span>Justdial</span>
                    </a>
                  </div>

                  <div className="flex items-center gap-2 pt-0.5">
                    <a
                      href={SHOP_DATA.directionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium text-xs border border-white/15 transition-all w-full justify-center"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-gold-400" />
                      <span>Google Maps Directions</span>
                    </a>
                  </div>

                  <div className="pt-1">
                    <a
                      href={generateWhatsAppOrderUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Order on WhatsApp (+91 99222 10909)</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

        {/* Bottom Bar with Cultural Blessing */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Indrayani Sweet Corner. All rights reserved.</span>
            <span className="hidden md:inline">•</span>
            <span className="hidden md:inline text-gold-500/80 font-serif">
              अतिथी देवो भव • शुभं भवतु
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <Link href="/admin" className="text-zinc-600 hover:text-zinc-400">
              Store Admin
            </Link>
            <button
              onClick={() => setIsDossierOpen(true)}
              className="text-zinc-400 hover:text-gold-300 transition-colors"
            >
              Verified Audit Report
            </button>
            <span className="text-zinc-600">Bhosari MIDC, Pune</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
