import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { CheckCircle, Eye, Lock, Terminal, Trash2, Hash, Activity } from 'lucide-react';
import PremiumNavbar from '../home/components/nav';

const AdminPage = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [passInput, setPassInput] = useState('');
  const [pendingList, setPendingList] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);

  const STORAGE_KEY = 'syntaxia_admin_token';
  const API_BASE = 'https://note-taking-server-kappa.vercel.app/api/admin'; // Updated to your local port

  useEffect(() => {
    const savedPass = localStorage.getItem(STORAGE_KEY);
    if (savedPass) {
      setIsAuthorized(true);
      fetchData(savedPass);
    }
  }, []);

  const fetchData = async (pass) => {
    setLoading(true);
    try {
      const [pendingRes, statsRes] = await Promise.all([
        axios.get(`${API_BASE}/pending`, { headers: { 'x-admin-pass': pass } }),
        axios.get(`${API_BASE}/stats/dashboard`, { headers: { 'x-admin-pass': pass } })
      ]);
      setPendingList(pendingRes.data.data);
      setStats(statsRes.data);
    } catch (err) {
      toast.error("SYSTEM_SYNC_FAILED");
    } finally {
      setLoading(false);
    }
  };

  const handleAuthorize = (e) => {
    e.preventDefault();
    localStorage.setItem(STORAGE_KEY, passInput);
    setIsAuthorized(true);
    fetchData(passInput);
    toast.success("UPLINK_ESTABLISHED");
  };

  const handleAction = async (id, type) => {
    const pass = localStorage.getItem(STORAGE_KEY);
    const loadToast = toast.loading(`${type === 'approve' ? 'Approving' : 'Rejecting'}...`);
    
    try {
      const endpoint = type === 'approve' ? `/approve/${id}` : `/reject/${id}`;
      const method = type === 'approve' ? 'patch' : 'delete';

      await axios[method](`${API_BASE}${endpoint}`, {}, {
        headers: { 'x-admin-pass': pass }
      });

      toast.success(`PASS_${type.toUpperCase()}_SUCCESS`, { id: loadToast });
      setPendingList(prev => prev.filter(p => p.passId !== id));
      // Refresh stats
      const statsRes = await axios.get(`${API_BASE}/stats/dashboard`, { headers: { 'x-admin-pass': pass } });
      setStats(statsRes.data);
    } catch (err) {
      toast.error("PROTOCOL_ERROR", { id: loadToast });
    }
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 font-mono">
        <Toaster />
        <div className="w-full max-w-sm bg-[#0a0a0a] border border-white/5 p-8 rounded-2xl">
          <Lock size={32} className="text-white mb-6" />
          <h2 className="text-white font-bold tracking-tighter mb-8 text-xl">ADMIN_OVERRIDE</h2>
          <form onSubmit={handleAuthorize} className="space-y-4">
            <input 
              type="password" 
              placeholder="SYSTEM_KEY"
              className="w-full bg-black border border-white/10 p-4 rounded-xl text-white focus:border-white/40 outline-none transition-all"
              value={passInput}
              onChange={(e) => setPassInput(e.target.value)}
            />
            <button className="w-full py-4 bg-white text-black font-bold uppercase text-xs tracking-[0.2em] rounded-xl hover:bg-gray-200 transition-all">
              Initialize
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-white selection:text-black">
      <PremiumNavbar />
      <Toaster />

      <main className="max-w-5xl mx-auto px-6 pt-32 pb-20">
        {/* STATS HEADER */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
          <StatCard label="Pending" value={stats?.pendingPasses ?? '..'} color="text-yellow-500" />
          <StatCard label="Total Passes" value={stats?.totalPasses ?? '..'} color="text-blue-500" />
          <StatCard label="Users" value={stats?.users ?? '..'} color="text-green-500" className="hidden md:block" />
        </div>

        <header className="flex justify-between items-end mb-8 border-b border-white/5 pb-6">
          <div className="flex items-center gap-3">
             <Terminal size={20} className="text-white/20" />
             <h1 className="text-2xl font-bold tracking-tighter">PASS_VERIFICATION</h1>
          </div>
        </header>

        {loading ? (
          <div className="py-20 text-center text-white/20 font-mono text-xs tracking-[0.5em] animate-pulse">FETCHING_DATABASE</div>
        ) : (
          <div className="grid gap-4">
            {pendingList.map((item) => (
              <div key={item.passId} className="bg-[#0a0a0a] border border-white/5 p-5 rounded-2xl flex flex-col md:flex-row gap-6 items-center hover:bg-[#0f0f0f] transition-all">
                
                {/* PROOF IMAGE */}
                <div className="relative w-full md:w-32 h-32 rounded-xl overflow-hidden bg-black shrink-0 border border-white/5">
                  <img src={item.proof} className="w-full h-full object-cover opacity-80" alt="Txn Proof" />
                  <a href={item.proof} target="_blank" rel="noreferrer" className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-all">
                    <Eye size={20} />
                  </a>
                </div>

                {/* DETAILS */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                      item.type === 'BGMI' ? 'border-orange-500/30 text-orange-500' : 
                      item.type === 'VALO' ? 'border-red-500/30 text-red-500' : 'border-blue-500/30 text-blue-500'
                    }`}>
                      {item.type}
                    </span>
                    <span className="text-[10px] text-white/30 font-mono uppercase flex items-center gap-1">
                      <Hash size={10} /> {item.txnId}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold truncate">{item.user?.userDetails?.name || "Unknown User"}</h3>
                  <p className="text-xs text-white/40 font-mono">{item.user?.userEmail}</p>
                </div>

                {/* ACTIONS */}
                <div className="flex gap-2 w-full md:w-auto">
                  <button 
                    onClick={() => handleAction(item.passId, 'reject')}
                    className="flex-1 md:flex-none p-4 rounded-xl bg-white/5 hover:bg-red-500/20 hover:text-red-500 transition-all text-white/20"
                  >
                    <Trash2 size={18} />
                  </button>
                  <button 
                    onClick={() => handleAction(item.passId, 'approve')}
                    className="flex-[3] md:px-8 py-4 bg-white text-black font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-green-500 transition-all flex items-center justify-center gap-2"
                  >
                    <CheckCircle size={16} /> Approve
                  </button>
                </div>
              </div>
            ))}

            {pendingList.length === 0 && (
              <div className="py-20 text-center border border-dashed border-white/5 rounded-3xl">
                <p className="text-white/20 font-mono text-xs uppercase tracking-[0.3em]">System_Clear_No_Pending_Actions</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

// Helper Component for Stats
const StatCard = ({ label, value, color, className }) => (
  <div className={`bg-[#0a0a0a] border border-white/5 p-6 rounded-2xl ${className}`}>
    <p className="text-[10px] text-white/40 uppercase font-mono tracking-widest mb-1">{label}</p>
    <p className={`text-3xl font-bold tracking-tighter ${color}`}>{value}</p>
  </div>
);

export default AdminPage;