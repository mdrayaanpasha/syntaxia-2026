import React from 'react';
import { Gamepad2, ChevronsDown, Sparkles } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden font-minecraft">
      
      {/* 1. BACKGROUND IMAGE LAYER */}
      <div className="absolute inset-0 z-0">
        {/* The requested background image */}
        <img 
          src="https://ik.imagekit.io/yylpuqff5/Minecraft/cover.png" 
          alt="Minecraft Cover" 
          className="w-full h-full object-cover"
        />
        
        {/* Dark Overlay/Shaders for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-[#0a0a0a]"></div>
        
        {/* Floating XP Orbs */}
        <div className="absolute inset-0 opacity-30">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              className="absolute w-1.5 h-1.5 bg-[#55aa55] rounded-full animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                boxShadow: '0 0 12px #55aa55'
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* 2. MAIN CONTENT SLAB */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        
        {/* Status Badge */}
        <div className="mb-6 flex items-center gap-2 px-4 py-1 bg-black/60 border border-[#ffcc00]/30 backdrop-blur-md">
          <Sparkles size={14} className="text-[#ffcc00]" />
          <span className="text-[10px] tracking-[0.4em] text-[#ffcc00] [text-shadow:1px_1px_0px_#000]">
            SERVER VERSION 20.26.1-RTX
          </span>
        </div>

        {/* MASSIVE PREMIUM LOGO */}
        <div className="relative mb-12 group">
          {/* Subtle glow behind logo */}
          <div className="absolute -inset-10 bg-black/40 blur-3xl rounded-full"></div>
          
          <h1 className="relative text-7xl md:text-9xl text-white tracking-tighter leading-none [text-shadow:8px_8px_0px_#373737]">
            SYNTAXIA
          </h1>
          <div className="mt-2 text-[#ffcc00] text-xl md:text-2xl tracking-[0.5em] [text-shadow:2px_2px_0px_#000]">
            CYBERNETICS
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-6">
          <button className="relative px-10 py-4 group overflow-hidden" onClick={e=>window.location.href="/events"}>
            <div className="absolute inset-0 bg-[#55aa55] border-b-4 border-r-4 border-[#2d5a2d] group-hover:bg-[#66cc66] active:border-0 active:translate-y-1 transition-all"></div>
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
            <span className="relative text-white text-lg tracking-widest flex items-center gap-3 [text-shadow:2px_2px_0px_#224422]">
              <Gamepad2 size={20} /> ENTER WORLD
            </span>
          </button>

          
        </div>
      </div>

      {/* 3. SCROLL INDICATOR */}
      <div className="absolute bottom-10 left-0 right-0 z-20 flex justify-center animate-bounce opacity-60">
        <ChevronsDown className="text-white" size={32} />
      </div>
      
    </section>
  );
};

export default HeroSection;