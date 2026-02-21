import React from 'react';
import { Terminal, ShieldCheck, Instagram, Mail, MapPin, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 bg-[#030303] border-t border-white/5 pt-16 pb-8 px-6 font-modern">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Terminal size={24} className="text-[#ffcc00]" />
              <h2 className="text-2xl font-black tracking-tighter uppercase italic">
                SYNTA<span className="text-[#ffcc00]">XIA</span>
              </h2>
            </div>
            <p className="text-gray-500 text-sm max-w-xs leading-relaxed uppercase tracking-wider">
              The annual technical symposium of St. Joseph's University. 
              Bridging the gap between neural networks and human creativity.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em] mb-6">Navigation</h3>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link to="/events" className="hover:text-[#ffcc00] transition-colors">EVENTS_LOG</Link></li>
              <li><Link to="/schedule" className="hover:text-[#ffcc00] transition-colors">TIMELINE</Link></li>
              <li><Link to="/pass-selection" className="hover:text-[#ffcc00] transition-colors">PASS_HUB</Link></li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em] mb-6">Connect</h3>
            <ul className="space-y-4 text-sm font-medium">
              <li className="flex items-center gap-3">
                <Instagram size={16} className="text-pink-500" />
                <a href="https://www.instagram.com/cybernetics.sju/" className="hover:text-white transition-colors">@SYNTAXIA_SJU</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-[#55aa55]" />
                <a href="mailto:cybernetics.sju@gmail.com" className="hover:text-white transition-colors">cybernetics.sju@gmail.com</a>
              </li>
            <li className="flex flex-col gap-3 text-gray-500">
  <div className="flex items-center gap-3">
    <MapPin size={16} className="text-[#55aa55]" />
    <span className="font-mono text-xs uppercase tracking-widest">SJU CAMPUS, BENGALURU</span>
  </div>
  
  {/* MAP PREVIEW BOX */}
  <div className="w-full h-40 bg-[#0a0a0a] border border-[#222] overflow-hidden relative group">
    <iframe
      title="SJU Map"
      width="100%"
      height="100%"
      frameBorder="0"
      scrolling="no"
      marginHeight="0"
      marginWidth="0"
      src="https://www.openstreetmap.org/export/embed.html?bbox=77.593600,12.957600,77.601800,12.965600&layer=mapnik&marker=12.9616,77.5978"
      className="grayscale contrast-125 invert opacity-70 group-hover:opacity-100 transition-opacity"
    ></iframe>
    
    {/* OVERLAY LINK TO FULL MAP */}
    <a 
      href="https://www.openstreetmap.org/?mlat=12.9616&mlon=77.5978#map=17/12.961600/77.597800"
      target="_blank"
      rel="noopener noreferrer"
      className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-all"
    >
      <span className="bg-white text-black px-3 py-1 text-[10px] font-black italic uppercase tracking-tighter flex items-center gap-2">
        OPEN TACTICAL MAP <ExternalLink size={12}/>
      </span>
    </a>
  </div>
</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4 text-[10px] font-mono text-gray-600 tracking-widest uppercase">
            <span>© {currentYear} Syntaxia SJU</span>
            <span className="hidden md:block">|</span>
            <span className="flex items-center gap-1">
              <ShieldCheck size={12} /> SECURE_CONNECTION
            </span>
          </div>
          
          <div className="text-[10px] font-mono text-gray-700 uppercase tracking-[0.2em]">
            Developed by <span className="text-white hover:text-[#ffcc00] cursor-pointer transition-colors">Syntaxia_Dev_Team</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;