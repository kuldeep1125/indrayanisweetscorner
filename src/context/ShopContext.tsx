"use client";

// [ADDED] Global Shop Context for Localization, Cart State, Sweet Box Management, and Owner Overrides
import React, { createContext, useContext, useState, useEffect } from "react";
import { Language, TRANSLATIONS, Translations } from "@/data/translations";
import { ProductItem } from "@/data/products";
import { SHOP_DATA } from "@/data/shopData";

export interface CartItem {
  id: string;
  type: "product" | "custom_box";
  product?: ProductItem;
  weightOption?: string; // "250g", "500g", "1kg", "plate", etc.
  quantity: number;
  unitPrice: number;
  customBoxDetails?: {
    size: 4 | 6 | 9;
    sweets: { product: ProductItem; count: number }[];
  };
}

interface StoreSettings {
  announcement: string;
  isAnnouncementActive: boolean;
  festivalBanner: string;
  customPhone: string;
  customWhatsApp: string;
}

interface ShopContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  cart: CartItem[];
  addToCart: (product: ProductItem, weightOption?: string, quantity?: number, openDrawer?: boolean) => void;
  addCustomBoxToCart: (size: 4 | 6 | 9, sweets: { product: ProductItem; count: number }[], estimatedPrice: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, delta: number) => void;
  clearCart: () => void;
  cartTotal: number;
  totalItemCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isDossierOpen: boolean;
  setIsDossierOpen: (open: boolean) => void;
  generateWhatsAppOrderUrl: (note?: string) => string;
  storeSettings: StoreSettings;
  updateStoreSettings: (newSettings: Partial<StoreSettings>) => void;
  // [ADDED] Dynamic active slide tracking for synchronous navbar color matching during parallax scrolling
  homeActiveSlide: number;
  setHomeActiveSlide: (slide: number) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isDossierOpen, setIsDossierOpen] = useState(false);
  // [ADDED] Home parallax slide index tracker (0 to 4)
  const [homeActiveSlide, setHomeActiveSlide] = useState<number>(0);
  const [storeSettings, setStoreSettings] = useState<StoreSettings>({
    announcement: "Fresh Puneri Kanda Poha & Samosas ready at 7:00 AM • Ganesh Chaturthi Modak Pre-orders Open!",
    isAnnouncementActive: true,
    festivalBanner: "Ganesh Festival Special: Authentic Ukadiche & Mawa Modaks Handcrafted Daily",
    customPhone: SHOP_DATA.contact.phone,
    customWhatsApp: SHOP_DATA.contact.whatsapp,
  });

  // Load persisted state safely on client mount
  useEffect(() => {
    try {
      const savedLang = localStorage.getItem("indrayani_lang") as Language;
      if (savedLang && (savedLang === "en" || savedLang === "mr" || savedLang === "hi")) {
        setLanguageState(savedLang);
      }
      const savedCart = localStorage.getItem("indrayani_cart");
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
      const savedSettings = localStorage.getItem("indrayani_settings");
      if (savedSettings) {
        setStoreSettings(prev => ({ ...prev, ...JSON.parse(savedSettings) }));
      }
    } catch {
      // Storage access gracefully handled
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("indrayani_lang", lang);
    } catch {
      // Ignore
    }
  };

  // Sync cart to local storage
  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    try {
      localStorage.setItem("indrayani_cart", JSON.stringify(newCart));
    } catch {
      // Ignore
    }
  };

  const updateStoreSettings = (newSettings: Partial<StoreSettings>) => {
    setStoreSettings(prev => {
      const updated = { ...prev, ...newSettings };
      try {
        localStorage.setItem("indrayani_settings", JSON.stringify(updated));
      } catch {
        // Ignore
      }
      return updated;
    });
  };

  // [FIXED] Added optional openDrawer parameter (default true) for fluid native-app cart interactions
  const addToCart = (
    product: ProductItem,
    weightOption: string = "500g",
    quantity: number = 1,
    openDrawer: boolean = true
  ) => {
    let price = product.fixedPrice || 0;
    if (product.pricePerKg) {
      if (weightOption === "250g") price = Math.round(product.pricePerKg * 0.25);
      else if (weightOption === "500g") price = Math.round(product.pricePerKg * 0.5);
      else if (weightOption === "1kg") price = product.pricePerKg;
      else price = Math.round(product.pricePerKg * 0.5);
    }

    const existingIndex = cart.findIndex(
      item => item.product?.id === product.id && item.weightOption === weightOption
    );

    if (existingIndex > -1) {
      const updated = [...cart];
      updated[existingIndex].quantity += quantity;
      saveCart(updated);
    } else {
      const newItem: CartItem = {
        id: `${product.id}-${weightOption}-${Date.now()}`,
        type: "product",
        product,
        weightOption,
        quantity,
        unitPrice: price,
      };
      saveCart([...cart, newItem]);
    }
    if (openDrawer) {
      setIsCartOpen(true);
    }
  };

  const addCustomBoxToCart = (
    size: 4 | 6 | 9,
    sweets: { product: ProductItem; count: number }[],
    estimatedPrice: number
  ) => {
    const boxItem: CartItem = {
      id: `box-${size}-${Date.now()}`,
      type: "custom_box",
      quantity: 1,
      unitPrice: estimatedPrice,
      weightOption: size === 4 ? "~500g Box" : size === 6 ? "~750g Box" : "~1kg Royal Box",
      customBoxDetails: {
        size,
        sweets,
      },
    };
    saveCart([...cart, boxItem]);
    setIsCartOpen(true);
  };

  const removeFromCart = (itemId: string) => {
    const updated = cart.filter(item => item.id !== itemId);
    saveCart(updated);
  };

  const updateQuantity = (itemId: string, delta: number) => {
    const updated = cart
      .map(item => {
        if (item.id === itemId) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      })
      .filter(Boolean) as CartItem[];
    saveCart(updated);
  };

  const clearCart = () => {
    saveCart([]);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const totalItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const generateWhatsAppOrderUrl = (customerNote?: string): string => {
    const phone = storeSettings.customWhatsApp || SHOP_DATA.contact.whatsapp;
    let message = `*Namaskar Indrayani Sweet Corner!* 🙏\n`;
    message += `I would like to place an order / sweet inquiry from your website:\n\n`;

    if (cart.length === 0) {
      message += `I am inquiring about your fresh daily sweets and breakfast menu in Bhosari MIDC.\n`;
    } else {
      cart.forEach((item, index) => {
        if (item.type === "custom_box" && item.customBoxDetails) {
          message += `*${index + 1}. Custom 3D Mithai Box (${item.weightOption})* x ${item.quantity}\n`;
          message += `  Sweets: ${item.customBoxDetails.sweets.map(s => `${s.product.name} (${s.count} pcs)`).join(", ")}\n`;
          message += `  Price: ₹${item.unitPrice * item.quantity}\n\n`;
        } else if (item.product) {
          message += `*${index + 1}. ${item.product.name}* (${item.weightOption}) x ${item.quantity} = ₹${item.unitPrice * item.quantity}\n`;
        }
      });
      message += `-----------------------------\n`;
      message += `*Estimated Total: ₹${cartTotal}*\n\n`;
    }

    if (customerNote) {
      message += `*Customer Note:* ${customerNote}\n\n`;
    }

    message += `*Pickup Location:* Plot No. 13, 3, Indrayani Nagar, S Block, MIDC, Bhosari, Pune.\n`;
    message += `Please confirm availability and pickup time. Dhanyavaad!`;

    const encoded = encodeURIComponent(message);
    return `https://wa.me/${phone.replace(/[^0-9]/g, "")}?text=${encoded}`;
  };

  return (
    <ShopContext.Provider
      value={{
        language,
        setLanguage,
        t: TRANSLATIONS[language],
        cart,
        addToCart,
        addCustomBoxToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        totalItemCount,
        isCartOpen,
        setIsCartOpen,
        isDossierOpen,
        setIsDossierOpen,
        generateWhatsAppOrderUrl,
        storeSettings,
        updateStoreSettings,
        homeActiveSlide,
        setHomeActiveSlide,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShop must be used within a ShopProvider");
  }
  return context;
}
