import React, { useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { 
  MapPin, Clock, ShieldAlert, Gamepad2, Target, Shield, Code, 
  Terminal, Cpu, Trophy, Sparkles, DoorOpen, Video, Zap, 
  ArrowLeft, ChevronRight, TrendingUp, Phone, CheckCircle2, 
  AlertTriangle, Coins, Share2, Copy
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import PremiumNavbar from '../home/components/nav';
import data from "../../data.json";

const EventDetailsPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const eventId = searchParams.get('id');

  // --- 1. DATA & ICONS ---
  const quest = useMemo(() => {
    return data.quests.find(q => q.dbId === eventId);
  }, [eventId]);

  const getIcon = (title) => {
    const icons = {
      "BGMI WARS": <Gamepad2 size={40} />,
      "LOCK // LOAD": <Target size={40} />,
      "FLAG FEST": <Shield size={40} />,
      "REDSTONE RUN": <Code size={40} />,
      "MINECRAFT MURDER FILES": <Terminal size={40} />,
      "STEVE'S TRIAL": <Cpu size={40} />,
      "IPL AUCTION": <Trophy size={40} />,
      "WEEB WARS": <Sparkles size={40} />,
      "MINE YOUR WAY OUT": <DoorOpen size={40} />,
      "BUSINESS REVIVAL": <TrendingUp size={40} />,
      "CRAFT THE SCENE": <Video size={40} />
    };
    return icons[title] || <Zap size={40} />;
  };

  // --- 2. ACTIONS ---
  const handleRegister = () => {
    if (!quest) return;
    if (quest.title === "BGMI WARS") navigate('/pass/BGMI');
    else if (quest.title === "LOCK // LOAD") navigate('/pass/VALO');
    else navigate('/pass/STANDARD');
  };

  const handleShare = async () => {
    const shareData = {
      title: quest.title,
      text: `Check out ${quest.title} at Syntaxia!`,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Share aborted');
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!", {
        style: { background: '#333', color: '#fff', border: '1px solid #55aa55' },
        iconTheme: { primary: '#55aa55', secondary: '#000' },
      });
    }
  };

  // --- 3. 404 STATE ---
  if (!quest) return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center font-minecraft relative overflow-hidden">
      <PremiumNavbar />
      <div className="text-center bg-[#0a0a0a] border border-[#222] p-12 max-w-lg w-full relative z-10">
         <AlertTriangle size={64} className="text-red-500 mx-auto mb-6 animate-pulse" />
         <h1 className="text-3xl font-black text-white mb-2">ERROR 404</h1>
         <p className="text-gray-500 font-mono text-sm uppercase tracking-widest mb-8">Mission Dossier Corrupted</p>
         <button onClick={() => navigate('/events')} className="px-8 py-3 bg-white text-black font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors">
           Return to Hub
         </button>
      </div>
    </div>
  );

  const accentColor = quest.accent; 

  return (
    <div className="min-h-screen bg-[#050505] font-minecraft text-gray-300 selection:bg-white selection:text-black overflow-x-hidden">
      <PremiumNavbar />
      <Toaster position="bottom-center" />
      
      {/* Dynamic Background Glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] rounded-full blur-[150px] opacity-15" style={{ backgroundColor: accentColor }}></div>
        <div className="absolute bottom-0 left-0 w-full h-full opacity-10 bg-[linear-gradient(rgba(18,18,18,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,6px_100%]"></div>
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-40">
        
        {/* TOP NAV */}
        <div className="flex justify-between items-center mb-10">
          <button onClick={() => navigate(-1)} className="flex items-center gap-3 text-gray-500 hover:text-white transition-all font-mono text-xs uppercase tracking-[0.2em] group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span>Abort / Return</span>
          </button>
          
          <div className="hidden md:flex items-center gap-2 font-mono text-[10px] text-gray-600 uppercase tracking-widest">
            <span>Sector</span> <ChevronRight size={12} /> 
            <span style={{ color: accentColor }}>{quest.cat}</span>
          </div>
        </div>

        {/* HERO HEADER */}
        <div className="flex flex-col lg:flex-row gap-12 mb-16 items-start">
          
          {/* Left: Title & Description */}
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-[#333] bg-[#111] rounded-full mb-6">
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: accentColor }}></div>
              <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">{quest.cat} Protocol</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white italic uppercase tracking-tighter leading-[0.9] mb-8" style={{ textShadow: `4px 4px 0px ${accentColor}20` }}>
              {quest.title}
            </h1>

            {/* DESCRIPTION: Prominent and Clear */}
            <div className="border-l-4 pl-6 py-2 mb-8" style={{ borderColor: accentColor }}>
              <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-2">Mission Objective</h3>
              <p className="text-xl md:text-2xl text-gray-200 leading-relaxed font-medium">
                {quest.desc}
              </p>
            </div>

            {/* Prize & Status Bar */}
            <div className="flex flex-wrap gap-4">
               <div className="bg-[#111] border border-[#222] px-6 py-4 flex items-center gap-4 rounded-lg">
                  <Coins className="text-[#ffcc00]" size={24} />
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase font-mono tracking-wider">Prize Pool</p>
                    <p className="text-xl font-black text-white">₹{quest.prize.first + quest.prize.second}</p>
                  </div>
               </div>
               
               <div className="bg-[#111] border border-[#222] px-6 py-4 flex items-center gap-4 rounded-lg">
                  <Clock className="text-gray-400" size={24} />
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase font-mono tracking-wider">Time Window</p>
                    <p className="text-sm font-bold text-white">{quest.day} // {quest.slot}</p>
                  </div>
               </div>
            </div>
          </div>

          {/* Right: Visual */}
          <div className="w-full lg:w-[450px] aspect-square relative group">
            <div className="absolute inset-0 border-2 border-[#222] bg-[#111] translate-x-4 translate-y-4 transition-transform group-hover:translate-x-2 group-hover:translate-y-2"></div>
            <img 
              src={quest.img} 
              alt={quest.title} 
              className="relative w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 border-2 border-[#222]" 
            />
            {/* Icon Overlay */}
            <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-black border-2 flex items-center justify-center shadow-lg" style={{ borderColor: accentColor, color: accentColor }}>
              {getIcon(quest.title)}
            </div>
          </div>
        </div>

        {/* INFO GRID (Rules, Specs, Venue) */}
        <div className="grid md:grid-cols-12 gap-8 mb-24">
          
          {/* Main Info */}
          <div className="md:col-span-8 space-y-8">
            
            {/* Specs */}
            <div className="bg-[#0a0a0a] border border-[#222] p-8 rounded-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
                <Target size={120} />
              </div>
              <h3 className="text-white font-mono text-sm uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
                <Terminal size={16} style={{ color: accentColor }} /> Technical Parameters
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {quest.eventDetails && quest.eventDetails.map((detail, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-[#111] border border-[#222] rounded hover:border-[#444] transition-colors">
                    <CheckCircle2 size={16} style={{ color: accentColor }} className="shrink-0 mt-0.5" />
                    <span className="text-xs text-gray-300 font-mono uppercase leading-relaxed">{detail}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Rules */}
            <div className="bg-[#0a0a0a] border border-[#222] p-8 rounded-xl">
              <h3 className="text-white font-mono text-sm uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
                <ShieldAlert size={16} className="text-red-500" /> Protocol Directives
              </h3>
              <div className="space-y-4">
                {quest.rules && quest.rules.map((rule, i) => (
                  <div key={i} className="flex gap-4 items-start text-gray-400 border-b border-[#1a1a1a] pb-3 last:border-0">
                    <span className="text-red-500 font-mono text-xs font-bold mt-1">0{i+1}</span>
                    <p className="text-sm leading-relaxed">{rule}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Sidebar Info */}
          <div className="md:col-span-4 space-y-4">
            
            {/* Venue Card */}
            <div className="bg-[#111] p-6 border border-[#222] rounded-xl text-center">
              <MapPin className="mx-auto mb-3 text-gray-500" size={24} />
              <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Target Location</p>
              <p className="text-xl font-black text-white uppercase">{quest.venue}</p>
            </div>

            {/* Commanders */}
            <div className="bg-[#0a0a0a] border border-[#222] p-6 rounded-xl">
              <h4 className="text-[10px] text-gray-500 uppercase tracking-widest mb-4 border-b border-[#222] pb-2">Field Commanders</h4>
              <div className="space-y-4">
                {quest.eventHeads.map((head, i) => (
                  <div key={i} className="flex justify-between items-center group">
                    <div>
                      <p className="text-white font-bold uppercase text-sm">{head.name}</p>
                      <p className="text-[9px] text-gray-600 font-mono">OP_LEAD_0{i+1}</p>
                    </div>
                    <a href={`tel:${head.phone}`} className="p-2 rounded-full bg-[#111] text-gray-400 hover:bg-white hover:text-black transition-colors">
                      <Phone size={14} />
                    </a>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* STICKY BOTTOM BAR (Mobile Friendly) */}
        <div className="fixed bottom-0 left-0 w-full p-4 md:p-6 z-50 pointer-events-none">
          <div className="max-w-7xl mx-auto flex gap-4 justify-end pointer-events-auto">
            
            {/* Share Button */}
            <button 
              onClick={handleShare}
              className="h-16 w-16 bg-[#111] border border-[#333] text-white flex items-center justify-center rounded-xl hover:bg-[#222] transition-colors shadow-2xl"
            >
              <Share2 size={24} />
            </button>

            {/* Register Button */}
            <button 
              onClick={handleRegister}
              className="flex-grow md:flex-grow-0 md:w-[400px] h-16 bg-white text-black font-black text-xl italic uppercase tracking-tighter flex items-center justify-center gap-4 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all"
              style={{ boxShadow: `0 0 30px ${accentColor}40` }}
            >
              Initialize <ChevronRight size={24} />
            </button>

          </div>
        </div>

      </main>
    </div>
  );
};

export default EventDetailsPage;