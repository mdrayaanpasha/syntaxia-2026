import React, { useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { 
  MapPin, Clock, ShieldAlert, Gamepad2, Target, Shield, Code, 
  Terminal, Cpu, Trophy, Sparkles, DoorOpen, Video, Zap, 
  ArrowLeft, ChevronRight, TrendingUp, Phone, CheckCircle, Boxes
} from 'lucide-react';
import PremiumNavbar from '../home/components/nav';
import data from "../../data.json"

const EventDetailsPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const eventId = searchParams.get('id');

  // Helper to map UI icons based on the Title from JSON
  const getIcon = (title) => {
    const icons = {
      "BGMI": <Gamepad2 size={32} />,
      "LOCK // LOAD": <Target size={32} />,
      "CTF": <Shield size={32} />,
      "REDSTONE RUN": <Code size={32} />,
      "DATA DETECTIVE": <Terminal size={32} />,
      "IT QUIZ": <Cpu size={32} />,
      "IPL AUCTION": <Trophy size={32} />,
      "ANIME QUIZ": <Sparkles size={32} />,
      "ESCAPE ROOM": <DoorOpen size={32} />,
      "BUSINESS REVIVAL": <TrendingUp size={32} />,
      "REEL MAKING": <Video size={32} />
    };
    return icons[title] || <Zap size={32} />;
  };

  const quest = useMemo(() => {
    return data.quests.find(q => q.dbId === eventId);
  }, [eventId]);

  console.log(quest)

  if (!quest) return (
    <div className="min-h-screen bg-[#030303] flex items-center justify-center font-minecraft">
      <div className="text-center border-2 border-dashed border-white/10 p-20">
         <ShieldAlert size={48} className="text-red-500 mx-auto mb-6" />
         <p className="text-white text-xl uppercase tracking-widest">Dossier_Not_Found</p>
         <button onClick={() => navigate('/events')} className="mt-8 text-[#55aa55] text-xs underline">/return_to_hub</button>
      </div>
    </div>
  );

  // Derive UI styles from JSON accent
  const rarityBorder = `border-[${quest.accent}]`;
  const glowStyle = { boxShadow: `0 0 20px ${quest.accent}4d` }; // 4d is 30% opacity in hex

  return (
    <div className="min-h-screen bg-[#030303] font-minecraft text-gray-300 selection:bg-[#55aa55] selection:text-black">
      <PremiumNavbar />
      
      <main className="max-w-7xl mx-auto px-6 pt-32 pb-48">
        {/* HUD NAV */}
        <button onClick={() => navigate(-1)} className="flex items-center gap-3 text-gray-700 hover:text-white transition-all mb-12 font-mono text-[10px] uppercase tracking-[0.4em]">
          <ArrowLeft size={14} /> /return_to_board
        </button>

        {/* HERO SLAB CARD */}
        <div className="relative w-full bg-[#050505] border-x-[4px] border-b-[12px] border-black overflow-hidden mb-16 shadow-[0_30px_60px_rgba(0,0,0,0.6)]">
          <div className="absolute inset-0 z-0">
            <img src={quest.img} alt="" className="w-full h-full object-cover opacity-30 grayscale hover:grayscale-0 transition-all duration-700" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/80 to-transparent"></div>
          </div>
          
          {/* Dynamic Top Bar */}
          <div className="absolute top-0 left-0 h-[6px] w-full z-20" style={{ backgroundColor: quest.accent }}></div>

          <div className="relative z-10 p-10 md:p-24">
             <div className="flex flex-col md:flex-row items-center gap-12">
                <div 
                  className="w-24 h-24 bg-black border-4 flex items-center justify-center shadow-[8px_8px_0px_#000]" 
                  style={{ borderColor: quest.accent, color: quest.accent, ...glowStyle }}
                >
                  {getIcon(quest.title)}
                </div>
                <div className="text-center md:text-left">
                    <p className="text-[#55aa55] font-mono text-[9px] uppercase tracking-[0.5em] mb-4">/active_mission_dossier</p>
                    <h1 className="text-6xl md:text-9xl font-black text-white italic uppercase tracking-tighter leading-[0.8] mb-6 [text-shadow:8px_8px_0px_#111]">
                      {quest.title}
                    </h1>
                    <div className="flex flex-wrap justify-center md:justify-start gap-4">
                       <span className="bg-white/5 border border-white/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-[#ffcc00]">{quest.cat}</span>
                       {quest.day && <span className="bg-white/5 border border-white/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white">{quest.day}</span>}
                    </div>
                </div>
             </div>
          </div>
        </div>

        {/* HUD INFO GRID */}
        <div className="grid lg:grid-cols-12 gap-1 bg-white/5 border border-white/5 mb-16">
           <div className="lg:col-span-4 bg-[#050505] p-10">
              <p className="text-gray-600 font-mono text-[9px] uppercase tracking-[0.4em] mb-6 flex items-center gap-2"><MapPin size={12} /> Target_Location</p>
              <p className="text-2xl font-black text-white italic uppercase tracking-widest">{quest.venue || "TBA"}</p>
           </div>
           <div className="lg:col-span-4 bg-[#050505] p-10 border-y lg:border-y-0 lg:border-x border-white/5">
              <p className="text-gray-600 font-mono text-[9px] uppercase tracking-[0.4em] mb-6 flex items-center gap-2"><Clock size={12} /> Temporal_Window</p>
              <p className="text-2xl font-black text-white italic uppercase tracking-widest">{quest.slot || "TBA"}</p>
           </div>
           <div className="lg:col-span-4 bg-[#050505] p-10 flex flex-col justify-center">
              <p className="text-gray-600 font-mono text-[9px] uppercase tracking-[0.4em] mb-6 flex items-center gap-2"><Terminal size={12} /> Field_Commanders</p>
              {quest.eventHeads?.map((h, i) => (
                <div key={i} className="flex justify-between items-center mb-2">
                  <p className="text-lg font-black text-[#ffcc00] italic uppercase">{h.name}</p>
                  <a href={`tel:${h.phone}`} className="text-gray-500 hover:text-white font-mono text-[10px] tracking-widest underline underline-offset-4">{h.phone}</a>
                </div>
              ))}
           </div>
        </div>

        {/* MISSION SPECS LIST */}
        <div className="grid md:grid-cols-2 gap-20">
           <div className="space-y-12">
              <div>
                <h3 className="text-[#55aa55] font-mono text-[10px] uppercase tracking-[0.5em] mb-10 border-b border-white/5 pb-4">Mission_Briefing</h3>
                <p className="text-gray-400 text-lg leading-relaxed italic">{quest.desc}</p>
              </div>

              {quest.eventDetails && (
                <div>
                  <h3 className="text-[#ffcc00] font-mono text-[10px] uppercase tracking-[0.5em] mb-10 border-b border-white/5 pb-4">Technical_Parameters</h3>
                  <div className="space-y-6">
                    {quest.eventDetails.map((detail, i) => (
                      <div key={i} className="flex items-center gap-5 text-gray-500 hover:text-white transition-colors">
                        <CheckCircle size={16} className="text-[#ffcc00]" />
                        <span className="text-[11px] font-mono uppercase tracking-[0.2em]">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
           </div>

           {quest.rules && (
             <div>
                <h3 className="text-red-500 font-mono text-[10px] uppercase tracking-[0.5em] mb-10 border-b border-white/5 pb-4">Protocol_Directives</h3>
                <div className="bg-red-500/5 border border-red-500/10 p-10 space-y-6">
                  {quest.rules.map((rule, i) => (
                    <div key={i} className="flex items-start gap-5 text-gray-500">
                      <span className="text-red-500 font-mono text-[10px] mt-1">0{i+1}</span>
                      <span className="text-[11px] font-mono uppercase tracking-[0.2em] leading-relaxed">{rule}</span>
                    </div>
                  ))}
                </div>
             </div>
           )}
        </div>

        {/* STICKY REGISTER CTA */}
        <div className="fixed bottom-0 left-0 w-full p-6 md:p-10 z-[60] pointer-events-none">
          <div className="max-w-7xl mx-auto flex justify-end">
            <button 
              onClick={() => navigate(`/register?event-name=${quest.dbId}`)}
              className="pointer-events-auto w-full md:w-[450px] h-20 md:h-24 bg-[#55aa55]/90 backdrop-blur-2xl border-x-[4px] border-b-[8px] border-black shadow-[0_25px_60px_rgba(0,0,0,0.6)] group relative overflow-hidden transition-all active:translate-y-1 active:border-b-4"
            >
              <div className="relative z-10 flex items-center justify-center gap-8 text-black">
                <span className="font-black italic uppercase tracking-[0.3em] text-xl md:text-2xl">Register</span>
                <ChevronRight className="group-hover:translate-x-3 transition-transform" size={28} />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-shimmer" />
            </button>
          </div>
        </div>
      </main>

      {/* BACKGROUND DECOR */}
      <div className="fixed bottom-10 right-10 opacity-5 pointer-events-none select-none">
         <Boxes size={400} className="text-white" />
      </div>
    </div>
  );
};

export default EventDetailsPage;