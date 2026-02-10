import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { ShieldAlert, CheckCircle, ExternalLink, Users, Terminal, Lock, Eye } from 'lucide-react';
import PremiumNavbar from '../home/components/nav';



const AdminPage = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [passInput, setPassInput] = useState('');
  const [pendingList, setPendingList] = useState([]);
  const [loading, setLoading] = useState(false);

  const STORAGE_KEY = 'syntaxia_admin_token';
  const API_BASE = 'https://note-taking-server-kappa.vercel.app/api/admin';

  // Check storage on mount
  useEffect(() => {
    const savedPass = localStorage.getItem(STORAGE_KEY);
    if (savedPass === import.meta.env.VITE_ADMIN_PASS) {
      setIsAuthorized(true);
      fetchPending(savedPass);
    }
  }, []);

  const fetchPending = async (pass) => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/`, {
        headers: { 'x-admin-pass': pass }
      });
      setPendingList(res.data.data);
    } catch (err) {
      toast.error("DATA_SYNC_ERROR");
    } finally {
      setLoading(false);
    }
  };

  const handleAuthorize = (e) => {
    e.preventDefault();
    if (passInput === import.meta.env.VITE_ADMIN_PASS) {
      localStorage.setItem(STORAGE_KEY, passInput);
      setIsAuthorized(true);
      fetchPending(passInput);
      toast.success("ADMIN_ACCESS_ESTABLISHED");
    } else {
      toast.error("INVALID_PROTOCOL_KEY");
    }
  };

  const handleApprove = async (id) => {
    const pass = localStorage.getItem(STORAGE_KEY) || "";
    const loadToast = toast.loading("Updating records...");
    try {
      await axios.get(`${API_BASE}/approve/${id}`, {
        headers: { 'x-admin-pass': pass }
      });
      toast.success("OPERATIVE_APPROVED", { id: loadToast });
      setPendingList(prev => prev.filter(p => p.participationId !== id));
    } catch (err) {
      toast.error("ACTION_FAILED", { id: loadToast });
    }
  };

  // --- VIEW 1: AUTH LOCK ---
  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-6 font-mono">
        <Toaster />
        <div className="w-full max-w-md bg-[#0a0a0a] border border-red-500/20 p-8 rounded-3xl text-center">
          <Lock size={40} className="mx-auto text-red-500 mb-6 animate-pulse" />
          <h2 className="text-white font-black tracking-widest mb-2">RESTRICTED_ACCESS</h2>
          <p className="text-gray-600 text-xs mb-8 italic">Provide system override key to view pending protocols.</p>
          
          <form onSubmit={handleAuthorize} className="space-y-4">
            <input 
              type="password" 
              placeholder="ENTER_PASS"
              className="w-full bg-black border border-[#222] p-4 rounded-xl text-center text-[#55aa55] focus:border-red-500 outline-none transition-all"
              value={passInput}
              onChange={(e) => setPassInput(e.target.value)}
            />
            <button className="w-full py-4 bg-red-500/10 text-red-500 border border-red-500/50 rounded-xl font-black uppercase tracking-widest hover:bg-red-500 hover:text-black transition-all">
              Initialize_Uplink
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- VIEW 2: ADMIN PANEL ---
  return (
    <div className="min-h-screen bg-[#050505] text-gray-300 font-sans selection:bg-red-500 selection:text-white">
      <PremiumNavbar />
      <Toaster />

      <main className="max-w-6xl mx-auto px-6 pt-32 pb-20">
        <header className="flex justify-between items-end mb-12 border-b border-[#111] pb-8">
          <div>
            <div className="flex items-center gap-2 text-red-500 font-mono text-[10px] tracking-[0.4em] uppercase mb-1">
              <Terminal size={14} /> /verification_queue
            </div>
            <h1 className="text-5xl font-black text-white uppercase italic">PENDING_<span className="text-red-500">OPS</span></h1>
          </div>
          <div className="text-right hidden md:block">
            <p className="text-[10px] text-gray-600 font-mono uppercase tracking-widest">Active_Queue_Size</p>
            <p className="text-2xl font-bold text-white">{pendingList.length}</p>
          </div>
        </header>

        {loading ? (
          <div className="flex items-center justify-center py-20 animate-pulse text-gray-600 font-mono uppercase tracking-[0.4em]">
            Accessing_Database...
          </div>
        ) : (
          <div className="space-y-4">
            {pendingList.map((item) => (
              <div key={item.participationId} className="bg-[#0a0a0a] border border-[#222] p-6 rounded-3xl flex flex-col md:flex-row gap-8 items-center hover:border-red-500/30 transition-all group">
                
                {/* PROOF PREVIEW */}
                <div className="relative w-full md:w-44 h-44 rounded-2xl overflow-hidden shrink-0">
                  <img src={item.imageUrl} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all" alt="Proof" />
                  <a href={item.imageUrl} target="_blank" rel="noreferrer" className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                    <Eye className="text-white" size={24} />
                  </a>
                </div>

                {/* INFO CONTENT */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[10px] bg-red-500/10 text-red-500 px-3 py-1 rounded-full font-black uppercase tracking-widest border border-red-500/20">
                      {item.event.eventName}
                    </span>
                    <span className="text-[10px] text-gray-600 font-mono uppercase tracking-widest">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <h3 className="text-2xl font-black text-white uppercase italic truncate mb-1">{item.user.userDetails.name}</h3>
                  <p className="text-xs text-gray-500 font-mono mb-4 italic italic italic">{item.user.userEmail} | {item.user.userDetails.regno}</p>

                  <div className="flex items-center gap-4 text-[10px] uppercase font-bold text-gray-600">
                    <Users size={14} className="text-[#55aa55]" />
                    <span className="tracking-widest">Squad: {item.otherParticipants.length > 0 ? item.otherParticipants.join(', ') : 'SOLO_OPERATIVE'}</span>
                  </div>
                </div>

                {/* APPROVAL ACTION */}
                <div className="w-full md:w-auto">
                  <button 
                    onClick={() => handleApprove(item.participationId)}
                    className="w-full md:px-10 py-4 bg-[#55aa55] text-black font-black uppercase tracking-widest rounded-xl hover:bg-white transition-all flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(85,170,85,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                  >
                    <CheckCircle size={20} /> Approve_Mission
                  </button>
                </div>
              </div>
            ))}

            {pendingList.length === 0 && (
              <div className="py-24 text-center border-2 border-dashed border-[#111] rounded-3xl flex flex-col items-center">
                <CheckCircle size={48} className="text-gray-800 mb-4" />
                <p className="text-gray-700 font-mono tracking-[0.4em] uppercase">No_Pending_Protocols</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminPage;