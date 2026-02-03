import React from 'react';
import { Trophy, Gift, Award, Contact, CreditCard, Star, Gem, Zap } from 'lucide-react';

const PrizesSection = () => {
  return (
    <section id="prizes" className="relative py-24 px-6 bg-[#0a0a0a] font-minecraft overflow-hidden">
      {/* Vault Background Aura */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#4db5ff]/5 blur-[100px] rounded-full"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* HEADER */}
        <div className="flex flex-col items-center mb-20 text-center">
          <div className="flex items-center gap-2 mb-4 text-[#4db5ff] animate-pulse">
            <Trophy size={18} />
            <span className="tracking-[0.4em] text-[10px] uppercase">/loot_table view</span>
          </div>
          <h2 className="text-5xl md:text-7xl text-white tracking-tight [text-shadow:4px_4px_0px_#373737]">
            TREASURE <span className="text-[#4db5ff]">VAULT</span>
          </h2>
        </div>

        {/* PRIZE MONEY SLABS */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          
          {/* General Events Prize */}
          <div className="relative group">
            <div className="relative bg-[#1a1a1a] border-x-[4px] border-b-[8px] border-black p-10 transition-all group-hover:-translate-y-2 group-hover:bg-[#222]">
              <div className="h-[5px] absolute top-0 left-0 w-full bg-[#ffcc00] shadow-[0_2px_10px_rgba(255,204,0,0.3)]"></div>
              
              <div className="flex justify-between items-start mb-8">
                <div className="p-4 bg-black/40 border-2 border-[#ffcc00] text-[#ffcc00] shadow-[0_0_15px_rgba(255,204,0,0.2)]">
                  <Star size={32} />
                </div>
                <span className="text-[10px] text-gray-500 tracking-[0.3em] uppercase italic">Category: General</span>
              </div>

              <h3 className="text-3xl text-white mb-6 [text-shadow:2px_2px_0px_#000]">GENERAL QUESTS</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-black/30 border border-white/5">
                  <span className="text-gray-400 text-sm tracking-widest uppercase">1st Place</span>
                  <span className="text-2xl text-[#ffcc00] font-minecraft-ten">₹2000</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-black/30 border border-white/5">
                  <span className="text-gray-400 text-sm tracking-widest uppercase">2nd Place</span>
                  <span className="text-2xl text-gray-300 font-minecraft-ten">₹1000</span>
                </div>
              </div>
            </div>
          </div>

          {/* Gaming Events Prize */}
          <div className="relative group">
            <div className="relative bg-[#1a1a1a] border-x-[4px] border-b-[8px] border-black p-10 transition-all group-hover:-translate-y-2 group-hover:bg-[#222]">
              <div className="h-[5px] absolute top-0 left-0 w-full bg-[#4db5ff] shadow-[0_2px_10px_rgba(77,181,255,0.3)]"></div>
              
              <div className="flex justify-between items-start mb-8">
                <div className="p-4 bg-black/40 border-2 border-[#4db5ff] text-[#4db5ff] shadow-[0_0_15px_rgba(77,181,255,0.2)]">
                  <Gem size={32} />
                </div>
                <span className="text-[10px] text-gray-500 tracking-[0.3em] uppercase italic">Category: Gaming</span>
              </div>

              <h3 className="text-3xl text-white mb-6 [text-shadow:2px_2px_0px_#000]">GAMING ARENA</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-black/30 border border-white/5 shadow-[inset_0_0_20px_rgba(77,181,255,0.05)]">
                  <span className="text-gray-400 text-sm tracking-widest uppercase">1st Place</span>
                  <span className="text-2xl text-[#4db5ff] font-minecraft-ten">₹5000</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-black/30 border border-white/5">
                  <span className="text-gray-400 text-sm tracking-widest uppercase">2nd Place</span>
                  <span className="text-2xl text-gray-300 font-minecraft-ten">₹3000</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* PERKS INVENTORY (Certificates & Items) */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Certificate Policy */}
          <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border-x-[3px] border-b-[6px] border-black p-10">
            <h4 className="text-white text-xl mb-8 flex items-center gap-3 border-b border-white/10 pb-4">
              <Award className="text-[#55aa55]" /> CERTIFICATE_PROTOCOLS
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "WINNERS", sub: "PHYSICAL MERIT" },
                { label: "EVENT HEADS", sub: "LEADERSHIP" },
                { label: "VOLUNTEERS", sub: "SERVICE" },
                { label: "PARTICIPANTS", sub: "E-CERTIFICATE" }
              ].map((item, i) => (
                <div key={i} className="p-4 bg-black/40 border border-white/5 group hover:border-[#55aa55] transition-colors">
                  <p className="text-[#55aa55] text-xs font-minecraft-ten tracking-wider mb-1 uppercase">{item.label}</p>
                  <p className="text-[10px] text-gray-500 uppercase italic tracking-tighter">{item.sub}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Physical Swag / ID Cards */}
          <div className="space-y-6">
            <h4 className="text-white text-xl flex items-center gap-3 [text-shadow:2px_2px_0px_#000]">
              <Zap className="text-[#ffcc00]" /> PHYSICAL_LOOT
            </h4>
            
            <div className="flex items-start gap-6 bg-[#1a1a1a] p-6 border-b-4 border-black group">
              <div className="w-16 h-16 bg-black/60 border-2 border-white/10 flex items-center justify-center group-hover:border-[#ffcc00] transition-colors">
                <Contact className="text-gray-500 group-hover:text-[#ffcc00]" size={32} />
              </div>
              <div>
                <h5 className="text-white text-lg tracking-widest uppercase mb-1">XP WRIST BANDS</h5>
                <p className="text-gray-500 text-xs leading-relaxed uppercase">Official Syntaxia 2026 wristbands for all registered adventurers.</p>
              </div>
            </div>

            <div className="flex items-start gap-6 bg-[#1a1a1a] p-6 border-b-4 border-black group">
              <div className="w-16 h-16 bg-black/60 border-2 border-white/10 flex items-center justify-center group-hover:border-[#55aa55] transition-colors">
                <CreditCard className="text-gray-500 group-hover:text-[#55aa55]" size={32} />
              </div>
              <div>
                <h5 className="text-white text-lg tracking-widest uppercase mb-1">QUEST ID CARDS</h5>
                <p className="text-gray-500 text-xs leading-relaxed uppercase">Custom identification cards providing access to the server venues.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PrizesSection;