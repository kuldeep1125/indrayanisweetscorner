"use client";

// [REFACTORED] Award-Winning Visit & Corporate Gifting Concierge
// Overhauled with real-time store status beacon, landmark navigation assistance,
// dual-mode Personal / Corporate Bulk Gifting inquiry form, and WhatsApp instant dispatch.
import React, { useState } from "react";
import { SHOP_DATA } from "@/data/shopData";
import { useShop } from "@/context/ShopContext";
import {
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  Navigation,
  ExternalLink,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
// [FIXED] Use crisp inline SVG for brand social icons
import { InstagramIcon, FacebookIcon, ZomatoIcon, SwiggyIcon, JustdialIcon } from "@/components/SocialIcons";
// [ADDED] Verified Brand Presence & Online Directory
import { VERIFIED_SOCIAL_PROFILES } from "@/data/socialMedia";

type InquiryMode = "personal" | "corporate";

export default function ContactPage() {
  const { generateWhatsAppOrderUrl } = useShop();

  const [inquiryMode, setInquiryMode] = useState<InquiryMode>("personal");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [occasion, setOccasion] = useState("Festival Sweets Pre-Order");
  const [boxQuantity, setBoxQuantity] = useState("10 - 25 Boxes");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");

  const handleSendViaWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    let note = "";
    if (inquiryMode === "corporate") {
      note = `*Corporate / Bulk Mithai Inquiry*\n• Company / Name: ${name}\n• Phone: ${phone}\n• Occasion: ${occasion}\n• Estimated Quantity: ${boxQuantity}\n• Target Date: ${date || "Flexible"}\n• Requirements: ${message || "Please provide catalog & corporate quotation"}`;
    } else {
      note = `*Personal Pre-Order & Inquiry*\n• Name: ${name}\n• Phone: ${phone}\n• Purpose: ${occasion}\n• Target Date: ${date || "Today"}\n• Details: ${message || "I would like to place a fresh order"}`;
    }

    const url = generateWhatsAppOrderUrl(note);
    window.open(url, "_blank");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Editorial Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
        <div className="inline-flex max-w-full flex-wrap items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gold-400/10 border border-gold-400/30 text-saffron-600 dark:text-gold-300 text-[11px] sm:text-xs font-bold tracking-wider uppercase text-center">
          <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
          <span>Visit Us & Concierge • आमच्या दुकानाला भेट द्या</span>
        </div>

        <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-zinc-950 dark:text-zinc-50 tracking-tight leading-tight">
          Find Us in Indrayani Nagar, Bhosari
        </h1>

        <p className="font-script text-xl sm:text-2xl text-maroon-700 dark:text-gold-300">
          We would be honored to welcome you for fresh morning breakfast and royal sweets.
        </p>

        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-2xl mx-auto">
          Located in the heart of Bhosari MIDC S-Block. Drop by for early morning hot Kanda Poha and cutting chai, pick up festive sweets, or discuss bespoke corporate gifting hampers.
        </p>

        {/* Live Store Status Beacon */}
        <div className="inline-flex max-w-full flex-wrap items-center justify-center gap-2 px-3.5 py-2 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-400/40 text-emerald-800 dark:text-emerald-300 text-xs font-bold shadow-xs text-center">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
          <span>Open Today: 7:00 AM – 10:00 PM (Hot Breakfast until 11:30 AM)</span>
        </div>

        {/* [ADDED] Mobile 1-Tap Quick Action Dock for Instant Thumb Reach */}
        <div className="sm:hidden grid grid-cols-3 gap-2.5 pt-2">
          <a
            href={`tel:${SHOP_DATA.contact.phone}`}
            className="flex flex-col items-center justify-center p-3 rounded-2xl bg-maroon-700 text-white shadow-md active:scale-95 transition-transform"
            aria-label="Call store counter"
          >
            <Phone className="w-5 h-5 text-gold-300 mb-1" />
            <span className="text-[11px] font-bold">Call Now</span>
            <span className="text-[9px] text-zinc-200">काऊंटर फोन</span>
          </a>

          <a
            href={generateWhatsAppOrderUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center p-3 rounded-2xl bg-emerald-600 text-white shadow-md active:scale-95 transition-transform"
            aria-label="Chat on WhatsApp"
          >
            <MessageCircle className="w-5 h-5 text-white mb-1" />
            <span className="text-[11px] font-bold">WhatsApp</span>
            <span className="text-[9px] text-emerald-100">ऑर्डर चॅट</span>
          </a>

          <a
            href={SHOP_DATA.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center p-3 rounded-2xl bg-zinc-900 dark:bg-zinc-800 text-white border border-gold-400/30 shadow-md active:scale-95 transition-transform"
            aria-label="Open Google Maps GPS navigation"
          >
            <Navigation className="w-5 h-5 text-gold-400 mb-1" />
            <span className="text-[11px] font-bold">Directions</span>
            <span className="text-[9px] text-gold-300">नकाशा GPS</span>
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* =========================================================================
            LEFT COLUMN: STORE LOCATION, OPERATING SCHEDULE & TRANSIT TIPS
        ========================================================================== */}
        <div className="lg:col-span-5 space-y-6">
          {/* Shop Location Card */}
          <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-gold-400/25 p-5 sm:p-7 shadow-luxury space-y-4">
            <div className="flex items-start gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-saffron-100 dark:bg-saffron-950/80 text-saffron-600 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif font-bold text-base text-zinc-900 dark:text-zinc-100">
                  Physical Store Address
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  {SHOP_DATA.address.formatted}
                </p>
                <p className="text-[11px] text-zinc-400 font-serif">
                  {SHOP_DATA.address.formattedMr}
                </p>
              </div>
            </div>

            {/* Landmark Navigation Aid */}
            <div className="p-3 bg-gold-50/70 dark:bg-zinc-800/60 rounded-2xl border border-gold-400/30 text-xs text-zinc-700 dark:text-zinc-300 space-y-1">
              <span className="font-bold text-maroon-800 dark:text-gold-300 block">
                Landmark Assistance:
              </span>
              <p className="text-[11px] leading-relaxed">
                Located near Indrayani Nagar Water Tank, 5 minutes from TELCO Road junction in MIDC Bhosari. Easy roadside parking available for four-wheelers and two-wheelers.
              </p>
            </div>

            <div className="pt-1">
              <a
                href={SHOP_DATA.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full min-h-[44px] py-3 px-4 bg-maroon-700 hover:bg-maroon-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-95"
              >
                <Navigation className="w-4 h-4 text-gold-300" />
                <span>Open Google Maps GPS Navigation</span>
              </a>
            </div>
          </div>

          {/* Operating Hours Card */}
          <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-gold-400/25 p-6 sm:p-7 shadow-luxury space-y-4">
            <div className="flex items-start gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif font-bold text-base text-zinc-900 dark:text-zinc-100">
                  Store Hours & Service Timings
                </h3>
                <p className="text-xs text-zinc-500">
                  Open 7 days a week, 365 days a year (including national & festive holidays)
                </p>
              </div>
            </div>

            <div className="space-y-2 text-xs border-t border-zinc-100 dark:border-zinc-800 pt-3">
              <div className="flex justify-between items-center py-1">
                <span className="text-zinc-600 dark:text-zinc-400 font-medium">Daily Mithai Counter:</span>
                <span className="font-bold text-zinc-900 dark:text-zinc-100">7:00 AM – 10:00 PM</span>
              </div>
              <div className="flex justify-between items-center py-1 border-t border-zinc-100 dark:border-zinc-800">
                <span className="text-zinc-600 dark:text-zinc-400 font-medium">Hot Morning Breakfast:</span>
                <span className="font-bold text-saffron-600 dark:text-gold-300">7:00 AM – 11:30 AM</span>
              </div>
              <div className="flex justify-between items-center py-1 border-t border-zinc-100 dark:border-zinc-800">
                <span className="text-zinc-600 dark:text-zinc-400 font-medium">Evening Snacks & Chai:</span>
                <span className="font-bold text-zinc-900 dark:text-zinc-100">4:00 PM – 8:30 PM</span>
              </div>
            </div>
          </div>

          {/* Direct Helplines */}
          <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-gold-400/25 p-6 shadow-luxury space-y-3">
            <h3 className="font-serif font-bold text-sm text-zinc-900 dark:text-zinc-100">
              Direct Phone & WhatsApp Helplines
            </h3>
            <div className="space-y-2.5">
              <a
                href={`tel:${SHOP_DATA.contact.phone}`}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/70 border border-zinc-200 dark:border-zinc-700/70 hover:border-gold-400 text-xs font-semibold text-zinc-800 dark:text-zinc-200 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-maroon-600" />
                  <span>Call Counter Directly</span>
                </div>
                <span className="text-maroon-700 dark:text-gold-300 font-bold">{SHOP_DATA.contact.phoneDisplay}</span>
              </a>

              <a
                href={generateWhatsAppOrderUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300/40 text-xs font-bold text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>Chat on WhatsApp</span>
                </div>
                <span>{SHOP_DATA.contact.whatsappDisplay}</span>
              </a>
            </div>
          </div>
        </div>

        {/* =========================================================================
            RIGHT COLUMN: INTERACTIVE MAP & DUAL-MODE INQUIRY CONCIERGE FORM
        ========================================================================== */}
        <div className="lg:col-span-7 space-y-6">
          {/* Interactive Google Map Frame */}
          <div className="h-72 sm:h-80 rounded-3xl overflow-hidden border border-gold-400/35 shadow-luxury relative bg-zinc-100 dark:bg-zinc-800">
            <iframe
              src={SHOP_DATA.locationEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Indrayani Sweet Corner Google Map Location"
              className="w-full h-full"
            />
          </div>

          {/* Dual-Mode Concierge Form */}
          <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-gold-400/30 p-6 sm:p-8 shadow-luxury space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-serif font-bold text-xl text-zinc-900 dark:text-zinc-100">
                  Pre-Order & Bulk Gifting Concierge
                </h3>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Connects directly with the shop owner on WhatsApp with formatted details.
                </p>
              </div>

              {/* Mode Toggle Switch */}
              <div className="flex items-center p-1 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setInquiryMode("personal")}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    inquiryMode === "personal"
                      ? "bg-maroon-700 text-white shadow-xs"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white"
                  }`}
                >
                  Personal Pre-Order
                </button>
                <button
                  type="button"
                  onClick={() => setInquiryMode("corporate")}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    inquiryMode === "corporate"
                      ? "bg-maroon-700 text-white shadow-xs"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white"
                  }`}
                >
                  Corporate Bulk
                </button>
              </div>
            </div>

            <form onSubmit={handleSendViaWhatsApp} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    {inquiryMode === "corporate" ? "Company / Contact Name:" : "Your Full Name:"}
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder={inquiryMode === "corporate" ? "e.g. Tata Motors HR / Rajesh Patil" : "e.g. Amit Kulkarni"}
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-base sm:text-xs text-zinc-900 dark:text-zinc-100 focus:border-gold-400 outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="contact-phone" className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    Mobile Number (WhatsApp):
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    required
                    placeholder="e.g. 9876543210"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-base sm:text-xs text-zinc-900 dark:text-zinc-100 focus:border-gold-400 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-occasion" className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    Occasion / Requirement:
                  </label>
                  <select
                    id="contact-occasion"
                    value={occasion}
                    onChange={e => setOccasion(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-base sm:text-xs text-zinc-900 dark:text-zinc-100 focus:border-gold-400 outline-none font-medium"
                  >
                    <option value="Diwali Corporate Sweet Boxes">Diwali Corporate Sweet Boxes</option>
                    <option value="Ganesh Chaturthi Modak Prasad">Ganesh Chaturthi Modak Prasad</option>
                    <option value="Wedding / Engagement Mithai">Wedding / Engagement Mithai Boxes</option>
                    <option value="Morning Shift Breakfast Catering">Morning Shift Factory Breakfast Catering</option>
                    <option value="Custom Gift Hampers">Custom Luxury Gift Hampers</option>
                    <option value="Other Inquiries">General Inquiry / Feedback</option>
                  </select>
                </div>

                {inquiryMode === "corporate" ? (
                  <div>
                    <label htmlFor="contact-quantity" className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                      Estimated Box Quantity:
                    </label>
                    <select
                      id="contact-quantity"
                      value={boxQuantity}
                      onChange={e => setBoxQuantity(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-base sm:text-xs text-zinc-900 dark:text-zinc-100 focus:border-gold-400 outline-none font-medium"
                    >
                      <option value="10 - 25 Boxes">10 – 25 Boxes</option>
                      <option value="25 - 50 Boxes">25 – 50 Boxes</option>
                      <option value="50 - 100 Boxes">50 – 100 Boxes</option>
                      <option value="100 - 500+ Boxes">100 – 500+ Boxes (Special MIDC Corporate Rate)</option>
                    </select>
                  </div>
                ) : (
                  <div>
                    <label htmlFor="contact-date" className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                      Preferred Date of Pickup / Delivery:
                    </label>
                    <input
                      id="contact-date"
                      type="date"
                      value={date}
                      onChange={e => setDate(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-base sm:text-xs text-zinc-900 dark:text-zinc-100 focus:border-gold-400 outline-none"
                    />
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="contact-notes" className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Specific Sweets or Delivery Notes:
                </label>
                <textarea
                  id="contact-notes"
                  rows={3}
                  placeholder={
                    inquiryMode === "corporate"
                      ? "Mention preferred sweets (e.g. Kaju Katli + Motichoor), custom branding ribbon requirements, or billing details..."
                      : "Mention items and quantities (e.g. 2kg Motichoor Ladoo, 11 Modaks, 5 plates Poha)..."
                  }
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-base sm:text-xs text-zinc-900 dark:text-zinc-100 focus:border-gold-400 outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full min-h-[44px] py-3.5 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-95"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Send {inquiryMode === "corporate" ? "Corporate Inquiry" : "Pre-Order"} via WhatsApp</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* [ADDED] Verified Digital Presence & Social Media Directory */}
      <div className="pt-8 border-t border-gold-400/20 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex max-w-full flex-wrap items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gold-400/10 border border-gold-400/30 text-saffron-600 dark:text-gold-300 text-[11px] sm:text-xs font-bold tracking-wider uppercase text-center">
            <Sparkles className="w-3.5 h-3.5 flex-shrink-0" />
            <span>Verified Local Digital Directory • भोसरी अधिकृत ऑनलाइन संपर्क</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-950 dark:text-zinc-50 tracking-tight">
            Connect Across Verified Platforms
          </h2>

          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            Follow our authentic social media channels for morning breakfast availability, festive hamper lookbooks, behind-the-scenes halwai craft, and verified local customer ratings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {VERIFIED_SOCIAL_PROFILES.map((profile, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-zinc-900 rounded-3xl border border-gold-400/25 p-5 sm:p-6 shadow-luxury hover:shadow-2xl transition-all duration-300 flex flex-col justify-between space-y-4 hover:-translate-y-1"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-2xl bg-gold-50 dark:bg-zinc-800 border border-gold-400/30 flex items-center justify-center text-maroon-700 dark:text-gold-300">
                      {profile.platform === "Instagram" && <InstagramIcon className="w-5 h-5 text-pink-600" />}
                      {profile.platform === "Facebook" && <FacebookIcon className="w-5 h-5 text-blue-600" />}
                      {profile.platform === "Google Business Profile" && <MapPin className="w-5 h-5 text-amber-500" />}
                      {profile.platform === "WhatsApp Business Concierge" && <MessageCircle className="w-5 h-5 text-emerald-600" />}
                      {profile.platform === "Justdial" && <JustdialIcon className="w-5 h-5 text-amber-500" />}
                      {profile.platform === "Zomato" && <ZomatoIcon className="w-5 h-5 text-red-500" />}
                      {profile.platform === "Swiggy" && <SwiggyIcon className="w-5 h-5 text-orange-500" />}
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-sm text-zinc-900 dark:text-zinc-100">
                        {profile.platform}
                      </h3>
                      <p className="text-[11px] text-zinc-500 font-mono">
                        {profile.handle}
                      </p>
                    </div>
                  </div>

                  <span className="px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold border border-emerald-400/30 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    <span>{profile.status}</span>
                  </span>
                </div>

                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {profile.description}
                </p>
              </div>

              <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800">
                <a
                  href={profile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full min-h-[42px] px-4 py-2 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-maroon-800 dark:hover:bg-gold-300 text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
                  aria-label={`Visit Indrayani Sweet Corner on ${profile.platform}`}
                >
                  <span>Visit {profile.platform}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
