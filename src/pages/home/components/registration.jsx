import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Ticket, ArrowRight, Zap, Box, Layers, ShieldCheck } from 'lucide-react';

const PortalPass = () => {
  const navigate = useNavigate();

  return (
    <section id="cta" className="relative py-32 px-6 bg-[#030303] font-minecraft overflow-hidden">
      
      {/* Background Atmosphere */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#55aa55]/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* NON-CENTERED HEADER */}
        <div className="mb-20 max-w-xl">
          <div className="flex items-center gap-3 text-[#ffcc00] font-mono text-[10px] tracking-[0.5em] uppercase mb-4">
            <Zap size={14} className="animate-pulse" /> /mint_access_v2
          </div>
          <h2 className="text-7xl md:text-9xl font-black text-white uppercase italic leading-[0.85] tracking-tighter [text-shadow:8px_8px_0px_#111]">
            THE <br /> <span className="text-[#55aa55]">PASS</span>
          </h2>
        </div>

        {/* ACTUAL TICKET INTERFACE */}
        <div className="flex flex-col lg:flex-row filter drop-shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
          
          {/* LEFT: THE MAIN BODY */}
          <div className="flex-[2] bg-[#0c0c0c] border-x-[4px] border-t-[4px] border-b-[10px] lg:border-b-[12px] border-black p-10 md:p-14 relative overflow-hidden">
            {/* Enchanted Top Glow */}
            <div className="absolute top-0 left-0 h-[8px] w-full bg-[#55aa55] shadow-[0_0_20px_rgba(85,170,85,0.3)]"></div>
            
            {/* Ticket Notches */}
            <div className="absolute -right-[20px] -top-[20px] w-10 h-10 bg-[#030303] rounded-full border-[4px] border-black z-30"></div>
            <div className="absolute -right-[20px] -bottom-[20px] w-10 h-10 bg-[#030303] rounded-full border-[4px] border-black z-30"></div>

            <div className="flex flex-col md:flex-row items-center gap-10">
              {/* ITEM SLOT */}
              <div className="shrink-0 w-24 h-24 bg-black border-4 border-[#222] flex items-center justify-center text-[#55aa55] shadow-[6px_6px_0px_#000]">
                <Box size={48} />
              </div>

              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                  <span className="bg-[#ffcc00] text-black text-[9px] px-2 py-0.5 font-black uppercase">Legendary_Item</span>
                  <span className="text-gray-600 font-mono text-[10px] uppercase tracking-widest">SN-2026-X8</span>
                </div>
                
                <h3 className="text-5xl md:text-6xl font-black text-white uppercase italic tracking-tighter mb-4 [text-shadow:4px_4px_0px_#000]">
                  SYNTAXIA '26
                </h3>
                
                <div className="flex flex-wrap justify-center md:justify-start gap-6 text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500">
                  <span className="flex items-center gap-2 text-[#55aa55]"><ShieldCheck size={14}/> Whitelisted</span>
                  <span className="flex items-center gap-2"><Layers size={14}/> Multiple events participation</span>
                </div>
              </div>
            </div>
          </div>

          {/* THE PERFORATION (The Tear Line) */}
          <div className="hidden lg:flex flex-col justify-around py-8 bg-[#0c0c0c] border-t-[4px] border-b-[12px] border-black">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="w-[4px] h-[8px] bg-[#030303]"></div>
            ))}
          </div>

          {/* RIGHT: THE STUB (Transaction) */}
          <div className="flex-1 bg-[#121212] border-x-[4px] lg:border-l-0 border-t-[4px] border-b-[12px] border-black p-10 flex flex-col items-center justify-center relative">
             <div className="text-center mb-8">
                <p className="text-6xl font-black text-[#55aa55] italic tracking-tighter [text-shadow:4px_4px_0px_#000]">₹300</p>
                <p className="text-[9px] text-gray-700 font-bold uppercase tracking-[0.4em] mt-2 italic">Standard_Uplink</p>
             </div>

             <button 
                onClick={() => navigate('/register')}
                className="w-full relative py-5 bg-[#55aa55] border-b-[6px] border-black hover:bg-white transition-all active:translate-y-1 active:border-b-2 group/btn"
             >
                <span className="flex items-center justify-center gap-3 text-black font-black uppercase tracking-[0.3em] italic text-xs">
                  CLAIM_PASS <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                </span>
             </button>

             {/* BARCODE DECOR */}
             <div className="mt-8 flex gap-1 opacity-10 group-hover:opacity-30 transition-opacity">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className={`w-[3px] bg-white ${i % 3 === 0 ? 'h-6' : 'h-4'}`}></div>
                ))}
             </div>
          </div>
        </div>

        {/* FOOTER SYSTEM NOTE */}
        <p className="mt-12 text-left text-gray-800 font-mono text-[9px] uppercase tracking-[0.5em] leading-relaxed max-w-lg">
          [System_Notice]: One pass per operative. Valid for all non-gaming sectors. Verified secure uplink established.
        </p>

      </div>
    </section>
  );
};

export default PortalPass;