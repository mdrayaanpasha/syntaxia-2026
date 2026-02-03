import React from 'react';
import { 
  Users, User, AlertCircle, CheckCircle2, 
  ArrowRight, ShieldAlert, Sparkles, Gem 
} from 'lucide-react';

const RegistrationSection = () => {
  return (
    <section id="cta" className="relative py-24 px-6 bg-[#0a0a0a] font-minecraft overflow-hidden">
      {/* Background Decorative "XP" Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#55aa55]/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* HEADER */}
        <div className="flex flex-col items-center mb-16 text-center">
          <div className="flex items-center gap-2 mb-4 text-[#ffcc00] animate-pulse">
            <Gem size={18} />
            <span className="tracking-[0.4em] text-[10px] uppercase">/trade_initiate v2.026</span>
          </div>
          <h2 className="text-5xl md:text-7xl text-white tracking-tight [text-shadow:4px_4px_0px_#373737]">
            TRADING <span className="text-[#55aa55]">POST</span>
          </h2>
          <p className="mt-4 text-gray-500 text-sm tracking-widest uppercase italic">Secure your whitelist entry for Syntaxia 2026</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* LEFT: FEE SLABS (The Deals) */}
          <div className="space-y-6">
            <h3 className="text-[#ffcc00] text-xl mb-6 flex items-center gap-3 [text-shadow:2px_2px_0px_#000]">
              <Sparkles size={20} /> AVAILABLE_PASSES
            </h3>
            
            {/* General Pass */}
            <div className="relative group">
              <div className="relative bg-[#1a1a1a] border-x-[3px] border-b-[6px] border-black p-8 transition-all group-hover:-translate-y-1 group-hover:bg-[#222]">
                <div className="h-[4px] absolute top-0 left-0 w-full bg-[#55aa55]"></div>
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-white text-2xl mb-2 [text-shadow:2px_2px_0px_#000]">GENERAL QUESTS</h4>
                    <p className="text-gray-500 text-xs tracking-wider">SINGLE OR GROUP ADVENTURES</p>
                  </div>
                  <div className="text-right">
                    <span className="text-3xl text-[#55aa55] font-minecraft-ten [text-shadow:2px_2px_0px_#000]">₹300</span>
                    <p className="text-[10px] text-gray-600">PER HEAD</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Gaming Pass */}
            <div className="relative group opacity-80">
              <div className="relative bg-[#1a1a1a] border-x-[3px] border-b-[6px] border-black p-8 transition-all">
                <div className="h-[4px] absolute top-0 left-0 w-full bg-[#A335EE]"></div>
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-white text-2xl mb-2 [text-shadow:2px_2px_0px_#000]">GAMING ARENA</h4>
                    <p className="text-gray-500 text-xs tracking-wider">BGMI & VALORANT BRACKETS</p>
                  </div>
                  <div className="text-right bg-black/40 px-3 py-1 border border-white/5">
                    <span className="text-lg text-[#A335EE] font-minecraft-ten">T.B.A</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA BUTTON */}
            <button className="w-full relative py-6 group/reg overflow-hidden">
              <div className="absolute inset-0 bg-[#55aa55] border-b-[6px] border-black group-hover/reg:bg-[#66cc66] transition-colors"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/reg:animate-shimmer"></div>
              <span className="relative flex items-center justify-center gap-4 text-white text-xl tracking-[0.2em] [text-shadow:2px_2px_0px_#224422]">
                OPEN REGISTRATION FORM <ArrowRight size={20} />
              </span>
            </button>
          </div>

          {/* RIGHT: RULES & PROCESS (Quest Intel) */}
          <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border-x-[3px] border-b-[6px] border-black p-10">
            <div className="space-y-10">
              
              {/* Process */}
              <div>
                <h4 className="text-white text-lg mb-6 flex items-center gap-3 border-b border-white/10 pb-2">
                  <CheckCircle2 size={18} className="text-[#55aa55]" /> HOW_TO_JOIN
                </h4>
                <ul className="space-y-4 font-minecraft text-sm text-gray-400">
                  <li className="flex gap-4"><span className="text-[#55aa55]">01.</span> Select your quest(s) from the quest board.</li>
                  <li className="flex gap-4"><span className="text-[#55aa55]">02.</span> Fill the whitelist form via the button above.</li>
                  <li className="flex gap-4"><span className="text-[#55aa55]">03.</span> Complete the transaction and receive your portal pass.</li>
                </ul>
              </div>

              {/* Rules Grid */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="p-4 bg-black/30 border border-white/5">
                  <User size={16} className="text-[#ffcc00] mb-2" />
                  <h5 className="text-white text-xs mb-1">MULTI-TASKING</h5>
                  <p className="text-[10px] text-gray-500 uppercase tracking-tight">Yes, you can participate in multiple events.</p>
                </div>
                <div className="p-4 bg-black/30 border border-white/5">
                  <ShieldAlert size={16} className="text-red-500 mb-2" />
                  <h5 className="text-white text-xs mb-1">ON-SPOT ENTRY</h5>
                  <p className="text-[10px] text-gray-500 uppercase tracking-tight">Likely not allowed. Pre-registration is mandatory.</p>
                </div>
              </div>

              {/* Warning/Clarification */}
              <div className="flex items-start gap-4 p-4 bg-[#ffcc00]/5 border-l-4 border-[#ffcc00]">
                <AlertCircle className="text-[#ffcc00] flex-shrink-0" size={20} />
                <p className="text-[11px] text-[#ffcc00]/80 leading-relaxed uppercase tracking-wider">
                  Individual vs Group: Certain quests allow guild formations. Check specific quest requirements during form submission.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default RegistrationSection;