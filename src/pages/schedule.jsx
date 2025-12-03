import React, { useState } from 'react';
import { Clock, MapPin, Sword, Coffee, Trophy, Terminal, Camera, Gavel, Radio } from 'lucide-react';

// Reusing MCButton if you have it, or a standard button placeholder
// import { MCButton } from './YourComponentPath'; 

const ScheduleSection = () => {
  const [activeDay, setActiveDay] = useState(1);

  const scheduleData = {
    day1: [
      { time: "10:00 AM", title: "Server Spawn & Inauguration", type: "Ceremony", location: "Main Auditorium", icon: Radio, color: "text-white" },
      { time: "10:30 AM", title: "CodeCraft: Hackathon Begins", type: "Tech", location: "CS Labs (Block A)", icon: Terminal, color: "text-green-400" },
      { time: "11:00 AM", title: "Tech Triviador (Prelims)", type: "Tech", location: "Seminar Hall 1", icon: Terminal, color: "text-green-400" },
      { time: "01:00 PM", title: "Hunger Refill (Lunch)", type: "Break", location: "Cafeteria Biome", icon: Coffee, color: "text-orange-400" },
      { time: "02:00 PM", title: "Shutterbug (Photography)", type: "Non-Tech", location: "Campus Roam", icon: Camera, color: "text-yellow-400" },
      { time: "02:30 PM", title: "Valorant (Qualifiers)", type: "Gaming", location: "Gaming Den", icon: Sword, color: "text-red-400" },
      { time: "04:00 PM", title: "Day 1 Server Save", type: "End", location: "Lobby", icon: Clock, color: "text-gray-400" }
    ],
    day2: [
      { time: "10:00 AM", title: "IPL Auction (Bidding Wars)", type: "Non-Tech", location: "Seminar Hall 2", icon: Gavel, color: "text-yellow-400" },
      { time: "11:00 AM", title: "Scroll Scribe (Paper Pres)", type: "Tech", location: "Conference Room", icon: Terminal, color: "text-green-400" },
      { time: "01:00 PM", title: "Hunger Refill (Lunch)", type: "Break", location: "Cafeteria Biome", icon: Coffee, color: "text-orange-400" },
      { time: "02:00 PM", title: "CodeCraft: Submission", type: "Tech", location: "CS Labs", icon: Terminal, color: "text-green-400" },
      { time: "02:30 PM", title: "BGMI / Valorant Finals", type: "Gaming", location: "Main Auditorium", icon: Sword, color: "text-red-400" },
      { time: "03:30 PM", title: "Valedictory & Loot Drop", type: "Ceremony", location: "Main Stage", icon: Trophy, color: "text-purple-400" },
      { time: "04:00 PM", title: "Server Shutdown", type: "End", location: "Offline", icon: Clock, color: "text-gray-400" }
    ]
  };

  const currentSchedule = activeDay === 1 ? scheduleData.day1 : scheduleData.day2;

  return (
    <section id="schedule" className="py-20 px-4 relative bg-[#0a0a0a] border-y-4 border-[#333]">
      {/* Background Texture (End Stone / Void) */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#2a2a2a 2px, transparent 2px)', backgroundSize: '30px 30px' }}>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-[#1a1a1a] border-4 border-[#555] p-2 shadow-[4px_4px_0_0_rgba(0,0,0,0.5)]">
            <h2 className="text-4xl md:text-5xl font-minecraft text-white px-6 py-2 border-2 border-[#333] bg-[#222]">
              SERVER TIMELINE
            </h2>
          </div>
        </div>

        {/* Day Toggle Buttons */}
        <div className="flex justify-center gap-6 mb-12">
          {[1, 2].map((day) => (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={`
                relative px-8 py-4 font-minecraft text-xl border-4 transition-all duration-200
                ${activeDay === day 
                  ? 'bg-[#333] border-white text-yellow-400 translate-y-1 shadow-none' 
                  : 'bg-[#1a1a1a] border-[#555] text-gray-500 hover:bg-[#252525] -translate-y-1 shadow-[0_6px_0_#000]'
                }
              `}
            >
              DAY 0{day}
            </button>
          ))}
        </div>

        {/* Timeline Container */}
        <div className="bg-[#111] border-4 border-[#333] p-6 md:p-8 rounded-sm relative">
          
          {/* Decorative "Server Log" Header */}
          <div className="font-mono text-xs text-gray-500 mb-6 border-b border-[#333] pb-2 flex justify-between">
            <span>root@syntaxia:~/schedule/day_{activeDay}.log</span>
            <span>-- -- --</span>
          </div>

          <div className="space-y-4">
            {currentSchedule.map((item, idx) => (
              <div key={idx} className="group relative pl-4 md:pl-0">
                
                {/* Connector Line (Desktop) */}
                <div className="hidden md:block absolute left-[148px] top-0 bottom-0 w-0.5 bg-[#333] group-last:bottom-auto group-last:h-1/2"></div>
                
                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                  
                  {/* Time Stamp */}
                  <div className="w-32 flex-shrink-0 text-right hidden md:block">
                    <span className="font-minecraft-ten text-xl text-gray-400 group-hover:text-white transition-colors">
                      {item.time}
                    </span>
                  </div>

                  {/* Mobile Time Stamp */}
                  <div className="md:hidden font-minecraft-ten text-gray-400 mb-1">
                    {item.time}
                  </div>

                  {/* The Timeline Dot */}
                  <div className={`
                    absolute left-0 md:static w-3 h-3 md:w-4 md:h-4 rounded-none transform rotate-45 border-2 border-black
                    ${item.type === 'Break' ? 'bg-orange-500' : 
                      item.type === 'End' ? 'bg-gray-600' : 
                      item.type === 'Gaming' ? 'bg-red-500' : 'bg-green-500'}
                    z-10 mt-1.5 md:mt-0
                  `}></div>

                  {/* Event Card */}
                  <div className="flex-1 bg-[#1a1a1a] border-2 border-[#333] p-3 hover:border-gray-500 hover:bg-[#222] transition-all duration-200 group-hover:translate-x-1">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h4 className={`font-minecraft text-lg md:text-xl ${item.color} mb-1`}>
                          {item.title}
                        </h4>
                        <div className="flex items-center gap-2 text-gray-500 font-minecraft-ten text-sm">
                          <MapPin size={12} />
                          {item.location}
                        </div>
                      </div>
                      
                      {/* Icon Box */}
                      <div className="hidden sm:flex items-center justify-center w-10 h-10 bg-[#000] border border-[#333]">
                        <item.icon size={20} className={item.color.replace('text-', 'text-opacity-80 text-')} />
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
          
          {/* Decorative "End of Log" */}
          <div className="mt-8 font-mono text-xs text-gray-600 animate-pulse">
            _ cursor waiting...
          </div>

        </div>
      </div>
    </section>
  );
};

export default ScheduleSection;