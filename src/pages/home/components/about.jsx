import React from 'react';
import { Shield, Terminal, Users, Sparkles, BookOpen } from 'lucide-react';

const AboutSection = () => {
  const aboutData = [
    {
      title: "ST. JOSEPH'S UNIVERSITY",
      subtitle: "ESTABLISHED_1882",
      description: "A legacy of excellence. SJU stands as a beacon of Jesuit education, fostering innovation and social concern in the heart of Bengaluru.",
      image: "https://ik.imagekit.io/yylpuqff5/Minecraft/SJU.webp", // Replace with your image
      icon: <Shield size={24} className="text-[#ffcc00]" />,
      accent: "bg-[#7a7a7a]",
      glow: "group-hover:shadow-[0_0_30px_rgba(122,122,122,0.2)]"
    },
    {
      title: "DEPT. OF COMPUTER SCIENCE",
      subtitle: "CORE_SYSTEM_ACTIVE",
      description: "The engine room of Syntaxia. Blending rigorous theory with hands-on development to prepare architects for a pixel-perfect world.",
      image: "https://ik.imagekit.io/yylpuqff5/Minecraft/dept-of-cs.webp", // Replace with your image
      icon: <Terminal size={24} className="text-[#55aa55]" />,
      accent: "bg-[#55aa55]",
      glow: "group-hover:shadow-[0_0_30px_rgba(85,170,85,0.3)]",
      offset: true
    },
    {
      title: "CYBERNETICS ASSOCIATION",
      subtitle: "HOST_LEVEL: ELITE",
      description: "The elite student body hosting Syntaxia 2026. A community of creators and visionaries pushing the boundaries of tech and teamwork.",
      image: "https://ik.imagekit.io/yylpuqff5/Minecraft/core-team.jpg", // Replace with your image
      icon: <Users size={24} className="text-[#ffcc00]" />,
      accent: "bg-[#ffcc00]",
      glow: "group-hover:shadow-[0_0_30px_rgba(255,204,0,0.3)]"
    }
  ];

  return (
    <section id="about" className="relative py-24 px-6 bg-[#0a0a0a] font-minecraft">
      <div className="max-w-7xl mx-auto">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col items-center mb-24 text-center">
          <div className="flex items-center gap-2 mb-4 text-[#55aa55]">
            <BookOpen size={16} />
            <span className="tracking-[0.4em] text-[10px] uppercase">/discovery origins</span>
          </div>
          <h2 className="text-5xl md:text-7xl text-white tracking-tight [text-shadow:4px_4px_0px_#373737]">
            ABOUT <span className="text-[#ffcc00]">QUESTS</span>
          </h2>
        </div>

        {/* TILED CARDS */}
        <div className="grid lg:grid-cols-3 gap-10">
          {aboutData.map((item, idx) => (
            <div 
              key={idx} 
              className={`relative group ${item.offset ? 'lg:translate-y-12' : ''}`}
            >
              {/* The Obsidian Slab Container */}
              <div className={`relative bg-[#1a1a1a] border-x-[3px] border-b-[6px] border-black transition-all duration-500 ${item.glow} group-hover:-translate-y-2`}>
                
                {/* Colored Bevel Top */}
                <div className={`h-[4px] w-full ${item.accent}`}></div>

                {/* IMAGE PREVIEW (The "Picture Frame") */}
                <div className="p-4">
                  <div className="relative aspect-video overflow-hidden border-2 border-black bg-black/50">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-110"
                    />
                    {/* Vignette Overlay */}
                    <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.8)]"></div>
                  </div>
                </div>

                {/* CONTENT AREA */}
                <div className="p-8 pt-2">
                  <div className="flex items-center gap-3 mb-4">
                    {item.icon}
                    <h3 className="text-xl text-white tracking-tight [text-shadow:2px_2px_0px_#000]">
                      {item.title}
                    </h3>
                  </div>
                  
                  <p className="text-gray-400 text-sm leading-relaxed mb-6 h-20 overflow-hidden">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <span className="text-[9px] text-gray-500 tracking-[0.2em] font-minecraft uppercase italic">
                      {item.subtitle}
                    </span>
                    <Sparkles size={12} className="text-[#55aa55] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* DECORATIVE MOTTO */}
        <div className="mt-32 text-center opacity-40">
           <p className="tracking-[0.8em] text-xs text-white uppercase italic font-minecraft">
             Crafting Excellence since 1882
           </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;