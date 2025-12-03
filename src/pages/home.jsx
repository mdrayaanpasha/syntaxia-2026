import React, { useState, useEffect, useRef } from 'react';
import { 
  Calendar, 
  MapPin, 
  Trophy, 
  Users, 
  Code, 
  Cpu, 
  Terminal, 
  Clock, 
  Menu, 
  X, 
  Sword, 
  Pickaxe, 
  Gem,
  ExternalLink,
  MessageSquare,
  Heart,
  Shield,
  Zap,
  Home,
  BookOpen,
  Map,
  Gamepad2,
  Download,
  Info,
  Star,
  Target,
  Users as UsersIcon,
  Mail,
  Globe,
  Sparkles
} from 'lucide-react';

import HeroSection from '../components/cover';
import AboutSection from './about';
import EventsSection from './events';
import ScheduleSection from './schedule';
// --- Minecraft Font Loader Component ---
const MinecraftFontLoader = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Silkscreen:wght@400;700&display=swap');
    @import url('https://fonts.cdnfonts.com/css/minecraft-4');
    
    .font-minecraft {
      font-family: 'Minecraft', 'Press Start 2P', 'Silkscreen', monospace;
    }
    
    .font-minecraft-ten {
      font-family: 'Minecraft Ten', 'Minecraft', monospace;
    }
    
    /* Minecraft UI Textures */
    .bg-dirt-dark {
      background-color: #523a20;
      background-image: 
        linear-gradient(45deg, #3c2a16 25%, transparent 25%),
        linear-gradient(-45deg, #3c2a16 25%, transparent 25%),
        linear-gradient(45deg, transparent 75%, #3c2a16 75%),
        linear-gradient(-45deg, transparent 75%, #3c2a16 75%);
      background-size: 20px 20px;
      background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
    }
    
    .bg-stone-tile {
      background-color: #8c8c8c;
      background-image: 
        radial-gradient(circle at 25% 25%, #a5a5a5 2px, transparent 2px),
        radial-gradient(circle at 75% 75%, #737373 2px, transparent 2px);
      background-size: 40px 40px;
    }
    
    .bg-wood-planks {
      background-color: #b97a57;
      background-image: 
        linear-gradient(90deg, #a36646 2px, transparent 2px),
        linear-gradient(#a36646 2px, transparent 2px);
      background-size: 20px 20px;
    }
    
    .bg-crafting-table {
      background-color: #aa7939;
      background-image: 
        linear-gradient(90deg, #8b5a2b 1px, transparent 1px),
        linear-gradient(#8b5a2b 1px, transparent 1px);
      background-size: 16px 16px;
    }
    
    .mc-border {
      border-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0' y='0' width='24' height='24' fill='none' stroke='%23555555' stroke-width='8'/%3E%3C/svg%3E") 4 stretch;
      border-width: 4px;
      border-style: solid;
    }
    
    .mc-button-bevel {
      box-shadow: 
        inset -2px -2px 0px 0px #00000066,
        inset 2px 2px 0px 0px #ffffff66,
        2px 2px 0px 0px #000000;
    }
    
    .mc-button-bevel:active {
      box-shadow: 
        inset 2px 2px 0px 0px #00000066,
        inset -2px -2px 0px 0px #ffffff66,
        1px 1px 0px 0px #000000;
      transform: translate(1px, 1px);
    }
    
    .mc-text-shadow {
      text-shadow: 2px 2px 0px #000000;
    }
    
    .mc-text-glow {
      text-shadow: 0 0 8px currentColor;
    }
    
    .mc-inventory-slot {
      background: linear-gradient(135deg, #8b8b8b 0%, #c6c6c6 100%);
      border: 2px solid;
      border-top-color: #fff;
      border-left-color: #fff;
      border-bottom-color: #555;
      border-right-color: #555;
    }
    
    .mc-inventory-slot:hover {
      background: linear-gradient(135deg, #9c9c9c 0%, #d7d7d7 100%);
    }
    
    .mc-panel {
      background: linear-gradient(180deg, #c6c6c6 0%, #8b8b8b 100%);
      border: 2px solid;
      border-top-color: #fff;
      border-left-color: #fff;
      border-bottom-color: #555;
      border-right-color: #555;
      box-shadow: 4px 4px 0px 0px #00000033;
    }
    
    .mc-title-bar {
      background: linear-gradient(90deg, #0000ff 0%, #5555ff 100%);
      border: 2px solid;
      border-top-color: #aaaaff;
      border-left-color: #aaaaff;
      border-bottom-color: #000088;
      border-right-color: #000088;
    }
    
    .animate-float {
      animation: float 3s ease-in-out infinite;
    }
    
    .animate-pulse-glow {
      animation: pulse-glow 2s ease-in-out infinite;
    }
    
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }
    
    @keyframes pulse-glow {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.7; }
    }
    
    .scrollbar-mc::-webkit-scrollbar {
      width: 12px;
    }
    
    .scrollbar-mc::-webkit-scrollbar-track {
      background: #8b8b8b;
      border: 2px solid;
      border-top-color: #555;
      border-left-color: #555;
      border-bottom-color: #fff;
      border-right-color: #fff;
    }
    
    .scrollbar-mc::-webkit-scrollbar-thumb {
      background: #4a4a4a;
      border: 2px solid;
      border-top-color: #666;
      border-left-color: #666;
      border-bottom-color: #222;
      border-right-color: #222;
    }
  `}</style>
);

// --- Minecraft Button Component ---
const MCButton = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  className = '', 
  href = null,
  icon: Icon = null,
  size = 'md'
}) => {
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-base",
    lg: "px-6 py-3 text-lg",
    xl: "px-8 py-4 text-xl"
  };
  
  const variants = {
    primary: "bg-[#7c7c7c] text-white hover:bg-[#8e8e8e]",
    success: "bg-[#4da94d] text-white hover:bg-[#5cb85c]",
    danger: "bg-[#be0000] text-white hover:bg-[#d60000]",
    warning: "bg-[#ffaa00] text-black hover:bg-[#ffbb33]",
    diamond: "bg-gradient(135deg, #4db5ff 0%, #0077ff 100%) text-white hover:brightness-110",
    emerald: "bg-gradient(135deg, #4dff4d 0%, #00aa00 100%) text-white hover:brightness-110"
  };

  const baseStyles = `relative font-minecraft-ten ${sizeClasses[size]} border-2 mc-button-bevel transition-all duration-75 active:scale-[0.98] w-full sm:w-auto text-center inline-flex items-center justify-center gap-2 cursor-pointer select-none`;

  const content = (
    <>
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </>
  );

  if (href) {
    return (
      <a href={href} className={`${baseStyles} ${variants[variant]} ${className}`}>
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={`${baseStyles} ${variants[variant]} ${className}`}>
      {content}
    </button>
  );
};

// --- Minecraft Panel Component ---
const MCPanel = ({ title, children, className = '', gradient = false }) => (
  <div className={`mc-panel p-1 ${className}`}>
    {title && (
      <div className="mc-title-bar text-white font-minecraft-ten text-sm px-3 py-1.5 mb-2 flex items-center gap-2">
        <div className="w-2 h-2 bg-white"></div>
        {title}
      </div>
    )}
    <div className={`${gradient ? 'bg-gradient-to-b from-[#e0e0e0] to-[#b0b0b0]' : 'bg-[#e0e0e0]'} p-3 sm:p-4`}>
      {children}
    </div>
  </div>
);

// --- Inventory Slot Component ---
const InventorySlot = ({ icon: Icon, label, count = null, rarity = 'common', onClick = null }) => {
  const rarityColors = {
    common: 'border-gray-400',
    uncommon: 'border-green-400',
    rare: 'border-blue-400',
    epic: 'border-purple-400',
    legendary: 'border-yellow-400'
  };

  return (
    <div 
      className={`mc-inventory-slot w-16 h-16 relative group cursor-pointer transition-all duration-150 hover:scale-105 ${rarityColors[rarity]}`}
      onClick={onClick}
    >
      {Icon && (
        <div className="w-full h-full flex items-center justify-center p-1">
          <Icon className="w-10 h-10 text-gray-800 group-hover:scale-110 transition-transform duration-200" />
        </div>
      )}
      {label && (
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-black/90 px-2 py-0.5 border border-gray-700 rounded-sm">
          <span className="font-minecraft-ten text-xs text-white whitespace-nowrap">{label}</span>
        </div>
      )}
      {count && (
        <div className="absolute bottom-0 right-0 bg-black/80 px-1">
          <span className="font-minecraft-ten text-xs text-white">{count}</span>
        </div>
      )}
      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-50">
        <div className="bg-black/95 border-2 border-gray-600 px-3 py-2 rounded-sm whitespace-nowrap">
          <span className="font-minecraft-ten text-sm text-white">{label}</span>
        </div>
      </div>
    </div>
  );
};

// --- Health Bar Component ---
const HealthBar = ({ hearts = 10, maxHearts = 10 }) => {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: maxHearts }).map((_, i) => (
        <div
          key={i}
          className={`w-6 h-6 ${i < hearts ? 'bg-red-500' : 'bg-gray-700'} border-2 border-gray-900`}
          style={{
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
          }}
        />
      ))}
    </div>
  );
};

// --- Experience Bar Component ---
const ExperienceBar = ({ level = 5, progress = 0.7 }) => (
  <div className="w-full bg-gray-800 border-2 border-gray-900 p-0.5">
    <div className="relative">
      <div className="w-full h-4 bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center">
        <div 
          className="absolute left-0 top-0 h-full bg-gradient-to-r from-yellow-400 to-yellow-600 transition-all duration-500"
          style={{ width: `${progress * 100}%` }}
        />
        <span className="relative font-minecraft-ten text-sm text-black z-10">
          Level {level}
        </span>
      </div>
    </div>
  </div>
);

// --- Main Application ---
export default function SyntaxiaFest() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentHealth, setCurrentHealth] = useState(10);
  const [currentSection, setCurrentSection] = useState('home');
  const [timeOfDay, setTimeOfDay] = useState('day');
  const heroRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'events', 'schedule', 'prizes', 'prices', 'cta'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setCurrentSection(current);
    };

    // Day/Night cycle simulation
    const hour = new Date().getHours();
    setTimeOfDay(hour >= 6 && hour < 18 ? 'day' : 'night');

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'Server Info', icon: Info },
    { id: 'events', label: 'Quests', icon: Sword },
    { id: 'schedule', label: 'Day Cycle', icon: Clock },
    { id: 'prizes', label: 'Loot', icon: Gem },
    { id: 'prices', label: 'Trading', icon: UsersIcon },
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
      setCurrentSection(id);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black font-minecraft text-gray-300 overflow-x-hidden">
      <MinecraftFontLoader />
      
   {/* --- 1. DESKTOP ONLY: Bottom Left Obsidian Dock --- */}
{/* 'hidden lg:flex' ensures this vanishes on mobile to save screen space */}
<div className="hidden lg:flex fixed bottom-8 left-8 z-50 flex-col items-start gap-2">
  
  {/* Dynamic Label Tooltip */}
  <div className={`
    bg-[#100C1C]/95 border-2 border-[#3C3454] px-3 py-1 mb-1 rounded-sm backdrop-blur-md 
    transition-all duration-300 transform origin-bottom-left
    ${navItems.some(i => i.id === currentSection) ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}
  `}>
    <p className="font-minecraft text-sm tracking-wide whitespace-nowrap">
      <span className="text-[#AAA]">Selected: </span>
      {navItems.map((item) => (
        currentSection === item.id && (
          <span key={item.id} className="text-yellow-400 drop-shadow-sm">
            {item.label || item.id.charAt(0).toUpperCase() + item.id.slice(1)}
          </span>
        )
      ))}
    </p>
  </div>

  {/* The Dock Container */}
  <div className="flex items-center gap-3 p-2 bg-[#050408]/80 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl">
    {navItems.map((item, index) => {
      const isActive = currentSection === item.id;

      return (
        <button
          key={item.id}
          onClick={() => scrollToSection(item.id)}
          className="group relative w-12 h-12 flex items-center justify-center outline-none transition-all duration-300"
        >
          {/* Slot Background */}
          <div className={`absolute inset-0 rounded-lg border-2 transition-all duration-300 ${
            isActive 
              ? 'bg-gray-800 border-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.4)]' 
              : 'bg-black/40 border-gray-700 group-hover:border-gray-500 group-hover:bg-gray-800'
          }`}></div>

          {/* Icon */}
          <item.icon 
            className={`relative z-10 w-5 h-5 transition-transform duration-300 ${
              isActive 
                ? 'text-yellow-400 scale-110 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]' 
                : 'text-gray-400 group-hover:text-white group-hover:scale-105'
            }`} 
          />

          {/* Hotkey Number */}
          <div className="absolute top-[-4px] left-[-4px] bg-[#1a1a1a] border border-gray-600 rounded px-1.5 py-0.5 z-20">
            <span className="font-minecraft text-[10px] text-gray-300 leading-none block pt-[2px]">
              {index + 1}
            </span>
          </div>

          {/* Active Indicator */}
          {isActive && (
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-yellow-400 rotate-45 animate-pulse"></div>
          )}
        </button>
      );
    })}
  </div>
</div>

{/* --- 2. RESPONSIVE: Top Status Bar --- */}
<div className="fixed top-0 left-0 right-0 bg-black/90 border-b-2 border-gray-800 z-40 h-16 flex items-center">
  <div className="w-full max-w-7xl mx-auto px-4 flex justify-between items-center">
    
    {/* Left Side: Logo & Stats */}
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection('home')}>
        <div className="w-2 h-2 md:w-3 md:h-3 bg-green-500 rounded-full animate-pulse"></div>
        <span className="font-minecraft text-lg md:text-xl text-white tracking-wider mc-text-shadow truncate">
          SYNTAXIA 2025
        </span>
      </div>
      
      {/* Stats - Hidden on Mobile to save space */}
      <div className="hidden md:flex items-center gap-3 ml-4 border-l border-gray-700 pl-4">
        <div className="flex items-center gap-1.5">
          <Heart className="w-4 h-4 text-red-500" />
          <span className="font-minecraft-ten text-sm text-gray-300">{currentHealth}/10</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Shield className="w-4 h-4 text-blue-500" />
          <span className="font-minecraft-ten text-sm text-gray-300">Armor: 5</span>
        </div>
      </div>
    </div>
    
    {/* Right Side: Time & CTA */}
    <div className="flex items-center gap-3">
    

      {/* Register Button - Compact on Mobile */}
      <div className="mr-10 md:mr-0"> {/* Margin right on mobile to avoid overlapping hamburger */}
        <MCButton variant="success" size="sm" onClick={() => scrollToSection('cta')}>
          <span className="hidden md:inline">JOIN SERVER</span>
          <span className="md:hidden">JOIN</span>
        </MCButton>
      </div>
    </div>
  </div>
</div>

{/* --- 3. MOBILE ONLY: Hamburger Button --- */}
<button 
  type="button"
  className="fixed top-3 right-3 md:hidden z-50 w-10 h-10 mc-inventory-slot flex items-center justify-center bg-[#222] border-2 border-white/20 active:scale-95 transition-transform"
  onClick={() => setIsMenuOpen(!isMenuOpen)}
>
  {isMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
</button>

{/* --- 4. MOBILE ONLY: Full Screen Menu --- */}
{isMenuOpen && (
  <div className="fixed inset-0 bg-black/95 z-[45] md:hidden flex flex-col p-6 animate-in fade-in duration-200">
    {/* Menu Header */}
    <div className="text-center mb-8 mt-12">
      <h2 className="font-minecraft text-3xl text-yellow-400 mb-2">PAUSE MENU</h2>
      <div className="w-32 h-1 bg-gray-700 mx-auto"></div>
    </div>

    {/* Menu Items */}
    <div className="flex-1 flex flex-col items-center gap-4 overflow-y-auto">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => {
            scrollToSection(item.id);
            setIsMenuOpen(false); // Close menu on click
          }}
          className="w-full max-w-xs py-4 bg-[#333] border-2 border-[#555] border-b-4 border-b-black active:border-b-[#555] active:translate-y-1 text-lg font-minecraft-ten text-white flex items-center justify-center gap-3 hover:bg-[#444] transition-all"
        >
          <item.icon className="w-5 h-5 text-gray-400" />
          {item.label}
        </button>
      ))}
    </div>

    {/* Menu Footer */}
    <div className="mt-auto pt-6">
      <MCButton variant="diamond" className="w-full max-w-xs mx-auto mb-4" onClick={() => scrollToSection('cta')}>
        REGISTER NOW
      </MCButton>
      <p className="text-center font-minecraft-ten text-xs text-gray-600">
        Server IP: syntaxia.sju.edu.in
      </p>
    </div>
  </div>
)}
      <HeroSection/>
      <AboutSection/>
      <EventsSection/>
      <ScheduleSection/>

 




      {/* Prizes/Loot Section */}
      <section id="prizes" className="bg-gradient-to-b from-gray-800 to-gray-900 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-minecraft text-white mb-4 mc-text-shadow">
              TREASURE VAULT
            </h2>
            <p className="font-minecraft-ten text-xl text-gray-300">
              /loot claim [rank] - Collect your rewards!
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              { rank: 1, name: "DIAMOND TIER", reward: "₹25,000", color: "from-cyan-500 to-blue-600", icon: Trophy, glow: true },
              { rank: 2, name: "IRON TIER", reward: "₹15,000", color: "from-gray-400 to-gray-600", icon: Gem },
              { rank: 3, name: "GOLD TIER", reward: "₹10,000", color: "from-yellow-500 to-yellow-700", icon: Pickaxe },
            ].map((tier) => (
              <div key={tier.rank} className={`relative ${tier.rank === 1 ? 'md:scale-110 z-10' : ''}`}>
                <div className={`bg-gradient-to-br ${tier.color} p-1 rounded-lg ${tier.glow ? 'animate-pulse-glow' : ''}`}>
                  <div className="bg-gray-900 rounded p-6 text-center">
                    <div className="w-24 h-24 mx-auto mb-4 relative">
                      <tier.icon className={`w-full h-full ${tier.rank === 1 ? 'text-yellow-400' : 'text-white'}`} />
                      <div className="absolute -top-2 -right-2 w-12 h-12 bg-black border-2 border-white rounded-full flex items-center justify-center">
                        <span className="font-minecraft-ten text-xl text-white">#{tier.rank}</span>
                      </div>
                    </div>
                    <h3 className="font-minecraft-ten text-2xl text-white mb-2">{tier.name}</h3>
                    <div className="text-3xl font-minecraft text-yellow-400 mb-4">{tier.reward}</div>
                    <ul className="font-minecraft-ten text-gray-300 space-y-1 mb-6">
                      <li>• Exclusive Badge</li>
                      <li>• Swag Package</li>
                      <li>• Sponsor Goodies</li>
                      {tier.rank === 1 && <li className="text-yellow-300">• Grand Trophy</li>}
                    </ul>
                    <MCButton variant={tier.rank === 1 ? "diamond" : "primary"} className="w-full">
                      Claim Reward
                    </MCButton>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Special Prizes */}
          <MCPanel title="SPECIAL ACHIEVEMENTS" className="max-w-3xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: "Best Code", icon: Star, color: "text-purple-500" },
                { name: "Fastest Solve", icon: Zap, color: "text-yellow-500" },
                { name: "Most Creative", icon: Sparkles, color: "text-cyan-500" },
                { name: "Team Spirit", icon: Users, color: "text-green-500" },
              ].map((prize, idx) => (
                <div key={idx} className="text-center">
                  <prize.icon className={`w-12 h-12 mx-auto mb-2 ${prize.color}`} />
                  <span className="font-minecraft-ten text-sm text-gray-800">{prize.name}</span>
                </div>
              ))}
            </div>
          </MCPanel>
        </div>
      </section>

      {/* Registration/Trading Section */}
      <section id="prices" className="bg-dirt-dark py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-minecraft text-white mb-4 mc-text-shadow">
              TRADING POST
            </h2>
            <p className="font-minecraft-ten text-xl text-gray-300">
              /trade open - Exchange emeralds for passes!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <MCPanel title="SOLO ADVENTURER" gradient={true}>
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <div className="text-5xl font-minecraft text-gray-800 mb-2">₹ 150</div>
                <p className="font-minecraft-ten text-lg text-gray-700 mb-6">per event</p>
                <ul className="font-minecraft-ten text-gray-700 space-y-2 mb-8">
                  <li className="flex items-center justify-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Single Quest Access
                  </li>
                  <li className="flex items-center justify-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Starter Kit
                  </li>
                  <li className="flex items-center justify-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Hunger Token
                  </li>
                </ul>
                <MCButton variant="success" className="w-full">
                  Buy Now
                </MCButton>
              </div>
            </MCPanel>

            <MCPanel title="GUILD PACKAGE" gradient={true}>
              <div className="text-center relative">
                <div className="absolute top-0 right-0 bg-yellow-500 text-black font-minecraft-ten text-sm px-3 py-1 transform -rotate-12">
                  BEST VALUE
                </div>
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                  <Users className="w-10 h-10 text-white" />
                  <span className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white text-xs flex items-center justify-center text-white">
                    4
                  </span>
                </div>
                <div className="text-5xl font-minecraft text-gray-800 mb-2">₹ 500</div>
                <p className="font-minecraft-ten text-lg text-gray-700 mb-6">for 4 players</p>
                <ul className="font-minecraft-ten text-gray-700 space-y-2 mb-8">
                  <li className="flex items-center justify-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    All Team Quests
                  </li>
                  <li className="flex items-center justify-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Guild Tag & Banner
                  </li>
                  <li className="flex items-center justify-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Priority Support
                  </li>
                  <li className="flex items-center justify-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Team Photos
                  </li>
                </ul>
                <MCButton variant="diamond" className="w-full">
                  Buy Guild Pass
                </MCButton>
              </div>
            </MCPanel>
          </div>

          {/* Payment Methods */}
          <div className="mt-12 bg-black/40 border-2 border-gray-700 rounded-lg p-6">
            <h3 className="font-minecraft-ten text-2xl text-white text-center mb-4">ACCEPTED PAYMENTS</h3>
            <div className="flex justify-center gap-6 flex-wrap">
              {['Emeralds', 'Gold', 'UPI', 'Cards', 'Net Banking'].map((method, idx) => (
                <div key={idx} className="bg-gray-800 border border-gray-700 px-4 py-2 rounded">
                  <span className="font-minecraft-ten text-gray-300">{method}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="relative overflow-hidden bg-gradient-to-b from-gray-900 to-black py-24 px-4">
        {/* Animated Particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                opacity: Math.random() * 0.5 + 0.2
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="w-32 h-32 mx-auto mb-8 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-500 rounded-full animate-spin" style={{ animationDuration: '20s' }}></div>
            <div className="absolute inset-4 bg-black rounded-full flex items-center justify-center">
              <Gamepad2 className="w-16 h-16 text-white" />
            </div>
          </div>

          <h2 className="text-4xl md:text-6xl font-minecraft text-white mb-6 mc-text-shadow">
            SERVER WHITELIST OPEN
          </h2>
          
          <div className="bg-black/60 border-4 border-gray-700 rounded-xl p-8 mb-10 backdrop-blur-sm">
            <p className="font-minecraft-ten text-2xl text-gray-300 mb-6">
              <span className="text-green-400">/whitelist add [your_name]</span>
              <br />
              Join 256+ players in the ultimate coding adventure
            </p>
            
            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              {[
                { label: 'Slots Left', value: '44', color: 'text-red-400' },
                { label: 'Online Now', value: '128', color: 'text-green-400' },
                { label: 'Registrations', value: '212', color: 'text-blue-400' },
              ].map((stat, idx) => (
                <div key={idx} className="bg-gray-900 border-2 border-gray-700 rounded p-4">
                  <div className={`text-3xl font-minecraft ${stat.color}`}>{stat.value}</div>
                  <div className="font-minecraft-ten text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <MCButton 
                variant="success" 
                size="xl"
                icon={Gamepad2}
                className="sm:flex-1 max-w-md mx-auto"
                onClick={() => window.open('https://example.com/register', '_blank')}
              >
                REGISTER
              </MCButton>
              <MCButton 
                variant="diamond" 
                size="xl"
                icon={Download}
                className="sm:flex-1 max-w-md mx-auto"
              >
                DOWNLOAD RULES
              </MCButton>
            </div>
          </div>

          <div className="text-gray-500 font-minecraft-ten">
            <p className="mb-2">Server IP: syntaxia.sju.edu.in:25565</p>
            <p>Version: Syntaxia 2025.1</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t-4 border-gray-800 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-green-500 border-2 border-white rounded"></div>
                <span className="font-minecraft text-xl text-white">SYNTAXIA</span>
              </div>
              <p className="font-minecraft-ten text-gray-400 text-sm">
                Crafting the future, one block at a time.
              </p>
            </div>
            
            <div>
              <h4 className="font-minecraft-ten text-white mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {['Server Rules', 'Quest Guide', 'Mod List', 'Texture Packs'].map((link, idx) => (
                  <li key={idx}>
                    <a href="#" className="font-minecraft-ten text-gray-400 hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-minecraft-ten text-white mb-4">Social</h4>
              <div className="flex gap-3">
                {['Discord', 'Instagram', 'LinkedIn', 'YouTube'].map((platform, idx) => (
                  <a 
                    key={idx}
                    href="#" 
                    className="w-10 h-10 bg-gray-800 border border-gray-700 rounded flex items-center justify-center hover:bg-gray-700 transition-colors"
                  >
                    <span className="font-minecraft-ten text-xs text-white">{platform[0]}</span>
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-minecraft-ten text-white mb-4">Contact</h4>
              <div className="flex items-center gap-2 text-gray-400 font-minecraft-ten text-sm mb-2">
                <Mail className="w-4 h-4" />
                syntaxia@sju.edu.in
              </div>
              <div className="flex items-center gap-2 text-gray-400 font-minecraft-ten text-sm">
                <MapPin className="w-4 h-4" />
                Bangalore, Karnataka
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-800 text-center">
            <p className="font-minecraft-ten text-gray-500">
              © 2025 Syntaxia - St. Joseph's University. All rights reserved.
              <br />
              Minecraft is a trademark of Mojang Studios. This site is not affiliated with Mojang or Microsoft.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export { InventorySlot, MCPanel, ExperienceBar, HealthBar };