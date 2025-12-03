import React from 'react';
import { 
  Code, Terminal, Flag, Brain, FileText, // Tech
  Gavel, Timer, Lock, Camera, Map, // Non-Tech
  Crosshair, Smartphone
} from 'lucide-react';

// --- THE RETRO CARD COMPONENT (Unchanged from previous version) ---
const RetroCard = ({ event }) => {
  const categoryConfig = {
    SURVIVAL: { color: 'text-[#00AA00]', bg: 'bg-[#00AA00]', label: 'TECH' },      // Green
    CREATIVE: { color: 'text-[#FFAA00]', bg: 'bg-[#FFAA00]', label: 'NON-TECH' },  // Gold
    HARDCORE: { color: 'text-[#FF5555]', bg: 'bg-[#FF5555]', label: 'GAMING' }     // Red
  };

  const style = categoryConfig[event.category];

  return (
    <div className="bg-[#C6C6C6] border-2 border-b-[#555] border-r-[#555] border-t-white border-l-white p-1 h-full flex flex-col relative group hover:-translate-y-1 transition-transform duration-100 shadow-[4px_4px_0_0_rgba(0,0,0,0.3)]">
      {/* Header Bar */}
      <div className="bg-[#2a2a2a] border-b-2 border-white/20 p-2 mb-2 flex justify-between items-center">
        <h3 className="font-minecraft text-white text-lg leading-none pt-1">{event.title}</h3>
        <span className={`font-minecraft-ten text-xs px-1.5 py-0.5 ${style.color} bg-black/40 rounded-sm`}>
          {style.label}
        </span>
      </div>

      <div className="px-2 pb-2 flex-1 flex flex-col">
        {/* Content Row */}
        <div className="flex gap-3 mb-3">
          <div className="w-14 h-14 min-w-[3.5rem] bg-[#8B8B8B] border-2 border-b-white border-r-white border-t-[#373737] border-l-[#373737] flex items-center justify-center relative">
            <event.icon className={`w-8 h-8 text-[#333] relative z-10`} />
            <div className={`absolute inset-0 ${style.bg} opacity-20`}></div>
          </div>
          <div className="flex flex-col justify-center">
            <h4 className="font-minecraft-ten text-xs text-[#555] mb-1 uppercase">{event.type}</h4>
            <p className="font-minecraft text-xs text-[#333] leading-snug">{event.desc}</p>
          </div>
        </div>

        {/* Divider */}
        <div className="h-0.5 bg-[#8B8B8B] border-b border-white mb-3"></div>

        {/* Footer Stats */}
        <div className="mt-auto space-y-1">
          <div className="flex justify-between items-center">
            <span className="font-minecraft-ten text-xs text-[#555]">LOOT:</span>
            <span className="font-minecraft-ten text-xs text-[#AA00AA]">{event.loot}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-minecraft-ten text-xs text-[#555]">XP:</span>
            <span className="font-minecraft-ten text-xs text-[#00AA00]">{event.xp}</span>
          </div>
        </div>

        {/* Button */}
        <button className="mt-3 w-full bg-[#7c7c7c] text-white font-minecraft-ten text-sm py-2 border-2 border-b-[#555] border-r-[#555] border-t-white border-l-white active:border-t-[#555] active:border-l-[#555] active:border-b-white active:border-r-white active:bg-[#666]">
          /QUEST JOIN
        </button>
      </div>
    </div>
  );
};

// --- HELPER: Section Header Component (Wooden Sign Style) ---
const QuestHeader = ({ title, colorBg, colorText }) => (
  <div className="mb-8 flex items-center relative">
     {/* Wooden plank background look */}
    <div className="bg-[#6d4e2e] border-4 border-[#4a3218] flex-grow h-4 relative">
       <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'linear-gradient(90deg, #5d4026 2px, transparent 2px)', backgroundSize: '10px 10px' }}></div>
    </div>
    <div className={`mx-4 bg-[#1a1a1a] border-4 border-[#555] p-1 shadow-[4px_4px_0_0_rgba(0,0,0,0.5)] relative z-10 -rotate-2`}>
      <h3 className={`text-2xl md:text-3xl font-minecraft ${colorText} mc-text-shadow px-6 py-2 border-2 border-[#333] ${colorBg}`}>
        {title}
      </h3>
    </div>
    <div className="bg-[#6d4e2e] border-4 border-[#4a3218] flex-grow h-4 relative">
       <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'linear-gradient(90deg, #5d4026 2px, transparent 2px)', backgroundSize: '10px 10px' }}></div>
    </div>
  </div>
);


// --- MAIN SECTION COMPONENT ---
const EventsSection = () => {
  // Full Dataset
  const allQuests = [
    // TECH
    { id: 1, title: "Bug Slayers", category: "SURVIVAL", type: "Coding & Debugging", icon: Code, desc: "Patch legacy glitches before crash.", loot: "Netherite Hoe", xp: "500 XP" },
    { id: 2, title: "AI Whisperer", category: "SURVIVAL", type: "Prompt Engineering", icon: Terminal, desc: "Enchant AI golems for output.", loot: "Enchanted Book", xp: "450 XP" },
    { id: 3, title: "Capture Flag", category: "SURVIVAL", type: "CTF / Hacking", icon: Flag, desc: "Infiltrate fortress, steal banner.", loot: "Spyglass", xp: "600 XP" },
    { id: 4, title: "Tech Trivia", category: "SURVIVAL", type: "IT Quiz", icon: Brain, desc: "Battle of wits. Craft answers.", loot: "Knowledge Book", xp: "300 XP" },
    { id: 5, title: "Scroll Scribe", category: "SURVIVAL", type: "Paper Presentation", icon: FileText, desc: "Present research to Council.", loot: "Empty Map", xp: "400 XP" },
    // NON-TECH
    { id: 6, title: "IPL Auction", category: "CREATIVE", type: "Villager Trading", icon: Gavel, desc: "Bid emeralds for best guild.", loot: "Totem", xp: "1000 XP" },
    { id: 7, title: "Speed Run", category: "CREATIVE", type: "Minute to Win It", icon: Timer, desc: "Complete mini-games fast.", loot: "Swiftness Potion", xp: "200 XP" },
    { id: 8, title: "The Escape", category: "CREATIVE", type: "Escape Room", icon: Lock, desc: "Solve redstone puzzles.", loot: "Iron Key", xp: "500 XP" },
    { id: 9, title: "Shutterbug", category: "CREATIVE", type: "Photography", icon: Camera, desc: "Capture shader moments.", loot: "Painting", xp: "350 XP" },
    { id: 10, title: "Gold Rush", category: "CREATIVE", type: "Treasure Hunt", icon: Map, desc: "Find buried chest coordinates.", loot: "Buried Treasure", xp: "600 XP" },
    // GAMING
    { id: 11, title: "Valorant", category: "HARDCORE", type: "5v5 Tac-Shooter", icon: Crosshair, desc: "Plant the Spike. Defend site.", loot: "Diamond Sword", xp: "MAX XP" },
    { id: 12, title: "BGMI", category: "HARDCORE", type: "Battle Royale", icon: Smartphone, desc: "Last squad standing wins.", loot: "Chicken Dinner", xp: "MAX XP" }
  ];

  // Filter data into categories
  const techQuests = allQuests.filter(q => q.category === 'SURVIVAL');
  const nonTechQuests = allQuests.filter(q => q.category === 'CREATIVE');
  const gamingQuests = allQuests.filter(q => q.category === 'HARDCORE');

  return (
    <section id="events" className="py-20 px-4 border-y-4 border-[#222] relative">
      
      {/* NEW Background Pattern: Dark Deepslate Tile (CSS only) */}
      <div className="absolute inset-0 bg-[#1a1a1a] z-0">
        <div className="absolute inset-0 opacity-[0.15]" style={{ 
            backgroundImage: `
              linear-gradient(335deg, #333 23px, transparent 23px),
              linear-gradient(155deg, #444 23px, transparent 23px),
              linear-gradient(335deg, #333 23px, transparent 23px),
              linear-gradient(155deg, #444 23px, transparent 23px)
            `,
            backgroundSize: '58px 58px',
            backgroundPosition: '0px 2px, 4px 35px, 29px 31px, 34px 6px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Main Title - Bedrock Style */}
        <div className="text-center mb-20">
          <div className="inline-block bg-[#1a1a1a] border-4 border-[#555] p-2 shadow-[6px_6px_0_0_rgba(0,0,0,0.5)]">
            <h2 className="text-4xl md:text-6xl font-minecraft text-white mc-text-shadow px-8 py-4 border-2 border-[#333] bg-[#2a2a2a]">
              QUEST BOARD
            </h2>
          </div>
          <p className="font-minecraft-ten text-xl text-[#aaa] mt-6 mc-text-shadow">
            Choose your path. Claim your destiny.
          </p>
        </div>

        {/* --- SECTION 1: TECHNICAL --- */}
        <div className="mb-24">
          <QuestHeader title="SURVIVAL MODE (TECH)" colorText="text-[#55FF55]" colorBg="bg-[#003300]" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {techQuests.map((quest) => <RetroCard key={quest.id} event={quest} />)}
          </div>
        </div>

        {/* --- SECTION 2: NON-TECHNICAL --- */}
        <div className="mb-24">
          <QuestHeader title="CREATIVE MODE (NON-TECH)" colorText="text-[#FFFF55]" colorBg="bg-[#333300]" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {nonTechQuests.map((quest) => <RetroCard key={quest.id} event={quest} />)}
          </div>
        </div>

         {/* --- SECTION 3: GAMING --- */}
        <div className="mb-12">
          <QuestHeader title="HARDCORE MODE (GAMING)" colorText="text-[#FF5555]" colorBg="bg-[#330000]" />
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {gamingQuests.map((quest) => <RetroCard key={quest.id} event={quest} />)}
          </div>
        </div>

      </div>
    </section>
  );
};

export default EventsSection;