import React from 'react';
import { Gamepad2, Map, Server, Hash } from 'lucide-react';
import MCButton from './MCButton';
const RetroTag = ({ label, value }) => (
  <div className="bg-black/40 border border-gray-700 px-3 py-1.5 rounded text-sm font-mono flex items-center gap-2">
    <span className="text-purple-400">{label}:</span>
    <span className={value === 'null' ? 'text-red-400' : 'text-blue-300'}>{value}</span>
  </div>
);

const HeroSection = ({ heroRef, scrollToSection }) => {
  const minecraftBgUrl = "https://ik.imagekit.io/yylpuqff5/Minecraft/cover.png";

  return (
    <section
      id="home"
      ref={heroRef}
      className="min-h-screen pt-20 flex items-center justify-center relative overflow-hidden bg-gray-900"
    >
      {/* 1. Modern Background Image Layer */}
      <div className="absolute inset-0 w-full h-full z-0">
        <img
          src={minecraftBgUrl}
          alt="Minecraft Landscape"
          className="w-full h-full object-cover scale-105"
        />
        {/* Modern Gradient Overlay: darker at bottom for text contrast, lighter at top */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/70 to-gray-900/30" />
        {/* Optional: subtle dot pattern overlay for texture */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSc0JyBoZWlnaHQ9JzQnIHZpZXdCb3g9JzAgMCA0IDQnPgo8cGF0aCBmaWxsPScjZmZmZmZmJyBmaWxsLW9wYWNpdHk9JzAuMDUnIGQ9J00xIDNoMXYxSDFVM3ptMiAyaDF2MUgzVjV6Jy8+Cjwvc3ZnPg==')] opacity-50"></div>
      </div>

      {/* 2. Subtler Floating Elements (Modernized) */}
      {/* Using slightly transparent, glowing cubes instead of flat blocks */}
      <div className="absolute top-32 left-[15%] w-16 h-16 rounded-xl bg-emerald-500/30 backdrop-blur-sm border border-emerald-400/50 animate-float hidden lg:block z-10 rotate-12 shadow-[0_0_30px_rgba(16,185,129,0.3)]" />
      <div className="absolute bottom-48 right-[10%] w-12 h-12 rounded-lg bg-cyan-500/30 backdrop-blur-sm border border-cyan-400/50 animate-float z-10 -rotate-12 shadow-[0_0_30px_rgba(6,182,212,0.3)]" style={{ animationDelay: '1.5s', animationDuration: '5s' }} />


      {/* Main Content */}
      <div className="relative z-20 text-center max-w-5xl mx-auto px-4 pb-16">
        
        {/* Server Status Badge - Modern Pill */}
        <div className="mb-10 inline-flex items-center gap-3 bg-gray-900/60 backdrop-blur-md border border-gray-700/50 px-5 py-2 rounded-full shadow-lg">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          <span className="font-minecraft text-sm md:text-base text-green-300 tracking-wider">
            SERVER ONLINE <span className="text-gray-400 mx-2">|</span> 256/300 PLAYERS
          </span>
        </div>

        {/* Main Title - Kept Pixelated for impact, but cleaner shadows */}
        <h1 className="font-minecraft text-white mb-8 leading-none drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)]">
          <span className="block text-7xl md:text-8xl lg:text-9xl text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 to-yellow-500">
            SYNTAXIA
          </span>
          <span className="block text-4xl md:text-6xl lg:text-7xl mt-2 text-transparent bg-clip-text bg-gradient-to-b from-emerald-300 to-emerald-500">
            2025
          </span>
        </h1>

        {/* Modern Glassmorphism Content Box */}
       {/* Retro-Modern Glass Terminal Card */}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-6 scale-110 transform origin-top">
          <MCButton
            variant="diamond"
            size="lg"
            icon={Gamepad2}
            onClick={() => scrollToSection('events')}
          >
            Join Game
          </MCButton>
          <MCButton
            variant="emerald"
            size="lg"
            icon={Map}
            onClick={() => scrollToSection('about')}
          >
            View Map
          </MCButton>
        </div>
      </div>
    </section>
  );
};

// Helper component for the new tags
const ModernTag = ({ children, color, icon: Icon }) => {
  const colorClasses = {
    red: "bg-red-500/20 text-red-300 border-red-500/30",
    blue: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    purple: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  };

  return (
    <span className={`flex items-center gap-1.5 px-4 py-2 rounded-lg border backdrop-blur-sm ${colorClasses[color]} font-sans text-sm font-medium transition-transform hover:scale-105`}>
      <Icon size={14} />
      {children}
    </span>
  );
};

export default HeroSection;