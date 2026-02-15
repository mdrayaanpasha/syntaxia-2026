
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { 
  Sword, Gamepad2, Target, Shield, Code, Terminal, Cpu, 
  Trophy, Sparkles, DoorOpen, TrendingUp, Video, ChevronRight, Zap
} from 'lucide-react';
import PremiumNavbar from '../home/components/nav';
import data from "../../data.json";

const EventsSection = () => {
  const [searchParams] = useSearchParams();
  const [filter, setFilter] = useState('All');
  const navigate = useNavigate();

  // Helper to map UI icons to Titles
  const getIcon = (title) => {
    const icons = {
      "BGMI": <Gamepad2 size={20} />,
      "LOCK // LOAD": <Target size={20} />,
      "CTF": <Shield size={20} />,
      "REDSTONE RUN": <Code size={20} />,
      "DATA DETECTIVE": <Terminal size={20} />,
      "IT QUIZ": <Cpu size={20} />,
      "IPL AUCTION": <Trophy size={20} />,
      "ANIME QUIZ": <Sparkles size={20} />,
      "ESCAPE ROOM": <DoorOpen size={20} />,
      "BUSINESS REVIVAL": <TrendingUp size={20} />,
      "REEL MAKING": <Video size={20} />
    };
    return icons[title] || <Zap size={20} />;
  };

  useEffect(() => {
    const sector = searchParams.get('sector');
    if (sector) {
      // Map URL params to Category names in JSON
      const sectorMap = {
        "technical": "Technical",
        "gaming": "Gaming",
        "non-technical": "Non-Technical"
      };
      setFilter(sectorMap[sector.toLowerCase()] || 'All');
    }
  }, [searchParams]);

  const categories = ["All", "Technical", "Non-Technical", "Gaming"];
  
  // Filter logic using "cat" key from your JSON
  const filteredQuests = filter === "All" 
    ? data.quests 
    : data.quests.filter(q => q.cat === filter);

  return (
    <div className="min-h-screen bg-[#030303] font-minecraft selection:bg-[#55aa55] selection:text-black">
      <PremiumNavbar />
      
      <section className="relative py-32 px-6 lg:px-12 max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8 border-b border-white/5 pb-12">
          <div>
            <div className="flex items-center gap-3 text-[#55aa55] font-mono tracking-[0.5em] text-[10px] uppercase mb-4">
              <Sword size={14} className="animate-pulse" /> /intel_sectors_decrypted
            </div>
            <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase italic [text-shadow:6px_6px_0px_#111]">
              QUEST <span className="text-[#ffcc00]">BOARD</span>
            </h2>
          </div>

          <div className="flex flex-wrap gap-1 bg-white/5 p-1 border border-white/10">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => {
                  setFilter(cat);
                  // Sync URL when clicking filter buttons
                  const urlParam = cat === "All" ? "all" : cat.toLowerCase();
                  window.location.href=`/events?sector=${urlParam}`;
                }}
                className={`px-6 py-2 text-[10px] font-black tracking-widest transition-all uppercase italic ${
                  filter === cat ? 'bg-[#55aa55] text-black' : 'text-gray-500 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-1 bg-white/5 border border-white/5 p-1">
          {filteredQuests.map((quest) => (
            <div 
              key={quest.id} 
              onClick={() => window.location.href=`/event-details?id=${quest.dbId}`}
              className="group relative h-80 bg-[#050505] overflow-hidden cursor-pointer border border-transparent hover:border-[#55aa55]/50 transition-all"
            >
              {/* IMAGE */}
              <div className="absolute inset-0 z-0">
                <img 
                  src={quest.img} 
                  alt={quest.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent"></div>
              </div>

              {/* TOP BAR */}
              <div 
                className="absolute top-0 left-0 h-1 w-full z-20 opacity-40 group-hover:opacity-100"
                style={{ backgroundColor: quest.accent }}
              ></div>

              {/* CONTENT */}
              <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div 
                    className="w-12 h-12 border-2 flex items-center justify-center bg-black/60 shadow-[4px_4px_0px_#000]"
                    style={{ borderColor: quest.accent, color: quest.accent }}
                  >
                    {getIcon(quest.title)}
                  </div>
                  <Zap size={14} className="text-gray-800 group-hover:text-[#ffcc00] transition-colors" />
                </div>

                <div>
                  <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter mb-2 [text-shadow:3px_3px_0px_#000]">
                    {quest.title}
                  </h3>
                  <p className="text-gray-400 font-mono text-[9px] uppercase tracking-[0.2em] group-hover:text-white transition-colors">
                    {quest.desc}
                  </p>
                  
                  <div className="mt-6 flex items-center gap-2 text-[#55aa55] opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0">
                    <span className="text-[9px] font-black uppercase tracking-widest italic">Initialize_Uplink</span>
                    <ChevronRight size={14} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default EventsSection;