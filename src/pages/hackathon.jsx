import React, { useState } from 'react';
import { 
  Zap, Code, Terminal, Cpu, Globe, 
  Trophy, ShieldCheck, ArrowRight, 
  School, Crown, AlertTriangle, CheckCircle2 
} from 'lucide-react';

const EventLandingPage = () => {
  const [activeTab, setActiveTab] = useState('hackathon'); 
  
  // --- IMAGE ASSETS ---
  const images = {
    sju: "https://ik.imagekit.io/yylpuqff5/Minecraft/SJU.webp",
    dept: "https://ik.imagekit.io/yylpuqff5/Minecraft/dept-of-cs.webp",
    team: "https://ik.imagekit.io/yylpuqff5/Minecraft/core-team.jpg"
  };

  // Data for the tracks
  const tracks = {
    ideathon: {
      title: "The Ideathon",
      emoji: "🎒",
      color: "from-pink-500 to-rose-500",
      accent: "text-pink-500",
      border: "border-pink-500/50",
      shadow: "shadow-pink-500/20",
      audienceBadge: "HIGH SCHOOL / PU STUDENTS ONLY",
      tagline: "No Code? No Problem. Just Vibes & Ideas.",
      description: "You don't need to know how to code. You just need to be a professional yapper with a big brain idea. Create a pitch deck, convince the judges your idea is fire, and secure the bag.",
      rules: [
        "Squad Size: 2-4 Besties", 
        "Deliverable: 7-Slide Deck (Keep it aesthetic)", 
        "Time: 5 min yap session (Pitch) + 2 min roast (Q&A)", 
        "Requirement: Must be in 11th, 12th, or High School."
      ],
      prizes: "₹15k Pool + Clout",
    },
    hackathon: {
      title: "The Hackathon",
      emoji: "🎓",
      color: "from-indigo-500 to-violet-500",
      accent: "text-indigo-400",
      border: "border-indigo-500/50",
      shadow: "shadow-indigo-500/20",
      audienceBadge: "UG COLLEGE STUDENTS ONLY",
      tagline: "We Cooking for 24 Hours Straight.",
      description: "This is for the college dev squads. You have 24 hours to turn caffeine into code. Spaghetti code is allowed as long as it works during the demo. Don't be an NPC, build something wild.",
      rules: [
        "Squad Size: 2-4 Devs", 
        "Fresh Code: Github repo must be brand new (No pre-cooking)", 
        "Stack: Whatever you want (Web, App, AI, Blockchain)", 
        "Requirement: Must have a valid College ID (UG Only)."
      ],
      prizes: "₹50k Pool + Internships",
    }
  };

  const currentTrack = tracks[activeTab];

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-indigo-500/30 selection:text-indigo-200 overflow-x-hidden">
      
      {/* --- BACKGROUND FX --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px]"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-[#020617]/80 to-[#020617]"></div>
      </div>

      {/* --- NAVBAR --- */}
      <nav className="relative z-50 flex justify-between items-center px-6 py-6 max-w-7xl mx-auto backdrop-blur-sm sticky top-0 bg-[#020617]/80 border-b border-white/5">
        <div className="font-bold text-xl tracking-tighter flex items-center gap-2">
          <Terminal size={20} className="text-indigo-500" />
          <span>SJU<span className="text-slate-500">_CS</span></span>
        </div>
        <div className="flex items-center gap-4">
            <span className="hidden md:block text-xs font-mono text-emerald-400 border border-emerald-500/30 bg-emerald-500/10 px-2 py-1 rounded">ENTRY FEE: ₹0 (NO CAP)</span>
            <a href="https://forms.gle/345gUuDevKdvCDvi6" className="bg-white text-black px-5 py-2 rounded-full text-sm font-bold hover:bg-indigo-50 transition-all hover:scale-105 active:scale-95">
            Lock In 🔒
            </a>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative z-10 pt-20 pb-20 px-4 flex flex-col items-center text-center max-w-5xl mx-auto">
        
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-bold uppercase tracking-wide mb-8">
          <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
          Free Entry • Limited Slots
        </div>

        <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-6 text-white">
          COOK OR BE <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
            COOKED.
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed">
          The ultimate server event at <span className="text-white font-bold">St. Joseph's University</span>. <br className="hidden md:block"/>
          Two tracks. One location. Pure chaos (the good kind).
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <button 
            onClick={() => { setActiveTab('ideathon'); document.getElementById('details').scrollIntoView({behavior: 'smooth'}); }}
            className="px-8 py-4 bg-slate-900 border border-slate-700 hover:border-pink-500 text-white rounded-xl transition-all w-full sm:w-auto font-bold flex items-center justify-center gap-2 group">
            <Zap size={18} className="text-pink-500 group-hover:animate-pulse" /> 
            <div className="text-left leading-tight">
              <div className="text-xs text-slate-400 font-normal">I'm in High School/PU</div>
              <div>Join Ideathon</div>
            </div>
          </button>
          
          <button 
            onClick={() => { setActiveTab('hackathon'); document.getElementById('details').scrollIntoView({behavior: 'smooth'}); }}
            className="px-8 py-4 bg-white text-black hover:bg-indigo-50 font-bold rounded-xl transition-all w-full sm:w-auto shadow-[0_0_20px_rgba(255,255,255,0.2)] flex items-center justify-center gap-2">
            <Code size={18} /> 
             <div className="text-left leading-tight">
              <div className="text-xs text-slate-500 font-normal">I'm in College (UG)</div>
              <div>Join Hackathon</div>
            </div>
          </button>
        </div>
      </section>

      {/* --- SERVER LORE (SJU + DEPT + SYNTAXIA) --- */}
      <section className="py-20 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-2 mb-8 opacity-70">
                <Globe size={18} className="text-indigo-400"/>
                <span className="text-sm font-mono tracking-widest uppercase">Map Info // The Base</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-auto md:h-[500px]">
                
                {/* SJU CARD */}
                <div className="group relative rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
                    {/* Background Image */}
                    <div className="absolute inset-0">
                        <img src={images.sju} alt="SJU Campus" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/80 to-transparent"></div>
                    </div>
                    
                    {/* Content */}
                    <div className="relative z-10 h-full flex flex-col justify-end p-8">
                        <div className="absolute top-8 right-8 p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/10">
                            <School size={24} className="text-white" />
                        </div>
                        <h3 className="text-2xl font-black text-white mb-2">The OG Server</h3>
                        <div className="text-xs font-mono text-indigo-400 mb-4">EST. 1882 (LEGACY MODE)</div>
                        <p className="text-slate-300 text-sm leading-relaxed mb-4">
                            St. Joseph's University is the main spawn point. We levelled up to full 'University' status in 2022. It's a massive open-world map for crafting your future.
                        </p>
                        <div className="flex gap-2">
                            <span className="px-2 py-1 bg-white/10 backdrop-blur text-xs rounded text-white border border-white/10">Bengaluru</span>
                            <span className="px-2 py-1 bg-white/10 backdrop-blur text-xs rounded text-white border border-white/10">XP Boost</span>
                        </div>
                    </div>
                </div>

                {/* DEPT OF CS CARD */}
                <div className="group relative rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
                    {/* Background Image */}
                    <div className="absolute inset-0">
                        <img src={images.dept} alt="Dept of CS" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/80 to-transparent"></div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 h-full flex flex-col justify-end p-8">
                        <div className="absolute top-8 right-8 p-3 bg-red-500/20 backdrop-blur-md rounded-full border border-red-500/20">
                            <Cpu size={24} className="text-red-400" />
                        </div>
                        <h3 className="text-2xl font-black text-white mb-2">Dept. of CS</h3>
                        <div className="text-xs font-mono text-red-400 mb-4">THE REDSTONE ENGINEERS</div>
                        <p className="text-slate-300 text-sm leading-relaxed mb-6">
                            The crafting table for logic and code. We teach you the meta so you don't get nerfed in the industry. 
                        </p>
                        <div className="bg-black/40 backdrop-blur-md p-3 rounded-xl border border-white/10">
                            <div className="text-xs text-slate-400 uppercase font-bold mb-2">Unlockable Skill Trees</div>
                            <div className="flex gap-2">
                                <span className="px-3 py-1 bg-red-500/20 text-red-300 border border-red-500/20 text-xs font-bold rounded">BCA</span>
                                <span className="px-3 py-1 bg-red-500/20 text-red-300 border border-red-500/20 text-xs font-bold rounded">M.Sc. CS</span>
                            </div>
                        </div>
                    </div>
                </div>

                 {/* SYNTAXIA CARD (Student Club) */}
                 <div className="group relative rounded-3xl overflow-hidden border border-emerald-500/30 shadow-2xl md:col-span-2 lg:col-span-1">
                    {/* Background Image */}
                    <div className="absolute inset-0">
                        <img src={images.team} alt="Syntaxia Core Team" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 grayscale group-hover:grayscale-0" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/80 to-transparent"></div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 h-full flex flex-col justify-end p-8">
                        <div className="absolute top-8 right-8 p-3 bg-emerald-500/20 backdrop-blur-md rounded-full border border-emerald-500/20 animate-pulse">
                            <Crown size={24} className="text-emerald-400" />
                        </div>
                        
                        <h3 className="text-2xl font-black text-white mb-2 flex items-center gap-2">
                            CYBERNETICS <span className="text-xs bg-emerald-500 text-black px-2 py-0.5 rounded uppercase font-bold">Admins</span>
                        </h3>
                        <div className="text-xs font-mono text-emerald-400 mb-4">THE GUILD MASTERS</div>
                        
                        <p className="text-slate-300 text-sm leading-relaxed mb-4">
                            The student club running this server. We organize the raids (events) and keep the vibes immaculate.
                        </p>
                        <div className="flex items-center gap-2 text-xs text-emerald-300 font-mono">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></div>
                            Online & Hosting
                        </div>
                    </div>
                </div>

            </div>
        </div>
      </section>

      {/* --- EVENT DETAILS --- */}
      <section id="details" className="relative z-10 py-20 px-4 max-w-7xl mx-auto">
        
        {/* Tab Switcher */}
        <div className="flex justify-center mb-12">
          <div className="bg-slate-900/80 p-1 rounded-2xl border border-slate-800 backdrop-blur-sm inline-flex">
            <button 
              onClick={() => setActiveTab('ideathon')}
              className={`px-6 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'ideathon' ? 'bg-pink-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}>
              Ideathon <span className="hidden md:inline text-xs bg-black/20 px-2 py-0.5 rounded">High School</span>
            </button>
            <button 
              onClick={() => setActiveTab('hackathon')}
              className={`px-6 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'hackathon' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}>
              Hackathon <span className="hidden md:inline text-xs bg-black/20 px-2 py-0.5 rounded">College</span>
            </button>
          </div>
        </div>

        {/* Dynamic Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Main Info */}
          <div className={`md:col-span-8 p-8 md:p-12 rounded-3xl border bg-slate-900/50 backdrop-blur-sm transition-all duration-500 ${currentTrack.border} ${currentTrack.shadow}`}>
            
            <div className="flex flex-wrap items-start justify-between gap-4 mb-2">
               <h2 className={`text-5xl font-black tracking-tight ${currentTrack.accent}`}>{currentTrack.title}</h2>
               <div className="text-4xl">{currentTrack.emoji}</div>
            </div>

            {/* AUDIENCE WARNING BADGE */}
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded mb-6 font-mono text-xs font-bold border ${activeTab === 'ideathon' ? 'bg-pink-500/10 text-pink-400 border-pink-500/30' : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30'}`}>
                <AlertTriangle size={14} />
                {currentTrack.audienceBadge}
            </div>
            
            <p className="text-2xl font-medium text-white mb-4">"{currentTrack.tagline}"</p>
            <p className="text-slate-400 leading-relaxed mb-8 text-lg">{currentTrack.description}</p>
            
            {/* Rules List */}
            <div className="space-y-4">
                <h4 className="text-white font-bold uppercase tracking-widest text-sm">The Protocol</h4>
                {currentTrack.rules.map((rule, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm text-slate-300 bg-slate-950/50 p-3 rounded-lg border border-white/5">
                        <CheckCircle2 size={16} className={`mt-0.5 shrink-0 ${activeTab === 'ideathon' ? 'text-pink-500' : 'text-indigo-500'}`} />
                        {rule}
                    </div>
                ))}
            </div>
          </div>

          {/* Prize Pool */}
          <div className="md:col-span-4 p-8 rounded-3xl border border-slate-800 bg-slate-900/30 flex flex-col justify-center items-center text-center relative overflow-hidden">
            <div className={`absolute top-0 w-full h-1 bg-gradient-to-r ${currentTrack.color}`}></div>
            <Trophy className="text-yellow-400 mb-4" size={56} />
            <h3 className="text-xl font-bold mb-2 text-white">The Loot</h3>
            <div className={`text-4xl font-black mb-2 ${currentTrack.accent}`}>{currentTrack.prizes}</div>
            <p className="text-slate-500 text-sm">Plus insane clout & networking.</p>
          </div>
        </div>
      </section>

      {/* --- REGISTRATION CTA --- */}
      <section id="register" className="py-24 px-4 text-center bg-gradient-to-b from-transparent to-indigo-950/20">
        <div className="max-w-3xl mx-auto border border-white/10 p-10 rounded-3xl bg-white/5 backdrop-blur-md">
          <h2 className="text-5xl font-black mb-4 text-white">DON'T BE LATE.</h2>
          <div className="inline-block bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 px-4 py-1 rounded-full text-sm font-mono font-bold mb-6 animate-pulse">
            ENTRY FEE: ₹0.00 (WE GOT YOU)
          </div>
          <p className="text-slate-400 mb-10 text-lg">
            Choose your lobby. Spots are limited, so stop scrolling and secure your place.
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            {/* Direct Links */}
            <a href="https://forms.gle/345gUuDevKdvCDvi6" 
               className="group px-8 py-4 bg-transparent border-2 border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2">
               <span>I'm High School (Ideathon)</span> <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/>
            </a>
            <a href="https://forms.gle/345gUuDevKdvCDvi6" 
               className="group px-8 py-4 bg-transparent border-2 border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2">
               <span>I'm College (Hackathon)</span> <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/>
            </a>
          </div>
          <p className="mt-6 text-xs text-slate-500">
            *By registering, you agree to bring good vibes only.
          </p>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="border-t border-white/5 py-12 px-4 bg-[#010409]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
                <h4 className="font-bold text-white text-lg">Department of Computer Science</h4>
                <p className="text-slate-500 text-sm">St. Joseph's University, Bengaluru</p>
            </div>
            <div className="text-slate-600 text-sm flex flex-col items-center md:items-end">
                <p>Event hosted by <span className="text-emerald-500 font-bold">Syntaxia</span></p>
                <p>© 2025. Built with ☕ and 0 sleep.</p>
            </div>
        </div>
      </footer>

    </div>
  );
};

export default EventLandingPage;