import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LogOut, ShieldCheck, Clock, ExternalLink, Cpu, 
  PenTool, Gamepad2, Compass, Zap, Loader2
} from 'lucide-react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import PremiumNavbar from '../home/components/nav';

const AVATAR_MAP = {
  1: "https://ik.imagekit.io/yylpuqff5/syntaxia-registrations/pfp-1.jpg",
  2: "https://ik.imagekit.io/yylpuqff5/syntaxia-registrations/pfp-2.jpg",
  3: "https://ik.imagekit.io/yylpuqff5/syntaxia-registrations/pfp-3.jpg",
  4: "https://ik.imagekit.io/yylpuqff5/syntaxia-registrations/pfp-4.jpg"
};


const EVENT_NAME_MAP = {
  "cmlgm1wy10001wpij8etyb11w": "BGMI",
  "cmlgm1wy10002wpij5m9w4zjl": "LOCK // LOAD",
  "cmlgm1wy10003wpijxnoslqtr": "CTF",
  "cmlgm1wy10005wpijzyma7iiu": "Redstone Run",
  "cmlgm1wy10006wpijo6lm39g3": "DATA DETECTIVE",
  "cmlgm1wy10004wpij622cseeu": "IT QUIZ",
  "cmlgm1wy10007wpijl52gfwxj": "IPL AUCTION",
  "cmlgm1wy10008wpij9wkl7ggo": "ANIME QUIZ",
  "cmlgm1wy10009wpij3ufrl65m": "MINE YOUR WAY OUT",
  "cmlgm1wy1000awpijjbkedi4h": "BUSINESS REVIVAL",
  "cmlgm1wy1000bwpij0508s1t8": "REEL MAKING"
};


const EVENT_IMAGE_MAP = {
  "cmlgm1wy10001wpij8etyb11w": "https://ik.imagekit.io/yylpuqff5/Minecraft/HOMEPAGE/BGMI.png",
  "cmlgm1wy10002wpij5m9w4zjl": "https://ik.imagekit.io/yylpuqff5/Minecraft/HOMEPAGE/fortnite.png",
  "cmlgm1wy10003wpijxnoslqtr": "https://ik.imagekit.io/yylpuqff5/Minecraft/HOMEPAGE/CTF.png",
  "cmlgm1wy10005wpijzyma7iiu": "https://ik.imagekit.io/yylpuqff5/Minecraft/HOMEPAGE/coding-debugging.png",
  "cmlgm1wy10006wpijo6lm39g3": "https://ik.imagekit.io/yylpuqff5/Minecraft/HOMEPAGE/Data-Detective.png",
  "cmlgm1wy10004wpij622cseeu": "https://ik.imagekit.io/yylpuqff5/Minecraft/HOMEPAGE/IT_QUIZ.png",
  "cmlgm1wy10007wpijl52gfwxj": "https://ik.imagekit.io/yylpuqff5/Minecraft/HOMEPAGE/Ipl-Auction.png",
  "cmlgm1wy10008wpij9wkl7ggo": "https://ik.imagekit.io/yylpuqff5/Minecraft/HOMEPAGE/Anime-Quiz.png",
  "cmlgm1wy10009wpij3ufrl65m": "https://ik.imagekit.io/yylpuqff5/Minecraft/HOMEPAGE/Escape-Room.png",
  "cmlgm1wy1000awpijjbkedi4h": "https://ik.imagekit.io/yylpuqff5/Minecraft/HOMEPAGE/Bs-Event.png",
  "cmlgm1wy1000bwpij0508s1t8": "https://ik.imagekit.io/yylpuqff5/Minecraft/HOMEPAGE/Reels-IG.png"
};
// --- Better Skeleton Component ---
const DashboardSkeleton = () => (
  <div className="max-w-6xl mx-auto pt-32 px-6 animate-pulse font-minecraft">
    <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 bg-[#111] rounded-full border-2 border-[#222]" />
        <div className="space-y-2">
          <div className="h-8 w-48 bg-[#111] rounded" />
          <div className="h-3 w-32 bg-[#111] rounded" />
        </div>
      </div>
      <div className="h-16 w-32 bg-[#111] rounded-xl" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {[1, 2, 3, 4].map(i => <div key={i} className="h-32 bg-[#111] rounded-2xl border border-[#222]" />)}
    </div>
  </div>
);

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) { navigate('/login'); return; }
      const response = await axios.get('https://note-taking-server-kappa.vercel.app/api/user/', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setData(response.data.user);
    } catch (err) {
      toast.error("UPLINK_SYNC_FAILED");
      if (err.response?.status === 401) navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  if (loading) return (
    <div className="min-h-screen bg-[#050505]">
      <PremiumNavbar />
      <DashboardSkeleton />
    </div>
  );

  // --- CASE A: SECTOR SELECTION ---
  if (!data?.userDetails) {
    return (
      <div className="min-h-screen bg-[#050505] text-gray-300 font-minecraft">
        <PremiumNavbar />
        <div className="max-w-6xl mx-auto pt-24 md:pt-32 px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-[#55aa55]/30 bg-[#55aa55]/5 text-[#55aa55] text-[10px] rounded mb-6 uppercase">
            <Zap size={12} fill="currentColor" /> System_Ready
          </div>
          <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 leading-none tracking-tighter">
            SELECT <span className="text-[#55aa55]">SECTOR</span>
          </h1>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-12">
            {[
              { id: 'technical', icon: Cpu, label: 'Technical', color: '#55aa55' },
              { id: 'non-tech', icon: PenTool, label: 'Creative', color: '#3b82f6' },
              { id: 'gaming', icon: Gamepad2, label: 'Gaming', color: '#a855f7' }
            ].map(sector => (
              <button 
                key={sector.id} 
                onClick={() => navigate(`/events?sector=${sector.id}`)} 
                className="group bg-[#0c0c0c] border border-[#1a1a1a] p-8 md:p-10 rounded-2xl hover:border-white transition-all flex flex-col items-center"
              >
                <sector.icon className="mb-4 group-hover:scale-110 transition-transform" size={32} style={{ color: sector.color }} />
                <h3 className="text-white text-lg uppercase font-bold">{sector.label}</h3>
              </button>
            ))}
          </div>

          <button onClick={handleLogout} className="mt-16 text-gray-600 hover:text-red-500 text-[10px] flex items-center gap-2 mx-auto uppercase transition-colors">
            <LogOut size={12} /> Log_Out_Session
          </button>
        </div>
      </div>
    );
  }

  // --- CASE B: MAIN DASHBOARD ---
  return (
    <div className="min-h-screen bg-[#080808] text-gray-300  selection:bg-[#55aa55] selection:text-black">
      <PremiumNavbar />
      <Toaster position="top-right" />

      <main className="max-w-6xl mx-auto pt-24 md:pt-32 px-6 pb-20">
        {/* PROFILE HEADER */}
        <section className="flex flex-col md:flex-row items-center justify-between gap-8 border-b border-[#1a1a1a] pb-12 mb-12 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <img
                src={AVATAR_MAP[data.userDetails.avatar] || AVATAR_MAP[1]}
                alt="PFP"
                className="w-24 h-24 rounded-full border-2 border-[#55aa55] p-1 bg-[#111] object-cover"
              />
              <div className="absolute bottom-0 right-0 w-6 h-6 bg-[#55aa55] rounded-full border-4 border-[#080808] animate-pulse" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white uppercase leading-none font-minecraft">{data.userDetails.name}</h1>
              <p className="text-[#55aa55] text-[10px] md:text-xs mt-3 tracking-widest uppercase opacity-80 font-bold">
                {data.userDetails.regno} <span className="text-gray-700 mx-2">//</span> {data.userDetails.college}
              </p>
            </div>
          </div>

          <div className="flex gap-4 w-full md:w-auto">
            <div className="flex-1 md:flex-none bg-[#0c0c0c] px-8 py-4 border border-[#1a1a1a] rounded-2xl text-center">
              <p className="text-[9px] text-gray-600 uppercase mb-1 font-bold">Quests_Active</p>
              <p className="text-2xl font-bold text-white leading-none">{data.participations.length}</p>
            </div>
            <button 
              onClick={handleLogout} 
              className="bg-red-500/5 border border-red-500/20 text-red-500 px-5 rounded-2xl hover:bg-red-500 hover:text-white transition-all flex items-center justify-center"
            >
              <LogOut size={20} />
            </button>
          </div>
        </section>

        {/* ACTIVE PROTOCOLS */}
        <section className="space-y-6">
          <div className="flex items-center gap-4">
            <h2 className="text-[10px] font-bold text-[#55aa55] uppercase tracking-[0.4em] flex items-center gap-2 whitespace-nowrap">
              <ShieldCheck size={14} /> Events Participation
            </h2>
            <div className="h-[1px] w-full bg-[#1a1a1a]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.participations.map((event) => (
              <div key={event.participationId} className="bg-[#0c0c0c] border border-[#1a1a1a] p-5 rounded-2xl flex gap-5 group hover:border-[#55aa55]/50 transition-all cursor-default">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden shrink-0 border border-[#1a1a1a] bg-[#111]">
                  <img 
                    src={IMAGE_MAP[event.eventId]}
                    alt="event"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between py-1 min-w-0">
                  <div>
                    <h3 className="text-white font-bold uppercase text-base md:text-lg leading-tight truncate font-minecraft">
                      {EVENT_NAME_MAP[event.eventId] || "Unknown_Event"}
                    </h3>
                    <div className="inline-block mt-2">
                      <span className={`text-[8px] px-2 py-0.5 rounded uppercase font-bold border ${
                        event.status === 'approved' 
                          ? 'border-[#55aa55]/30 bg-[#55aa55]/10 text-[#55aa55]' 
                          : 'border-yellow-500/30 bg-yellow-500/10 text-yellow-500'
                      }`}>
                        {event.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-[10px] text-gray-600 flex items-center gap-1 font-bold">
                      <Clock size={10} /> {new Date(event.createdAt).toLocaleDateString()}
                    </span>
                    <button className="text-gray-500 hover:text-[#55aa55] transition-colors">
                      <ExternalLink size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {data.participations.length === 0 && (
              <div 
                onClick={() => navigate('/events')} 
                className="col-span-full py-20 border-2 border-dashed border-[#1a1a1a] rounded-3xl flex flex-col items-center justify-center text-gray-600 hover:text-gray-400 hover:border-[#333] cursor-pointer transition-all group"
              >
                <Compass size={32} className="mb-4 opacity-20 group-hover:rotate-45 transition-transform" />
                <p className="text-[10px] uppercase tracking-widest font-bold">No Active Protocols Found</p>
                <p className="text-[9px] mt-2 text-[#55aa55] uppercase italic underline underline-offset-4">Initialize_Discovery_Mode</p>
              </div>
            )}
          </div>
        </section>

        <footer className="mt-32 text-center border-t border-[#1a1a1a] pt-8">
          <p className="text-[9px] text-gray-700 uppercase tracking-[0.5em] font-bold italic">
            Syntaxia_Core_v2.0 <span className="text-gray-800 mx-2">//</span> Protected_Uplink_Established
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Dashboard;