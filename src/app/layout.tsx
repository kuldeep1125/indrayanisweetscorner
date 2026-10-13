// [ADDED] Google Fonts for editorial elegance and authentic cursive script (matching Rasrang aesthetic)
// [FIXED] Explicit Viewport configuration for mobile-first rendering
import type { Metadata, Viewport } from "next";
import { Cinzel, Plus_Jakarta_Sans, Great_Vibes } from "next/font/google";
import "./globals.css";
import { ShopProvider } from "@/context/ShopContext";
import Navbar from "@/components/Navbar";
import MainContent from "@/components/MainContent";
import CartDrawer from "@/components/CartDrawer";
import TransparencyModal from "@/components/TransparencyModal";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-great-vibes",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Indrayani Sweet Corner | Authentic Indian Mithai & Savouries | Bhosari, Pune",
  description: "Experience the royal heritage of handcrafted Indian mithai, pure ghee sweets, and authentic Maharashtrian breakfast at Indrayani Sweet Corner, MIDC Bhosari, Pune.",
  keywords: [
    "Indrayani Sweet Corner",
    "Mithai Bhosari",
    "Sweet Shop Indrayani Nagar",
    "Kaju Katli Pune",
    "Motichoor Ladoo Bhosari",
    "Breakfast Bhosari MIDC",
    "Modak Pune",
    "Indian Sweets Pimpri Chinchwad"
  ],
  openGraph: {
    title: "Indrayani Sweet Corner | Royal Handcrafted Mithai & Savouries",
    description: "Handcrafted pure ghee sweets, festive hampers, and authentic Maharashtrian breakfast in Bhosari, Pune.",
    type: "website",
    locale: "en_IN",
  },
};

// [ADDED] Explicit responsive viewport configuration for mobile-first devices and notch safe areas
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#120305",
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cinzel.variable} ${plusJakarta.variable} ${greatVibes.variable}`}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="antialiased min-h-screen bg-jali-pattern text-[#1A1615] flex flex-col">
        <ShopProvider>
          <Navbar />
          <MainContent>
            {children}
          </MainContent>
          <CartDrawer />
          <TransparencyModal />
          <Footer />
          {/* [ADDED] World-class native mobile bottom navigation bar */}
          <MobileBottomNav />
        </ShopProvider>
      </body>
    </html>
  );
}
