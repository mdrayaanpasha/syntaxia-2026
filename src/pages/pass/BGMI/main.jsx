import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Crosshair, Upload, User, Smartphone, 
  School, Book, Check, AlertCircle, 
  ChevronLeft, CreditCard, QrCode, ShieldAlert,
  Loader2, ShieldCheck, Landmark, Copy, Info, Zap
} from 'lucide-react';
import PremiumNavbar from '../../home/components/nav';

const BgmiRegister = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // --- OFFICIAL SJU CONFIG ---
  const BGMI_EVENT_ID = "cmlgm1wy10001wpij8etyb11w"; 
  const BASE_PRICE = 424;
  const GST_AMOUNT = 76; // 18% GST
  const TOTAL_PRICE = "₹500"; 

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
        navigate('/auth'); return;
      }
      try {
        const response = await fetch('https://note-taking-server-kappa.vercel.app/api/user/pass-check/BGMI', {
          method: 'GET', headers: { "Authorization": `Bearer ${token}` }
        });
        if (response.ok) {
          const data = await response.json();
          if (data.exists) {
            setIsAlreadyRegistered(true);
            startRedirectTimer('/dashboard');
            return;
          }
        }
      } catch (e) { console.error(e); } finally { setCheckingPass(false); }
    };
    checkAuthAndPass();
  }, [navigate]);

  // --- TIMER ---
  const startRedirectTimer = (path) => {
    let timer = 5;
    const interval = setInterval(() => {
      timer -= 1;
      setCountdown(timer);
      if (timer <= 0) { clearInterval(interval); navigate(path); }
    }, 1000);
  };

  // --- HANDLERS ---
  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleCopy = (text) => { navigator.clipboard.writeText(text); alert('Copied!'); };
  
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !formData.txnId) { setStatus('error'); setErrorMessage('Transaction ID and Screenshot required for extraction.'); return; }
    setStatus('loading');
    try {
      const payload = new FormData();
      payload.append("type", "BGMI");
      payload.append("eventIdArray", JSON.stringify([BGMI_EVENT_ID]));
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

      if (!response.ok) throw new Error('Uplink failed. Check UTR.');
      setStatus('success');
      startRedirectTimer('/dashboard');
    } catch (err) { setStatus('error'); setErrorMessage(err.message); }
  };

  if (checkingPass) return <div className="min-h-screen bg-[#050505] flex items-center justify-center text-orange-500 font-minecraft"><Loader2 size={48} className="animate-spin" /></div>;

  if (status === 'success' || isAlreadyRegistered) return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 font-minecraft text-white uppercase italic">
      <div className="bg-[#0a0a0a] border-2 border-orange-500 p-12 max-w-lg w-full text-center shadow-[0_0_50px_rgba(249,115,22,0.3)]">
        <ShieldCheck size={64} className="text-orange-500 mx-auto mb-6 animate-bounce" />
        <h2 className="text-3xl font-black text-orange-500 mb-4 tracking-tighter">DEPLOYMENT CONFIRMED</h2>
        <p className="text-gray-400 font-mono text-[10px] normal-case mb-8 tracking-widest">RETURNING TO BASE IN {countdown}S...</p>
        <div className="w-full h-1 bg-orange-950"><div className="h-full bg-orange-500 transition-all duration-1000" style={{ width: `${(countdown/5)*100}%` }}></div></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] text-gray-200 font-minecraft selection:bg-orange-500 selection:text-black">
      <PremiumNavbar />
      <div className="max-w-7xl mx-auto px-4 py-24 relative z-10">
        
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-orange-500 mb-8 font-bold tracking-widest text-xs uppercase hover:translate-x-1 transition-all">
          <ChevronLeft size={20} /> ABORT_DROP
        </button>

        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* LEFT: IDENTITY & FORM */}
          <div className="lg:col-span-7 space-y-10">
            <div>
              <h1 className="text-6xl md:text-8xl font-black text-white italic tracking-tighter uppercase leading-[0.85] [text-shadow:4px_4px_0px_#f97316]">
                BGMI <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">WARS</span>
              </h1>
              <div className="flex gap-4 mt-6 font-mono text-[10px] uppercase tracking-[0.2em]">
                <span className="text-orange-500 flex items-center gap-1"><Info size={12}/> SJU SOP COMPLIANT</span>
                <span className="text-gray-600">VALIDATED BY ACCOUNTS SECTION</span>
              </div>
            </div>

            <section className="bg-[#0a0a0a] p-8 border border-[#222] space-y-8 relative">
                <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-orange-500/30"></div>
                <h3 className="text-orange-500 font-mono text-xs uppercase flex items-center gap-2 tracking-[0.3em]">
                  <User size={16} /> 01. OPERATOR DATA
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                    {['name', 'phoneno', 'college', 'course'].map((key) => (
                        <div key={key} className="space-y-1">
                            <label className="text-[10px] text-gray-600 uppercase font-bold">{key}</label>
                            <input 
                                name={key} value={formData[key]} onChange={handleInputChange}
                                className="w-full bg-black border border-[#222] p-3 text-xs font-mono text-white focus:border-orange-500 outline-none transition-all"
                                placeholder={`INPUT_${key.toUpperCase()}`}
                            />
                        </div>
                    ))}
                </div>
            </section>

            <div className="bg-orange-950/10 border-l-4 border-orange-500 p-6 flex gap-4">
                <ShieldAlert className="text-orange-500 shrink-0" size={24} />
                <div className="text-[10px] font-mono text-gray-400 leading-relaxed uppercase">
                    Registration fee is non-refundable as per University policy 02/01/2026. 
                    Ensure all data matches your college ID.
                </div>
            </div>
          </div>

          {/* RIGHT: GIANT BANKING & 9:16 QR */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 space-y-6">
              
              {/* PRICE CARD */}
              <div className="bg-orange-500 p-6 text-black border-b-8 border-orange-900">
                <p className="text-[10px] font-black uppercase tracking-widest opacity-70">Squad Entry Fee</p>
                <div className="flex items-baseline gap-2">
                    <span className="text-6xl font-black italic tracking-tighter">{TOTAL_PRICE}</span>
                    <span className="text-[10px] font-bold font-mono">INCL. 18% GST</span>
                </div>
                <div className="mt-4 flex justify-between text-[9px] font-bold font-mono opacity-80 border-t border-black/20 pt-2">
                    <span>FEE: ₹{BASE_PRICE}</span>
                    <span>GST (18%): ₹{GST_AMOUNT}</span>
                </div>
              </div>

              {/* GIANT BANK DETAILS */}
              <div className="bg-white p-6 border-4 border-orange-500 text-black space-y-4 shadow-[8px_8px_0px_rgba(249,115,22,0.2)]">
                <div className="flex items-center gap-2 text-[10px] font-black uppercase border-b-2 border-black pb-2">
                    <Landmark size={16}/> SJU COLLECTION ACCOUNT
                </div>
                
                <div className="space-y-4">
                    <div className="bg-gray-100 p-4 border-l-4 border-black group cursor-pointer" onClick={() => handleCopy(BANK_DETAILS.account)}>
                        <p className="text-[9px] font-bold text-gray-400 uppercase flex justify-between">ACCOUNT NUMBER <Copy size={12}/></p>
                        <p className="text-2xl font-black font-mono tracking-tighter">{BANK_DETAILS.account}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-100 p-3 border-l-4 border-black group cursor-pointer" onClick={() => handleCopy(BANK_DETAILS.ifsc)}>
                            <p className="text-[9px] font-bold text-gray-400 uppercase">IFSC CODE</p>
                            <p className="text-lg font-black font-mono">{BANK_DETAILS.ifsc}</p>
                        </div>
                        <div className="p-3 border-l-4 border-orange-200">
                            <p className="text-[9px] font-bold text-gray-400 uppercase">BRANCH</p>
                            <p className="text-[10px] font-black uppercase">LANGFORD RD</p>
                        </div>
                    </div>
                </div>
              </div>

              {/* 9:16 QR PORTAL */}
              <div className="bg-[#0a0a0a] border border-[#222] p-8 space-y-6">
                <div className="flex flex-col items-center">
                    <div className="w-48 aspect-[1/1] bg-white p-2 rounded relative group">
                        <img 
                            src="https://ik.imagekit.io/yylpuqff5/QR.png?updatedAt=1771395151703" 
                            alt="BGMI QR" className="w-full h-full object-cover" 
                        />
                        <div className="absolute inset-0 border-4 border-orange-500 opacity-20 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                    <p className="text-[9px] text-gray-600 font-mono mt-4 uppercase italic">SATELLITE SCAN REQUIRED</p>
                </div>

                <div className="space-y-4 pt-4 border-t border-[#222]">
                    <div className="space-y-1">
                        <label className="text-[9px] text-gray-600 font-mono uppercase">TRANSACTION ID / UTR</label>
                        <input 
                            name="txnId" value={formData.txnId} onChange={handleInputChange}
                            className="w-full bg-black border border-[#222] p-4 text-xs font-mono focus:border-orange-500 outline-none text-white"
                            placeholder="REF_REQUIRED"
                        />
                    </div>

                    <div className="relative bg-black border-2 border-dashed border-[#222] p-4 text-center hover:border-orange-500 transition-all">
                        <input type="file" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                        <Upload size={16} className="mx-auto text-gray-600 mb-1" />
                        <p className="text-[9px] font-mono text-gray-600 uppercase">{file ? file.name : 'DROP_SCREENSHOT'}</p>
                    </div>

                    {errorMessage && <p className="text-red-500 text-[10px] font-mono uppercase text-center italic">{errorMessage}</p>}

                    <button
                        onClick={handleSubmit} disabled={status === 'loading'}
                        className="w-full py-5 bg-white hover:bg-orange-500 text-black font-black uppercase italic tracking-widest transition-all flex items-center justify-center gap-2"
                    >
                        {status === 'loading' ? <Loader2 className="animate-spin" size={20}/> : 'DEPLOY OPERATOR'} <Crosshair size={20} />
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

export default BgmiRegister;