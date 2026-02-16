import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Gamepad2, Ticket, ChevronRight, Zap, 
  Cpu, Crosshair, Sword, Box, Terminal
} from 'lucide-react';
import PremiumNavbar from '../home/components/nav';

const PassSelection = () => {
  const navigate = useNavigate();

  const passes = [

     {
      id: "nongaming-pass",
      name: "STANDARD",
      subtitle: "TECH & CREATIVE",
      description: "Access to CTF, Coding, and Cultural events.",
      bgImage: "https://miro.medium.com/v2/resize:fit:1400/1*yp9Lznm6zoEWpnQTluBjOw.jpeg",
      icon: <Terminal size={32} />,
      color: "text-[#55aa55]", // Tech Green
      borderColor: "border-[#55aa55]",
      bgColor: "bg-[#55aa55]",
      glow: "shadow-[0_0_30px_rgba(85,170,85,0.3)]",
      route: "/register/nongaming",
    },
    {
      id: "bgmi-pass",
      name: "BGMI WARS",
      subtitle: "BATTLE ROYALE",
      description: "Drop into the warzone. Squad up for the ultimate survival challenge.",
      bgImage: "https://resize.indiatv.in/resize/newbucket/1080_1920/2023/05/bgmi-3-1684576018.jpg",
      icon: <Crosshair size={32} />,
      color: "text-orange-500",
      borderColor: "border-orange-500",
      bgColor: "bg-orange-500",
      glow: "shadow-[0_0_30px_rgba(249,115,22,0.3)]",
      route: "/register/bgmi", 
    },
    {
      id: "valo-pass",
      name: "Valorant Pass",
      subtitle: "TACTICAL",
      description: "Plant the spike or defuse it. High-stakes tactical shooter gameplay.",
      bgImage: "https://cmsassets.rgpub.io/sanity/images/dsfx7636/news/aefe3c7dbe39ef1da3f4241f4c6b771c535038fc-1920x1080.jpg?accountingTag=VAL", // Using the valorant/fortnite image you had
      icon: <Sword size={32} />,
      color: "text-[#ff4655]", // Valorant Red
      borderColor: "border-[#ff4655]",
      bgColor: "bg-[#ff4655]",
      glow: "shadow-[0_0_30px_rgba(255,70,85,0.3)]",
      route: "/register/valorant",
    }
   
  ];

  return (
    <div className="font-minecraft min-h-screen bg-[#050505] text-gray-300 selection:bg-[#55aa55] selection:text-black overflow-x-hidden flex flex-col">
      <PremiumNavbar />
      
      {/* Background Grid/Scanline Effect */}
      <div className="fixed inset-0 pointer-events-none opacity-10 bg-[linear-gradient(rgba(18,18,18,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-0 bg-[length:100%_4px,6px_100%]"></div>
      
      <main className="flex-grow max-w-[1400px] mx-auto px-6 py-24 relative z-10 w-full flex flex-col justify-center">
        
        {/* HEADER */}
        <div className="mb-20 text-center relative">
            {/* Glitchy Text Effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-8xl md:text-9xl font-black text-[#55aa55]/5 opacity-20 blur-sm uppercase tracking-tighter pointer-events-none whitespace-nowrap">
                Select Class
            </div>

            <div className="flex items-center justify-center gap-3 mb-6 text-[#55aa55] font-mono text-xs tracking-[0.6em] uppercase animate-pulse">
                <Zap size={14} /> /initiate_sequence
            </div>
            
            <h1 className="relative z-10 text-5xl md:text-7xl font-black text-white tracking-tighter uppercase italic leading-[0.9] [text-shadow:4px_4px_0px_#111]">
                CHOOSE YOUR <br/> 
                <span className="text-white">
                    BATTLEFIELD
                </span>
            </h1>
        </div>

        {/* PASS CARDS GRID - Updated for 3 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 xl:gap-10 w-full">
          {passes.map((pass) => (
            <button 
              key={pass.id}
              onClick={() => navigate(pass.route)}
              className={`group relative h-[520px] bg-[#0a0a0a] border-x-[4px] border-b-[12px] border-black transition-all duration-500 hover:-translate-y-4 hover:border-b-[20px] overflow-hidden ${pass.glow} flex flex-col`}
            >
              {/* Background Image with Overlay */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-50 group-hover:opacity-100"
                style={{ backgroundImage: `url(${pass.bgImage})` }}
              />
              
              {/* Scanline overlay on image */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,18,18,0.5)_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] opacity-20 pointer-events-none"></div>

              {/* Gradient Overlay for Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/90 to-transparent" />

              {/* Top Accent Bar */}
              <div className={`absolute top-0 left-0 h-[6px] w-full z-20 ${pass.bgColor}`}></div>

              {/* Content Container */}
              <div className="relative z-10 p-8 flex flex-col items-start h-full w-full">
                
                {/* Header Section */}
                <div className="flex justify-between items-start w-full mb-auto">
                    {/* Floating Icon Box */}
                    <div className={`p-4 bg-black/60 backdrop-blur-md border-2 ${pass.borderColor} ${pass.color} shadow-[4px_4px_0px_#000] group-hover:rotate-12 transition-transform duration-300`}>
                        {pass.icon}
                    </div>
                    
                    {/* ID Badge */}
                    <span className="font-mono text-[10px] text-gray-500 opacity-50">
                        #{pass.id.toUpperCase().substring(0, 4)}
                    </span>
                </div>

                {/* Text Content */}
                <div className="mb-8 text-left relative">
                    {/* Animated side bar */}
                    <div className={`absolute -left-8 top-0 bottom-0 w-1 ${pass.bgColor} transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-bottom`}></div>

                    <span className={`inline-block px-2 py-1 mb-3 text-[10px] font-bold bg-black border ${pass.borderColor} ${pass.color} tracking-widest uppercase`}>
                        {pass.subtitle}
                    </span>
                    <h2 className={`text-4xl xl:text-5xl font-black uppercase italic tracking-tighter text-white mb-4 [text-shadow:4px_4px_0px_#000] leading-[0.9]`}>
                        {pass.name}
                    </h2>
                    <p className="text-gray-400 font-mono text-xs leading-relaxed border-l-2 border-gray-800 pl-3 group-hover:border-gray-500 transition-colors">
                        {pass.description}
                    </p>
                </div>

                {/* ACTION BUTTON */}
                <div className="w-full group/btn mt-auto">
                  <div className={`w-full py-5 border-2 ${pass.borderColor} flex items-center justify-between px-6 bg-black/90 group-hover:bg-white transition-colors duration-300`}>
                    <span className={`text-xs font-black uppercase tracking-[0.3em] ${pass.color} group-hover:text-black transition-colors`}>
                        Access
                    </span>
                    <div className="flex items-center gap-2">
                        {/* Animated arrow container */}
                        <div className={`w-8 h-8 flex items-center justify-center border ${pass.borderColor} ${pass.color} group-hover:border-black group-hover:text-black`}>
                            <ChevronRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
                        </div>
                    </div>
                  </div>
                  {/* Button Shadow Effect */}
                  <div className={`h-2 w-[98%] mx-auto ${pass.bgColor} opacity-50`}></div>
                </div>
              </div>

              {/* Decorative Corner Pixels */}
              <div className={`absolute top-4 right-4 w-2 h-2 ${pass.bgColor} animate-pulse`}></div>
              <div className={`absolute bottom-4 left-4 w-2 h-2 ${pass.bgColor} animate-pulse delay-75`}></div>
            </button>
          ))}
        </div>

        {/* FOOTER NAV */}
        <div className="mt-20 text-center">
          <button 
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-3 text-[10px] font-mono tracking-[0.4em] uppercase text-gray-600 hover:text-white transition-colors group"
          >
            <Box size={14} className="group-hover:-rotate-12 transition-transform" /> 
            <span>Return_To_Base</span>
          </button>
        </div>

      </main>
    </div>
  );
};

export default PassSelection;