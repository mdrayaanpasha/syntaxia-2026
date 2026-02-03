import React from 'react';
import { Crown, UserCog, Mail, Instagram, ShieldCheck } from 'lucide-react';

const TeamSection = () => {
  const teamData = [
    { name: "Monisha S", role: "President", emoji: "👑", cat: "Core" },
    { name: "Tushar Tiwari", role: "Vice President", emoji: "⚡", cat: "Core" },
    { name: "Sodagum Venkata Kaushik", role: "General Secretary", emoji: "📋", cat: "Core" },
    { name: "Aniketh B", role: "General Secretary", emoji: "🧠", cat: "Core" },
    { name: "Gopika", role: "General Secretary", emoji: "✨", cat: "Core" },
    { name: "Shashwat Kumar Jha", role: "Treasurer", emoji: "💎", cat: "Core" },
    { name: "Simra Fatima", role: "Head of Operations", emoji: "⚙️", cat: "HOD" },
    { name: "Abinav Shukla", role: "Head of Operations", emoji: "🔨", cat: "HOD" },
    { name: "Aashika Menon", role: "Head of PR & Marketing", emoji: "📣", cat: "HOD" },
    { name: "Anandita Malik", role: "Head of Graphic Design", emoji: "🎨", cat: "HOD" },
    { name: "Renu Thomas", role: "Head of IT", emoji: "💻", cat: "HOD" },
    { name: "Mohammad Ryan Pasha", role: "Head of IT", emoji: "🚀", cat: "HOD" },
    { name: "Abel Philip", role: "Head of Social Media", emoji: "📱", cat: "HOD" },
    { name: "Aqeel", role: "Head of Logistics", emoji: "📦", cat: "HOD" },
    { name: "Anitha Patel", role: "Head of Documentation", emoji: "📝", cat: "HOD" },
    { name: "Allendon X Bernard", role: "Head of Art & Decor", emoji: "🖌️", cat: "HOD" },
  ];

  const coreTeam = teamData.filter(m => m.cat === "Core");
  const hodTeam = teamData.filter(m => m.cat === "HOD");

  return (
    <section id="team" className="relative py-24 px-6 bg-[#0a0a0a] font-minecraft">
      <div className="max-w-7xl mx-auto">
        
        {/* SECTION HEADER */}
        <div className="text-center mb-24">
          <div className="flex items-center justify-center gap-2 mb-4 text-[#ffcc00] animate-pulse">
            <Crown size={18} />
            <span className="tracking-[0.4em] text-[10px] uppercase">/permissions list_staff</span>
          </div>
          <h2 className="text-5xl md:text-7xl text-white tracking-tight [text-shadow:4px_4px_0px_#373737]">
            SERVER <span className="text-[#55aa55]">STAFF</span>
          </h2>
        </div>

        {/* CORE COMMITTEE */}
        <div className="mb-24">
          <div className="flex items-center gap-3 mb-10 border-l-4 border-[#ffcc00] pl-4">
             <h3 className="text-white text-xl tracking-widest [text-shadow:2px_2px_0px_#000]">CORE_COMMITTEE</h3>
             <div className="flex-1 h-[1px] bg-white/10"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreTeam.map((member, idx) => (
              <AdminCard key={idx} member={member} color="#ffcc00" />
            ))}
          </div>
        </div>

        {/* HODs - SAME SIZE GRID */}
        <div>
          <div className="flex items-center gap-3 mb-10 border-l-4 border-[#55aa55] pl-4">
             <h3 className="text-white text-xl tracking-widest [text-shadow:2px_2px_0px_#000]">DEPT_HEADS</h3>
             <div className="flex-1 h-[1px] bg-white/10"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hodTeam.map((member, idx) => (
              <AdminCard key={idx} member={member} color="#55aa55" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const AdminCard = ({ member, color }) => (
  <div className="relative group">
    {/* Background Obsidian Slab */}
    <div className="relative bg-[#1a1a1a] border-x-[3px] border-b-[6px] border-black p-8 transition-all group-hover:-translate-y-2 group-hover:bg-[#222]">
      {/* Colored Bevel Top */}
      <div className="h-[4px] absolute top-0 left-0 w-full" style={{ backgroundColor: color }}></div>
      
      <div className="flex items-center gap-6">
        {/* Pixel Icon Slot */}
        <div className="w-16 h-16 bg-black/60 border-2 border-white/5 flex items-center justify-center text-3xl shadow-inner group-hover:border-white/20 transition-colors">
          {member.emoji}
        </div>
        
        {/* Name & Role */}
        <div className="flex-1 min-w-0">
          <h4 className="text-white text-xl [text-shadow:2px_2px_0px_#000] uppercase truncate">
            {member.name}
          </h4>
          <p className="text-[10px] tracking-widest uppercase mt-1" style={{ color: color }}>
            {member.role}
          </p>
          
          {/* Social Links (Premium Reveal) */}
          <div className="flex gap-3 mt-3 opacity-0 group-hover:opacity-60 transition-opacity">
            <Instagram size={14} className="text-white cursor-pointer hover:text-[#ffcc00]" />
            <Mail size={14} className="text-white cursor-pointer hover:text-[#ffcc00]" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default TeamSection;