import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Terminal, Upload, User, Smartphone, 
  School, Book, Check, AlertCircle, 
  ChevronLeft, CreditCard, Users, Zap, CheckCircle2,
  ShieldCheck, Loader2, Landmark, Info, QrCode, Copy
} from 'lucide-react';
import PremiumNavbar from '../../home/components/nav';

const StandardPassRegister = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // --- CONFIG ---
  const BASE_PRICE = 339;
  const GST_AMOUNT = 61; 
  const TOTAL_PRICE = "₹400";
  const BANK_DETAILS = {
    name: "ST JOSEPHS UNIVERSITY COLLECTION ACCOUNT",
    account: "0964073000000053",
    ifsc: "SIBL0000964",
    bank: "South Indian Bank",
  };

  // --- STATE ---
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [formData, setFormData] = useState({ name: '', college: '', phoneno: '', course: '', txnId: '' });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [status, setStatus] = useState('idle'); 
  const [errorMessage, setErrorMessage] = useState('');
  const [checkingPass, setCheckingPass] = useState(true);
  const [isAlreadyRegistered, setIsAlreadyRegistered] = useState(false);
  const [countdown, setCountdown] = useState(5);

  // --- PRE-ENTRY AUTH CHECK ---
  useEffect(() => {
    const checkAuthAndPass = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        localStorage.setItem("redir", `${location.pathname}${location.search}`);
        navigate('/auth'); return;
      }
      try {
        const response = await fetch('https://note-taking-server-kappa.vercel.app/api/user/pass-check/NON_GAMING', {
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
      } catch (error) { console.error(error); } finally { setCheckingPass(false); }
    };
    checkAuthAndPass();
  }, [navigate]);

  // --- REDIRECT LOGIC ---
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
  const toggleEvent = (dbId) => setSelectedEvents(prev => prev.includes(dbId) ? prev.filter(id => id !== dbId) : [...prev, dbId]);
  
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedEvents.length === 0 || !file || !formData.txnId) {
      setStatus('error');
      setErrorMessage('Selection & Proof Required');
      return;
    }

    setStatus('loading');
    try {
      const payload = new FormData();
      payload.append("type", "NON_GAMING");
      payload.append("eventIdArray", JSON.stringify(selectedEvents));
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

      if (!response.ok) throw new Error('System sync failed. Check UTR.');
      
      setStatus('success');
      startRedirectTimer('/dashboard');
    } catch (err) {
      setStatus('error');
      setErrorMessage(err.message);
    }
  };

  // --- SCREEN: LOADING ---
  if (checkingPass) return (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center font-minecraft text-[#55aa55]">
      <Loader2 size={48} className="animate-spin mb-4" />
      <p className="animate-pulse tracking-widest text-xs">VERIFYING PROTOCOLS...</p>
    </div>
  );

  // --- SCREEN: SUCCESS / ALREADY REGISTERED ---
  if (status === 'success' || isAlreadyRegistered) return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 font-minecraft text-white">
      <div className="bg-[#0a0a0a] border-2 border-[#55aa55] p-12 text-center shadow-[0_0_60px_rgba(85,170,85,0.2)] relative overflow-hidden max-w-md w-full">
        <div className="absolute top-0 left-0 w-full h-1 bg-[#55aa55] transition-all duration-5000 ease-linear" style={{ width: `${(countdown/5)*100}%` }}></div>
        <CheckCircle2 size={64} className="text-[#55aa55] mx-auto mb-6 animate-bounce" />
        <h2 className="text-3xl font-black text-[#55aa55] italic mb-2">ACCESS GRANTED</h2>
        <p className="text-gray-400 font-mono text-[10px] uppercase mb-8">
          {isAlreadyRegistered ? 'Existing Pass Detected.' : 'Registration Synchronized Successfully.'}
        </p>
        <div className="bg-[#55aa55]/10 border border-[#55aa55] p-4 font-mono text-[#55aa55] text-xs">
          WARPING TO DASHBOARD IN <span className="font-black text-xl">{countdown}</span>S
        </div>
      </div>
    </div>
  );

  // --- SCREEN: MAIN FORM ---
  return (
    <div className="min-h-screen bg-[#050505] text-gray-200 font-minecraft">
      <PremiumNavbar />
      <div className="max-w-7xl mx-auto px-4 py-24">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[#55aa55] mb-8 font-mono text-sm uppercase"><ChevronLeft size={20} /> BACK</button>

        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* LEFT: INFO & SELECTION */}
          <div className="lg:col-span-7 space-y-12">
            <div>
              <h1 className="text-6xl md:text-7xl font-black text-white italic tracking-tighter">STANDARD <span className="text-[#55aa55]">PASS</span></h1>
              <p className="text-gray-500 font-mono text-[10px] mt-2 uppercase flex items-center gap-2 italic">
                <Info size={14} className="text-[#55aa55]"/> Authorized University Event Registration
              </p>
            </div>

            <section className="space-y-4">
              <h3 className="text-[#55aa55] font-mono text-xs tracking-widest uppercase flex items-center gap-2"><Terminal size={14} /> 01. Participant Data</h3>
              <div className="grid md:grid-cols-2 gap-4 bg-[#0a0a0a] border border-[#222] p-6">
                  {['name', 'phoneno', 'college', 'course'].map((f) => (
                      <input key={f} name={f} value={formData[f]} onChange={handleInputChange} placeholder={`ENTER ${f.toUpperCase()}`} className="bg-black border border-[#222] p-3 text-xs font-mono focus:border-[#55aa55] outline-none text-white" />
                  ))}
              </div>
            </section>

            <section className="space-y-4">
              <h3 className="text-[#55aa55] font-mono text-xs uppercase flex items-center gap-2"><Zap size={14} /> 02. Select Events</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {/* Event list map logic... */}
              </div>
            </section>
          </div>

          {/* RIGHT: GIANT BANKING & PAYMENT */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 space-y-6">
              
              <div className="bg-[#55aa55] p-6 text-black border-4 border-black">
                <p className="text-[10px] font-black uppercase tracking-widest opacity-80">Total Due</p>
                <h2 className="text-6xl font-black italic">{TOTAL_PRICE}</h2>
                <p className="text-[10px] font-bold mt-2 font-mono">REG: ₹{BASE_PRICE} + GST: ₹{GST_AMOUNT}</p>
              </div>

              <div className="bg-white p-6 border-4 border-[#55aa55] text-black space-y-4">
                <p className="text-[10px] font-black uppercase border-b-2 border-black pb-1">University Bank Details</p>
                <div>
                  <p className="text-[8px] font-bold text-gray-500 uppercase">Beneficiary</p>
                  <p className="text-xs font-black">{BANK_DETAILS.name}</p>
                </div>
                <div className="bg-gray-100 p-3 border-l-4 border-black group cursor-pointer" onClick={() => {navigator.clipboard.writeText(BANK_DETAILS.account); alert('Copied!')}}>
                  <p className="text-[8px] font-bold text-gray-400 uppercase">Account Number (Click to copy)</p>
                  <p className="text-2xl font-black font-mono tracking-tighter">{BANK_DETAILS.account}</p>
                </div>
                <div className="bg-gray-100 p-3 border-l-4 border-black">
                  <p className="text-[8px] font-bold text-gray-400 uppercase">IFSC Code</p>
                  <p className="text-xl font-black font-mono">{BANK_DETAILS.ifsc}</p>
                </div>
              </div>

              <div className="bg-[#0a0a0a] border border-[#222] p-6 space-y-6">
                <div className="flex flex-col items-center">
                    <div className="w-32 aspect-[9/16] bg-white p-1 rounded-lg">
                      <img src={`https://api.qrserver.com/v1/create-qr-code/?size=400x711&data=upi://pay?pa=syntaxia@sju&am=400`} alt="QR" className="w-full h-full object-cover" />
                    </div>
                    <p className="text-[9px] text-gray-500 font-mono mt-4 uppercase italic">Scan with any UPI App</p>
                </div>

                <div className="space-y-4 pt-4 border-t border-[#222]">
                    <input name="txnId" value={formData.txnId} onChange={handleInputChange} placeholder="UTR / REF NUMBER" className="w-full bg-black border border-[#222] p-4 text-xs font-mono focus:border-[#55aa55] outline-none text-white" />
                    
                    <div className="relative bg-black border-2 border-dashed border-[#222] p-4 text-center hover:border-[#55aa55]">
                        <input type="file" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                        <p className="text-[9px] font-mono text-gray-500 uppercase">{file ? file.name : 'Upload Payment Proof'}</p>
                    </div>

                    {errorMessage && <p className="text-red-500 text-[9px] font-mono uppercase italic">{errorMessage}</p>}

                    <button onClick={handleSubmit} disabled={status === 'loading'} className="w-full py-5 bg-white hover:bg-[#55aa55] text-black font-black uppercase italic transition-all flex items-center justify-center gap-2">
                        {status === 'loading' ? 'SYNCING...' : 'REGISTER PASS'} <Zap size={20} fill="black" />
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

export default StandardPassRegister;