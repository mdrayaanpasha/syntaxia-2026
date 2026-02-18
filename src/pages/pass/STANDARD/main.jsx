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

  // --- OFFICIAL SJU CONFIG ---
  const BASE_PRICE = 339;
  const GST_AMOUNT = 61; 
  const TOTAL_PRICE = "₹400";
  
  const BANK_DETAILS = {
    name: "ST JOSEPHS UNIVERSITY COLLECTION ACCOUNT",
    account: "0964073000000053",
    ifsc: "SIBL0000964",
    bank: "South Indian Bank",
    branch: "0964 Langford Road Branch"
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
  const [copyStatus, setCopyStatus] = useState('');

  // --- EVENTS DATA (Previous Logic Preserved) ---
  const standardEvents = [
    { id: 3, dbId: "cmlgm1wy10003wpijxnoslqtr", title: "FLAG FEST", cat: "Technical", img: "https://ik.imagekit.io/yylpuqff5/Minecraft/HOMEPAGE/CTF.png" },
    { id: 4, dbId: "cmlgm1wy10005wpijzyma7iiu", title: "REDSTONE RUN", cat: "Technical", img: "https://ik.imagekit.io/yylpuqff5/Minecraft/HOMEPAGE/coding-debugging.png" },
    { id: 5, dbId: "cmlgm1wy10006wpijo6lm39g3", title: "MINECRAFT MURDER FILES", cat: "Technical", img: "https://ik.imagekit.io/yylpuqff5/Minecraft/HOMEPAGE/Data-Detective.png" },
    { id: 6, dbId: "cmlgm1wy10004wpij622cseeu", title: "STEVE'S TRIAL", cat: "Technical", img: "https://ik.imagekit.io/yylpuqff5/Minecraft/HOMEPAGE/IT_QUIZ.png" },
    { id: 7, dbId: "cmlgm1wy10007wpijl52gfwxj", title: "IPL AUCTION", cat: "Non-Technical", img: "https://ik.imagekit.io/yylpuqff5/Minecraft/HOMEPAGE/Ipl-Auction.png" },
    { id: 8, dbId: "cmlgm1wy10008wpij9wkl7ggo", title: "WEEB WARS", cat: "Non-Technical", img: "https://ik.imagekit.io/yylpuqff5/Minecraft/HOMEPAGE/Anime-Quiz.png" },
    { id: 9, dbId: "cmlgm1wy10009wpij3ufrl65m", title: "MINE YOUR WAY OUT", cat: "Non-Technical", img: "https://ik.imagekit.io/yylpuqff5/Minecraft/HOMEPAGE/Escape-Room.png" },
    { id: 10, dbId: "cmlgm1wy1000awpijjbkedi4h", title: "BUSINESS REVIVAL", cat: "Non-Technical", img: "https://ik.imagekit.io/yylpuqff5/Minecraft/HOMEPAGE/Bs-Event.png" },
    { id: 11, dbId: "cmlgm1wy1000bwpij0508s1t8", title: "CRAFT THE SCENE", cat: "Non-Technical", img: "https://ik.imagekit.io/yylpuqff5/Minecraft/HOMEPAGE/Reels-IG.png" }
  ];

  // --- AUTH & PASS CHECK (Previous Logic Preserved) ---
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
            setTimeout(() => navigate('/dashboard'), 5000);
            return;
          }
        }
      } catch (error) { console.error(error); } finally { setCheckingPass(false); }
    };
    checkAuthAndPass();
  }, [navigate, location]);

  const toggleEvent = (dbId) => setSelectedEvents(prev => prev.includes(dbId) ? prev.filter(id => id !== dbId) : [...prev, dbId]);
  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopyStatus(label);
    setTimeout(() => setCopyStatus(''), 2000);
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
    if (selectedEvents.length === 0) { setStatus('error'); setErrorMessage('Select at least one event.'); return; }
    if (!file || !formData.txnId) { setStatus('error'); setErrorMessage('UTR and Screenshot are required.'); return; }
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
      if (!response.ok) throw new Error('Network error.');
      setStatus('success');
    } catch (err) { setStatus('error'); setErrorMessage(err.message); }
  };

  if (checkingPass) return <div className="min-h-screen bg-[#050505] flex items-center justify-center font-minecraft text-[#55aa55]"><Zap size={48} className="animate-bounce" /></div>;

  return (
    <div className="min-h-screen bg-[#050505] text-gray-200 font-minecraft">
      <PremiumNavbar />
      <div className="max-w-7xl mx-auto px-4 py-24">
        
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[#55aa55] mb-8 font-mono text-sm uppercase">
          <ChevronLeft size={20} /> GO_BACK
        </button>

        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* LEFT: FORM & EVENTS */}
          <div className="lg:col-span-7 space-y-10">
            <div>
              <h1 className="text-6xl font-black text-white italic tracking-tighter">STANDARD <span className="text-[#55aa55]">PASS</span></h1>
              <p className="text-gray-500 font-mono text-[10px] mt-2 uppercase tracking-widest flex items-center gap-2">
                <Info size={14} className="text-[#55aa55]"/> OFFICIAL UNIVERSITY REGISTRATION PORTAL
              </p>
            </div>

            {/* EVENT SELECTION */}
            <section className="space-y-4">
              <h3 className="text-[#55aa55] font-mono text-xs tracking-widest uppercase flex items-center gap-2"><Terminal size={14} /> 01. Quests</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {standardEvents.map((evt) => (
                  <div key={evt.id} onClick={() => toggleEvent(evt.dbId)} className={`cursor-pointer border-2 transition-all p-2 bg-[#0a0a0a] relative ${selectedEvents.includes(evt.dbId) ? 'border-[#55aa55]' : 'border-[#222] opacity-50'}`}>
                    <img src={evt.img} alt={evt.title} className="w-full h-16 object-cover mb-2 grayscale" />
                    <p className="text-[9px] font-bold text-white uppercase italic truncate">{evt.title}</p>
                    {selectedEvents.includes(evt.dbId) && <CheckCircle2 size={14} className="absolute top-1 right-1 text-[#55aa55]" />}
                  </div>
                ))}
              </div>
            </section>

            {/* PERSONAL DATA */}
            <section className="space-y-4 bg-[#0a0a0a] border border-[#222] p-6">
                <h3 className="text-[#55aa55] font-mono text-xs uppercase flex items-center gap-2"><User size={14} /> 02. Personal Data</h3>
                <div className="grid md:grid-cols-2 gap-4">
                    {['name', 'phoneno', 'college', 'course'].map((f) => (
                        <input 
                            key={f} name={f} value={formData[f]} onChange={handleInputChange}
                            placeholder={`ENTER ${f.toUpperCase()}`}
                            className="bg-black border border-[#222] p-3 text-xs font-mono focus:border-[#55aa55] outline-none text-white"
                        />
                    ))}
                </div>
            </section>
          </div>

          {/* RIGHT: GIANT BANK DETAILS & PAYMENT */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 space-y-6">
              
              {/* PRICE HEADER */}
              <div className="bg-[#55aa55] p-6 text-black border-4 border-black shadow-[4px_4px_0px_#000]">
                <p className="text-[10px] font-black uppercase tracking-widest opacity-80">Payable Amount</p>
                <h2 className="text-6xl font-black italic tracking-tighter">{TOTAL_PRICE}</h2>
                <p className="text-[10px] font-bold mt-2 font-mono">INCL. 18% GST (₹{GST_AMOUNT})</p>
              </div>

              {/* GIANT BANK DETAILS BOX */}
              <div className="bg-white p-6 border-4 border-[#55aa55] text-black">
                <div className="flex items-center gap-2 text-black font-black text-xs uppercase mb-4 border-b-2 border-black pb-2">
                    <Landmark size={18} /> OFFICIAL BANK ACCOUNT
                </div>
                
                <div className="space-y-6">
                    <div className="group relative">
                        <p className="text-[9px] font-bold text-gray-500 uppercase">Beneficiary Name</p>
                        <p className="text-sm font-black leading-tight">{BANK_DETAILS.name}</p>
                    </div>

                    <div className="relative group cursor-pointer bg-gray-100 p-3 border-l-4 border-black hover:bg-gray-200 transition-colors" onClick={() => handleCopy(BANK_DETAILS.account, 'ACCOUNT NUMBER')}>
                        <p className="text-[9px] font-bold text-gray-400 uppercase flex justify-between">
                            Account Number {copyStatus === 'ACCOUNT NUMBER' && <span className="text-[#55aa55]">COPIED!</span>}
                        </p>
                        <p className="text-2xl font-black tracking-tighter font-mono">{BANK_DETAILS.account}</p>
                        <Copy size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-black" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="relative group cursor-pointer bg-gray-100 p-3 border-l-4 border-black" onClick={() => handleCopy(BANK_DETAILS.ifsc, 'IFSC')}>
                            <p className="text-[9px] font-bold text-gray-400 uppercase">IFSC Code</p>
                            <p className="text-lg font-black font-mono">{BANK_DETAILS.ifsc}</p>
                            <Copy size={12} className="absolute right-2 top-2 text-gray-300" />
                        </div>
                        <div className="p-3 border-l-4 border-gray-200">
                            <p className="text-[9px] font-bold text-gray-400 uppercase">Account Type</p>
                            <p className="text-lg font-black uppercase">Current</p>
                        </div>
                    </div>
                </div>
              </div>

              {/* QR & PROOF SECTION */}
              <div className="bg-[#0a0a0a] border border-[#222] p-6 space-y-6">
                <div className="flex justify-center">
                    <div className="w-40 aspect-[1/1] bg-white rounded-lg p-2 border-2 border-[#55aa55] relative group">
                        <img 
                            src="https://ik.imagekit.io/yylpuqff5/QR.png" 
                            alt="9:16 QR" className="w-full h-full object-cover"
                        />
                        <div className="absolute -top-3 -right-3 bg-[#55aa55] text-black text-[8px] font-black px-2 py-1 rotate-12 shadow-lg">UPI SCAN</div>
                    </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-[#222]">
                    <div className="space-y-1">
                        <label className="text-[9px] text-gray-600 font-mono uppercase">Transaction UTR / ID</label>
                        <input 
                            name="txnId" value={formData.txnId} onChange={handleInputChange}
                            className="w-full bg-black border border-[#222] p-4 text-xs font-mono focus:border-[#55aa55] outline-none text-white"
                            placeholder="ENTER REF NUMBER"
                        />
                    </div>

                    <div className="relative bg-black border-2 border-dashed border-[#222] p-4 text-center hover:border-[#55aa55] transition-all">
                        <input type="file" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                        {preview ? <img src={preview} alt="Proof" className="h-12 mx-auto" /> : <p className="text-[9px] font-mono text-gray-600 uppercase">Upload Screenshot</p>}
                    </div>

                    {errorMessage && <p className="text-red-500 text-[9px] font-mono uppercase">{errorMessage}</p>}

                    <button
                        onClick={handleSubmit} disabled={status === 'loading'}
                        className="w-full py-5 bg-white hover:bg-[#55aa55] text-black font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-[4px_4px_0px_#222]"
                    >
                        {status === 'loading' ? 'VERIFYING...' : 'REGISTER PASS'} <Zap size={20} fill="black" />
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