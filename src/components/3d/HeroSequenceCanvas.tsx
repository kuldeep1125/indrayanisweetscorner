"use client";

// [FIXED] Cleaned unused imports and ordered renderFrame before preload effect per master engineering rules
import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  Sparkles,
  Play,
  Pause,
  RotateCcw,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

interface HeroSequenceCanvasProps {
  onFrameChange?: (frameIndex: number) => void;
}

export default function HeroSequenceCanvas({ onFrameChange }: HeroSequenceCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [activeSequence, setActiveSequence] = useState<"jalebi" | "laddu">("jalebi");
  const [currentFrame, setCurrentFrame] = useState(0);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const playDirection = 1;

  // Preloaded image references
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameIndexRef = useRef(0);
  const isPlayingRef = useRef(false);
  const animFrameIdRef = useRef<number | null>(null);

  const TOTAL_FRAMES = 60;
  const basePath = activeSequence === "jalebi" ? "/sequence" : "/sequence_laddu";

  // Render a specific frame onto the HTML5 Canvas
  const renderFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imagesRef.current[index];
    if (!img || !img.complete) return;

    // High DPI scaling
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);

    // Cover-fit image in canvas
    const cWidth = rect.width;
    const cHeight = rect.height;
    const imgRatio = img.width / img.height;
    const canvasRatio = cWidth / cHeight;

    let renderW = cWidth;
    let renderH = cHeight;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      renderW = cWidth;
      renderH = cWidth / imgRatio;
      offsetY = (cHeight - renderH) / 2;
    } else {
      renderH = cHeight;
      renderW = cHeight * imgRatio;
      offsetX = (cWidth - renderW) / 2;
    }

    ctx.clearRect(0, 0, cWidth, cHeight);
    ctx.drawImage(img, offsetX, offsetY, renderW, renderH);

    // Subtle luxury vignette gradient overlay
    const gradient = ctx.createRadialGradient(
      cWidth / 2,
      cHeight / 2,
      cWidth * 0.25,
      cWidth / 2,
      cHeight / 2,
      cWidth * 0.75
    );
    gradient.addColorStop(0, "rgba(0, 0, 0, 0.05)");
    gradient.addColorStop(1, "rgba(10, 8, 7, 0.65)");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, cWidth, cHeight);

    ctx.restore();
  }, []);

  // Preload all 60 frames
  useEffect(() => {
    let isCancelled = false;
    imagesRef.current = [];
    setLoadedCount(0);
    setCurrentFrame(0);
    frameIndexRef.current = 0;

    let loaded = 0;
    const images: HTMLImageElement[] = [];

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      const paddedIndex = String(i).padStart(2, "0");
      img.src = `${basePath}/frame_${paddedIndex}.webp`;

      img.onload = () => {
        if (isCancelled) return;
        loaded++;
        setLoadedCount(loaded);
        if (loaded === 1) {
          // Draw first frame immediately
          renderFrame(0);
        }
      };
      images.push(img);
    }

    imagesRef.current = images;

    return () => {
      isCancelled = true;
    };
  }, [activeSequence, basePath, renderFrame]);

  // Update target frame smoothly
  const setTargetFrame = useCallback(
    (index: number) => {
      const bounded = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.round(index)));
      frameIndexRef.current = bounded;
      setCurrentFrame(bounded);
      renderFrame(bounded);
      if (onFrameChange) {
        onFrameChange(bounded);
      }
    },
    [renderFrame, onFrameChange]
  );

  // Scroll listener for sticky hero container
  useEffect(() => {
    const handleScroll = () => {
      if (isPlayingRef.current) return;
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate progress while container is in view
      // As container travels through viewport, progress goes from 0.0 to 1.0
      const totalTravel = rect.height + windowHeight;
      const currentTravel = windowHeight - rect.top;
      const progress = Math.max(0, Math.min(1, currentTravel / totalTravel));

      const frame = Math.floor(progress * (TOTAL_FRAMES - 1));
      setTargetFrame(frame);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setTargetFrame]);

  // Window resize handler
  useEffect(() => {
    const handleResize = () => {
      renderFrame(frameIndexRef.current);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [renderFrame]);

  // Playback loop for auto-play / scrubber
  useEffect(() => {
    isPlayingRef.current = isPlaying;
    if (!isPlaying) {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      return;
    }

    let lastTime = performance.now();
    const interval = 1000 / 24; // 24 fps playback

    const loop = (now: number) => {
      animFrameIdRef.current = requestAnimationFrame(loop);
      if (now - lastTime >= interval) {
        lastTime = now;
        let nextFrame = frameIndexRef.current + playDirection;
        if (nextFrame >= TOTAL_FRAMES) {
          nextFrame = 0;
        } else if (nextFrame < 0) {
          nextFrame = TOTAL_FRAMES - 1;
        }
        setTargetFrame(nextFrame);
      }
    };

    animFrameIdRef.current = requestAnimationFrame(loop);

    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [isPlaying, playDirection, setTargetFrame]);

  // Mouse / Touch drag scrubbing on canvas
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const startFrameRef = useRef(0);

  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    startXRef.current = e.clientX;
    startFrameRef.current = frameIndexRef.current;
    if (isPlaying) setIsPlaying(false);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - startXRef.current;
    const frameDelta = Math.round(deltaX / 8); // 8px per frame
    setTargetFrame(startFrameRef.current + frameDelta);
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  // Milestone Text Overlays based on current frame
  const getMilestoneCopy = (f: number) => {
    if (f < 16) {
      return {
        badge: "01 / The Pure Desi Ghee Symphony",
        headline: "Crisp Saffron Curves",
        sub: "Golden circular swirls handcrafted at dawn in 100% pure cow ghee.",
      };
    } else if (f < 34) {
      return {
        badge: "02 / The Slow Saffron Glaze",
        headline: "Simmered to Perfection",
        sub: "Steeped in rich Kashmiri saffron & fragrant green cardamom syrup.",
      };
    } else if (f < 48) {
      return {
        badge: "03 / The 7:00 AM Morning Batches",
        headline: "Dawn Freshness in Bhosari",
        sub: "Serving hot Puneri breakfast and celebration sweets to MIDC families.",
      };
    } else {
      return {
        badge: "04 / Indrayani Sweet Corner Heritage",
        headline: "Authentic Maharashtrian Taste",
        sub: "From our brass kadhai directly to your festive family gatherings.",
      };
    }
  };

  const milestone = getMilestoneCopy(currentFrame);
  const progressPercent = Math.round(((currentFrame + 1) / TOTAL_FRAMES) * 100);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[580px] sm:h-[680px] lg:h-[760px] rounded-3xl overflow-hidden border border-gold-400/30 bg-[#0E0B0A] shadow-2xl select-none group"
    >
      {/* 60-Frame HTML5 Canvas */}
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        className="w-full h-full object-cover cursor-ew-resize active:cursor-grabbing transition-transform duration-100"
      />

      {/* Loading Overlay */}
      {loadedCount < TOTAL_FRAMES && (
        <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-black/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-gold-400/30 text-xs text-gold-300">
          <div className="w-3 h-3 border-2 border-gold-400 border-t-transparent rounded-full animate-spin" />
          <span>Buffering 60 Video Frames: {Math.round((loadedCount / TOTAL_FRAMES) * 100)}%</span>
        </div>
      )}

      {/* Top Header Bar inside Hero Canvas */}
      <div className="absolute top-4 left-4 right-4 z-10 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        {/* Footprint Badge */}
        <div className="pointer-events-auto flex items-center gap-2 bg-[#120F0E]/85 backdrop-blur-md px-4 py-2 rounded-full border border-gold-400/35 text-xs text-gold-200 shadow-lg">
          <Sparkles className="w-3.5 h-3.5 text-gold-400 animate-pulse" />
          <span className="font-semibold tracking-wide">
            60-Frame Cinematic 3D Scrollytelling
          </span>
          <span className="text-zinc-500">•</span>
          <span className="text-zinc-300 font-mono">
            Frame {String(currentFrame + 1).padStart(2, "0")} / 60
          </span>
        </div>

        {/* Footage Selector Toggle */}
        <div className="pointer-events-auto flex items-center bg-[#120F0E]/85 backdrop-blur-md p-1 rounded-full border border-gold-400/35 gap-1 shadow-lg text-xs">
          <button
            onClick={() => setActiveSequence("jalebi")}
            className={`px-3 py-1.5 rounded-full transition-all font-semibold ${
              activeSequence === "jalebi"
                ? "bg-saffron-600 text-white shadow-sm"
                : "text-zinc-400 hover:text-gold-200"
            }`}
          >
            Saffron Jalebi
          </button>
          <button
            onClick={() => setActiveSequence("laddu")}
            className={`px-3 py-1.5 rounded-full transition-all font-semibold ${
              activeSequence === "laddu"
                ? "bg-amber-600 text-white shadow-sm"
                : "text-zinc-400 hover:text-gold-200"
            }`}
          >
            Besan Laddu
          </button>
        </div>
      </div>

      {/* Dynamic Scrollytelling Story Overlay */}
      <div className="absolute bottom-24 sm:bottom-28 left-6 sm:left-10 max-w-lg z-10 pointer-events-none">
        <div className="inline-block px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-gold-400/30 text-[11px] font-bold tracking-wider uppercase text-gold-300 mb-2">
          {milestone.badge}
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight drop-shadow-md leading-[1.1]">
          {milestone.headline}
        </h2>
        <p className="text-xs sm:text-sm text-zinc-300 mt-2 leading-relaxed drop-shadow-sm max-w-md">
          {milestone.sub}
        </p>
      </div>

      {/* Bottom Floating Control Bar */}
      <div className="absolute bottom-5 left-4 right-4 sm:left-10 sm:right-10 z-20 flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#14100E]/90 backdrop-blur-xl border border-gold-400/35 px-4 py-3 rounded-2xl shadow-2xl">
        {/* Playback Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 rounded-xl bg-saffron-600 hover:bg-saffron-500 text-white transition-all shadow-md active:scale-95"
            title={isPlaying ? "Pause Playback" : "Auto-Play 60 Frames"}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setTargetFrame(0)}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gold-300 border border-white/10 transition-colors"
            title="Reset to Frame 1"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <span className="text-[11px] text-zinc-400 hidden md:inline ml-1 font-mono">
            {progressPercent}% Sequence Complete
          </span>
        </div>

        {/* Frame Progress Slider / Scrubber */}
        <div className="flex-1 w-full sm:max-w-md mx-2 flex items-center gap-2">
          <input
            type="range"
            min={0}
            max={TOTAL_FRAMES - 1}
            value={currentFrame}
            onChange={e => setTargetFrame(Number(e.target.value))}
            className="w-full accent-saffron-500 h-1.5 bg-white/20 rounded-lg cursor-pointer"
          />
        </div>

        {/* Quick CTA */}
        <div className="flex items-center gap-2">
          <Link
            href="/menu"
            className="px-4 py-2 bg-gradient-to-r from-maroon-700 to-maroon-800 hover:from-maroon-800 hover:to-maroon-900 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-1.5 whitespace-nowrap"
          >
            <span>Explore Menu</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
