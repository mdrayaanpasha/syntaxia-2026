import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Sword, Upload, User, Smartphone, 
  ChevronLeft, CreditCard, QrCode, Shield, Target,
  Loader2, ShieldCheck, Landmark, Copy, Info,
  MessageCircle, ExternalLink, Image as ImageIcon
} from 'lucide-react';
import PremiumNavbar from '../../home/components/nav';

const ValorantRegister = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // --- OFFICIAL SJU CONFIG ---
  const VALO_EVENT_ID = "cmlgm1wy10002wpij5m9w4zjl"; 
  const BASE_PRICE = 466;
  const GST_AMOUNT = 84; 
  const TOTAL_PRICE = "₹550"; 
  const WHATSAPP_LINK = "https://chat.whatsapp.com/HWQRNPMYzYcAHcuWSX0ALW?mode=gi_t";
  const QR_IMAGE_URL = "https://ik.imagekit.io/yylpuqff5/QR.png?updatedAt=1771395151703";

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

  // --- AUTH & PASS CHECK ---
  useEffect(() => {
    const checkAuthAndPass = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        localStorage.setItem("redir", `${location.pathname}${location.search}`);
        navigate('/auth'); return;
      }

      try {
        const response = await fetch('https://note-taking-server-kappa.vercel.app/api/user/pass-check/VALO', {
          method: 'GET',
          headers: { "Authorization": `Bearer ${token}` }
        });

        if (response.ok) {
          const data = await response.json();
          if (data.exists) setIsAlreadyRegistered(true);
        }
      } catch (error) {
        console.error("Pass check failed:", error);
      } finally {
        setCheckingPass(false); 
      }
    };
    checkAuthAndPass();
  }, [navigate, location.pathname, location.search]);

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
    } catch (error) {
      setStatus('error');
      setErrorMessage(error.message);
    }
  };

  if (checkingPass) return <div className="min-h-screen bg-[#0f1923] flex items-center justify-center text-[#ff4655]"><Loader2 size={48} className="animate-spin" /></div>;

  // SUCCESS VIEW (Permanent)
  if (status === 'success' || isAlreadyRegistered) {
    return (
      <div className="min-h-screen bg-[#0f1923] flex items-center justify-center p-4 text-white uppercase italic">
        <div className="bg-[#1f2b38] border-l-4 border-[#ff4655] p-12 max-w-lg w-full text-center shadow-[0_0_50px_rgba(255,70,85,0.2)]">
          <ShieldCheck size={64} className="text-[#ff4655] mx-auto mb-6 animate-pulse" />
          <h2 className="text-4xl font-black mb-4 tracking-tighter uppercase">PROTOCOL <span className="text-[#ff4655]">LOCKED</span></h2>
          <p className="text-gray-400 font-mono text-[10px] normal-case mb-8 tracking-widest uppercase">Agent deployed. Join the community hub for brackets and schedules.</p>
          
          <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-3 bg-green-600 hover:bg-green-500 text-white py-4 px-6 mb-6 border-b-4 border-green-900 transition-all skew-x-[-10deg]">
            <MessageCircle size={24} className="skew-x-[10deg]" /> 
            <span className="font-black skew-x-[10deg] tracking-widest">JOIN WHATSAPP COMMUNITY</span>
          </a>

          <button onClick={() => navigate('/dashboard')} className="text-[10px] text-gray-500 hover:text-white transition-colors uppercase tracking-widest">GO TO DASHBOARD</button>
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

            {/* COMMS BANNER */}
            <div className="bg-green-950/20 border-l-4 border-green-500 p-6 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex gap-4 items-center">
                <MessageCircle className="text-green-500" size={32} />
                <div>
                  <p className="text-white font-bold text-sm uppercase tracking-tighter">COMMS HUB</p>
                  <p className="text-[10px] text-gray-400 font-mono uppercase">JOIN COMMUNITY FOR TOURNAMENT INTEL</p>
                </div>
              </div>
              <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="bg-green-600 px-6 py-2 text-xs font-black text-white flex items-center gap-2 hover:bg-green-500 transition-all uppercase italic skew-x-[-10deg]">JOIN NOW <ExternalLink size={14}/></a>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#ff4655] p-6 text-white skew-x-[-5deg]">
              <p className="text-[10px] font-black uppercase tracking-widest opacity-70">Deployment Fee</p>
              <div className="flex items-baseline gap-2">
                <span className="text-6xl font-black italic tracking-tighter">{TOTAL_PRICE}</span>
                <span className="text-[10px] font-bold">INCL. 18% GST</span>
              </div>
            </div>

            {/* BANK DETAILS */}
            <div className="bg-white p-6 border-b-8 border-[#ff4655] text-black space-y-4">
              <p className="text-[10px] font-black uppercase border-b border-black pb-2 flex items-center gap-2">
                <Landmark size={14}/> University Bank Details
              </p>
              <div className="space-y-4">
                <div>
                  <p className="text-[9px] font-bold text-gray-400 uppercase">Beneficiary</p>
                  <p className="text-xs font-black uppercase">{BANK_DETAILS.name}</p>
                </div>
                <div className="bg-gray-100 p-4 border-l-4 border-black cursor-pointer group" onClick={() => handleCopy(BANK_DETAILS.account)}>
                  <p className="text-[9px] font-bold text-gray-400 uppercase flex justify-between">Account Number (Click to copy) <Copy size={12}/></p>
                  <p className="text-2xl font-black font-mono tracking-tighter group-hover:text-[#ff4655] transition-colors">{BANK_DETAILS.account}</p>
                </div>
                <div className="bg-gray-100 p-3 border-l-4 border-black cursor-pointer group" onClick={() => handleCopy(BANK_DETAILS.ifsc)}>
                  <p className="text-[9px] font-bold text-gray-400 uppercase flex justify-between">IFSC Code <Copy size={12}/></p>
                  <p className="text-lg font-black font-mono group-hover:text-[#ff4655] transition-colors">{BANK_DETAILS.ifsc}</p>
                </div>
              </div>
            </div>

            <div className="bg-[#1f2b38] border border-white/5 p-8 space-y-6">
              <div className="flex flex-col items-center">
                  <div className="w-48 aspect-square bg-white p-2 rounded relative group overflow-hidden">
                    <img src={QR_IMAGE_URL} alt="QR" className="w-full h-full object-contain" />
                    <div className="absolute inset-0 border-4 border-[#ff4655] opacity-10 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                  </div>
                  <p className="text-[10px] text-gray-500 font-mono mt-4 uppercase italic">Scan to Pay via UPI</p>
              </div>

              <div className="space-y-4 pt-4 border-t border-white/10">
                <div className="space-y-1">
                  <label className="text-[9px] text-gray-500 font-bold uppercase italic tracking-widest">01. Transaction ID</label>
                  <input name="txnId" value={formData.txnId} onChange={handleInputChange} placeholder="TXN_REQUIRED" className="w-full bg-[#0f1923] border border-white/10 p-4 text-xs font-mono focus:border-[#ff4655] outline-none text-white uppercase" />
                </div>
                
                <div className="space-y-1">
                  <label className="text-[9px] text-gray-500 font-bold uppercase italic tracking-widest">02. Proof of Payment</label>
                  <div className={`relative border-2 border-dashed transition-all p-6 text-center ${preview ? 'border-[#ff4655] bg-[#ff4655]/5' : 'border-white/10 bg-[#0f1923] hover:border-[#ff4655]'}`}>
                    <input type="file" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer z-20" />
                    
                    {preview ? (
                      <div className="flex flex-col items-center gap-2">
                        <img src={preview} alt="Preview" className="w-16 h-16 object-cover border border-[#ff4655] rounded" />
                        <p className="text-[10px] text-[#ff4655] font-black uppercase tracking-widest">Screenshot Verified ✓</p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2">
                        <ImageIcon size={20} className="text-gray-500" />
                        <p className="text-[10px] font-mono text-gray-500 uppercase">Drop Screenshot Here</p>
                      </div>
                    )}
                  </div>
                </div>

                {errorMessage && <p className="text-red-500 text-[10px] font-bold uppercase italic text-center animate-pulse">{errorMessage}</p>}

                <button onClick={handleSubmit} disabled={status === 'loading'} className="w-full py-5 bg-[#ff4655] hover:bg-white hover:text-black text-white font-black uppercase italic tracking-widest transition-all skew-x-[-10deg] flex items-center justify-center gap-2 group">
                  {status === 'loading' ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : (
                    <>LOCK IN ENTRY <Target size={20} className="group-hover:rotate-45 transition-transform" /></>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValorantRegister;