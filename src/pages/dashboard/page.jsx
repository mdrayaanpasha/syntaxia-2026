import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Terminal, LogOut, Mail, ShieldCheck, Clock, 
  ExternalLink, LayoutDashboard, Cpu, PenTool, 
  Gamepad2, Compass, ChevronRight, Zap
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
    toast.success("SESSION_TERMINATED");
    navigate('/');
  };

  if (loading) return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center text-[#55aa55] font-mono tracking-widest text-xs">
      <div className="flex flex-col items-center gap-4">
        <Terminal className="animate-bounce" />
        <span className="animate-pulse">SYNCHRONIZING_NEURAL_LINK...</span>
      </div>
    </div>
  );

  // --- CASE A: DISCOVERY MODE (For users with userDetails: null) ---
  if (!data?.userDetails) {
    return (
      <div className="min-h-screen bg-[#050505] text-gray-300 flex flex-col font-sans selection:bg-[#55aa55] selection:text-black">
        <PremiumNavbar />
        <Toaster position="top-center" />
        
        <div className="flex-1 flex flex-col items-center justify-center p-6 mt-16">
          {/* RECRUITMENT INTERFACE */}
          <div className="max-w-5xl w-full flex flex-col items-center text-center">
            <div className="mb-6 flex items-center gap-2 text-[#55aa55] font-mono text-[10px] tracking-[0.4em] uppercase">
              <Zap size={14} className="animate-pulse" /> Access_Granted
            </div>

            <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter italic uppercase leading-none mb-4">
              CHOOSE YOUR <br /> <span className="text-[#55aa55]">DESTINATION</span>
            </h1>
            
            <p className="text-gray-500 font-mono text-sm max-w-xl mx-auto mb-6 leading-relaxed">
              Operative <span className="text-gray-300">{data.userEmail}</span>, the Syntaxia grid is live. 
              Explore the available sectors below to begin your journey.
            </p>

            {/* SECTOR CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full border-t border-[#111] pt-16">
              <div className="group cursor-pointer" onClick={() => navigate('/events?sector=technical')}>
                 <div className="bg-[#0a0a0a] border border-[#222] p-8 rounded-3xl group-hover:border-[#55aa55] group-hover:-translate-y-2 transition-all">
                    <Cpu className="text-[#55aa55] mb-6 group-hover:scale-110 transition-transform" size={40} />
                    <h3 className="text-white font-black text-xl mb-2 uppercase tracking-tight">Technical</h3>
                    <p className="text-xs text-gray-500 leading-relaxed font-mono">Code, Crack, and Conquer challenges.</p>
                 </div>
              </div>

              <div className="group cursor-pointer" onClick={() => navigate('/events?sector=creative')}>
                 <div className="bg-[#0a0a0a] border border-[#222] p-8 rounded-3xl group-hover:border-blue-500 group-hover:-translate-y-2 transition-all">
                    <PenTool className="text-blue-500 mb-6 group-hover:scale-110 transition-transform" size={40} />
                    <h3 className="text-white font-black text-xl mb-2 uppercase tracking-tight">Non-Tech</h3>
                    <p className="text-xs text-gray-500 leading-relaxed font-mono">Design, Pitch, and Strategize intel.</p>
                 </div>
              </div>

              <div className="group cursor-pointer" onClick={() => navigate('/events?sector=gaming')}>
                 <div className="bg-[#0a0a0a] border border-[#222] p-8 rounded-3xl group-hover:border-purple-500 group-hover:-translate-y-2 transition-all">
                    <Gamepad2 className="text-purple-500 mb-6 group-hover:scale-110 transition-transform" size={40} />
                    <h3 className="text-white font-black text-xl mb-2 uppercase tracking-tight">Gaming</h3>
                    <p className="text-xs text-gray-500 leading-relaxed font-mono">eSports and Tactical Simulator combat.</p>
                 </div>
              </div>
            </div>
            
            <button onClick={handleLogout} className="mt-16 text-gray-700 hover:text-red-500 transition-colors font-mono text-[10px] tracking-widest uppercase flex items-center gap-2">
              <LogOut size={12} /> Abort_Connection
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- CASE B: COMMAND CENTER (Initialized Users) ---
  return (
    <div className="min-h-screen bg-[#050505] text-gray-300 font-sans selection:bg-[#55aa55] selection:text-black">
      <PremiumNavbar />
      <Toaster position="top-center" />
      
      {/* SIDEBAR NAVIGATION (Adjusted top to account for Navbar) */}
      <nav className="fixed left-0 top-20 h-[calc(100vh-5rem)] w-20 border-r border-[#222] bg-[#0a0a0a] flex flex-col items-center py-8 gap-8 z-20">
        <div className="text-[#55aa55] p-3 border border-[#55aa55]/30 rounded-lg bg-[#55aa55]/5">
          <LayoutDashboard size={24} />
        </div>
        <button onClick={() => window.location.href = 'mailto:support@syntaxia.io'} className="hover:text-[#55aa55] transition-colors p-3" title="Contact Command">
          <Mail size={24} />
        </button>
        <button onClick={handleLogout} className="mt-auto hover:text-red-500 transition-colors p-3" title="Terminate Session">
          <LogOut size={24} />
        </button>
      </nav>

      {/* MAIN CONTENT (Adjusted margin for Navbar) */}
      <main className="ml-20 pt-28 p-8 lg:p-12">
        
        {/* HEADER SECTION */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16">
          <div className="flex items-center gap-6">
            <div className="relative">
              <img 
                src={AVATAR_MAP[data.userDetails.avatar] || AVATAR_MAP[1]} 
                alt="Operative" 
                className="w-28 h-28 rounded-2xl border-2 border-[#55aa55] object-cover shadow-[0_0_25px_rgba(85,170,85,0.15)]"
              />
              <div className="absolute -bottom-2 -right-2 bg-[#55aa55] text-black px-2 py-0.5 text-[10px] font-black rounded uppercase tracking-tighter">
                ACTIVE
              </div>
            </div>
            <div>
              <div className="text-[10px] text-[#55aa55] font-mono tracking-[0.4em] uppercase mb-1">Operative_Logged_In</div>
              <h1 className="text-5xl font-black text-white tracking-tighter uppercase italic leading-none">
                {data.userDetails.name}
              </h1>
              <div className="flex items-center gap-3 text-sm text-gray-500 mt-2 font-mono">
                <span>{data.userDetails.regno}</span>
                <span className="text-[#222]">|</span>
                <span className="uppercase">{data.userDetails.college}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-[#0a0a0a] border border-[#222] p-6 rounded-2xl flex gap-12">
            <div>
              <p className="text-[10px] uppercase text-gray-600 tracking-widest mb-1">Missions</p>
              <p className="text-3xl font-bold text-white leading-none">{data.participations.length}</p>
            </div>
            <div className="border-l border-[#222] pl-12">
              <p className="text-[10px] uppercase text-gray-600 tracking-widest mb-1">Class</p>
              <p className="text-3xl font-bold text-[#55aa55] leading-none uppercase">{data.userDetails.course}</p>
            </div>
          </div>
        </header>

        {/* ACTIVE PROTOCOLS */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <ShieldCheck className="text-[#55aa55]" size={20} />
            <h2 className="text-xl font-black text-white tracking-[0.2em] uppercase">Active_Protocols</h2>
            <div className="h-px flex-1 bg-[#111]"></div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {data.participations.map((event) => (
              <div key={event.participationId} className="group bg-[#0a0a0a] border border-[#222] rounded-2xl overflow-hidden hover:border-[#55aa55]/40 transition-all duration-300">
                <div className="flex flex-col md:flex-row">
                  <div className="w-full md:w-52 h-52 relative overflow-hidden">
                    <img src={event.imageUrl} alt="Mission Intel" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                    <div className={`absolute top-4 left-4 px-3 py-1 rounded-sm text-[10px] font-black uppercase tracking-widest ${
                      event.status === 'pending' ? 'bg-orange-500 text-black animate-pulse' : 'bg-[#55aa55] text-black'
                    }`}>
                      {event.status}
                    </div>
                  </div>
                  
                  <div className="p-8 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-[10px] text-gray-600 font-mono mb-1 uppercase tracking-tighter italic">Auth_ID: {event.participationId.slice(-8)}</div>
                      <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tight italic">Mission_Participated</h3>
                      <div className="space-y-3">
                         <p className="text-[10px] text-[#55aa55] uppercase font-bold tracking-widest">Squad_Members</p>
                         <div className="flex flex-wrap gap-2">
                            {event.otherParticipants.map((email, i) => (
                              <span key={i} className="text-[10px] bg-white/5 border border-white/10 px-3 py-1 rounded-sm text-gray-400 font-mono">
                                {email}
                              </span>
                            ))}
                         </div>
                      </div>
                    </div>

                    <div className="mt-8 flex items-center justify-between border-t border-[#111] pt-6">
                      <div className="flex items-center gap-2 text-gray-500 text-[10px] font-mono tracking-widest">
                        <Clock size={12} />
                        {new Date(event.createdAt).toLocaleDateString()}
                      </div>
                      <button className="text-[#55aa55] hover:text-white transition-colors flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em]">
                        View_Intel <ExternalLink size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {data.participations.length === 0 && (
              <div className="col-span-full py-24 border border-dashed border-[#222] rounded-3xl flex flex-col items-center justify-center text-gray-700 bg-[#070707] hover:bg-[#0a0a0a] transition-colors cursor-pointer" onClick={() => navigate('/events')}>
                <Compass size={48} className="mb-4 opacity-10 animate-spin-slow" />
                <p className="font-mono tracking-[0.3em] uppercase text-sm">Deployment_Pending</p>
                <p className="text-[10px] text-gray-800 mt-2">NO_ACTIVE_PROTOCOLS_FOUND_IN_SYSTEM</p>
              </div>
            )}
          </div>
        </section>

        {/* SYSTEM STATUS FOOTER */}
        <footer className="mt-24 border-t border-[#111] pt-10 flex flex-col md:flex-row justify-between text-[10px] text-gray-600 font-mono tracking-[0.2em] uppercase">
          <p>© 2026 SYNTAXIA_CORE // ENCRYPTED_UPLINK</p>
          <div className="flex gap-8 mt-6 md:mt-0">
            <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#55aa55] rounded-full animate-ping" /> Connection_Active</span>
            <span>Latency: 24ms</span>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Dashboard;