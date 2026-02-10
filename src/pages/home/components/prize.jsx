import React from 'react';
import { Trophy, Award, Contact, CreditCard, Star, Gem, Zap, Layers } from 'lucide-react';

const PrizesSection = () => {
  return (
    <section id="prizes" className="relative py-20 md:py-32 px-4 md:px-6 bg-[#030303] font-minecraft overflow-hidden">
      
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* RESPONSIVE HEADER */}
        <div className="mb-16 md:mb-32 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-8 md:pb-12">
          <div>
            <div className="flex items-center gap-3 text-[#4db5ff] font-mono text-[9px] md:text-[10px] tracking-[0.4em] md:tracking-[0.5em] uppercase mb-4">
              <div className="w-1.5 h-1.5 bg-[#4db5ff] animate-ping" /> /rewards_intel
            </div>
            {/* Clamp ensures the text scales perfectly between mobile and desktop */}
            <h2 className="text-[14vw] md:text-9xl font-black text-white uppercase italic leading-none tracking-tighter [text-shadow:4px_4px_0px_#111]">
              THE <span className="text-[#4db5ff]">VAULT</span>
            </h2>
          </div>
          <p className="text-gray-600 font-mono text-[9px] md:text-[10px] uppercase tracking-widest text-left md:text-right leading-relaxed">
            System_Update: 2026.02.10 <br className="hidden md:block" /> Status: Loot_Confirmed
          </p>
        </div>

        {/* MAIN REWARDS GRID: Stacks on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 bg-white/5 border border-white/5">
          
          {/* SECTOR 01: GAMING */}
          <div className="bg-[#050505] p-8 md:p-16 relative group">
            <div className="absolute top-0 left-0 w-1 lg:w-1.5 h-full bg-[#ffcc00] opacity-30 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="flex items-center gap-4 md:gap-6 mb-10 md:mb-16">
              <div className="w-14 h-14 md:w-20 md:h-20 border border-white/10 flex items-center justify-center bg-white/5 text-[#ffcc00]">
                <Gem size={28} className="md:w-8 md:h-8" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl md:text-4xl font-black text-white italic uppercase tracking-tighter">Gaming_Arena</h3>
            </div>

            <div className="space-y-6 md:space-y-8">
              <div className="flex justify-between items-end border-b border-white/5 pb-4">
                <span className="text-gray-500 font-mono text-[9px] md:text-[10px] uppercase tracking-widest font-bold">1st_Place</span>
                <span className="text-4xl md:text-5xl font-black text-[#ffcc00] italic leading-none tracking-tighter">₹5,000</span>
              </div>
              <div className="flex justify-between items-end border-b border-white/5 pb-4">
                <span className="text-gray-500 font-mono text-[9px] md:text-[10px] uppercase tracking-widest font-bold">2nd_Place</span>
                <span className="text-2xl md:text-3xl font-black text-white italic leading-none opacity-40 tracking-tighter">₹3,000</span>
              </div>
            </div>
          </div>

          {/* SECTOR 02: NON-GAMING */}
          <div className="bg-[#050505] p-8 md:p-16 relative group">
            <div className="absolute top-0 left-0 w-1 lg:w-1.5 h-full bg-[#4db5ff] opacity-30 group-hover:opacity-100 transition-opacity"></div>

            <div className="flex items-center gap-4 md:gap-6 mb-10 md:mb-16">
              <div className="w-14 h-14 md:w-20 md:h-20 border border-white/10 flex items-center justify-center bg-white/5 text-[#4db5ff]">
                <Star size={28} className="md:w-8 md:h-8" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl md:text-4xl font-black text-white italic uppercase tracking-tighter">General_Quest</h3>
            </div>

            <div className="space-y-6 md:space-y-8">
              <div className="flex justify-between items-end border-b border-white/5 pb-4">
                <span className="text-gray-500 font-mono text-[9px] md:text-[10px] uppercase tracking-widest font-bold">1st_Place</span>
                <span className="text-4xl md:text-5xl font-black text-[#4db5ff] italic leading-none tracking-tighter">₹2,000</span>
              </div>
              <div className="flex justify-between items-end border-b border-white/5 pb-4">
                <span className="text-gray-500 font-mono text-[9px] md:text-[10px] uppercase tracking-widest font-bold">2nd_Place</span>
                <span className="text-2xl md:text-3xl font-black text-white italic leading-none opacity-40 tracking-tighter">₹1,000</span>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM HUD: Stacks 1 col on mobile, 3 on md */}
        <div className="mt-1 grid grid-cols-1 md:grid-cols-3 gap-1 px-1 bg-white/5">
          
          <div className="bg-[#050505] p-6 md:p-8 flex flex-col justify-between h-48 md:h-64">
             <Layers className="text-[#55aa55]" size={20} md:size={24} />
             <div>
                <p className="text-white font-black italic uppercase text-lg md:text-xl mb-1">CERTIFICATES</p>
                <p className="text-gray-600 font-mono text-[8px] md:text-[9px] uppercase tracking-widest">Winners // Participation</p>
             </div>
          </div>

          <div className="bg-[#050505] p-6 md:p-8 flex flex-col justify-between h-48 md:h-64">
             <Contact className="text-[#ffcc00]" size={20} md:size={24} />
             <div>
                <p className="text-white font-black italic uppercase text-lg md:text-xl mb-1">XP_BANDS</p>
                <p className="text-gray-600 font-mono text-[8px] md:text-[9px] uppercase tracking-widest">Physical Access IDs</p>
             </div>
          </div>

          <div className="bg-[#050505] p-6 md:p-8 flex flex-col justify-between h-48 md:h-64">
             <CreditCard className="text-[#4db5ff]" size={20} md:size={24} />
             <div>
                <p className="text-white font-black italic uppercase text-lg md:text-xl mb-1">QUEST_CARDS</p>
                <p className="text-gray-600 font-mono text-[8px] md:text-[9px] uppercase tracking-widest">Tactical Entry Protocol</p>
             </div>
          </div>

        </div>

        {/* FOOTER TEXT */}
        <div className="mt-10 md:mt-16 text-center">
            <p className="text-[8px] md:text-[9px] font-mono text-gray-800 uppercase tracking-[0.4em] md:tracking-[0.6em] leading-relaxed">
                Secure_Loot_Distribution_Initiated_2026 // Cybernetics_SJU
            </p>
        </div>

      </div>
    </section>
  );
};

export default PrizesSection;