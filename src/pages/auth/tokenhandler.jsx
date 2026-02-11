import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Terminal, ShieldCheck, Loader2 } from 'lucide-react';

const TokenHandler = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('INITIALIZING_HANDSHAKE...');

  useEffect(() => {
    const token = searchParams.get('token');

    if (token) {
      // 1. Visual feedback for the user
      setStatus('DECRYPTING_TOKEN_PACKETS...');
      
      // 2. Save the token
      localStorage.setItem('token', token);

      // 3. Artificial delay (800ms) so they can see the cool "Access Granted" animation
      // before redirecting. It feels more "premium" than a glitchy instant jump.
      setTimeout(() => {
        setStatus('ACCESS_GRANTED_REDIRECTING...');
        setTimeout(() => {
          let l = localStorage.getItem("redir")
          if(!l){
            navigate('/'); // Redirect to Home/Dashboard
          }else{
            navigate(l);
          }
        }, 800);
      }, 800);

    } else {
      // Handle error case
      setStatus('ERROR: NO_TOKEN_FOUND');
      setTimeout(() => navigate('/login'), 2000);
    }
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen w-full bg-[#050505] flex flex-col items-center justify-center font-mono relative overflow-hidden">
      
      {/* BACKGROUND MATRIX EFFECT (Subtle) */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,18,18,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-0 bg-[length:100%_4px,6px_100%] pointer-events-none"></div>
      
      {/* LOADING CONTAINER */}
      <div className="relative z-10 p-10 border border-[#333] bg-black/80 backdrop-blur-md flex flex-col items-center gap-6 max-w-lg w-full shadow-[0_0_50px_rgba(85,170,85,0.1)]">
        
        {/* Animated Corner Brackets */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#55aa55]"></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#55aa55]"></div>

        {/* Icon Animation */}
        <div className="relative">
            <div className="absolute inset-0 bg-[#55aa55] blur-xl opacity-20 animate-pulse"></div>
            {status.includes('ACCESS_GRANTED') ? (
                <ShieldCheck size={48} className="text-[#55aa55] animate-bounce" />
            ) : (
                <Loader2 size={48} className="text-[#55aa55] animate-spin" />
            )}
        </div>

        {/* Status Text */}
        <div className="flex flex-col items-center gap-2">
            <h2 className="text-white text-xl tracking-[0.2em] font-bold animate-pulse">
                SYSTEM AUTH
            </h2>
            <div className="flex items-center gap-2 text-[#55aa55] text-xs">
                <Terminal size={12} />
                <span>{status}</span>
            </div>
        </div>

        {/* Loading Bar */}
        <div className="w-full h-1 bg-[#222] rounded-full overflow-hidden mt-4">
            <div className={`h-full bg-[#55aa55] shadow-[0_0_10px_#55aa55] transition-all duration-1000 ease-out ${status.includes('ACCESS') ? 'w-full' : 'w-2/3'}`}></div>
        </div>

      </div>
    </div>
  );
};

export default TokenHandler;