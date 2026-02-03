import React, { useState } from 'react';
import { Mail, MapPin, Phone, Instagram, Linkedin, Youtube, MessageSquare, Copy, Check, Globe } from 'lucide-react';

const ContactSection = () => {
  const [copied, setCopied] = useState(false);
  const serverIP = "syntaxia.sju.edu.in";

  const handleCopy = () => {
    navigator.clipboard.writeText(serverIP);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="relative py-24 px-6 bg-[#0a0a0a] font-minecraft overflow-hidden">
      {/* Background Grid Accent */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col items-center mb-20 text-center">
          <div className="flex items-center gap-2 mb-4 text-[#55aa55]">
            <Globe size={18} className="animate-spin-slow" />
            <span className="tracking-[0.4em] text-[10px] uppercase">/establish_connection</span>
          </div>
          <h2 className="text-5xl md:text-7xl text-white tracking-tight [text-shadow:4px_4px_0px_#373737]">
            GET IN <span className="text-[#ffcc00]">TOUCH</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
          
          {/* LEFT: SERVER INTEL (Contact Details) */}
          <div className="space-y-6">
            <div className="bg-[#1a1a1a] border-x-[3px] border-b-[6px] border-black p-8 relative overflow-hidden">
              <div className="h-[4px] absolute top-0 left-0 w-full bg-[#55aa55]"></div>
              
              <h3 className="text-white text-xl mb-8 tracking-widest [text-shadow:2px_2px_0px_#000] flex items-center gap-3">
                <MessageSquare size={20} className="text-[#55aa55]" /> TRANSMISSION_INFO
              </h3>

              <div className="space-y-8">
                {/* Email Slot */}
                <div className="flex items-center gap-6 group">
                  <div className="w-12 h-12 bg-black/40 border-2 border-white/5 flex items-center justify-center group-hover:border-[#55aa55] transition-colors">
                    <Mail className="text-gray-500 group-hover:text-[#55aa55]" size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 tracking-widest uppercase">Official Email</p>
                    <p className="text-white text-lg tracking-tight hover:text-[#55aa55] cursor-pointer transition-colors">syntaxia@sju.edu.in</p>
                  </div>
                </div>

                {/* Venue Slot */}
                <div className="flex items-center gap-6 group">
                  <div className="w-12 h-12 bg-black/40 border-2 border-white/5 flex items-center justify-center group-hover:border-[#ffcc00] transition-colors">
                    <MapPin className="text-gray-500 group-hover:text-[#ffcc00]" size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 tracking-widest uppercase">Main Server Venue</p>
                    <p className="text-white text-lg tracking-tight uppercase">St. Joseph's University, Bengaluru</p>
                  </div>
                </div>

                {/* Phone Slot (General Help) */}
                <div className="flex items-center gap-6 group">
                  <div className="w-12 h-12 bg-black/40 border-2 border-white/5 flex items-center justify-center group-hover:border-cyan-400 transition-colors">
                    <Phone className="text-gray-500 group-hover:text-cyan-400" size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 tracking-widest uppercase">Admin Helpline</p>
                    <p className="text-white text-lg tracking-tight">Available on Form Registration</p>
                  </div>
                </div>
              </div>
            </div>

            {/* SERVER IP BAR - Interactive */}
            <div className="bg-[#1a1a1a] border-x-[3px] border-b-[6px] border-black p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
               <div className="flex flex-col">
                  <span className="text-[9px] text-gray-600 tracking-[0.3em] uppercase">Connect directly</span>
                  <span className="text-white font-minecraft-ten text-xl tracking-widest">IP: {serverIP}</span>
               </div>
               <button 
                  onClick={handleCopy}
                  className={`px-6 py-2 border-b-4 border-r-4 transition-all flex items-center gap-3 ${
                    copied ? 'bg-[#55aa55] border-[#2d5a2d] text-white' : 'bg-[#333] border-black text-gray-400 hover:text-white hover:bg-[#444]'
                  }`}
               >
                 {copied ? <Check size={16} /> : <Copy size={16} />}
                 <span className="text-[10px] font-minecraft-ten tracking-widest">{copied ? 'COPIED!' : 'COPY_IP'}</span>
               </button>
            </div>
          </div>

          {/* RIGHT: SOCIAL LINKS (The Network) */}
          <div className="bg-[#1a1a1a] border-x-[3px] border-b-[6px] border-black p-8 flex flex-col">
            <div className="h-[4px] absolute top-0 left-0 w-full bg-[#ffcc00]"></div>
            
            <h3 className="text-white text-xl mb-10 tracking-widest [text-shadow:2px_2px_0px_#000] flex items-center gap-3">
              <Linkedin size={20} className="text-[#ffcc00]" /> SOCIAL_CHANNELS
            </h3>

            <div className="grid grid-cols-2 gap-4 flex-grow">
              {[
                { name: 'Instagram', icon: <Instagram size={24} />, color: 'hover:bg-[#E1306C]', handle: '@cybernetics_sju' },
                { name: 'LinkedIn', icon: <Linkedin size={24} />, color: 'hover:bg-[#0077B5]', handle: '/cybernetics-sju' },
                { name: 'Discord', icon: <MessageSquare size={24} />, color: 'hover:bg-[#5865F2]', handle: 'Join Server' },
                { name: 'YouTube', icon: <Youtube size={24} />, color: 'hover:bg-[#FF0000]', handle: '/syntaxia' },
              ].map((social) => (
                <div key={social.name} className={`relative flex flex-col items-center justify-center p-6 border-2 border-white/5 transition-all group cursor-pointer ${social.color}`}>
                  <div className="mb-3 text-gray-500 group-hover:text-white transition-colors">{social.icon}</div>
                  <span className="text-white text-xs tracking-widest mb-1">{social.name.toUpperCase()}</span>
                  <span className="text-[8px] text-gray-600 group-hover:text-white/70 uppercase tracking-tighter">{social.handle}</span>
                </div>
              ))}
            </div>
            
            <p className="mt-8 text-[9px] text-gray-600 text-center uppercase tracking-[0.4em]">Broadcasted from Cybernetics HQ</p>
          </div>

        </div>
      </div>

      {/* FOOTER LOGO */}
      <div className="mt-24 border-t-2 border-white/5 pt-12 text-center opacity-30 group hover:opacity-100 transition-opacity">
        <h4 className="font-minecraft text-white text-2xl tracking-widest mb-2">SYNTAXIA 2026</h4>
        <p className="font-minecraft text-[10px] text-gray-500 uppercase">Hand-crafted by the Cybernetics Association • SJU</p>
      </div>
    </section>
  );
};

export default ContactSection;