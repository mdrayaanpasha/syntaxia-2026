import React from 'react';
import { Gamepad2, MoveDown, Zap, Globe } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen w-full flex items-center overflow-hidden font-minecraft bg-[#030303]">
      
      {/* 1. BACKGROUND LAYER: Left-to-Right Fade */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://ik.imagekit.io/yylpuqff5/Minecraft/cover.png" 
          alt="Minecraft Cover" 
          className="w-full h-full object-cover opacity-60"
        />
        {/* Radical Gradient for HUD focus - Adjusted for mobile center-bottom fade */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#030303] via-[#030303]/90 md:via-[#030303]/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent"></div>
      </div>

      {/* 2. HUD CONTENT: Left Aligned */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pt-20 md:pt-0">
        
        {/* Top Metadata */}
        <div className="mb-6 md:mb-10 flex flex-wrap items-center gap-4 md:gap-6">
          <div className="flex items-center gap-2 text-[#55aa55] font-mono text-[9px] md:text-[10px] tracking-[0.3em] md:tracking-[0.5em] uppercase">
            <Zap size={14} className="animate-pulse" /> /connection_established
          </div>
          <div className="hidden sm:block h-[1px] w-12 md:w-24 bg-white/10"></div>
          <div className="text-gray-500 font-mono text-[9px] md:text-[10px] tracking-[0.2em] md:tracking-[0.3em] uppercase">
            Ping: 12ms // SJU_Node
          </div>
        </div>

        {/* MASSIVE TITLES */}
        <div className="max-w-4xl">
          {/* Responsive Text Sizes: text-6xl on small, 8xl on medium, 12rem on large */}
          <h1 className="text-6xl sm:text-8xl lg:text-[12rem] font-black text-white uppercase italic leading-[0.8] tracking-tighter [text-shadow:6px_6px_0px_#111] md:[text-shadow:12px_12px_0px_#111]">
            SYNTA<span className="text-[#ffcc00]">XIA</span>
          </h1>
          
          <div className="mt-6 md:mt-8 flex flex-col md:flex-row md:items-center gap-4 md:gap-12">
            <h2 className="text-xl sm:text-2xl md:text-4xl font-black text-white uppercase italic tracking-[0.1em] md:tracking-[0.2em] opacity-80">
              CYBERNETICS_2026
            </h2>
            <div className="hidden md:block h-2 w-2 bg-[#ffcc00] rotate-45"></div>
            <p className="max-w-xs md:max-w-sm text-gray-500 font-mono text-[10px] md:text-xs uppercase tracking-widest leading-relaxed">
              The premier algorithmic conquest. <br className="hidden md:block" /> Initialize your terminal for entry.
            </p>
          </div>
        </div>

        {/* ACTION HUD: Stacks on Mobile */}
        <div className="mt-12 md:mt-20 flex flex-col sm:flex-row items-stretch sm:items-start gap-2 md:gap-1">
          <button 
            className="group relative px-8 md:px-12 py-5 md:py-6 bg-[#55aa55] border-b-[6px] md:border-b-[8px] border-black hover:bg-white transition-all active:translate-y-1 active:border-b-4"
            onClick={() => window.location.href="/events"}
          >
            <span className="relative flex items-center justify-center gap-4 text-black font-black uppercase tracking-[0.2em] md:tracking-[0.3em] italic text-lg md:text-xl">
              <Gamepad2 size={24} /> ENTER_WORLD
            </span>
          </button>
          
          <div className="bg-[#111] border-x-[4px] border-b-[6px] md:border-b-[8px] border-black p-4 md:p-6 flex items-center justify-between sm:justify-start gap-4 md:gap-6">
            <div className="text-left">
              <p className="text-[#ffcc00] text-[9px] md:text-[10px] font-black uppercase tracking-widest">Server_Status</p>
              <p className="text-white text-[10px] md:text-xs font-mono uppercase">Online // Whitelist_Open</p>
            </div>
            <Globe size={20} className="text-gray-700 animate-spin-slow shrink-0" />
          </div>
        </div>
      </div>

      {/* 3. SIDE HUD DECOR: Hidden on Small Screens */}
      <div className="absolute right-6 md:right-12 bottom-12 hidden sm:flex flex-col items-end gap-4 opacity-20">
        <div className="flex gap-1 md:gap-2">
            {[...Array(5)].map((_, i) => (
                <div key={i} className="w-1 h-6 md:h-8 bg-white/20"></div>
            ))}
        </div>
        <p className="text-white font-mono text-[8px] md:text-[10px] uppercase tracking-[1em] rotate-180 [writing-mode:vertical-lr]">
          SECURE_ENCRYPTION
        </p>
      </div>

      {/* 4. SCROLL INDICATOR: Stays Left Weighted */}
      <div className="absolute bottom-6 md:bottom-10 left-6 md:left-12 z-20 flex flex-col items-center gap-2 md:gap-4 opacity-40">
        <span className="text-[9px] md:text-[10px] font-mono uppercase tracking-[0.5em] [writing-mode:vertical-lr] mb-2">Scroll</span>
        <MoveDown className="text-white animate-bounce" size={18} md:size={20} />
      </div>
      
    </section>
  );
};

export default HeroSection;