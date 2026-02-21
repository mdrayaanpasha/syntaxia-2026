import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Terminal, Upload, User, ChevronLeft, Zap, CheckCircle2,
  Loader2, Landmark, Info, Copy, MessageCircle, 
  ExternalLink, Image as ImageIcon, Calendar, MapPin, Clock
} from 'lucide-react';
import PremiumNavbar from '../../home/components/nav';

const StandardPassRegister = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // --- QUEST DATA ---
  const quests = [
    { id: 3, dbId: "cmlgm1wy10003wpijxnoslqtr", title: "FLAG FEST", cat: "Technical", day: "DAY 1", accent: "#55aa55" },
    { id: 4, dbId: "cmlgm1wy10005wpijzyma7iiu", title: "REDSTONE RUN", cat: "Technical", day: "DAY 1", accent: "#55aa55" },
    { id: 5, dbId: "cmlgm1wy10006wpijo6lm39g3", title: "MURDER FILES", cat: "Technical", day: "DAY 2", accent: "#55aa55" },
    { id: 6, dbId: "cmlgm1wy10004wpij622cseeu", title: "STEVE'S TRIAL", cat: "Technical", day: "DAY 2", accent: "#55aa55" },
    { id: 7, dbId: "cmlgm1wy10007wpijl52gfwxj", title: "IPL AUCTION", cat: "Non-Technical", day: "DAY 2", accent: "#ffcc00" },
    { id: 8, dbId: "cmlgm1wy10008wpij9wkl7ggo", title: "WEEB WARS", cat: "Non-Technical", day: "DAY 2", accent: "#ffcc00" },
    { id: 9, dbId: "cmlgm1wy10009wpij3ufrl65m", title: "MINE YOUR WAY", cat: "Non-Technical", day: "DAY 1", accent: "#ffcc00" },
    { id: 10, dbId: "cmlgm1wy1000awpijjbkedi4h", title: "BIZ REVIVAL", cat: "Non-Technical", day: "DAY 1", accent: "#ffcc00" },
    { id: 11, dbId: "cmlgm1wy1000bwpij0508s1t8", title: "CRAFT SCENE", cat: "Non-Technical", day: "DAY 1", accent: "#ffcc00" },
  ];

  const WHATSAPP_LINK = "https://chat.whatsapp.com/HWQRNPMYzYcAHcuWSX0ALW?mode=gi_t";
  const QR_IMAGE_URL = "https://ik.imagekit.io/yylpuqff5/QR.png?updatedAt=1771395151703";
  const BANK_DETAILS = {
    name: "ST JOSEPHS UNIVERSITY COLLECTION ACCOUNT",
    account: "0964073000000053",
    ifsc: "SIBL0000964",
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

  useEffect(() => {
    const checkAuthAndPass = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        localStorage.setItem("redir", `${location.pathname}${location.search}`);
        navigate('/auth'); return;
      }
      try {
        const response = await fetch('https://note-taking-server-kappa.vercel.app/api/user/pass-check/NON_GAMING', {
          method: 'GET', headers: { "Authorization": `Bearer ${token}` }
        });
        if (response.ok) {
          const data = await response.json();
          if (data.exists) setIsAlreadyRegistered(true);
        }
      } catch (error) { console.error(error); } finally { setCheckingPass(false); }
    };
    checkAuthAndPass();
  }, [navigate, location.pathname, location.search]);

  // --- HANDLERS ---
  const toggleEvent = (dbId) => {
    setSelectedEvents(prev => prev.includes(dbId) ? prev.filter(id => id !== dbId) : [...prev, dbId]);
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
    if (selectedEvents.length === 0) return (setStatus('error'), setErrorMessage('Select at least one event'));
    if (!file || !formData.txnId) return (setStatus('error'), setErrorMessage('Proof & UTR Required'));

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

      if (!response.ok) throw new Error('Uplink failed. Check UTR.');
      setStatus('success');
    } catch (err) { setStatus('error'); setErrorMessage(err.message); }
  };

  if (checkingPass) return <div className="min-h-screen bg-black flex items-center justify-center font-minecraft text-[#55aa55] tracking-widest uppercase italic">Initializing Protocols...</div>;

  if (status === 'success' || isAlreadyRegistered) return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 font-minecraft text-white">
      <div className="bg-[#0a0a0a] border-2 border-[#55aa55] p-12 text-center shadow-[0_0_60px_rgba(85,170,85,0.2)] max-w-md w-full">
        <CheckCircle2 size={64} className="text-[#55aa55] mx-auto mb-6" />
        <h2 className="text-3xl font-black text-[#55aa55] italic mb-4">ACCESS GRANTED</h2>
        <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-3 bg-green-600 hover:bg-green-500 text-white py-4 px-6 mb-6 border-b-4 border-green-900 transition-all uppercase italic font-black">JOIN WHATSAPP COMMUNITY</a>
        <button onClick={() => navigate('/dashboard')} className="text-[10px] text-gray-500 hover:text-white transition-colors uppercase">GO TO DASHBOARD</button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] text-gray-200 font-minecraft selection:bg-[#55aa55]">
      <PremiumNavbar />
      <div className="max-w-7xl mx-auto px-4 py-24 relative z-10">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[#55aa55] mb-8 font-bold tracking-widest text-xs uppercase"><ChevronLeft size={20} /> ABORT_DROP</button>

        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* LEFT SIDE: SELECTION & DATA */}
          <div className="lg:col-span-7 space-y-12">
            <div>
              <h1 className="text-7xl font-black text-white italic tracking-tighter uppercase leading-[0.8] mb-4">STANDARD <span className="text-[#55aa55]">PASS</span></h1>
              <div className="flex gap-4 font-mono text-[10px] uppercase tracking-widest text-gray-500">
                <span className="flex items-center gap-1 text-[#55aa55]"><Info size={12}/> QUEST SELECTION REQUIRED</span>
                <span>CYBERNETICS ASSOCIATION</span>
              </div>
            </div>

            {/* EVENT GRID */}
            <section className="space-y-6">
              <h3 className="text-[#55aa55] font-mono text-xs uppercase flex items-center gap-2 tracking-[0.3em]"><Zap size={16} /> 01. SELECT YOUR QUESTS</h3>
              <div className="grid md:grid-cols-3 gap-3">
                {quests.map((q) => (
                  <div 
                    key={q.dbId} 
                    onClick={() => toggleEvent(q.dbId)}
                    className={`cursor-pointer border-2 p-4 transition-all relative overflow-hidden group ${selectedEvents.includes(q.dbId) ? 'border-[#55aa55] bg-[#55aa55]/10' : 'border-[#222] bg-[#0a0a0a] hover:border-gray-600'}`}
                  >
                    <p className="text-[8px] font-mono uppercase mb-1 opacity-50">{q.cat}</p>
                    <p className={`text-xs font-black uppercase italic ${selectedEvents.includes(q.dbId) ? 'text-[#55aa55]' : 'text-white'}`}>{q.title}</p>
                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-[9px] font-mono text-gray-600">{q.day}</span>
                      {selectedEvents.includes(q.dbId) && <CheckCircle2 size={14} className="text-[#55aa55]" />}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-6">
              <h3 className="text-[#55aa55] font-mono text-xs uppercase flex items-center gap-2 tracking-[0.3em]"><User size={16} /> 02. OPERATOR DATA</h3>
              <div className="grid md:grid-cols-2 gap-4 bg-[#0a0a0a] border border-[#222] p-6">
                  {['name', 'phoneno', 'college', 'course'].map((f) => (
                      <input key={f} name={f} value={formData[f]} onChange={(e) => setFormData({...formData, [f]: e.target.value})} placeholder={`INPUT_${f.toUpperCase()}`} className="bg-black border border-[#222] p-4 text-xs font-mono focus:border-[#55aa55] outline-none text-white uppercase" />
                  ))}
              </div>
            </section>

            <div className="bg-green-950/20 border-l-4 border-green-500 p-6 flex justify-between items-center gap-4">
              <div className="flex gap-4 items-center">
                <MessageCircle className="text-green-500" size={32} />
                <div><p className="text-white font-bold text-sm">COMMUNICATIONS HUB</p><p className="text-[10px] text-gray-400 font-mono">JOIN THE SQUAD FOR LIVE UPDATES</p></div>
              </div>
              <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="bg-green-600 px-6 py-2 text-xs font-black text-white hover:bg-green-500 transition-all uppercase italic">JOIN NOW</a>
            </div>
          </div>

          {/* RIGHT SIDE: PAYMENT */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#55aa55] p-6 text-black border-b-8 border-[#3d7a3d]">
              <p className="text-[10px] font-black uppercase tracking-widest opacity-70">Total Credits Required</p>
              <h2 className="text-6xl font-black italic tracking-tighter">₹400</h2>
              <p className="text-[10px] font-bold mt-2 font-mono uppercase tracking-widest opacity-80">Inclusive of 18% GST</p>
            </div>

            <div className="bg-white p-6 border-4 border-[#55aa55] text-black space-y-4 shadow-[8px_8px_0px_rgba(85,170,85,0.2)]">
              <p className="text-[10px] font-black uppercase border-b-2 border-black pb-2 flex items-center gap-2"><Landmark size={14}/> SJU COLLECTION ACCOUNT</p>
              <div className="space-y-4">
                <div className="bg-gray-100 p-4 border-l-4 border-black cursor-pointer group" onClick={() => (navigator.clipboard.writeText(BANK_DETAILS.account), alert('Copied!'))}>
                  <p className="text-[8px] font-bold text-gray-400 uppercase flex justify-between tracking-tighter">ACCOUNT NUMBER <Copy size={12}/></p>
                  <p className="text-2xl font-black font-mono tracking-tighter group-hover:text-[#55aa55] transition-colors">{BANK_DETAILS.account}</p>
                </div>
                <div className="bg-gray-100 p-4 border-l-4 border-black cursor-pointer" onClick={() => (navigator.clipboard.writeText('SIBL0000964'), alert('Copied!'))}>
                  <p className="text-[8px] font-bold text-gray-400 uppercase">IFSC CODE</p>
                  <p className="text-xl font-black font-mono tracking-tighter">SIBL0000964</p>
                </div>
              </div>
            </div>

            <div className="bg-[#0a0a0a] border border-[#222] p-8 space-y-6">
              <div className="flex flex-col items-center">
                  <div className="w-48 aspect-square bg-white p-2 rounded relative group overflow-hidden">
                    <img src={QR_IMAGE_URL} alt="QR" className="w-full h-full object-contain" />
                  </div>
                  <p className="text-[9px] text-gray-500 font-mono mt-4 uppercase italic tracking-widest">Scan to Pay via UPI</p>
              </div>

              <div className="space-y-4 pt-4 border-t border-[#222]">
                <div className="space-y-1">
                  <label className="text-[9px] text-gray-600 font-mono uppercase italic tracking-widest">01. TRANSACTION ID</label>
                  <input name="txnId" value={formData.txnId} onChange={(e) => setFormData({...formData, txnId: e.target.value})} placeholder="REF_REQUIRED" className="w-full bg-black border border-[#222] p-4 text-xs font-mono focus:border-[#55aa55] outline-none text-white uppercase" />
                </div>
                
                <div className="space-y-1">
                  <label className="text-[9px] text-gray-600 font-mono uppercase italic tracking-widest">02. PROOF OF PAYMENT</label>
                  <div className={`relative border-2 border-dashed transition-all p-8 text-center ${preview ? 'border-[#55aa55] bg-[#55aa55]/5' : 'border-[#222] bg-black hover:border-[#55aa55]'}`}>
                    <input type="file" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer z-20" />
                    {preview ? (
                      <div className="flex flex-col items-center gap-2">
                        <img src={preview} alt="Preview" className="w-20 h-20 object-cover border-2 border-[#55aa55] rounded shadow-2xl" />
                        <p className="text-[10px] text-[#55aa55] font-black uppercase italic tracking-widest">LOADED ✓</p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-3">
                        <ImageIcon size={24} className="text-gray-600" />
                        <p className="text-[10px] font-mono text-gray-600 uppercase">DROP_SCREENSHOT</p>
                      </div>
                    )}
                  </div>
                </div>

                {errorMessage && <p className="text-red-500 text-[10px] font-mono uppercase italic text-center animate-pulse">{errorMessage}</p>}
                
                <button onClick={handleSubmit} disabled={status === 'loading'} className="w-full py-6 bg-white hover:bg-[#55aa55] text-black font-black uppercase italic tracking-tighter transition-all flex items-center justify-center gap-3">
                  {status === 'loading' ? <Loader2 className="animate-spin" size={20} /> : <>DEPLOY PASS <Zap size={20} /></>}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StandardPassRegister;