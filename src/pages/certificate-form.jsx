import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CertForm = () => {
  const [name, setName] = useState('');
  const [college, setCollege] = useState("");
  const [status, setStatus] = useState('idle'); // idle | verifying | success | error
  const navigate = useNavigate();

  const handleVerifyAndClaim = (e) => {
    e.preventDefault();
    if (!name) return;

    setStatus('verifying');

    // Simulating a DB lookup (replace with real fetch if needed)
    setTimeout(() => {
      const isRegistered = name.length > 3; // Simple dummy logic

      if (isRegistered) {
        setStatus('success');
        setTimeout(() => {
          const encodedName = encodeURIComponent(name);
          const encodedCollege = encodeURIComponent(college);
          navigate(`/certificate/${encodedName}/college/${encodedCollege}`);
        }, 800);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 3000);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans selection:bg-sky-100">
      {/* Soft Background Accents */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-sky-200 rounded-full blur-[100px] opacity-50"></div>
      <div className="absolute bottom-20 right-20 w-64 h-64 bg-indigo-200 rounded-full blur-[100px] opacity-50"></div>

      <div className="relative w-full max-w-md">
        <div className="bg-white border border-slate-200 p-10 rounded-[2rem] shadow-xl shadow-slate-200/50">
          
          <div className="text-center mb-10">
            <div className="inline-block px-3 py-1 bg-sky-50 text-sky-600 text-[10px] font-bold uppercase tracking-widest rounded-full mb-4">
              Cybernetics Association
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Hackathon <span className="text-sky-500">2025</span>
            </h1>
            <p className="text-slate-500 text-sm mt-2">Verify your participation to claim rewards</p>
          </div>

          <form onSubmit={handleVerifyAndClaim} className="space-y-6">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2 ml-1">
                Participant Name
              </label>
              <input
                type="text"
                disabled={status === 'verifying'}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full name as registered"
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 px-5 py-4 rounded-2xl focus:outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 transition-all placeholder:text-slate-400"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2 ml-1">
                Institution
              </label>
              <input
                type="text"
                disabled={status === 'verifying'}
                value={college}
                placeholder='College Name'
                onChange={(e) => setCollege(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 px-5 py-4 rounded-2xl focus:outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'verifying' || !name}
              className={`w-full py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-3 shadow-lg ${
                status === 'error' ? 'bg-red-500 text-white shadow-red-200' :
                status === 'success' ? 'bg-emerald-500 text-white shadow-emerald-200' :
                'bg-slate-900 text-white shadow-slate-300 hover:bg-slate-800 active:scale-95 disabled:opacity-50'
              }`}
            >
              {status === 'idle' && (
                <>Claim Certificate <span className="text-xl">✨</span></>
              )}
              {status === 'verifying' && (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Verifying Database...
                </>
              )}
              {status === 'success' && (
                <>Verified Successfully! <span className="text-xl">✅</span></>
              )}
              {status === 'error' && (
                <>Name Not Found <span className="text-xl">❌</span></>
              )}
            </button>
          </form>

          {status === 'error' && (
            <p className="text-center text-red-500 text-[10px] mt-4 font-bold uppercase tracking-wider">
              Please check your spelling or contact support
            </p>
          )}
        </div>
  
      </div>
    </div>
  );
};

export default CertForm;