import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Clock, ChevronRight, Filter } from 'lucide-react';
import PremiumNavbar from '../home/components/nav';
import data from "../../data.json";

const SchedulePage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState("All");

  // Group events by Day for a continuous scroll feel
  const groupedQuests = useMemo(() => {
    const categories = ["28 February", "DAY 1", "DAY 2"];
    return categories.map(day => ({
      day,
      events: data.quests
        .filter(q => q.day === day)
        .filter(q => q.title.toLowerCase().includes(search.toLowerCase()))
        .filter(q => activeCat === "All" || q.cat === activeCat)
        .sort((a, b) => a.slot.localeCompare(b.slot)) // Simple chronological sort
    }));
  }, [search, activeCat]);

  return (
    <div className="min-h-screen bg-[#030303] font-minecraft text-white selection:bg-[#55aa55] selection:text-black">
      <PremiumNavbar />

      <div className="max-w-5xl mx-auto px-6 pt-32 pb-20">
        {/* SIMPLE SEARCH & FILTER */}
        <div className="sticky top-20 z-50 bg-[#030303]/80 backdrop-blur-md p-4 border border-white/10 mb-12 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              type="text" 
              placeholder="Search event name..." 
              className="w-full bg-white/5 border border-white/10 py-3 pl-12 pr-4 rounded-none focus:border-[#55aa55] outline-none"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            {["All", "Technical", "Non-Technical", "Gaming"].map(c => (
              <button 
                key={c}
                onClick={() => setActiveCat(c)}
                className={`px-4 py-2 text-[10px] uppercase font-bold border ${activeCat === c ? 'bg-[#55aa55] border-[#55aa55] text-black' : 'border-white/10 text-gray-400'}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* THE FEED */}
        {groupedQuests.map((group) => (
          group.events.length > 0 && (
            <div key={group.day} className="mb-16">
              <h2 className="text-[#ffcc00] text-xl font-black italic uppercase mb-6 flex items-center gap-4">
                <span>{group.day}</span>
                <div className="h-[1px] flex-1 bg-white/10"></div>
              </h2>

              <div className="grid gap-3">
                {group.events.map((event) => (
                  <div 
                    key={event.id}
                    onClick={() => window.location.href=`/event-details?id=${event.dbId}`}
                    className="group flex flex-col md:flex-row items-stretch bg-[#0a0a0a] border border-white/5 hover:border-white/20 transition-all cursor-pointer"
                  >
                    {/* COLOR TAG */}
                    <div className="w-2" style={{ backgroundColor: event.accent }}></div>
                    
                    {/* TIME */}
                    <div className="p-6 md:w-40 bg-white/[0.02] flex flex-col justify-center">
                      <div className="flex items-center gap-2 text-[#55aa55] mb-1">
                        <Clock size={12} />
                        <span className="text-[10px] font-mono">{event.slot.split(' - ')[0]}</span>
                      </div>
                      <span className="text-[10px] text-gray-600 font-mono uppercase">Start Time</span>
                    </div>

                    {/* MAIN INFO */}
                    <div className="flex-1 p-6 flex flex-col md:flex-row justify-between md:items-center gap-4">
                      <div>
                        <h3 className="text-2xl font-black uppercase tracking-tighter group-hover:text-[#ffcc00] transition-colors">
                          {event.title}
                        </h3>
                        <div className="flex items-center gap-4 mt-1 text-gray-500 text-[10px] uppercase font-mono">
                          <span className="flex items-center gap-1"><MapPin size={10} /> {event.venue}</span>
                          <span style={{ color: event.accent }}>• {event.cat}</span>
                        </div>
                      </div>
                      <ChevronRight size={20} className="text-gray-800 group-hover:text-white group-hover:translate-x-1 transition-all" />
                    </div>


                  </div>
                ))}
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default SchedulePage;