"use client";

// [FIXED] Cleaned unused import in src/app/gallery/page.tsx per master engineering rules
import React, { useState } from "react";
import Image from "next/image";
import { X, Eye, Camera } from "lucide-react";

interface GalleryItem {
  id: string;
  title: string;
  category: "mithai" | "breakfast" | "festivals" | "packaging";
  categoryLabel: string;
  image: string;
  description: string;
}

// [FIXED] Updated Gallery to use 100% verified authentic studio food photography from /images/dishes/
const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "g1",
    title: "Precision Diamond Kaju Katli",
    category: "mithai",
    categoryLabel: "Mithai Craft",
    image: "/images/dishes/kaju_katli.jpg",
    description: "Traditional diamond-cut cashew fudge crafted with real cashews and pure vark garnish.",
  },
  {
    id: "g2",
    title: "Pure Cow Ghee Motichoor Laddoos",
    category: "mithai",
    categoryLabel: "Mithai Craft",
    image: "/images/dishes/motichoor_ladoo.jpg",
    description: "Finely fried gram flour boondi pearls steeped in cardamom and saffron sugar syrup.",
  },
  {
    id: "g3",
    title: "Artisan Kesar Peda",
    category: "mithai",
    categoryLabel: "Mithai Craft",
    image: "/images/dishes/kesar_peda.jpg",
    description: "Rich condensed mawa infused with Kashmiri saffron and chopped green pistachios.",
  },
  {
    id: "g4",
    title: "Fresh Puneri Kanda Poha at 7:00 AM",
    category: "breakfast",
    categoryLabel: "Morning Breakfast",
    image: "/images/dishes/kanda_poha.jpg",
    description: "Steaming flattened rice with mustard seed tempering, crunchy peanuts, and fresh pomegranate.",
  },
  {
    id: "g5",
    title: "Golden Crispy Samosas & Mint Chutney",
    category: "breakfast",
    categoryLabel: "Morning Breakfast",
    image: "/images/dishes/samosa.jpg",
    description: "Fresh hot samosas prepared continuously for morning shift commuters in Bhosari MIDC.",
  },
  {
    id: "g6",
    title: "Steamed Ukadiche Modak for Ganpati Bappa",
    category: "festivals",
    categoryLabel: "Festival Displays",
    image: "/images/dishes/ukadiche_modak.jpg",
    description: "Freshly grated coconut and jaggery stuffed in steamed rice flour petals.",
  },
  {
    id: "g7",
    title: "Spicy Zanzanit Misal Pav",
    category: "breakfast",
    categoryLabel: "Morning Breakfast",
    image: "/images/dishes/misal_pav.jpg",
    description: "Authentic Pune street style misal served with fresh pav and lemon wedges.",
  },
  {
    id: "g8",
    title: "Crispy Spiced Pune Bhakarwadi",
    category: "breakfast",
    categoryLabel: "Morning Breakfast",
    image: "/images/dishes/bhakarwadi.jpg",
    description: "Spiral-rolled Maharashtrian snack with spicy coconut and sesame stuffing.",
  },
  {
    id: "g9",
    title: "Royal Shahi Gulab Jamun",
    category: "mithai",
    categoryLabel: "Mithai Craft",
    image: "/images/dishes/gulab_jamun.jpg",
    description: "Soft khoya dumplings deep-fried in pure ghee and soaked in rose-cardamom syrup.",
  },
  {
    id: "g10",
    title: "Spongy Traditional Rasgulla",
    category: "mithai",
    categoryLabel: "Mithai Craft",
    image: "/images/dishes/rasgulla.jpg",
    description: "Delicate cottage cheese (chenna) spheres simmered in light sugar syrup.",
  },
  {
    id: "g11",
    title: "Saffron Kesar Malai Barfi",
    category: "mithai",
    categoryLabel: "Mithai Craft",
    image: "/images/dishes/malai_barfi.jpg",
    description: "Double-layered rich condensed milk barfi with fragrant saffron crown and chopped almonds.",
  },
  {
    id: "g12",
    title: "Royal Gold Mithai Hamper Platter",
    category: "packaging",
    categoryLabel: "Packaging & Boxes",
    image: "/images/dishes/mithai_hamper.jpg",
    description: "Opulent gift box containing assorted handcrafted sweets adorned with gold ribbon.",
  },
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);

  const categories = [
    { key: "all", label: "All Visuals" },
    { key: "mithai", label: "Mithai Craft" },
    { key: "breakfast", label: "Morning Breakfast" },
    { key: "festivals", label: "Festival Specials" },
    { key: "packaging", label: "Packaging & Boxes" },
  ];

  const filteredItems = activeCategory === "all"
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-saffron-600 flex items-center justify-center gap-1.5">
          <Camera className="w-4 h-4" />
          <span>Visual Heritage</span>
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-zinc-950 dark:text-zinc-50">
          The Photographic Gallery
        </h1>
        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
          A visual journey celebrating the authentic colors, textures, and morning aromas of Indrayani Sweet Corner in Bhosari.
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2">
        {categories.map(cat => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeCategory === cat.key
                ? "bg-maroon-700 text-white shadow-sm"
                : "bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 hover:border-gold-400"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredItems.map(item => (
          <div
            key={item.id}
            onClick={() => setSelectedPhoto(item)}
            className="group relative h-72 rounded-3xl overflow-hidden border border-gold-400/25 shadow-luxury cursor-pointer bg-zinc-100 dark:bg-zinc-900"
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-5 text-white">
              <span className="text-[10px] bg-saffron-600 text-white font-bold px-2 py-0.5 rounded-full w-max mb-1.5">
                {item.categoryLabel}
              </span>
              <h3 className="font-serif font-bold text-sm">{item.title}</h3>
              <p className="text-[11px] text-zinc-300 line-clamp-2 mt-1">
                {item.description}
              </p>
            </div>
            <div className="absolute top-3 right-3 p-1.5 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
              <Eye className="w-3.5 h-3.5" />
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 p-4 sm:p-6 flex items-center justify-center">
          <div
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />
          <div className="relative w-full max-w-3xl bg-[#14100E] border border-gold-400/40 rounded-3xl overflow-hidden shadow-2xl z-10 text-white animate-scaleUp">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 backdrop-blur-sm"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="relative h-96 sm:h-[480px] w-full bg-black">
              <Image
                src={selectedPhoto.image}
                alt={selectedPhoto.title}
                fill
                className="object-contain"
              />
            </div>
            <div className="p-6 bg-zinc-900 border-t border-white/10 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs bg-saffron-600 px-2.5 py-0.5 rounded-full font-bold">
                  {selectedPhoto.categoryLabel}
                </span>
                <h3 className="font-serif text-lg font-bold">{selectedPhoto.title}</h3>
              </div>
              <p className="text-xs text-zinc-300">{selectedPhoto.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
