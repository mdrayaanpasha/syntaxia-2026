import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Terminal, Upload, User, Smartphone, 
  School, Book, Check, AlertCircle, 
  ChevronLeft, CreditCard, Users, Zap, CheckCircle2,
  ShieldCheck, Loader2
} from 'lucide-react';
import PremiumNavbar from '../../home/components/nav';

const StandardPassRegister = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // --- CONFIG ---
  const PASS_PRICE = "₹328 + ₹72 = ₹400"; 
  const UPI_ID = "syntaxia@sju"; 

  // --- EVENTS DATA ---
  const standardEvents = [
    {
      id: 3,
      dbId: "cmlgm1wy10003wpijxnoslqtr",
      title: "FLAG FEST",
      cat: "Technical",
      desc: "Beginner-friendly Capture The Flag.",
      img: "https://ik.imagekit.io/yylpuqff5/Minecraft/HOMEPAGE/CTF.png",
    },
    {
      id: 4,
      dbId: "cmlgm1wy10005wpijzyma7iiu",
      title: "REDSTONE RUN",
      cat: "Technical",
      desc: "Competitive coding and debugging.",
      img: "https://ik.imagekit.io/yylpuqff5/Minecraft/HOMEPAGE/coding-debugging.png",
    },
    {
      id: 5,
      dbId: "cmlgm1wy10006wpijo6lm39g3",
      title: "MINECRAFT MURDER FILES",
      cat: "Technical",
      desc: "Solve a mystery with SQL queries.",
      img: "https://ik.imagekit.io/yylpuqff5/Minecraft/HOMEPAGE/Data-Detective.png",
    },
    {
      id: 6,
      dbId: "cmlgm1wy10004wpij622cseeu",
      title: "STEVE'S TRIAL",
      cat: "Technical",
      desc: "Minecraft-themed survival IT quiz.",
      img: "https://ik.imagekit.io/yylpuqff5/Minecraft/HOMEPAGE/IT_QUIZ.png",
    },
    {
      id: 7,
      dbId: "cmlgm1wy10007wpijl52gfwxj",
      title: "IPL AUCTION",
      cat: "Non-Technical",
      desc: "Strategy-based cricket bidding.",
      img: "https://ik.imagekit.io/yylpuqff5/Minecraft/HOMEPAGE/Ipl-Auction.png",
    },
    {
      id: 8,
      dbId: "cmlgm1wy10008wpij9wkl7ggo",
      title: "WEEB WARS",
      cat: "Non-Technical",
      desc: "Battle of anime knowledge.",
      img: "https://ik.imagekit.io/yylpuqff5/Minecraft/HOMEPAGE/Anime-Quiz.png",
    },
    {
      id: 9,
      dbId: "cmlgm1wy10009wpij3ufrl65m",
      title: "MINE YOUR WAY OUT",
      cat: "Non-Technical",
      desc: "Immersive Minecraft escape room.",
      img: "https://ik.imagekit.io/yylpuqff5/Minecraft/HOMEPAGE/Escape-Room.png",
    },
    {
      id: 10,
      dbId: "cmlgm1wy1000awpijjbkedi4h",
      title: "BUSINESS REVIVAL",
      cat: "Non-Technical",
      desc: "Solve real-world brand failures.",
      img: "https://ik.imagekit.io/yylpuqff5/Minecraft/HOMEPAGE/Bs-Event.png",
    },
    {
      id: 11,
      dbId: "cmlgm1wy1000bwpij0508s1t8",
      title: "CRAFT THE SCENE",
      cat: "Non-Technical",
      desc: "Storytelling via Minecraft reels.",
      img: "https://ik.imagekit.io/yylpuqff5/Minecraft/HOMEPAGE/Reels-IG.png",
    }
  ];

  // --- STATE ---
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    college: '',
    phoneno: '',
    course: '',
    txnId: ''
  });
  
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [status, setStatus] = useState('idle'); 
  const [errorMessage, setErrorMessage] = useState('');
  
  // New States for Checks
  const [checkingPass, setCheckingPass] = useState(true);
  const [isAlreadyRegistered, setIsAlreadyRegistered] = useState(false);

  // --- AUTH & PASS CHECK LOGIC ---
  useEffect(() => {
    const checkAuthAndPass = async () => {
      const token = localStorage.getItem('token');
      
      // 1. If No Token -> Redirect to Auth
      if (!token) {
        // Save current page to redirect back after login
        localStorage.setItem("redir", `${location.pathname}${location.search}`);
        navigate('/auth'); 
        return;
      }

      // 2. Check if user already has this pass
      try {
        const response = await fetch('https://note-taking-server-kappa.vercel.app/api/user/pass-check/NON_GAMING', {
          method: 'GET',
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          if (data.exists) {
            // --- USER HAS PASS ---
            setIsAlreadyRegistered(true);
            setCheckingPass(false); // Stop loading, show the "Already Registered" UI
            
            // Wait 5 seconds, then redirect
            setTimeout(() => {
              navigate('/dashboard');
            }, 5000);
            return;
          }
        }
      } catch (error) {
        console.error("Failed to check pass status:", error);
      } finally {
        setCheckingPass(false); // Stop loading if we didn't return early
      }
    };

    checkAuthAndPass();
  }, [navigate, location]);


  // --- HANDLERS ---
  const toggleEvent = (dbId) => {
    if (selectedEvents.includes(dbId)) {
      setSelectedEvents(selectedEvents.filter(id => id !== dbId));
    } else {
      setSelectedEvents([...selectedEvents, dbId]);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
    setStatus('loading');
    setErrorMessage('');

    const token = localStorage.getItem('token');
    if (!token) {
      localStorage.setItem("redir", `${location.pathname}${location.search}`);
      navigate('/auth');
      return;
    }

    if (selectedEvents.length === 0) {
      setStatus('error');
      setErrorMessage('Please select at least one event.');
      return;
    }

    if (!file) {
      setStatus('error');
      setErrorMessage('Please upload the payment screenshot.');
      return;
    }

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
        headers: {
          "Authorization": `Bearer ${token}` 
        },
        body: payload 
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      setStatus('success');

    } catch (error) {
      console.error(error);
      setStatus('error');
      setErrorMessage(error.message);
    }
  };

  // --- VIEW 1: CHECKING STATUS (Loading) ---
  if (checkingPass) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center font-minecraft text-[#55aa55]">
        <div className="text-center">
          <Zap size={48} className="animate-bounce mx-auto mb-4" />
          <p className="text-xl animate-pulse tracking-widest">VERIFYING CREDENTIALS...</p>
        </div>
      </div>
    );
  }

  // --- VIEW 2: ALREADY REGISTERED (5 Second Delay) ---
  if (isAlreadyRegistered) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 font-minecraft text-white">
        <div className="bg-[#0a0a0a] border-2 border-[#55aa55] p-12 max-w-lg w-full text-center shadow-[0_0_50px_rgba(85,170,85,0.3)] relative overflow-hidden">
          
          {/* Animated Background Scanline */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(85,170,85,0.1)_50%,transparent_50%)] bg-[length:100%_4px] pointer-events-none"></div>

          <div className="w-24 h-24 bg-[#55aa55]/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-[#55aa55]">
            <ShieldCheck size={48} className="text-[#55aa55]" />
          </div>
          
          <h2 className="text-3xl font-black mb-4 text-[#55aa55] uppercase tracking-tighter">
            PASS DETECTED
          </h2>
          
          <p className="text-gray-300 mb-8 font-mono text-sm leading-relaxed">
            You are already registered for the <span className="text-[#55aa55] font-bold">Standard Pass</span>. 
            <br/> Redirecting to your dashboard...
          </p>

          <div className="flex items-center justify-center gap-3 text-[#55aa55] text-xs font-mono animate-pulse">
            <Loader2 className="animate-spin" size={16} />
            <span>WARPING...</span>
          </div>
        </div>
      </div>
    );
  }

  // --- VIEW 3: SUCCESS AFTER REGISTRATION ---
  if (status === 'success') {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 font-minecraft text-white">
        <div className="bg-[#0a0a0a] border-2 border-[#55aa55] p-10 max-w-md w-full text-center shadow-[0_0_50px_rgba(85,170,85,0.2)]">
          <div className="w-20 h-20 bg-[#55aa55]/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={40} className="text-[#55aa55]" />
          </div>
          <h2 className="text-3xl font-black mb-2 text-[#55aa55]">ACCESS GRANTED</h2>
          <p className="text-gray-400 mb-8 font-mono">
            Your Standard Pass is active. <br/> 
            Welcome to the system.
          </p>
          <button 
            onClick={() => navigate('/')}
            className="w-full py-4 bg-[#55aa55] hover:bg-[#448844] text-black font-bold uppercase tracking-widest transition-colors"
          >
            Return to Lobby
          </button>
        </div>
      </div>
    );
  }

  // --- VIEW 4: MAIN REGISTRATION FORM ---
  return (
    <div className="min-h-screen bg-[#050505] text-gray-200 font-minecraft selection:bg-[#55aa55] selection:text-black">
      <PremiumNavbar />
      
      <div className="max-w-7xl mx-auto px-4 py-12 pt-24 relative z-10">
        
        {/* HEADER */}
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[#55aa55] mb-8 hover:-translate-x-1 transition-transform">
          <ChevronLeft size={20} /> GO_BACK
        </button>

        <div className="mb-12 border-b border-[#333] pb-8">
          <h1 className="text-5xl md:text-7xl font-black text-white italic tracking-tighter [text-shadow:4px_4px_0px_#225522]">
            STANDARD <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#55aa55] to-green-300">PASS</span>
          </h1>
          <p className="text-gray-400 font-mono mt-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-[#55aa55] animate-pulse"></span>
            BASE ENTRY FEE: <span className="text-[#55aa55] font-bold">{PASS_PRICE}</span>
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* LEFT: EVENT SELECTION & FORM */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* 1. Event Selection Grid */}
            <section>
              <h3 className="text-[#55aa55] font-mono text-sm tracking-[0.3em] mb-4 uppercase flex items-center gap-2">
                <Terminal size={16} /> 01. Select Quests
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                {standardEvents.map((evt) => {
                  const isSelected = selectedEvents.includes(evt.dbId);
                  return (
                    <div 
                      key={evt.id}
                      onClick={() => toggleEvent(evt.dbId)}
                      className={`
                        cursor-pointer relative overflow-hidden h-32 group transition-all duration-300 flex
                        border-2 ${isSelected ? 'border-[#55aa55] bg-[#55aa55]/10' : 'border-[#222] bg-[#0a0a0a] hover:border-[#444]'}
                      `}
                    >
                      {/* Image Side */}
                      <div className="w-1/3 relative">
                        <img src={evt.img} alt={evt.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                        <div className="absolute inset-0 bg-black/20"></div>
                      </div>

                      {/* Content Side */}
                      <div className="w-2/3 p-4 flex flex-col justify-center relative">
                        <span className={`text-[10px] font-mono uppercase mb-1 ${isSelected ? 'text-[#55aa55]' : 'text-gray-500'}`}>
                          {evt.cat}
                        </span>
                        <h4 className={`font-black text-lg italic leading-none ${isSelected ? 'text-white' : 'text-gray-400'}`}>
                          {evt.title}
                        </h4>
                        
                        {/* Checkmark */}
                        <div className={`absolute top-2 right-2 transition-transform ${isSelected ? 'scale-100' : 'scale-0'}`}>
                          <CheckCircle2 size={20} className="text-[#55aa55] fill-black" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* 2. Important Notice */}
            <div className="bg-[#55aa55]/10 border-l-4 border-[#55aa55] p-5 flex gap-4 items-center">
              <Users size={24} className="text-[#55aa55] shrink-0" />
              <div>
                <h4 className="text-[#55aa55] font-bold text-sm tracking-widest uppercase">Teammate Protocol</h4>
                <p className="text-gray-400 text-xs font-mono mt-1">
                  Registering here only buys YOUR pass. Every member of your team must purchase their own pass and register individually. and make sure your cannot participant in 2 events incase it clashes.. <a href='/schedule' className='text-green-500 underline'>Schedule</a>
                </p>
              </div>
            </div>

            {/* 3. User Details Form */}
            <section>
               <h3 className="text-[#55aa55] font-mono text-sm tracking-[0.3em] mb-4 uppercase flex items-center gap-2">
                <User size={16} /> 02. Personal Data
              </h3>
              <div className="grid md:grid-cols-2 gap-6 bg-[#0a0a0a] p-6 border border-[#222]">
                <div className="space-y-2">
                  <label className="text-xs font-mono text-gray-500">Full Name</label>
                  <div className="flex items-center bg-black border border-[#333] focus-within:border-[#55aa55] transition-colors px-3 py-3">
                    <User size={16} className="text-gray-600 mr-3" />
                    <input 
                      type="text" name="name" required placeholder="Alice"
                      value={formData.name} onChange={handleInputChange}
                      className="bg-transparent w-full outline-none text-white text-sm font-mono placeholder-gray-700"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono text-gray-500">Phone</label>
                  <div className="flex items-center bg-black border border-[#333] focus-within:border-[#55aa55] transition-colors px-3 py-3">
                    <Smartphone size={16} className="text-gray-600 mr-3" />
                    <input 
                      type="tel" name="phoneno" required placeholder="9876543210"
                      value={formData.phoneno} onChange={handleInputChange}
                      className="bg-transparent w-full outline-none text-white text-sm font-mono placeholder-gray-700"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono text-gray-500">College</label>
                  <div className="flex items-center bg-black border border-[#333] focus-within:border-[#55aa55] transition-colors px-3 py-3">
                    <School size={16} className="text-gray-600 mr-3" />
                    <input 
                      type="text" name="college" required placeholder="College Name"
                      value={formData.college} onChange={handleInputChange}
                      className="bg-transparent w-full outline-none text-white text-sm font-mono placeholder-gray-700"
                    />
                  </div>
                </div>

                 <div className="space-y-2">
                  <label className="text-xs font-mono text-gray-500">Course</label>
                  <div className="flex items-center bg-black border border-[#333] focus-within:border-[#55aa55] transition-colors px-3 py-3">
                    <Book size={16} className="text-gray-600 mr-3" />
                    <input 
                      type="text" name="course" required placeholder="Degree/Course"
                      value={formData.course} onChange={handleInputChange}
                      className="bg-transparent w-full outline-none text-white text-sm font-mono placeholder-gray-700"
                    />
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* RIGHT: PAYMENT */}
          <div className="lg:col-span-4 space-y-8">
            <section className="sticky top-24">
              <h3 className="text-[#55aa55] font-mono text-sm tracking-[0.3em] mb-4 uppercase flex items-center gap-2">
                <CreditCard size={16} /> 03. Payment
              </h3>
              
              <div className="bg-[#0a0a0a] border border-[#222] p-6 space-y-6">
                
                {/* QR Code Block */}
                <div className="text-center">
                  <div className="bg-white p-3 inline-block rounded-sm mb-4">
                    <img 
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=${UPI_ID}&pn=Syntaxia&am=150&cu=INR`}
                      alt="Payment QR"
                      className="w-40 h-40"
                    />
                  </div>
                  <div className="flex items-center justify-between bg-[#111] p-2 border border-[#333]">
                    <span className="text-[10px] text-gray-400 font-mono">{UPI_ID}</span>
                    <button onClick={() => navigator.clipboard.writeText(UPI_ID)} className="text-[10px] text-[#55aa55] font-bold">COPY</button>
                  </div>
                </div>

                {/* Txn Input */}
                <div className="space-y-2">
                    <label className="text-xs font-mono text-gray-500">Transaction ID</label>
                    <div className="flex items-center bg-black border border-[#333] focus-within:border-[#55aa55] transition-colors px-3 py-3">
                      <span className="text-[#55aa55] font-bold mr-3 text-xs">#</span>
                      <input 
                        type="text" name="txnId" required placeholder="UTR / Ref No"
                        value={formData.txnId} onChange={handleInputChange}
                        className="bg-transparent w-full outline-none text-white text-sm font-mono placeholder-gray-700"
                      />
                    </div>
                </div>

                {/* Upload */}
                <div className="space-y-2">
                    <label className="text-xs font-mono text-gray-500">Screenshot</label>
                    <div className="bg-black border-2 border-dashed border-[#333] p-4 text-center hover:border-[#55aa55] transition-colors relative group cursor-pointer">
                      <input 
                        type="file" onChange={handleFileChange} accept="image/*"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                      />
                      {preview ? (
                        <div className="relative z-10">
                          <img src={preview} alt="Preview" className="h-20 mx-auto border border-[#55aa55]" />
                          <p className="text-[10px] text-[#55aa55] mt-1 font-mono truncate">{file.name}</p>
                        </div>
                      ) : (
                        <div className="z-10 relative pointer-events-none">
                          <Upload className="mx-auto text-gray-600 mb-2 group-hover:text-[#55aa55]" size={20} />
                          <p className="text-[10px] text-gray-400 font-mono">Upload Proof</p>
                        </div>
                      )}
                    </div>
                </div>

                {/* Error */}
                {errorMessage && (
                  <div className="bg-red-500/10 border-l-2 border-red-500 p-3 flex gap-2">
                    <AlertCircle className="text-red-500 shrink-0" size={16} />
                    <p className="text-red-200 text-[10px] font-mono leading-tight">{errorMessage}</p>
                  </div>
                )}

                {/* Submit */}
                <button
                  onClick={handleSubmit}
                  disabled={status === 'loading'}
                  className="w-full py-4 bg-[#55aa55] hover:bg-[#448844] text-black font-black text-lg italic tracking-tighter uppercase transition-all hover:-translate-y-1 shadow-[4px_4px_0px_#000] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {status === 'loading' ? 'SYNCING...' : 'REGISTER'} <Zap size={18} fill="black" />
                </button>

              </div>
            </section>
          </div>

        </div>
      </div>
    </div>
  );
};

export default StandardPassRegister;