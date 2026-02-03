import React from 'react';
import { ChevronDown, Globe, Zap, Sword, Map, Mail } from 'lucide-react';

// --- Font Loader (Ensures the UI actually uses the pixel fonts) ---
const MinecraftFontLoader = () => (
  <style>{`
    @import url('https://fonts.cdnfonts.com/css/minecraft-4');
    @import url('https://fonts.googleapis.com/css2?family=Silkscreen:wght@400;700&display=swap');
    
    .font-minecraft { 
      font-family: 'Minecraft', 'Silkscreen', sans-serif; 
    }

    @keyframes shimmer {
      100% { transform: translateX(100%); }
    }
    .animate-shimmer {
      animation: shimmer 2s infinite;
    }
  `}</style>
);

const PremiumNavbar = () => {
  return (
    <>
      <MinecraftFontLoader />
      <nav className="fixed top-6 left-0 right-0 z-50 px-6 font-minecraft">
        <div className="max-w-7xl mx-auto relative group">
          
          {/* Shaders-style Outer Glow */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-[#55aa55] to-[#2d5a2d] opacity-20 blur-xl group-hover:opacity-40 transition duration-1000"></div>
          
          {/* Main "Slab" Body */}
          <div className="relative bg-[#1a1a1a]/90 backdrop-blur-xl border-x-[3px] border-b-[6px] border-[#000000] shadow-[0_15px_40px_rgba(0,0,0,0.6)]">
            
            {/* Top Bevel Highlight (Physical Block Edge) */}
            <div className="h-[4px] w-full bg-gradient-to-r from-[#7a7a7a] via-[#ffffff66] to-[#7a7a7a]"></div>

            <div className="flex justify-between items-center h-20 px-8">
              
              {/* Logo Section */}
              <div className="flex items-center space-x-3 cursor-pointer group/logo">
                <div className="flex flex-col leading-tight">
                  <span className="text-white text-2xl tracking-tight [text-shadow:2px_2px_0px_#373737]">
                    SYNTAXIA
                  </span>
                  <span className="text-[#ffcc00] text-[10px] tracking-[0.4em] [text-shadow:1px_1px_0px_#443300]">
                    CYBERNETICS 2026
                  </span>
                </div>
              </div>

              {/* Navigation Links */}
              <div className="hidden lg:flex items-center space-x-1">
                <NavItem icon={<Globe size={14}/>} label="HOME" />
                <NavItem icon={<Sword size={14}/>} label="EVENTS" hasDropdown />
                <NavItem icon={<Map size={14}/>} label="SCHEDULE" />
                <NavItem icon={<Mail size={14}/>} label="CONTACT" />
                
                {/* Premium Animated Register Button */}
                <button className="ml-6 relative px-8 py-3 group/btn overflow-hidden">
                  {/* Button Body */}
                  <div className="absolute inset-0 bg-[#55aa55] border-b-4 border-r-4 border-[#2d5a2d] active:border-0 active:translate-y-1 transition-all"></div>
                  
                  {/* Enchanted Glint Animation */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/btn:animate-shimmer"></div>
                  
                  <span className="relative text-white text-xs tracking-[0.2em] flex items-center gap-2 [text-shadow:1px_1px_0px_#224422]">
                    <Zap size={14} fill="white" className="animate-pulse" /> REGISTER
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

const NavItem = ({ label, icon, hasDropdown }) => (
  <div className="relative px-5 py-2 flex items-center gap-2 text-[#dddddd] hover:text-[#ffcc00] text-sm tracking-widest cursor-pointer transition-all hover:bg-white/5 border-b-2 border-transparent hover:border-[#ffcc00] group">
    {icon && <span className="opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-transform">{icon}</span>}
    <span className="[text-shadow:1px_1px_0px_#000000]">{label}</span>
    {hasDropdown && <ChevronDown size={12} className="mt-0.5 opacity-50" />}
  </div>
);

export default PremiumNavbar;