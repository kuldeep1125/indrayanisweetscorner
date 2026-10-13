"use client";

// [FIXED] Cleaned unused imports and variables per master engineering rules
import React, { useState } from "react";
import { useShop } from "@/context/ShopContext";
import {
  Lock,
  Bell,
  Phone,
  Save,
  CheckCircle2,
  Eye,
} from "lucide-react";
import Link from "next/link";

export default function AdminPage() {
  const { storeSettings, updateStoreSettings } = useShop();

  const [pin, setPin] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinError, setPinError] = useState(false);

  // Form states
  const [announcement, setAnnouncement] = useState(storeSettings.announcement);
  const [isActive, setIsActive] = useState(storeSettings.isAnnouncementActive);
  const [phone, setPhone] = useState(storeSettings.customPhone);
  const [whatsapp, setWhatsapp] = useState(storeSettings.customWhatsApp);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === "1234" || pin === "admin") {
      setIsAuthenticated(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateStoreSettings({
      announcement,
      isAnnouncementActive: isActive,
      customPhone: phone,
      customWhatsApp: whatsapp,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-4 py-20">
        <div className="bg-white dark:bg-zinc-900 border border-gold-400/30 rounded-3xl p-8 shadow-luxury text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-maroon-100 dark:bg-maroon-950/60 text-maroon-700 dark:text-gold-300 flex items-center justify-center mx-auto border border-gold-400/30">
            <Lock className="w-7 h-7" />
          </div>

          <div>
            <h1 className="font-serif font-bold text-xl text-zinc-900 dark:text-zinc-100">
              Store Owner Access
            </h1>
            <p className="text-xs text-zinc-500 mt-1">
              Enter owner PIN code to manage store announcements and contact details. (Default PIN: 1234)
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={pin}
              onChange={e => {
                setPin(e.target.value);
                setPinError(false);
              }}
              placeholder="Enter PIN (1234)"
              className="w-full text-center tracking-widest text-lg font-bold py-2.5 px-4 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-saffron-500"
            />

            {pinError && (
              <p className="text-xs text-red-500 font-semibold">
                Incorrect PIN. Use default: 1234
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-maroon-700 hover:bg-maroon-800 text-white font-bold text-xs rounded-xl shadow-md transition-all"
            >
              Unlock Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gold-400/20">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-saffron-600">
            Store Management
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            Indrayani Sweet Corner Dashboard
          </h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            Plot No. 13, 3, Indrayani Nagar, S Block, MIDC Bhosari
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="px-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-semibold hover:bg-zinc-200 transition-colors flex items-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View Live Site</span>
          </Link>

          <button
            onClick={() => setIsAuthenticated(false)}
            className="px-4 py-2 rounded-xl bg-red-50 text-red-700 text-xs font-semibold hover:bg-red-100 transition-colors flex items-center gap-1.5"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Lock</span>
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-emerald-100 text-emerald-900 border border-emerald-300 rounded-2xl flex items-center gap-2 text-xs font-bold animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-700" />
          <span>Store settings saved successfully and updated live across the website!</span>
        </div>
      )}

      {/* Settings Form */}
      <form onSubmit={handleSaveSettings} className="space-y-6">
        {/* Active Announcement Banner */}
        <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-gold-400/25 p-6 shadow-luxury space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Bell className="w-5 h-5 text-saffron-600" />
              <h3 className="font-serif font-bold text-base text-zinc-900 dark:text-zinc-100">
                Top Announcement & Festival Banner
              </h3>
            </div>
            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold">
              <input
                type="checkbox"
                checked={isActive}
                onChange={e => setIsActive(e.target.checked)}
                className="rounded text-saffron-600 focus:ring-saffron-500 w-4 h-4"
              />
              <span>Banner Active</span>
            </label>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
              Announcement Message:
            </label>
            <input
              type="text"
              value={announcement}
              onChange={e => setAnnouncement(e.target.value)}
              placeholder="e.g. Fresh Hot Poha at 7 AM • Pre-book Modaks for Ganesh Festival"
              className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-xs focus:outline-none focus:border-saffron-500"
            />
          </div>
        </div>

        {/* Contact Numbers Configuration */}
        <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-gold-400/25 p-6 shadow-luxury space-y-4">
          <div className="flex items-center gap-2.5">
            <Phone className="w-5 h-5 text-emerald-600" />
            <h3 className="font-serif font-bold text-base text-zinc-900 dark:text-zinc-100">
              Direct Inbound Contact Numbers
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                Store Phone Number:
              </label>
              <input
                type="text"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="+919822000000"
                className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-xs focus:outline-none focus:border-saffron-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                WhatsApp Order Number (with Country Code):
              </label>
              <input
                type="text"
                value={whatsapp}
                onChange={e => setWhatsapp(e.target.value)}
                placeholder="+919822000000"
                className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-xs focus:outline-none focus:border-saffron-500"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <button
            type="submit"
            className="px-6 py-3 bg-maroon-700 hover:bg-maroon-800 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Store Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
}
