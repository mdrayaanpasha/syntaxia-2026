import React, { useState } from 'react';
import { ShieldCheck, Zap, Globe, Lock } from 'lucide-react';


const AuthPage = () => {
  const API_BASE_URL = "https://note-taking-server-kappa.vercel.app"; 
const GOOGLE_AUTH_URL = `${API_BASE_URL}/api/auth/google`;
  const [isHovering, setIsHovering] = useState(false);

  const handleGoogleLogin = () => {
    window.location.href = GOOGLE_AUTH_URL;
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden font-sans bg-[#050505] selection:bg-[#55aa55] selection:text-white">
      
      {/* 1. ATMOSPHERIC BACKGROUND LAYER */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://ik.imagekit.io/yylpuqff5/Minecraft/cover.png" 
          alt="Background" 
          className="w-full h-full object-cover opacity-60"
        />
        {/* Vignette & Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000_100%)]"></div>
        
        {/* Animated Grid Floor (Retro-Modern feel) */}
        <div className="absolute bottom-0 w-full h-1/2 bg-[linear-gradient(to_bottom,transparent_0%,#000_100%)] z-10"></div>
      </div>

      {/* 2. LOGIN MODAL / LAUNCHER */}
      <div className="relative z-20 flex flex-col items-center w-full max-w-md p-1">
        
        {/* Holographic Header Badge */}
        <div className="mb-8 flex items-center gap-3 px-6 py-2 bg-black/40 border border-white/10 backdrop-blur-xl rounded-full shadow-[0_0_30px_rgba(85,170,85,0.2)]">
          <Globe size={16} className="text-[#55aa55] animate-pulse" />
          <span className="text-xs font-bold tracking-[0.3em] text-white/80">
            NETWORK_SECURE
          </span>
        </div>

        {/* MAIN CARD SLAB */}
        <div className="w-full bg-[#111]/80 backdrop-blur-md border border-white/10 p-8 md:p-12 shadow-2xl relative overflow-hidden group">
          
          {/* Decorative Corner Borders */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#55aa55]"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#55aa55]"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#55aa55]"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#55aa55]"></div>

          {/* Content */}
          <div className="flex flex-col items-center text-center">
            
            {/* Icon */}
            <div className="mb-6 p-4 bg-gradient-to-br from-[#55aa55]/20 to-transparent rounded-full border border-[#55aa55]/30 shadow-[0_0_15px_#55aa5540]">
              <Lock size={32} className="text-[#55aa55]" />
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tighter [text-shadow:0_4px_20px_rgba(255,255,255,0.1)]">
              IDENTIFY
            </h2>
            <p className="text-white/40 text-sm tracking-widest mb-10 uppercase">
              Authentication Required to Join
            </p>

            {/* THE GOOGLE BUTTON (Styled as 'Enter World') */}
            <button 
              onClick={handleGoogleLogin}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              className="relative w-full group/btn overflow-hidden"
            >
              {/* Button Body */}
              <div className="relative z-10 w-full bg-[#55aa55] border-b-4 border-r-4 border-[#2d5a2d] hover:bg-[#66cc66] active:border-0 active:translate-y-1 active:translate-x-1 transition-all duration-75 py-4 px-6 flex items-center justify-center gap-3">
                
                {/* Google 'G' (Simulated with simple typography for aesthetics) */}
                <div className="bg-white rounded p-1">
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.11c-.22-.66-.35-1.36-.35-2.11s.13-1.45.35-2.11V7.05H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.95l3.66-2.84z" />
                    <path fill="#EA4335" d="M12 4.62c1.61 0 3.06.56 4.21 1.64l3.16-3.16C17.45 1.09 14.97 0 12 0 7.7 0 3.99 2.47 2.18 7.05l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                </div>
                
                <span className="text-white font-bold tracking-widest text-lg [text-shadow:1px_1px_0px_#2d5a2d]">
                  LOGIN WITH GOOGLE
                </span>
              </div>
            </button>

            {/* Disclaimer / Footer */}
            <div className="mt-8 flex items-center justify-center gap-2 opacity-30 text-[10px] text-white tracking-widest">
              <ShieldCheck size={12} />
              <span>SECURE OAUTH 2.0 CONNECTION</span>
            </div>

          </div>
        </div>

        {/* Bottom Version Text */}
        <div className="mt-6 text-[#ffcc00] text-xs font-mono opacity-60">
           BUILD: {API_BASE_URL.includes('localhost') ? 'DEV_LOCAL_4000' : 'PROD_RELEASE'}
        </div>

      </div>
    </section>
  );
};

export default AuthPage;