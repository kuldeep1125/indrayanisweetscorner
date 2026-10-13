"use client";

// [ADDED] CartDrawer slide-over displaying selected sweets, custom 3D gift boxes, and generating formatted WhatsApp orders
import React, { useState } from "react";
import Image from "next/image";
import { useShop } from "@/context/ShopContext";
import {
  X,
  Trash2,
  Plus,
  Minus,
  MessageCircle,
  ShoppingBag,
  Box,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    totalItemCount,
    generateWhatsAppOrderUrl,
  } = useShop();

  const [customerNote, setCustomerNote] = useState("");

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FCFBF7] dark:bg-[#161211] border-l border-gold-400/30 shadow-2xl flex flex-col animate-slideLeft">
          {/* Header */}
          <div className="p-5 border-b border-gold-400/20 flex items-center justify-between bg-gold-50/50 dark:bg-black/30">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-saffron-600 text-white rounded-xl">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-zinc-900 dark:text-zinc-100">
                  Your Mithai Cart & Boxes
                </h3>
                <p className="text-xs text-zinc-500">
                  {totalItemCount} item{totalItemCount !== 1 ? "s" : ""} selected
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-black/5"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-gold-100 dark:bg-gold-950/40 border border-gold-400/30 flex items-center justify-center text-gold-600">
                  <Box className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-zinc-800 dark:text-zinc-200">
                    Your Mithai box is empty
                  </h4>
                  <p className="text-xs text-zinc-500 max-w-xs mt-1">
                    Explore our handcrafted traditional sweets or build a custom 3D gift box for your family and celebrations.
                  </p>
                </div>
                <div className="flex flex-col gap-2 w-full pt-2">
                  <Link
                    href="/menu"
                    onClick={() => setIsCartOpen(false)}
                    className="w-full py-2.5 px-4 bg-maroon-700 hover:bg-maroon-800 text-white text-xs font-semibold rounded-xl text-center shadow-md transition-colors"
                  >
                    Browse Sweets Menu
                  </Link>
                  <Link
                    href="/custom-box"
                    onClick={() => setIsCartOpen(false)}
                    className="w-full py-2.5 px-4 bg-gold-400/20 hover:bg-gold-400/30 text-gold-800 dark:text-gold-200 text-xs font-semibold rounded-xl text-center border border-gold-400/30 transition-colors"
                  >
                    Build Custom 3D Box
                  </Link>
                </div>
              </div>
            ) : (
              cart.map(item => (
                <div
                  key={item.id}
                  className="bg-white dark:bg-zinc-900/80 p-4 rounded-2xl border border-gold-400/25 shadow-sm space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      {item.type === "custom_box" ? (
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-maroon-700 to-saffron-700 flex items-center justify-center text-gold-300 flex-shrink-0 border border-gold-400/40">
                          <Box className="w-6 h-6" />
                        </div>
                      ) : (
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-zinc-100 flex-shrink-0 border border-zinc-200">
                          {item.product?.image && (
                            <Image
                              src={item.product.image}
                              alt={item.product.name}
                              fill
                              className="object-cover"
                            />
                          )}
                        </div>
                      )}
                      <div>
                        <h4 className="font-serif font-bold text-sm text-zinc-900 dark:text-zinc-100">
                          {item.type === "custom_box"
                            ? `Custom Mithai Box (${item.weightOption})`
                            : item.product?.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[11px] font-medium text-saffron-700 dark:text-saffron-400 bg-saffron-50 dark:bg-saffron-950/60 px-2 py-0.5 rounded-md border border-saffron-200/40">
                            {item.weightOption}
                          </span>
                          <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                            ₹{item.unitPrice}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-1.5 text-zinc-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* If custom box, show chosen sweets */}
                  {item.type === "custom_box" && item.customBoxDetails && (
                    <div className="text-[11px] text-zinc-500 bg-zinc-50 dark:bg-zinc-800/60 p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-1">
                      <div className="font-semibold text-gold-600 dark:text-gold-400">
                        Box Contents ({item.customBoxDetails.size} Compartments):
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {item.customBoxDetails.sweets.map((s, idx) => (
                          <span
                            key={idx}
                            className="bg-white dark:bg-zinc-900 px-2 py-0.5 rounded border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300"
                          >
                            {s.product.name} ({s.count})
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Quantity and Line Total */}
                  <div className="flex items-center justify-between pt-2 border-t border-zinc-100 dark:border-zinc-800 text-xs">
                    <div className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg p-1 border border-zinc-200 dark:border-zinc-700">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-1 hover:bg-white dark:hover:bg-zinc-700 rounded text-zinc-600 dark:text-zinc-300 transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="font-semibold px-2">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-1 hover:bg-white dark:hover:bg-zinc-700 rounded text-zinc-600 dark:text-zinc-300 transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="font-bold text-sm text-maroon-700 dark:text-gold-300">
                      ₹{item.unitPrice * item.quantity}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & WhatsApp Order CTA */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-gold-400/25 bg-gold-50/40 dark:bg-black/40 space-y-3.5">
              {/* Optional Customer Note */}
              <div>
                <label className="block text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 mb-1">
                  Special Instructions / Festival Date:
                </label>
                <input
                  type="text"
                  value={customerNote}
                  onChange={e => setCustomerNote(e.target.value)}
                  placeholder="e.g. Pack for pickup tomorrow 9 AM, ribbon gift wrap"
                  className="w-full text-xs px-3 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:border-saffron-500"
                />
              </div>

              {/* Price Summary */}
              <div className="flex items-center justify-between text-sm pt-1">
                <span className="font-medium text-zinc-600 dark:text-zinc-400">
                  Estimated Total:
                </span>
                <span className="font-serif font-bold text-xl text-maroon-800 dark:text-gold-300">
                  ₹{cartTotal}
                </span>
              </div>

              {/* Order via WhatsApp Button */}
              <a
                href={generateWhatsAppOrderUrl(customerNote)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-500 active:scale-[0.99] text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Send Order Inquiry on WhatsApp</span>
                <ArrowRight className="w-4 h-4 ml-auto" />
              </a>

              <div className="flex items-center justify-between text-[11px] text-zinc-500 pt-1">
                <button
                  onClick={clearCart}
                  className="hover:text-red-500 transition-colors flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Clear Entire Cart</span>
                </button>
                <span>Direct pickup at Bhosari shop</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
