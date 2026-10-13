"use client";

// [ADDED] High-Performance Curated Social Media Showcase Component
// Displays verified Instagram & Facebook visual content using optimized native media
// paired with direct official platform links, ensuring 100% performance without heavy third-party iframe scripts.
import React from "react";
import Image from "next/image";
import { ExternalLink, Sparkles, Heart } from "lucide-react";
import { CuratedSocialPost } from "@/data/socialMedia";
// [FIXED] Use crisp inline SVG for brand social icons
import { InstagramIcon } from "@/components/SocialIcons";

interface SocialGalleryProps {
  title: string;
  titleMr?: string;
  subtitle: string;
  badgeText?: string;
  posts: CuratedSocialPost[];
  className?: string;
  onSelectPost?: (post: CuratedSocialPost) => void;
  ctaText?: string;
  ctaUrl?: string;
}

export default function SocialGallerySection({
  title,
  titleMr,
  subtitle,
  badgeText = "AUTHENTIC INSTAGRAM DISPATCH • @indrayani_sweets_corner",
  posts,
  className = "",
  onSelectPost,
  ctaText = "Follow @indrayani_sweets_corner on Instagram",
  ctaUrl = "https://www.instagram.com/indrayani_sweets_corner/",
}: SocialGalleryProps) {
  return (
    <section className={`space-y-8 ${className}`}>
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex max-w-full flex-wrap items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-full bg-pink-500/10 dark:bg-pink-950/40 border border-pink-400/30 text-pink-700 dark:text-pink-300 text-[11px] sm:text-xs font-bold tracking-wider uppercase text-center">
          <InstagramIcon className="w-3.5 h-3.5 flex-shrink-0" />
          <span>{badgeText}</span>
        </div>

        <h2 className="font-serif text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-bold text-zinc-950 dark:text-zinc-50 tracking-tight leading-tight">
          {title} {titleMr && <span className="block text-lg sm:text-xl font-normal text-maroon-700 dark:text-gold-300 mt-1">{titleMr}</span>}
        </h2>

        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      </div>

      {/* Grid of Curated Social Visual Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="group bg-white dark:bg-zinc-900 rounded-3xl border border-gold-400/30 overflow-hidden shadow-luxury hover:shadow-2xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5"
          >
            {/* Visual Header / Media Preview */}
            <div className="relative aspect-4/3 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
              <Image
                src={post.image}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Top Badges */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[10px] font-bold">
                <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-gold-300 border border-gold-400/30 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>{post.dateOrFestival}</span>
                </span>

                <span className="px-2.5 py-1 rounded-full bg-pink-600/90 text-white flex items-center gap-1 shadow-md">
                  <InstagramIcon className="w-3 h-3" />
                  <span className="uppercase tracking-wider">{post.type}</span>
                </span>
              </div>

              {/* Bottom Media Title Overlay */}
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <p className="text-[11px] font-semibold text-gold-300 uppercase tracking-wider mb-0.5">
                  {post.authorHandle}
                </p>
                <h3 className="font-serif font-bold text-sm sm:text-base leading-snug drop-shadow-sm">
                  {post.title}
                </h3>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                {post.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {post.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Bar */}
              <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between gap-2">
                {onSelectPost ? (
                  <button
                    onClick={() => onSelectPost(post)}
                    className="min-h-[40px] px-3.5 py-1.5 rounded-xl bg-gold-50 dark:bg-zinc-800 border border-gold-400/40 text-[11px] font-bold text-maroon-700 dark:text-gold-300 hover:bg-gold-100 transition-colors flex items-center gap-1.5 active:scale-95"
                  >
                    <span>Pre-load Into Box</span>
                  </button>
                ) : (
                  <span className="text-[11px] text-zinc-400 flex items-center gap-1">
                    <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
                    <span>{post.engagementNote || "Patron Favorite"}</span>
                  </span>
                )}

                <a
                  href={post.postUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[40px] px-3.5 py-1.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-maroon-800 dark:hover:bg-gold-300 text-[11px] font-bold transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
                  aria-label={`View ${post.title} on Instagram`}
                >
                  <span>View on Instagram</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Profile CTA */}
      <div className="text-center pt-2">
        <a
          href={ctaUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-600 via-rose-600 to-amber-600 hover:from-pink-700 hover:to-amber-700 text-white font-bold text-xs sm:text-sm shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95 hover:scale-105"
        >
          <InstagramIcon className="w-4 h-4" />
          <span>{ctaText}</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </section>
  );
}
