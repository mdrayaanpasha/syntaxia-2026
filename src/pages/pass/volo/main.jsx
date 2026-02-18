import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Sword, Upload, User, Smartphone, 
  School, Book, Check, AlertCircle, 
  ChevronLeft, CreditCard, QrCode, Shield, Target,
  Loader2, ShieldCheck, Landmark, Copy, Info
} from 'lucide-react';
import PremiumNavbar from '../../home/components/nav';

const ValorantRegister = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // --- OFFICIAL SJU CONFIG ---
  const VALO_EVENT_ID = "cmlgm1wy10002wpij5m9w4zjl"; 
  const BASE_PRICE = 466;
  const GST_AMOUNT = 84; // 18% GST
  const TOTAL_PRICE = "₹550"; 

  const BANK_DETAILS = {
    name: "ST JOSEPHS UNIVERSITY COLLECTION ACCOUNT",
    account: "0964073000000053",
    ifsc: "SIBL0000964",
    bank: "South Indian Bank",
  };

  // --- STATE ---
  const [formData, setFormData] = useState({ name: '', college: '', phoneno: '', course: '', txnId: '' });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [status, setStatus] = useState('idle'); 
  const [errorMessage, setErrorMessage] = useState('');
  const [checkingPass, setCheckingPass] = useState(true);
  const [isAlreadyRegistered, setIsAlreadyRegistered] = useState(false);
  const [countdown, setCountdown] = useState(5);

  // --- AUTH & PASS CHECK ---
  useEffect(() => {
    const checkAuthAndPass = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        localStorage.setItem("redir", `${location.pathname}${location.search}`);
        navigate('/auth'); 
        return;
      }

      try {
        const response = await fetch('https://note-taking-server-kappa.vercel.app/api/user/pass-check/VALO', {
          method: 'GET',
          headers: { "Authorization": `Bearer ${token}` }
        });

        if (response.ok) {
          const data = await response.json();
          if (data.exists) {
            setIsAlreadyRegistered(true);
            startRedirectTimer('/dashboard');
            return;
          }
        }
      } catch (error) {
        console.error("Pass check failed:", error);
      } finally {
        setCheckingPass(false); 
      }
    };
    checkAuthAndPass();
  }, [navigate]);

  // --- REDIRECT TIMER ---
  const startRedirectTimer = (path) => {
    let timer = 5;
    const interval = setInterval(() => {
      timer -= 1;
      setCountdown(timer);
      if (timer <= 0) {
        clearInterval(interval);
        navigate(path);
      }
    }, 1000);
  };

  // --- HANDLERS ---
  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to Clipboard');
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !formData.txnId) {
      setStatus('error');
      setErrorMessage('Agent, we need the UTR and Proof to verify.');
      return;
    }
    setStatus('loading');

    try {
      const payload = new FormData();
      payload.append("type", "VALO"); 
      payload.append("eventIdArray", JSON.stringify([VALO_EVENT_ID])); 
      payload.append("name", formData.name);
      payload.append("college", formData.college);
      payload.append("phoneno", formData.phoneno);
      payload.append("course", formData.course);
      payload.append("txnId", formData.txnId);
      payload.append("avatar", "1"); 
      payload.append("file", file);

      const response = await fetch('https://note-taking-server-kappa.vercel.app/api/user/v2/register', {
        method: 'POST',
        headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` },
        body: payload 
      });

      if (!response.ok) throw new Error('Uplink failed. Check your connection.');
      
      setStatus('success');
      startRedirectTimer('/dashboard');
    } catch (error) {
      setStatus('error');
      setErrorMessage(error.message);
    }
  };

  // --- VIEW: LOADING & REDIRECTS ---
  if (checkingPass) return <div className="min-h-screen bg-[#0f1923] flex items-center justify-center text-[#ff4655]"><Loader2 size={48} className="animate-spin" /></div>;

  if (status === 'success' || isAlreadyRegistered) {
    return (
      <div className="min-h-screen bg-[#0f1923] flex items-center justify-center p-4 text-white uppercase italic">
        <div className="bg-[#1f2b38] border-l-4 border-[#ff4655] p-12 max-w-lg w-full text-center shadow-[0_0_50px_rgba(255,70,85,0.2)]">
          <ShieldCheck size={64} className="text-[#ff4655] mx-auto mb-6 animate-pulse" />
          <h2 className="text-4xl font-black mb-4 tracking-tighter">PROTOCOL <span className="text-[#ff4655]">LOCKED</span></h2>
          <p className="text-gray-400 font-mono text-[10px] normal-case mb-8 tracking-widest">Warping to dashboard in {countdown}s...</p>
          <div className="w-full h-1 bg-white/10 mt-4"><div className="h-full bg-[#ff4655] transition-all duration-1000" style={{ width: `${(countdown/5)*100}%` }}></div></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f1923] text-gray-200 font-sans selection:bg-[#ff4655]">
      <PremiumNavbar />
      
      <div className="max-w-7xl mx-auto px-4 py-24 relative z-10">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[#ff4655] mb-8 font-bold tracking-widest text-xs uppercase hover:translate-x-1 transition-all">
          <ChevronLeft size={20} /> ABORT_MISSION
        </button>

        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* LEFT: FORM & IDENTITY */}
          <div className="lg:col-span-7 space-y-10">
            <div>
              <h1 className="text-7xl md:text-8xl font-black text-white italic tracking-tighter uppercase leading-none">
                PROTOCOL <span className="text-[#ff4655]">V</span>
              </h1>
              <div className="flex gap-4 mt-4 font-mono text-[10px] uppercase tracking-[0.2em]">
                <span className="text-[#ff4655] flex items-center gap-1"><Info size={12}/> University Compliant</span>
                <span className="text-gray-500">SOP: 02/01/2026</span>
              </div>
            </div>

            <section className="bg-[#1f2b38] p-8 border border-white/5 space-y-8">
                <h3 className="text-white font-bold text-sm tracking-widest uppercase flex items-center gap-2 border-l-2 border-[#ff4655] pl-3">
                  <User size={16} className="text-[#ff4655]" /> AGENT IDENTITY
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                    {['name', 'phoneno', 'college', 'course'].map((key) => (
                        <div key={key} className="space-y-1">
                            <label className="text-[10px] text-gray-500 uppercase font-bold">{key}</label>
                            <input 
                                name={key} value={formData[key]} onChange={handleInputChange}
                                className="w-full bg-[#0f1923] border-b-2 border-white/10 p-3 text-xs font-bold text-white focus:border-[#ff4655] outline-none transition-all uppercase"
                                placeholder={`ENTER ${key.toUpperCase()}`}
                            />
                        </div>
                    ))}
                </div>
            </section>
          </div>

          {/* RIGHT: GIANT BANKING & 9:16 QR */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 space-y-4">
              
              {/* PRICE CARD */}
              <div className="bg-[#ff4655] p-6 text-white skew-x-[-5deg]">
                <p className="text-[10px] font-black uppercase tracking-widest opacity-70">Deployment Fee</p>
                <div className="flex items-baseline gap-2">
                    <span className="text-6xl font-black italic tracking-tighter">{TOTAL_PRICE}</span>
                    <span className="text-[10px] font-bold">INCL. 18% GST</span>
                </div>
              </div>

              {/* GIANT BANK DETAILS */}
              <div className="bg-white p-6 border-b-8 border-[#ff4655] text-black space-y-4">
                <div className="flex items-center justify-between text-[10px] font-black uppercase border-b border-black pb-2">
                    <span className="flex items-center gap-2"><Landmark size={14}/> SJU Collection Account</span>
                    <span className="text-[#ff4655]">Verified</span>
                </div>
                
                <div className="space-y-4">
                    <div className="bg-gray-100 p-4 border-l-4 border-black group cursor-pointer" onClick={() => handleCopy(BANK_DETAILS.account)}>
                        <p className="text-[9px] font-bold text-gray-400 uppercase flex justify-between">Account Number <Copy size={12}/></p>
                        <p className="text-2xl font-black font-mono tracking-tighter">{BANK_DETAILS.account}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-100 p-3 border-l-4 border-black group cursor-pointer" onClick={() => handleCopy(BANK_DETAILS.ifsc)}>
                            <p className="text-[9px] font-bold text-gray-400 uppercase">IFSC Code</p>
                            <p className="text-lg font-black font-mono">{BANK_DETAILS.ifsc}</p>
                        </div>
                        <div className="bg-gray-100 p-3 border-l-4 border-black">
                            <p className="text-[9px] font-bold text-gray-400 uppercase">Bank</p>
                            <p className="text-xs font-black leading-tight uppercase">South Indian Bank</p>
                        </div>
                    </div>
                </div>
              </div>

              {/* 9:16 QR PORTAL */}
              <div className="bg-[#1f2b38] border border-white/5 p-8 space-y-6">
                <div className="flex flex-col items-center">
                    <div className="w-48 aspect-[1/1] bg-white p-2 rounded shadow-2xl relative">
                        <img 
                            src="https://ik.imagekit.io/yylpuqff5/QR.png?updatedAt=1771395151703" 
                            alt="Protocol QR" className="w-full h-full object-cover" 
                        />
                        <div className="absolute inset-0 border-4 border-[#ff4655]/20 animate-pulse pointer-events-none"></div>
                    </div>
                    <p className="text-[10px] text-gray-500 font-mono mt-4 uppercase italic">Scan with Tactical UPI Apps</p>
                </div>

                <div className="space-y-4 pt-4 border-t border-white/10">
                    <div className="space-y-1">
                        <label className="text-[9px] text-gray-500 font-bold uppercase">Transaction ID / UTR</label>
                        <input 
                            name="txnId" value={formData.txnId} onChange={handleInputChange}
                            className="w-full bg-[#0f1923] border border-white/10 p-4 text-xs font-mono focus:border-[#ff4655] outline-none text-white uppercase"
                            placeholder="TXN_REQUIRED"
                        />
                    </div>

                    <div className="relative bg-[#0f1923] border-2 border-dashed border-white/10 p-4 text-center hover:border-[#ff4655] transition-all">
                        <input type="file" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                        <Upload size={16} className="mx-auto text-gray-500 mb-1" />
                        <p className="text-[9px] font-mono text-gray-500 uppercase">{file ? file.name : 'Upload Payment Proof'}</p>
                    </div>

                    {errorMessage && <p className="text-red-500 text-[10px] font-bold uppercase italic">{errorMessage}</p>}

                    <button
                        onClick={handleSubmit} disabled={status === 'loading'}
                        className="w-full py-5 bg-[#ff4655] hover:bg-white hover:text-black text-white font-black uppercase italic tracking-widest transition-all skew-x-[-10deg] flex items-center justify-center gap-2"
                    >
                        {status === 'loading' ? <Loader2 className="animate-spin" size={20}/> : 'LOCK IN ENTRY'} <Target size={20} />
                    </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ValorantRegister;