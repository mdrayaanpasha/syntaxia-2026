import React, { useState, useEffect } from 'react';
import { Menu, X, Zap, Sword, Map, Mail, LayoutDashboard, User } from 'lucide-react';

const PremiumNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const tokenFound = typeof window !== 'undefined' ? localStorage.getItem("token") : null;

  // Handle scroll for a solid HUD effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${
      scrolled ? 'bg-black/95 border-b border-white/10' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        
        {/* LOGO: Left Aligned */}
        <div 
          className="flex flex-col cursor-pointer group select-none" 
          onClick={() => window.location.href = "/"}
        >
          <span className="text-white text-2xl font-black italic tracking-tighter leading-none group-hover:text-[#ffcc00] transition-colors uppercase font-minecraft">
            SYNTAXIA
          </span>
          <span className="text-gray-500 font-mono text-[9px] tracking-[0.4em] uppercase mt-1">
            Cybernetics_2026
          </span>
        </div>

        {/* DESKTOP NAV: Standardized HUD */}
        <div className="hidden lg:flex items-center gap-2">
          <div className="flex items-center border-r border-white/5 pr-6 mr-6">
            <NavItem icon={<Sword size={14}/>} label="EVENTS" href="/events" />
            <NavItem icon={<Map size={14}/>} label="SCHEDULE" href="#prizes" />
            <NavItem icon={<Mail size={14}/>} label="CONTACT" href="#contact" />
          </div>

          <button 
            className="bg-[#55aa55] border-b-4 border-black px-6 py-2.5 active:translate-y-1 active:border-b-0 transition-all flex items-center gap-3 group"
            onClick={() => window.location.href = tokenFound ? "/dashboard" : "/auth"}
          >
            <Zap size={14} className="text-black group-hover:animate-pulse" />
            <span className="text-black text-[10px] font-bold font-sans tracking-widest uppercase">
              {tokenFound ? "DASHBOARD" : "REGISTER"}
            </span>
          </button>
        </div>

        {/* MOBILE TOGGLE */}
        <button 
          className="lg:hidden p-2 text-white border border-white/10 bg-black/50"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* MOBILE DRAWER: Simple Overlay */}
      <div className={`fixed inset-0 bg-[#050505] transition-opacity duration-300 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      } lg:hidden`}>
        <div className="flex flex-col h-full pt-32 px-10">
          <p className="text-gray-800 font-mono text-[10px] tracking-[0.5em] uppercase border-b border-white/5 pb-4 mb-8">/system_menu</p>
          
          <div className="flex flex-col gap-6">
            <MobileLink label="EVENTS" href="/events" onClick={() => setIsOpen(false)} />
            <MobileLink label="SCHEDULE" href="#prizes" onClick={() => setIsOpen(false)} />
            <MobileLink label="CONTACT" href="#contact" onClick={() => setIsOpen(false)} />
          </div>
          
          <button 
            className="mt-auto mb-16 w-full py-6 bg-[#ffcc00] border-b-[8px] border-black text-black font-black uppercase italic tracking-[0.3em] flex items-center justify-center gap-4 font-minecraft"
            onClick={() => window.location.href = tokenFound ? "/dashboard" : "/auth"}
          >
            {tokenFound ? "DASHBOARD" : "REGISTER_NOW"}
          </button>
        </div>
      </div>
    </nav>
  );
};

// Internal Components for Stability
const NavItem = ({ label, icon, href }) => (
  <a 
    href={href}
    className="px-4 py-2 text-[10px] font-bold text-gray-400 hover:text-white transition-all flex items-center gap-2 uppercase tracking-[0.2em] font-sans"
  >
    <span className="opacity-40">{icon}</span>
    {label}
  </a>
);

const MobileLink = ({ label, href, onClick }) => (
  <a 
    href={href} 
    onClick={onClick}
    className="text-5xl font-black text-white italic uppercase tracking-tighter hover:text-[#ffcc00] font-minecraft"
  >
    {label}
  </a>
);

export default PremiumNavbar;