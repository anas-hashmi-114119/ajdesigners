import React from 'react';
import { Sparkles, Heart, MessageCircle, Send, Bookmark } from 'lucide-react';

/**
 * High-Fidelity 3D Device Frames (MacBook Pro, iPhone 16 Pro, Urban Billboard)
 * Built with realistic CSS glass reflections and perspective.
 */

// 1. MacBook Pro 3D Mockup
export function MacBookMockup({
  imageUrl = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80',
  title = 'SaaS Analytics Dashboard',
  badge = 'B2B Client Portal',
}) {
  return (
    <div className="relative mx-auto w-full max-w-2xl group perspective-1000">
      {/* Top Lid / Screen */}
      <div className="relative rounded-t-2xl bg-charcoal-900 p-2.5 sm:p-3 shadow-2xl border border-charcoal-700/80 transition-transform duration-500 ease-out group-hover:scale-[1.01]">
        {/* Camera Notch */}
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-16 h-3.5 bg-black rounded-b-md z-30 flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-navy-950 border border-charcoal-700" />
          <div className="w-1 h-1 rounded-full bg-emerald-500/70 ml-2" />
        </div>

        {/* Display Glass */}
        <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-navy-950 border border-charcoal-800">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />

          {/* Screen Glaze Reflection */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none" />

          {/* Live Overlay Badge */}
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-navy-950/80 text-white backdrop-blur-md border border-white/10 shadow-lg">
              {badge}
            </span>
          </div>

          <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-navy-950/85 backdrop-blur-md border border-white/10 flex items-center justify-between">
            <div className="text-left">
              <div className="text-xs font-bold text-white line-clamp-1">{title}</div>
              <div className="text-[10px] text-charcoal-400">AJDesigners Strategic Production</div>
            </div>
            <span className="text-[10px] font-semibold text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full">
              Live Campaign
            </span>
          </div>
        </div>
      </div>

      {/* MacBook Base & Notch */}
      <div className="relative mx-auto h-3 w-full rounded-b-xl bg-gradient-to-b from-charcoal-700 via-charcoal-600 to-charcoal-800 shadow-xl border-t border-charcoal-500">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-1.5 w-24 rounded-b-md bg-charcoal-900" />
      </div>
      <div className="mx-auto h-1 w-[94%] rounded-b-2xl bg-charcoal-950 shadow-2xl opacity-60" />
    </div>
  );
}

// 2. iPhone 16 Pro 3D Mockup
export function IPhoneMockup({
  imageUrl = 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80',
  brandName = '@ajdesigners.creative',
  caption = 'Cinematic short-form viral edit with animated typography.',
}) {
  return (
    <div className="relative mx-auto w-full max-w-[280px] sm:max-w-[310px] group perspective-1000">
      {/* Outer Titanium Chassis */}
      <div className="relative rounded-[48px] bg-charcoal-800 p-3 shadow-2xl border-2 border-charcoal-600/80 transition-transform duration-500 ease-out group-hover:scale-[1.02]">
        {/* Dynamic Island */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-30 flex items-center justify-between px-3 shadow-md">
          <div className="w-2.5 h-2.5 rounded-full bg-charcoal-900" />
          <div className="w-2 h-2 rounded-full bg-blue-500/80 animate-pulse" />
        </div>

        {/* Screen Display */}
        <div className="relative aspect-[9/19] overflow-hidden rounded-[40px] bg-black">
          <img
            src={imageUrl}
            alt={caption}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />

          {/* Social UI Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 pointer-events-none" />

          {/* Top Status */}
          <div className="absolute top-4 left-6 right-6 flex items-center justify-between text-[11px] font-semibold text-white/90">
            <span>9:41</span>
            <div className="flex items-center gap-1.5">
              <span>5G</span>
              <div className="w-5 h-2.5 rounded-sm border border-white/80 p-0.5">
                <div className="h-full w-full bg-white rounded-2xs" />
              </div>
            </div>
          </div>

          {/* Right Action Bar */}
          <div className="absolute right-3 bottom-20 flex flex-col items-center gap-4 text-white z-20">
            <div className="flex flex-col items-center">
              <div className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center">
                <Heart className="w-5 h-5 text-red-500 fill-red-500" />
              </div>
              <span className="text-[10px] font-bold mt-1">28.4K</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center">
                <MessageCircle className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold mt-1">1.2K</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center">
                <Send className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold mt-1">Share</span>
            </div>
            <div className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center">
              <Bookmark className="w-5 h-5" />
            </div>
          </div>

          {/* Bottom Caption & Handle */}
          <div className="absolute bottom-5 left-4 right-16 text-left text-white z-20 space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-electric-500 to-purple-brand flex items-center justify-center text-[10px] font-bold">
                AJ
              </div>
              <span className="text-xs font-bold">{brandName}</span>
            </div>
            <p className="text-[11px] text-charcoal-200 line-clamp-2 leading-tight">
              {caption}
            </p>
            <div className="flex items-center gap-1.5 text-[10px] text-electric-300 font-semibold pt-1">
              <Sparkles className="w-3 h-3" />
              <span>AI Staging + Color Graded</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 3. Urban Billboard 3D Mockup
export function BillboardMockup({
  imageUrl = 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80',
  brand = 'LUMEN LUXE COSMETICS',
  headline = 'Redefining Organic Radiance Worldwide',
}) {
  return (
    <div className="relative mx-auto w-full max-w-2xl group perspective-1000">
      {/* Heavy Steel Billboard Frame */}
      <div className="relative rounded-2xl bg-charcoal-900 p-4 shadow-2xl border-4 border-charcoal-800 transition-transform duration-500 ease-out group-hover:scale-[1.01]">
        {/* Floodlight Fixtures */}
        <div className="absolute -top-3 left-12 right-12 flex justify-between z-30">
          <div className="w-8 h-3 bg-charcoal-700 rounded-b shadow-lg border border-charcoal-500" />
          <div className="w-8 h-3 bg-charcoal-700 rounded-b shadow-lg border border-charcoal-500" />
          <div className="w-8 h-3 bg-charcoal-700 rounded-b shadow-lg border border-charcoal-500" />
        </div>

        {/* Billboard Canvas Display */}
        <div className="relative aspect-[21/9] overflow-hidden rounded-lg bg-navy-950">
          <img
            src={imageUrl}
            alt={brand}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent" />

          {/* Typography */}
          <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-center max-w-md text-left text-white">
            <span className="text-[10px] sm:text-xs font-mono font-extrabold tracking-widest text-electric-400 uppercase mb-1">
              {brand}
            </span>
            <h4 className="text-lg sm:text-2xl font-display font-extrabold tracking-tight leading-tight">
              {headline}
            </h4>
            <div className="mt-3 inline-flex items-center gap-1.5 text-[10px] font-semibold text-charcoal-300">
              <span>Brand Identity & Packaging by AJDesigners</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mounting Poles / Truss Structure */}
      <div className="flex justify-around items-center h-6 w-3/4 mx-auto opacity-70">
        <div className="w-3 h-full bg-gradient-to-b from-charcoal-700 to-charcoal-900" />
        <div className="w-3 h-full bg-gradient-to-b from-charcoal-700 to-charcoal-900" />
      </div>
    </div>
  );
}
