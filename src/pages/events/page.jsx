import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { 
  Sword, Gamepad2, Target, Shield, Code, Terminal, Cpu, 
  Trophy, Sparkles, DoorOpen, TrendingUp, Video, ChevronRight, Zap
} from 'lucide-react';
import PremiumNavbar from '../home/components/nav';

const EventsSection = () => {
  const [searchParams] = useSearchParams();
  const [filter, setFilter] = useState('All');
  const navigate = useNavigate();

  useEffect(() => {
    const sector = searchParams.get('sector');
    if (sector) {
      const formatted = sector.charAt(0).toUpperCase() + sector.slice(1).toLowerCase();
      if (["Technical", "Gaming"].includes(formatted)) setFilter(formatted);
      if (["Creative", "Non-technical"].includes(formatted)) setFilter("Non-Technical");
    }
  }, [searchParams]);

  const quests = [
    {
      id: 1,
      dbId: "cmlgm1wy10001wpij8etyb11w",
      title: "BGMI",
      cat: "Gaming",
      desc: "Last squad standing wins.",
      img: "https://ik.imagekit.io/yylpuqff5/Minecraft/HOMEPAGE/BGMI.png",
      icon: <Gamepad2 size={20} />,
      accent: "#A335EE"
    },
    {
      id: 2,
      dbId: "cmlgm1wy10002wpij5m9w4zjl",
      title: "LOCK // LOAD",
      cat: "Gaming",
      desc: "Tactical 5v5 agent combat.",
      img: "https://ik.imagekit.io/yylpuqff5/Minecraft/HOMEPAGE/fortnite.png",
      icon: <Target size={20} />,
      accent: "#A335EE"
    },
    {
      id: 3,
      dbId: "cmlgm1wy10003wpijxnoslqtr",
      title: "CTF",
      cat: "Technical",
      desc: "Solve digital puzzles.",
      img: "https://ik.imagekit.io/yylpuqff5/Minecraft/HOMEPAGE/CTF.png",
      icon: <Shield size={20} />,
      accent: "#55aa55"
    },
    {
      id: 4,
      dbId: "cmlgm1wy10005wpijzyma7iiu",
      title: "REDSTONE RUN",
      cat: "Technical",
      desc: "Debugging and logic.",
      img: "https://ik.imagekit.io/yylpuqff5/Minecraft/HOMEPAGE/coding-debugging.png",
      icon: <Code size={20} />,
      accent: "#55aa55"
    },
    {
      id: 5,
      dbId: "cmlgm1wy10006wpijo6lm39g3",
      title: "DATA DETECTIVE",
      cat: "Technical",
      desc: "Solve mysteries with SQL.",
      img: "https://ik.imagekit.io/yylpuqff5/Minecraft/HOMEPAGE/Data-Detective.png",
      icon: <Terminal size={20} />,
      accent: "#55aa55"
    },
    {
      id: 6,
      dbId: "cmlgm1wy10004wpij622cseeu",
      title: "IT QUIZ",
      cat: "Technical",
      desc: "Ultimate test of tech.",
      img: "https://ik.imagekit.io/yylpuqff5/Minecraft/HOMEPAGE/IT_QUIZ.png",
      icon: <Cpu size={20} />,
      accent: "#55aa55"
    },
    {
      id: 7,
      dbId: "cmlgm1wy10007wpijl52gfwxj",
      title: "IPL AUCTION",
      cat: "Non-Technical",
      desc: "Build your dream squad.",
      img: "https://ik.imagekit.io/yylpuqff5/Minecraft/HOMEPAGE/Ipl-Auction.png",
      icon: <Trophy size={20} />,
      accent: "#ffcc00"
    },
    {
      id: 8,
      dbId: "cmlgm1wy10008wpij9wkl7ggo",
      title: "ANIME QUIZ",
      cat: "Non-Technical",
      desc: "Test your Otaku knowledge.",
      img: "https://ik.imagekit.io/yylpuqff5/Minecraft/HOMEPAGE/Anime-Quiz.png",
      icon: <Sparkles size={20} />,
      accent: "#ffcc00"
    },
    {
      id: 9,
      dbId: "cmlgm1wy10009wpij3ufrl65m",
      title: "ESCAPE ROOM",
      cat: "Non-Technical",
      desc: "Mine your way out.",
      img: "https://ik.imagekit.io/yylpuqff5/Minecraft/HOMEPAGE/Escape-Room.png",
      icon: <DoorOpen size={20} />,
      accent: "#ffcc00"
    },
    {
      id: 10,
      dbId: "cmlgm1wy1000awpijjbkedi4h",
      title: "BUSINESS REVIVAL",
      cat: "Non-Technical",
      desc: "Strategy to save brands.",
      img: "https://ik.imagekit.io/yylpuqff5/Minecraft/HOMEPAGE/Bs-Event.png",
      icon: <TrendingUp size={20} />,
      accent: "#ffcc00"
    },
    {
      id: 11,
      dbId: "cmlgm1wy1000bwpij0508s1t8",
      title: "REEL MAKING",
      cat: "Non-Technical",
      desc: "Visual viral stories.",
      img: "https://ik.imagekit.io/yylpuqff5/Minecraft/HOMEPAGE/Reels-IG.png",
      icon: <Video size={20} />,
      accent: "#ffcc00"
    }
  ];

  const categories = ["All", "Technical", "Non-Technical", "Gaming"];
  const filteredQuests = filter === "All" ? quests : quests.filter(q => q.cat === filter);

  return (
    <div className="min-h-screen bg-[#030303] font-minecraft selection:bg-[#55aa55] selection:text-black">
      <PremiumNavbar />
      
      <section className="relative py-32 px-6 lg:px-12 max-w-7xl mx-auto">
        
        {/* NON-CENTERED HEADER */}
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
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 text-[10px] font-black tracking-widest transition-all uppercase italic ${
                  filter === cat ? 'bg-[#55aa55] text-black' : 'text-gray-500 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* MODERN MINECRAFT GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-1 bg-white/5 border border-white/5 p-1">
          {filteredQuests.map((quest) => (
            <div 
              key={quest.id} 
              onClick={() => navigate(`/event-details?id=${quest.dbId}`)}
              className="group relative h-80 bg-[#050505] overflow-hidden cursor-pointer border border-transparent hover:border-[#55aa55]/50 transition-all"
            >
              {/* CARD BG IMAGE */}
              <div className="absolute inset-0 z-0">
                <img 
                  src={quest.img} 
                  alt="" 
                  className="w-full h-full object-cover  group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent"></div>
              </div>

              {/* ACCENT TOP BAR */}
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
                    {quest.icon}
                  </div>
                  <Zap size={14} className="text-gray-800 group-hover:text-[#ffcc00] transition-colors" />
                </div>

                <div>
                  <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter mb-2 [text-shadow:3px_3px_0px_#000]">
                    {quest.title}
                  </h3>
                  <p className="text-gray-500 font-mono text-[9px] uppercase tracking-[0.2em] group-hover:text-white transition-colors">
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

        {/* SYSTEM NOTE */}
        <div className="mt-20 flex flex-col md:flex-row justify-between items-center gap-8 opacity-20 hover:opacity-100 transition-opacity">
            <p className="text-[9px] font-mono text-white uppercase tracking-[0.4em]">Broadcast_Source: Cybernetics_HQ</p>
            <div className="flex gap-1">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="w-1 h-1 bg-white"></div>
                ))}
            </div>
        </div>
      </section>
    </div>
  );
};

export default EventsSection;