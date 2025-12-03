import React from 'react';
import { Home, Terminal, Users, MapPin, Cpu, Code, Sword, Calendar, Trophy } from 'lucide-react';
// Assuming you have these components defined elsewhere based on your previous code
import { InventorySlot, MCPanel, ExperienceBar, HealthBar } from './home'; // Replace with actual path

const AboutSection = () => {
  // Image placeholders - replace URLs with your actual images
  const sjuImage = "https://ik.imagekit.io/yylpuqff5/Minecraft/SJU.webp";
  const csDeptImage = "https://ik.imagekit.io/yylpuqff5/Minecraft/dept-of-cs.webp";
  const cyberneticsImage = "https://ik.imagekit.io/yylpuqff5/Minecraft/core-team.jpg";

  return (
    /* Changed background from wood-planks to a darker stone/deepslate texture feel */
    <section id="about" className="bg-[#1a1a1a] py-20 px-4 relative">
      {/* Optional: subtle texture overlay if you have one defined in tailwind config */}
       <div className="absolute inset-0 pointer-events-none opacity-20 bg-[url('/textures/deepslate.png')] bg-repeat z-0"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <div className="inline-block bg-black/80 border-4 border-gray-700 p-2 mb-6 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
            <h2 className="text-4xl md:text-5xl font-minecraft text-white mc-text-shadow px-4 py-2">
              SERVER INFO & GUILDS
            </h2>
          </div>
          
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* PANEL 1: SJU */}
          <MCPanel title="St. Joseph's University" gradient={true}>
            <div className="space-y-4">
              {/* Image Slot */}
              <img src={sjuImage} alt="SJU Campus" className="w-full h-40 object-cover border-4 border-gray-800 mb-4 rounded-sm" />
              
              <div className="flex items-center gap-3 mb-2">
                <MapPin className="w-5 h-5 text-red-500" />
                <h3 className="font-minecraft-ten text-xl text-gray-900">The Main Hub</h3>
              </div>
              <p className="font-minecraft-ten text-base text-gray-800 leading-relaxed">
                Established in server tick 1882 by Jesuit admins. This legendary fortress in Bengaluru has ground through levels to achieve full 'University' status in 2022, unlocked by the Head of State. It is the ultimate spawn point for crafting futures.
              </p>
              {/* Experience bar showing long legacy (140+ years) */}
              <ExperienceBar level={142} progress={0.95} />
            </div>
          </MCPanel>

          {/* PANEL 2: CS DEPARTMENT */}
          <MCPanel title="Dept. of Computer Science" gradient={true}>
            <div className="space-y-4">
               {/* Image Slot */}
               <img src={csDeptImage} alt="CS Department" className="w-full h-40 object-cover border-4 border-gray-800 mb-4 rounded-sm" />

              <div className="flex items-center gap-3 mb-2">
                <Terminal className="w-5 h-5 text-green-600" />
                <h3 className="font-minecraft-ten text-xl text-gray-900">Redstone Engineers</h3>
              </div>
              <p className="font-minecraft-ten text-base text-gray-800 leading-relaxed">
                The enchanting table for logic and code. We offer high-tier loot like BCA & M.Sc., focusing on ethical crafting and industry meta. Our guild masters guide players through complex research quests to prepare them for the boss level: Career Mode.
              </p>
               {/* Health bar showing vitality and challenge */}
              <HealthBar hearts={10} maxHearts={10} />
            </div>
          </MCPanel>

          {/* PANEL 3: CYBERNETICS ASSOCIATION */}
          <MCPanel title="Cybernetics Guild" gradient={true}>
            <div className="space-y-4">
               {/* Image Slot */}
               <img src={cyberneticsImage} alt="Cybernetics Association" className="w-full h-40 object-cover border-4 border-gray-800 mb-4 rounded-sm bg-black" />

              <div className="flex items-center gap-3 mb-2">
                <Cpu className="w-5 h-5 text-blue-600" />
                <h3 className="font-minecraft-ten text-xl text-gray-900">Event Hosts</h3>
              </div>
              <p className="font-minecraft-ten text-base text-gray-800 leading-relaxed">
                The elite student faction hosting this "Syntaxia" server event. We organize raids, build battles, and knowledge transfers to level up the entire community. Join our ranks to dominate the leaderboards.
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="px-2 py-1 bg-blue-200 border-2 border-blue-400 font-minecraft-ten text-blue-900 text-xs rounded-sm">#Hosts</span>
                <span className="px-2 py-1 bg-purple-200 border-2 border-purple-400 font-minecraft-ten text-purple-900 text-xs rounded-sm">#Community</span>
                <span className="px-2 py-1 bg-red-200 border-2 border-red-400 font-minecraft-ten text-red-900 text-xs rounded-sm">#Events</span>
              </div>
            </div>
          </MCPanel>
        </div>

  
      </div>
    </section>
  );
};

export default AboutSection;