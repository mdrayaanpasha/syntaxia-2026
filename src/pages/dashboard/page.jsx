import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LogOut, ShieldCheck, Clock, ExternalLink, Cpu, 
  PenTool, Gamepad2, Compass, Zap, Ticket, CheckCircle2, AlertTriangle
} from 'lucide-react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import PremiumNavbar from '../home/components/nav';

// --- CONFIG & MAPS ---
const AVATAR_MAP = {
  1: "https://ik.imagekit.io/yylpuqff5/syntaxia-registrations/pfp-1.jpg",
  2: "https://ik.imagekit.io/yylpuqff5/syntaxia-registrations/pfp-2.jpg",
  3: "https://ik.imagekit.io/yylpuqff5/syntaxia-registrations/pfp-3.jpg",
  4: "https://ik.imagekit.io/yylpuqff5/syntaxia-registrations/pfp-4.jpg"
};

// Fallback images if not provided by backend
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

// Pass Styling Logic
const getPassStyle = (type) => {
  switch (type) {
    case 'BGMI': return { color: 'text-orange-500', border: 'border-orange-500', bg: 'bg-orange-500/10' };
    case 'VALO': return { color: 'text-[#ff4655]', border: 'border-[#ff4655]', bg: 'bg-[#ff4655]/10' };
    case 'NON_GAMING': return { color: 'text-[#55aa55]', border: 'border-[#55aa55]', bg: 'bg-[#55aa55]/10' };
    default: return { color: 'text-gray-500', border: 'border-gray-500', bg: 'bg-gray-500/10' };
  }
};

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
      if (!token) { navigate('/auth'); return; }
      
      // Update URL to your actual backend port
      const response = await axios.get('https://note-taking-server-kappa.vercel.app/api/user/', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setData(response.data.user);
    } catch (err) {
      console.error(err);
      toast.error("SYNC_FAILED");
      if (err.response?.status === 401) navigate('/auth');
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

  // --- CASE A: NO DETAILS (Should rarely happen if registered) ---
  if (!data?.userDetails) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center text-gray-500 font-minecraft">
        <div className="text-center">
          <AlertTriangle size={48} className="mx-auto mb-4 text-yellow-500" />
          <h2 className="text-2xl text-white font-bold mb-2">NO USER DATA FOUND</h2>
          <button onClick={() => navigate('/auth')} className="text-[#55aa55] underline">Initialize Registration</button>
        </div>
      </div>
    );
  }

  // --- CASE B: MAIN DASHBOARD ---
  return (
    <div className="min-h-screen bg-[#080808] text-gray-300 selection:bg-[#55aa55] selection:text-black">
      <PremiumNavbar />
      <Toaster position="top-right" />

      <main className="max-w-6xl mx-auto pt-24 md:pt-32 px-6 pb-20">
        
        {/* 1. PROFILE HEADER */}
        <section className="flex flex-col md:flex-row items-center justify-between gap-8 border-b border-[#1a1a1a] pb-12 mb-12 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative group">
              <img
                src="https://ik.imagekit.io/yylpuqff5/Minecraft/HOMEPAGE/pfp.jpg"
                alt="PFP"
                className="w-24 h-24 rounded-full border-2 border-[#55aa55] p-1 bg-[#111] object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute bottom-0 right-0 w-6 h-6 bg-[#55aa55] rounded-full border-4 border-[#080808] animate-pulse" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white uppercase leading-none font-minecraft tracking-tight">
                {data.userDetails.name}
              </h1>
              <p className="text-[#55aa55] text-[10px] md:text-xs mt-3 tracking-widest uppercase opacity-80 font-bold">
                {data.userDetails.college} <span className="text-gray-700 mx-2">//</span> {data.userDetails.course}
              </p>
            </div>
          </div>

          <div className="flex gap-4 w-full md:w-auto">
            <div className="flex-1 md:flex-none bg-[#0c0c0c] px-8 py-4 border border-[#1a1a1a] rounded-2xl text-center group hover:border-[#55aa55]/30 transition-colors">
              <p className="text-[9px] text-gray-600 uppercase mb-1 font-bold group-hover:text-[#55aa55]">Passes_Active</p>
              <p className="text-2xl font-bold text-white leading-none">{data.passes?.length || 0}</p>
            </div>
            <button 
              onClick={handleLogout} 
              className="bg-red-500/5 border border-red-500/20 text-red-500 px-5 rounded-2xl hover:bg-red-500 hover:text-white transition-all flex items-center justify-center"
            >
              <LogOut size={20} />
            </button>
          </div>
        </section>

        {/* 2. ACCESS PASSES SECTION */}
        {data.passes && data.passes.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center gap-4 mb-6">
              <h2 className="text-[10px] font-bold text-white uppercase tracking-[0.4em] flex items-center gap-2 whitespace-nowrap">
                <Ticket size={14} className="text-[#55aa55]" /> Access Credentials
              </h2>
              <div className="h-[1px] w-full bg-[#1a1a1a]" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.passes.map((pass) => {
                const style = getPassStyle(pass.type);
                return (
                  <div key={pass.passId} className={`relative bg-[#0c0c0c] border ${style.border} p-6 rounded-xl overflow-hidden group hover:-translate-y-1 transition-transform duration-300`}>
                    {/* Background Glow */}
                    <div className={`absolute top-0 right-0 w-32 h-32 ${style.bg} blur-3xl -z-10 rounded-full opacity-20`} />
                    
                    <div className="flex justify-between items-start mb-4">
                      <span className={`text-xl font-black italic tracking-tighter ${style.color}`}>
                        {pass.type.replace('_', ' ')}
                      </span>
                      {pass.status ? (
                        <CheckCircle2 size={20} className={style.color} />
                      ) : (
                        <span className="text-[8px] bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 px-2 py-1 rounded uppercase font-bold">Pending</span>
                      )}
                    </div>

                    <div className="space-y-2 font-mono text-[10px] text-gray-500">
                      <div className="flex justify-between border-b border-[#222] pb-1">
                        <span>PASS ID</span>
                        <span className="text-gray-300">{pass.passId}</span>
                      </div>
                      <div className="flex justify-between border-b border-[#222] pb-1">
                        <span>TXN REF</span>
                        <span className="text-gray-300">{pass.txnId || "N/A"}</span>
                      </div>
                    </div>

                    <div className={`mt-4 h-1 w-full ${style.bg.replace('/10', '')} opacity-50`}></div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* 3. REGISTERED EVENTS SECTION */}
        <section className="space-y-6">
          <div className="flex items-center gap-4">
            <h2 className="text-[10px] font-bold text-[#55aa55] uppercase tracking-[0.4em] flex items-center gap-2 whitespace-nowrap">
              <ShieldCheck size={14} /> Mission Logs
            </h2>
            <div className="h-[1px] w-full bg-[#1a1a1a]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.registeredEvents?.length > 0 ? (
              data.registeredEvents.map((event) => (
                <div key={event.participationId} className="bg-[#0c0c0c] border border-[#1a1a1a] p-5 rounded-2xl flex gap-5 group hover:border-[#55aa55]/50 transition-all cursor-default">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden shrink-0 border border-[#1a1a1a] bg-[#111]">
                    <img 
                      src={EVENT_IMAGE_MAP[event.eventId] || "https://via.placeholder.com/150"}
                      alt="event"
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-center py-1 min-w-0">
                    <h3 className="text-white font-bold uppercase text-base md:text-lg leading-tight truncate font-minecraft">
                      {event.eventName}
                    </h3>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="w-2 h-2 bg-[#55aa55] rounded-full animate-pulse"></span>
                      <span className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">Registered</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              // Empty State
              <div 
                onClick={() => window.location.href='/events'} 
                className="col-span-full py-20 border-2 border-dashed border-[#1a1a1a] rounded-3xl flex flex-col items-center justify-center text-gray-600 hover:text-gray-400 hover:border-[#333] cursor-pointer transition-all group"
              >
                <Compass size={32} className="mb-4 opacity-20 group-hover:rotate-45 transition-transform" />
                <p className="text-[10px] uppercase tracking-widest font-bold">No Active Missions</p>
                <p className="text-[9px] mt-2 text-[#55aa55] uppercase italic underline underline-offset-4">Initialize_Discovery_Mode</p>
              </div>
            )}
          </div>
        </section>

        {/* FOOTER */}
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