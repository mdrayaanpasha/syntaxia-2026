import React from 'react';
import { Mail, MapPin, Phone, Instagram, Linkedin, MessageSquare, Globe } from 'lucide-react';

const ContactSection = () => {
  return (
    <section id="contact" className="relative py-20 md:py-32 px-4 md:px-6 bg-[#030303] font-minecraft overflow-hidden">
      
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* RESPONSIVE HEADER */}
        <div className="mb-16 md:mb-32 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-8 md:pb-12">
          <div>
            <div className="flex items-center gap-3 text-[#55aa55] font-mono text-[9px] md:text-[10px] tracking-[0.4em] md:tracking-[0.5em] uppercase mb-4">
              <div className="w-1.5 h-1.5 bg-[#55aa55] animate-ping" /> /establish_uplink
            </div>
            {/* Fluid typography scaling */}
            <h2 className="text-[12vw] md:text-9xl font-black text-white uppercase italic leading-none tracking-tighter">
              GET IN <span className="text-[#ffcc00]">TOUCH</span>
            </h2>
          </div>
          <p className="text-gray-600 font-mono text-[9px] md:text-[10px] uppercase tracking-widest text-left md:text-right leading-loose">
            Cybernetics_HQ // Bengaluru <br className="hidden md:block" /> Syntaxia_Protocol_2026
          </p>
        </div>

        {/* CONTACT GRID: Stacks on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 px-0.5 bg-white/5 border border-white/5">
          
          {/* TRANSMISSION CHANNELS */}
          <div className="bg-[#050505] p-8 md:p-16 space-y-10 md:space-y-12">
            <h3 className="text-gray-500 font-mono text-[9px] md:text-[10px] uppercase tracking-[0.4em] mb-8 md:mb-12 flex items-center gap-3">
              <MessageSquare size={14} /> Communication_Lines
            </h3>

            <div className="space-y-8 md:space-y-10">
              {/* Helpline */}
              <div className="group flex flex-col sm:flex-row sm:items-center gap-4 md:gap-8">
                <div className="w-12 h-12 md:w-14 md:h-14 border border-white/10 flex items-center justify-center bg-white/5 text-cyan-400 group-hover:border-cyan-400 transition-colors shrink-0">
                  <Phone size={20} md:size={24} strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-gray-600 font-mono text-[8px] md:text-[9px] uppercase tracking-widest mb-1">Helpline_Uplink</p>
                  <p className="text-lg md:text-2xl lg:text-3xl font-black text-white italic tracking-tighter break-words">
                    +91 94060 26700<br className="sm:hidden" />
                    <span className="hidden sm:inline">, </span>
                    +91 91482 66991
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="group flex flex-col sm:flex-row sm:items-center gap-4 md:gap-8">
                <div className="w-12 h-12 md:w-14 md:h-14 border border-white/10 flex items-center justify-center bg-white/5 text-[#55aa55] group-hover:border-[#55aa55] transition-colors shrink-0">
                  <Mail size={20} md:size={24} strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-gray-600 font-mono text-[8px] md:text-[9px] uppercase tracking-widest mb-1">Email_Transmission</p>
                  <p className="text-lg md:text-2xl lg:text-3xl font-black text-white italic tracking-tighter break-all">
                    cybernetics.sju@gmail.com
                  </p>
                </div>
              </div>

              {/* Venue */}
              <div className="group flex flex-col sm:flex-row sm:items-center gap-4 md:gap-8">
                <div className="w-12 h-12 md:w-14 md:h-14 border border-white/10 flex items-center justify-center bg-white/5 text-[#ffcc00] group-hover:border-[#ffcc00] transition-colors shrink-0">
                  <MapPin size={20} md:size={24} strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-gray-600 font-mono text-[8px] md:text-[9px] uppercase tracking-widest mb-1">Physical_Location</p>
                  <p className="text-sm md:text-base font-black uppercase tracking-widest opacity-70 leading-relaxed text-white">
                    St. Joseph's University, <br /> Bengaluru
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* SOCIAL CHANNELS */}
          <div className="bg-[#050505] p-8 md:p-16 flex flex-col">
             <h3 className="text-gray-500 font-mono text-[9px] md:text-[10px] uppercase tracking-[0.4em] mb-8 md:mb-12 flex items-center gap-3">
              <Globe size={14} /> Social_Network
            </h3>

            <div className="grid grid-cols-1 gap-1 bg-white/5 flex-grow">
              <a href="https://instagram.com/cybernetics_sju" className="bg-[#080808] flex items-center justify-between p-6 md:p-8 group hover:bg-[#E1306C]/10 transition-all">
                <div className="flex items-center gap-4 md:gap-6">
                  <Instagram className="text-gray-600 group-hover:text-[#E1306C]" size={20} md:size={24} />
                  <span className="text-white font-black italic uppercase text-lg md:text-xl tracking-tighter">Instagram</span>
                </div>
                <span className="text-gray-700 font-mono text-[8px] md:text-[10px] group-hover:text-white transition-colors">@cybernetics_sju</span>
              </a>

              <a href="https://linkedin.com/company/cybernetics-sju" className="bg-[#080808] flex items-center justify-between p-6 md:p-8 group hover:bg-[#0077B5]/10 transition-all">
                <div className="flex items-center gap-4 md:gap-6">
                  <Linkedin className="text-gray-600 group-hover:text-[#0077B5]" size={20} md:size={24} />
                  <span className="text-white font-black italic uppercase text-lg md:text-xl tracking-tighter">LinkedIn</span>
                </div>
                <span className="text-gray-700 font-mono text-[8px] md:text-[10px] group-hover:text-white transition-colors">/cybernetics-sju</span>
              </a>
            </div>
            
            <div className="mt-10 md:mt-12 pt-6 md:pt-8 border-t border-white/5 text-center md:text-left">
              <p className="text-[8px] md:text-[10px] text-gray-800 font-mono uppercase tracking-[0.3em] md:tracking-[0.4em]">Broadcasted from Cybernetics HQ</p>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="mt-16 md:mt-24 text-center">
          <h4 className="text-white font-black italic uppercase text-2xl md:text-3xl tracking-tighter opacity-20 mb-2">SYNTAXIA 2026</h4>
          <p className="text-[8px] md:text-[9px] text-gray-700 font-mono uppercase tracking-[0.4em] md:tracking-[0.5em]">Crafted by the Cybernetics Association • SJU</p>
        </div>

      </div>
    </section>
  );
};

export default ContactSection;