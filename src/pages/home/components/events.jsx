import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sword, Code, Gamepad2, Trophy, ChevronRight, 
  Zap, Pickaxe, BookOpen, Target, Box
} from 'lucide-react';

const EventsSelection = () => {
  const navigate = useNavigate();

  const categories = [
    {
      id: "technical",
      name: "Technical",
      // Replace these URLs with your actual local or hosted images technical.png
      
      bgImage: "https://ik.imagekit.io/yylpuqff5/Minecraft/HOMEPAGE/technical.png",
      icon: <Code size={32} />,
      color: "text-[#55aa55]",
      border: "border-[#55aa55]",
      glow: "shadow-[0_0_30px_rgba(85,170,85,0.2)]"
    },
    {
      id: "non-technical",
      name: "Creative",
      bgImage: "https://ik.imagekit.io/yylpuqff5/Minecraft/HOMEPAGE/creative.png",
      icon: <Trophy size={32} />,
      color: "text-[#ffcc00]",
      border: "border-[#ffcc00]",
      glow: "shadow-[0_0_30px_rgba(255,204,0,0.2)]"
    },
    {
      id: "gaming",
      name: "Gaming",
      bgImage: "https://ik.imagekit.io/yylpuqff5/Minecraft/HOMEPAGE/gaming.png",
      icon: <Gamepad2 size={32} />,
      color: "text-[#A335EE]",
      border: "border-[#A335EE]",
      glow: "shadow-[0_0_30px_rgba(163,53,238,0.2)]"
    }
  ];

  return (
    <div className="font-minecraft min-h-screen bg-[#050505] text-gray-300 selection:bg-[#55aa55] selection:text-black overflow-hidden">
      
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#222] to-transparent"></div>
      
      <main className="max-w-7xl mx-auto px-6 py-24 relative z-10">
        
        {/* HEADER */}
        <div className="mb-20">
          <div className="flex items-center gap-2 mb-4 text-[#55aa55] font-mono text-[10px] tracking-[0.5em] uppercase">
            <Zap size={14} className="animate-pulse" /> /select_quest_type
          </div>
          <h1 className="text-7xl md:text-9xl font-black text-white tracking-tighter uppercase italic leading-[0.85] [text-shadow:8px_8px_0px_#111]">
            <span className="text-[#ffcc00]">EVENT </span><br /> TYPES 
          </h1>
        </div>

        {/* IMAGE CARD GRID */}
        <div className="grid lg:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <button 
              key={cat.id}
              onClick={() => navigate(`/events?sector=${cat.id}`)}
              className={`group relative h-[450px] bg-[#0a0a0a] border-x-[4px] border-b-[10px] border-black transition-all duration-300 hover:-translate-y-3 overflow-hidden ${cat.glow}`}
            >
              {/* Background Image with Overlay */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${cat.bgImage})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent group-hover:via-black/20 transition-all duration-300" />

              {/* Top Accent Bar */}
              <div className={`absolute top-0 left-0 h-[6px] w-full z-20 ${cat.border.replace('border-', 'bg-')}`}></div>

              <div className="relative z-10 p-10 flex flex-col items-start justify-end h-full">
                {/* ICON BOX - Floating "Item Slot" style */}
                <div className={`p-4 mb-6 bg-black/80 backdrop-blur-sm border-2 ${cat.border} ${cat.color} shadow-[4px_4px_0px_#000]`}>
                  {cat.icon}
                </div>

                <h2 className={`text-5xl font-black uppercase italic tracking-tighter mb-8 ${cat.color} [text-shadow:4px_4px_0px_#000] group-hover:text-white transition-colors`}>
                  {cat.name}
                </h2>

                {/* SLIM BUTTON */}
                <div className="w-full">
                  <div className={`w-full py-4 border-2 ${cat.border} flex items-center justify-center gap-3 bg-black/90 group-hover:bg-white transition-all`}>
                    <span className={`text-[10px] font-black uppercase tracking-[0.3em] group-hover:text-black ${cat.color}`}>
                        Enter Sector
                    </span>
                    <ChevronRight size={16} className={`group-hover:translate-x-1 transition-transform ${cat.color} group-hover:text-black`} />
                  </div>
                </div>
              </div>

              {/* Decorative Pixel Corner */}
              <div className={`absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 ${cat.border} opacity-40 group-hover:opacity-100 transition-opacity`}></div>
            </button>
          ))}
        </div>

        {/* FOOTER */}
        <div className="mt-20 flex justify-center">
          <button 
            onClick={() => navigate('/events')}
            className="flex items-center gap-4 text-[10px] font-mono tracking-[0.4em] uppercase text-gray-700 hover:text-white transition-colors group"
          >
            <Box size={16} className="group-hover:rotate-12 transition-transform" /> 
            Open_Full_Inventory
          </button>
        </div>
      </main>
    </div>
  );
};

export default EventsSelection;