import React, { useState } from 'react';
import { 
  Sword, Code, Gamepad2, Trophy, MapPin, Clock, Sparkles, 
  Video, Target, Shield, Terminal, Cpu, DoorOpen, TrendingUp, Search
} from 'lucide-react';

const EventsSection = () => {
  const [filter, setFilter] = useState('All');

  const quests = [
    // GAMING - PURPLE (EPIC)
    { id: 1, title: "BGMI", cat: "Gaming", slot: "TBA", venue: "Gaming Arena", icon: <Gamepad2 size={24}/>, rarity: "border-[#A335EE]", glow: "shadow-[0_0_20px_rgba(163,53,238,0.3)]", text: "text-[#A335EE]" },
    { id: 2, title: "VALORANT", cat: "Gaming", slot: "TBA", venue: "Gaming Arena", icon: <Target size={24}/>, rarity: "border-[#A335EE]", glow: "shadow-[0_0_20px_rgba(163,53,238,0.3)]", text: "text-[#A335EE]" },
    
    // TECHNICAL - GREEN (UNCOMMON)
    { id: 3, title: "CTF (CAPTURE THE FLAG)", cat: "Technical", day: "DAY 1", slot: "10:00 – 16:30", venue: "De Nobili Hall (1st Floor)", icon: <Shield size={24}/>, rarity: "border-[#55aa55]", glow: "shadow-[0_0_20px_rgba(85,170,85,0.3)]", text: "text-[#55aa55]" },
    { id: 4, title: "CODING 'N' DEBUGGING", cat: "Technical", day: "DAY 1", slot: "10:00 – 12:30", venue: "Conference Hall 2 (Magis)", icon: <Code size={24}/>, rarity: "border-[#55aa55]", glow: "shadow-[0_0_20px_rgba(85,170,85,0.3)]", text: "text-[#55aa55]" },
    { id: 5, title: "DATA DETECTIVE (SQL)", cat: "Technical", day: "DAY 2", slot: "10:00 – 12:30", venue: "De Nobili Hall (1st Floor)", icon: <Terminal size={24}/>, rarity: "border-[#55aa55]", glow: "shadow-[0_0_20px_rgba(85,170,85,0.3)]", text: "text-[#55aa55]" },
    { id: 6, title: "IT QUIZ", cat: "Technical", day: "TBA", slot: "TBA", venue: "TBA", icon: <Cpu size={24}/>, rarity: "border-[#55aa55]", glow: "shadow-[0_0_20px_rgba(85,170,85,0.3)]", text: "text-[#55aa55]" },

    // NON-TECHNICAL - GOLD (LEGENDARY)
    { id: 7, title: "IPL AUCTION", cat: "Non-Technical", day: "DAY 2", slot: "10:00 – 16:30", venue: "Conference Hall 2 (Magis)", icon: <Trophy size={24}/>, rarity: "border-[#ffcc00]", glow: "shadow-[0_0_20px_rgba(255,204,0,0.3)]", text: "text-[#ffcc00]" },
    { id: 8, title: "ANIME QUIZ", cat: "Non-Technical", day: "DAY 2", slot: "13:30 – 16:30", venue: "De Nobili Hall", icon: <Sparkles size={24}/>, rarity: "border-[#ffcc00]", glow: "shadow-[0_0_20px_rgba(255,204,0,0.3)]", text: "text-[#ffcc00]" },
    { id: 9, title: "ESCAPE ROOM", cat: "Non-Technical", day: "BOTH DAYS", slot: "10:00 – 16:30", venue: "Faber Hall (Ground Floor)", icon: <DoorOpen size={24}/>, rarity: "border-[#ffcc00]", glow: "shadow-[0_0_20px_rgba(255,204,0,0.3)]", text: "text-[#ffcc00]" },
    { id: 10, title: "BUSINESS REVIVAL", cat: "Non-Technical", day: "DAY 1", slot: "10:00 – 16:30", venue: "Aloysius Hall (1st Floor)", icon: <TrendingUp size={24}/>, rarity: "border-[#ffcc00]", glow: "shadow-[0_0_20px_rgba(255,204,0,0.3)]", text: "text-[#ffcc00]" },
    { id: 11, title: "REEL MAKING", cat: "Non-Technical", day: "DAY 1", slot: "10:00 – 12:30", venue: "Loyola Hall (Ground Floor)", icon: <Video size={24}/>, rarity: "border-[#ffcc00]", glow: "shadow-[0_0_20px_rgba(255,204,0,0.3)]", text: "text-[#ffcc00]" },
  ];

  const categories = ["All", "Technical", "Non-Technical", "Gaming"];
  const filteredQuests = filter === "All" ? quests : quests.filter(q => q.cat === filter);

  return (
    <section id="events" className="relative py-24 px-6 bg-[#0a0a0a] font-minecraft">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="relative">
            <div className="flex items-center gap-2 mb-4 text-[#55aa55] animate-pulse">
              <Sword size={18} />
              <span className="tracking-[0.4em] text-[10px] uppercase">/active_quests_loaded</span>
            </div>
            <h2 className="text-5xl md:text-7xl text-white tracking-tight [text-shadow:4px_4px_0px_#373737]">
              QUEST <span className="text-[#ffcc00]">BOARD</span>
            </h2>
          </div>

          {/* FILTER HUD */}
          <div className="flex flex-wrap gap-3 bg-[#1a1a1a] p-2 border-2 border-[#373737]">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 border-2 text-[11px] tracking-[0.2em] transition-all duration-75 active:translate-y-1 active:border-b-0 ${
                  filter === cat 
                  ? 'bg-[#55aa55] border-[#2d5a2d] border-b-4 text-white mc-text-shadow' 
                  : 'bg-[#222] border-[#444] border-b-4 text-gray-500 hover:text-gray-300'
                }`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* QUEST GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredQuests.map((quest) => (
            <div 
              key={quest.id} 
              className={`group relative bg-[#1a1a1a] border-x-4 border-b-[8px] border-black transition-all hover:-translate-y-2 hover:bg-[#222] ${quest.glow}`}
            >
              {/* Top Highlight Bevel */}
              <div className={`h-[5px] w-full ${quest.rarity.replace('border-', 'bg-')}`}></div>
              
              <div className="p-8">
                <div className="flex justify-between items-start mb-8">
                  {/* ICON CONTAINER - Force color to white/glow */}
                  <div className={`p-4 bg-black/60 border-2 ${quest.rarity} ${quest.text} shadow-inner`}>
                    {quest.icon}
                  </div>
                  {quest.day && (
                    <div className="flex flex-col items-end">
                      <span className="text-[10px] font-minecraft-ten text-[#ffcc00] mc-text-shadow">
                        {quest.day}
                      </span>
                      <div className="w-12 h-[2px] bg-[#373737] mt-1"></div>
                    </div>
                  )}
                </div>

                <h3 className="text-2xl text-white mb-6 [text-shadow:2px_2px_0px_#000] tracking-tight group-hover:text-[#ffcc00] transition-colors leading-none uppercase">
                  {quest.title}
                </h3>

                {/* HUD DATA */}
                <div className="space-y-4 mb-10">
                  <div className="flex items-start gap-3">
                    <MapPin size={16} className="text-[#55aa55] mt-0.5" />
                    <span className="text-[12px] text-gray-400 tracking-wider leading-tight uppercase font-minecraft">
                      {quest.venue}
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock size={16} className="text-[#ffcc00] mt-0.5" />
                    <span className="text-[12px] text-gray-400 tracking-wider uppercase font-minecraft">
                      {quest.slot}
                    </span>
                  </div>
                </div>

                {/* INTERACTIVE BUTTON */}
                <button className="w-full relative py-4 group/btn overflow-hidden">
                  <div className="absolute inset-0 bg-[#3c3c3c] border-b-4 border-black group-hover/btn:bg-[#55aa55] transition-colors"></div>
                  <span className="relative font-minecraft-ten text-[11px] text-white tracking-[0.3em] mc-text-shadow flex items-center justify-center gap-2">
                    <Search size={14} /> VIEW_INTEL
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;