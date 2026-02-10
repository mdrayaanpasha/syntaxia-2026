import React from 'react';
import { Shield, Terminal, Users, Zap, BookOpen } from 'lucide-react';

const AboutSection = () => {
  const aboutData = [
    {
      title: "ST. JOSEPH'S UNIVERSITY",
      tag: "EST_1882",
      description: "A Jesuit legacy in Bengaluru, fostering innovation and social excellence.",
      icon: <Shield size={24} className="text-[#ffcc00]" />,
      accent: "bg-[#ffcc00]"
    },
    {
      title: "DEPT. OF COMPUTER SCIENCE",
      tag: "CORE_ACTIVE",
      description: "Rigorous theory meets hand-on development for the digital architects of tomorrow.",
      icon: <Terminal size={24} className="text-[#55aa55]" />,
      accent: "bg-[#55aa55]"
    },
    {
      title: "CYBERNETICS ASSOCIATION",
      tag: "HOST_ELITE",
      description: "A community of creators pushing the boundaries of technology and teamwork.",
      icon: <Users size={24} className="text-[#4db5ff]" />,
      accent: "bg-[#4db5ff]"
    }
  ];

  return (
    <section id="about" className="relative py-32 px-6 bg-[#030303] font-minecraft overflow-hidden">
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* NON-CENTERED HEADER */}
        <div className="mb-24 max-w-4xl">
          <div className="flex items-center gap-3 text-[#55aa55] font-mono text-[10px] tracking-[0.5em] uppercase mb-6">
            <BookOpen size={14} /> /origins_discovery
          </div>
          <h2 className="text-7xl md:text-9xl font-black text-white uppercase italic leading-[0.85] tracking-tighter [text-shadow:8px_8px_0px_#111]">
            ABOUT <br /> <span className="text-[#ffcc00]">QUESTS</span>
          </h2>
          <div className="mt-10 h-[2px] w-24 bg-[#55aa55]"></div>
        </div>

        {/* HUD GRID SYSTEM */}
        <div className="grid lg:grid-cols-3 gap-1 bg-white/5 border border-white/5">
          {aboutData.map((item, idx) => (
            <div 
              key={idx} 
              className="group bg-[#050505] p-10 md:p-14 transition-all hover:bg-[#080808] relative overflow-hidden"
            >
              {/* Top Accent Ribbon */}
              <div className={`absolute top-0 left-0 h-[4px] w-full ${item.accent} opacity-40 group-hover:opacity-100 transition-opacity`}></div>

              <div className="relative z-10 h-full flex flex-col">
                <div className="flex items-center justify-between mb-12">
                   <div className="w-14 h-14 border border-white/10 flex items-center justify-center bg-white/5 shadow-[4px_4px_0px_#000]">
                      {item.icon}
                   </div>
                   <span className="text-gray-800 font-mono text-[9px] uppercase tracking-[0.4em] font-black">{item.tag}</span>
                </div>

                <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter mb-6 leading-none">
                  {item.title}
                </h3>

                <p className="text-gray-500 font-mono text-[10px] leading-relaxed uppercase tracking-widest mt-auto">
                  {item.description}
                </p>

                {/* Decorative Corner */}
                <div className="absolute -bottom-2 -right-2 opacity-10 group-hover:opacity-30 transition-opacity">
                   <Zap size={40} className="text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* SYSTEM FOOTER */}
        <div className="mt-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-t border-white/5 pt-12">
            <div className="opacity-20 hover:opacity-100 transition-opacity">
                <p className="text-[10px] text-white font-mono uppercase tracking-[0.8em]">Crafting_Excellence_Since_1882</p>
            </div>
            
            <div className="text-right">
                <p className="text-gray-800 font-mono text-[8px] uppercase tracking-[0.4em]">Protocol_Source: Jesuit_Education_Node</p>
            </div>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;