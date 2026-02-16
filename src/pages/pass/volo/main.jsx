import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Sword, Upload, User, Smartphone, 
  School, Book, Check, AlertCircle, 
  ChevronLeft, CreditCard, QrCode, Shield, Target,
  Loader2, ShieldCheck
} from 'lucide-react';
import PremiumNavbar from '../../home/components/nav';

const ValorantRegister = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // --- CONFIG ---
  const VALO_EVENT_ID = "cmlgm1wy10002wpij5m9w4zjl"; 
  const VALO_PRICE = "₹451 + ₹99(GST) = ₹550"; 
  const UPI_ID = "syntaxia@sju"; 

  // --- STATE ---
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
        localStorage.setItem("redir", `${location.pathname}${location.search}`);
        navigate('/login'); 
        return;
      }

      // 2. Check if user already has VALO pass
      try {
        const response = await fetch('https://note-taking-server-kappa.vercel.app/api/user/pass-check/VALO', {
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
            setCheckingPass(false); 
            
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
        setCheckingPass(false); 
      }
    };

    checkAuthAndPass();
  }, [navigate, location]);

  // --- HANDLERS ---
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
      navigate('/login');
      return;
    }

    if (!file) {
      setStatus('error');
      setErrorMessage('Please upload the payment screenshot.');
      return;
    }

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

  // --- VIEW 1: LOADING (Checking Pass) ---
  if (checkingPass) {
    return (
      <div className="min-h-screen bg-[#0f1923] flex items-center justify-center font-sans text-[#ff4655]">
        <div className="text-center">
          <Loader2 size={48} className="animate-spin mx-auto mb-4" />
          <p className="text-xl font-bold uppercase tracking-widest animate-pulse">CONNECTING TO SERVER...</p>
        </div>
      </div>
    );
  }

  // --- VIEW 2: ALREADY REGISTERED (5 Sec Delay) ---
  if (isAlreadyRegistered) {
    return (
      <div className="min-h-screen bg-[#0f1923] flex items-center justify-center p-4 font-sans text-white uppercase tracking-wider">
        <div className="bg-[#1f2b38] border-l-4 border-[#ff4655] p-12 max-w-lg w-full text-center shadow-[0_0_50px_rgba(255,70,85,0.2)]">
          <div className="w-24 h-24 bg-[#ff4655]/10 rounded-full flex items-center justify-center mx-auto mb-6 skew-x-[-10deg] border border-[#ff4655]/50">
            <ShieldCheck size={48} className="text-[#ff4655]" />
          </div>
          
          <h2 className="text-3xl font-black mb-4 text-white italic">
            PROTOCOL <span className="text-[#ff4655]">ACTIVE</span>
          </h2>
          
          <p className="text-gray-400 mb-8 font-mono text-xs normal-case tracking-normal">
            You have already secured a <span className="text-[#ff4655] font-bold">Protocol V Pass</span>.
            <br/> Returning to command center...
          </p>
          
          <div className="flex items-center justify-center gap-3 text-[#ff4655] text-xs font-bold animate-pulse">
            <div className="w-2 h-2 bg-[#ff4655]"></div>
            <span>REDIRECTING</span>
            <div className="w-2 h-2 bg-[#ff4655]"></div>
          </div>
        </div>
      </div>
    );
  }

  // --- VIEW 3: SUCCESS AFTER REGISTRATION ---
  if (status === 'success') {
    return (
      <div className="min-h-screen bg-[#0f1923] flex items-center justify-center p-4 font-sans text-white uppercase tracking-wider">
        <div className="bg-[#1f2b38] border-l-4 border-[#ff4655] p-10 max-w-md w-full text-center shadow-[0_0_50px_rgba(255,70,85,0.2)]">
          <div className="w-20 h-20 bg-[#ff4655]/20 rounded-none flex items-center justify-center mx-auto mb-6 skew-x-[-10deg]">
            <Check size={40} className="text-[#ff4655]" />
          </div>
          <h2 className="text-4xl font-black mb-2 text-white italic">MATCH FOUND</h2>
          <p className="text-gray-400 mb-8 font-mono text-xs normal-case tracking-normal">
            Your Protocol V Pass has been issued. <br/> 
            Agent status: ACTIVE.
          </p>
          <button 
            onClick={() => navigate('/')}
            className="w-full py-4 bg-[#ff4655] hover:bg-[#d93442] text-white font-bold uppercase tracking-widest transition-colors skew-x-[-10deg]"
          >
            RETURN TO BASE
          </button>
        </div>
      </div>
    );
  }

  // --- VIEW 4: MAIN FORM ---
  return (
    <div className="min-h-screen bg-[#0f1923] text-gray-200 font-sans selection:bg-[#ff4655] selection:text-white">
      <PremiumNavbar />
      
      {/* Background Geometric Shapes */}
      <div className="fixed inset-0 pointer-events-none opacity-5">
         <div className="absolute top-20 right-0 w-96 h-96 bg-[#ff4655] rounded-full blur-[100px]"></div>
         <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-[80px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 pt-24 relative z-10">
        
        {/* HEADER */}
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[#ff4655] mb-8 hover:-translate-x-1 transition-transform font-bold tracking-widest text-xs uppercase">
          <ChevronLeft size={20} /> Abort
        </button>

        <div className="mb-12 border-b border-[#333] pb-8 flex flex-col md:flex-row items-end justify-between gap-6">
          <div>
            <h1 className="text-6xl md:text-8xl font-black text-white italic tracking-tighter uppercase leading-[0.85]">
              PROTOCOL <span className="text-[#ff4655]">V</span>
            </h1>
            <p className="text-gray-400 font-mono mt-4 flex items-center gap-2 text-xs tracking-widest uppercase">
              <span className="w-2 h-2 bg-[#ff4655]"></span>
              Tactical 5v5 Entry Fee: <span className="text-white font-bold">{VALO_PRICE}</span>
            </p>
          </div>
          <div className="hidden md:block">
             <div className="text-[#ff4655] border border-[#ff4655] px-4 py-1 text-[10px] tracking-[0.3em] font-bold uppercase skew-x-[-10deg]">
                System Ready
             </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* LEFT COLUMN: PAYMENT (QR CODE) */}
          <div className="lg:col-span-5 space-y-8 order-2 lg:order-1">
            <div className="bg-[#1f2b38] border border-[#333] p-8 relative overflow-hidden group">
              {/* Valorant Decor Lines */}
              <div className="absolute top-0 left-0 w-16 h-1 bg-[#ff4655]"></div>
              <div className="absolute bottom-0 right-0 w-16 h-1 bg-[#ff4655]"></div>

              <h3 className="text-white font-bold text-sm tracking-[0.2em] mb-6 uppercase flex items-center gap-2 border-l-2 border-[#ff4655] pl-3">
                <QrCode size={16} className="text-[#ff4655]" /> Secure Payment
              </h3>

              <div className="bg-white p-4 max-w-[250px] mx-auto mb-6 rounded-sm shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                {/* QR Code */}
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=upi://pay?pa=${UPI_ID}&pn=Syntaxia&am=200&cu=INR`}
                  alt="Payment QR"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="text-center space-y-3">
                <p className="text-xs text-gray-500 font-mono uppercase tracking-widest">Target UPI ID</p>
                <div className="bg-[#0f1923] p-4 border border-[#333] flex items-center justify-between group-hover:border-[#ff4655] transition-colors">
                  <span className="font-mono text-white tracking-wider">{UPI_ID}</span>
                  <button 
                    onClick={() => navigator.clipboard.writeText(UPI_ID)}
                    className="text-[10px] bg-[#ff4655] text-white px-3 py-1 font-bold hover:bg-white hover:text-black transition-colors uppercase"
                  >
                    Copy
                  </button>
                </div>
              </div>
            </div>

            {/* Rules Box */}
            <div className="bg-[#ff4655]/5 border-l-2 border-[#ff4655] p-6 flex gap-4 items-start">
              <Shield className="text-[#ff4655] shrink-0 mt-1" size={20} />
              <div className="space-y-2">
                <h4 className="text-white font-bold text-sm tracking-wider uppercase">Rules of Engagement</h4>
                <ul className="text-xs text-gray-400 space-y-1 list-none font-mono">
                  <li>[1] Payment is final. No refunds.</li>
                  <li>[2] Verify Transaction ID carefully.</li>
                  <li>[3] Forgery results in perma-ban.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: FORM */}
          <div className="lg:col-span-7 space-y-8 order-1 lg:order-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Section 1: Player Details */}
              <section>
                 <h3 className="text-white font-bold text-sm tracking-[0.2em] mb-6 uppercase flex items-center gap-2 border-l-2 border-[#ff4655] pl-3">
                  <User size={16} className="text-[#ff4655]" /> Agent Identity
                </h3>
                <div className="grid md:grid-cols-2 gap-6 bg-[#1f2b38] p-6 border border-[#333]">
                  
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Full Name</label>
                    <div className="flex items-center bg-[#0f1923] border-b-2 border-[#555] focus-within:border-[#ff4655] transition-colors px-3 py-3">
                      <User size={16} className="text-gray-500 mr-3" />
                      <input 
                        type="text" name="name" required placeholder="JETT"
                        value={formData.name} onChange={handleInputChange}
                        className="bg-transparent w-full outline-none text-white text-sm font-bold uppercase placeholder-gray-700"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Comms Link</label>
                    <div className="flex items-center bg-[#0f1923] border-b-2 border-[#555] focus-within:border-[#ff4655] transition-colors px-3 py-3">
                      <Smartphone size={16} className="text-gray-500 mr-3" />
                      <input 
                        type="tel" name="phoneno" required placeholder="9876543210"
                        value={formData.phoneno} onChange={handleInputChange}
                        className="bg-transparent w-full outline-none text-white text-sm font-bold placeholder-gray-700"
                      />
                    </div>
                  </div>

                  {/* College */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Origin Base</label>
                    <div className="flex items-center bg-[#0f1923] border-b-2 border-[#555] focus-within:border-[#ff4655] transition-colors px-3 py-3">
                      <School size={16} className="text-gray-500 mr-3" />
                      <input 
                        type="text" name="college" required placeholder="ACADEMY"
                        value={formData.college} onChange={handleInputChange}
                        className="bg-transparent w-full outline-none text-white text-sm font-bold uppercase placeholder-gray-700"
                      />
                    </div>
                  </div>

                   {/* Course */}
                   <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Division</label>
                    <div className="flex items-center bg-[#0f1923] border-b-2 border-[#555] focus-within:border-[#ff4655] transition-colors px-3 py-3">
                      <Book size={16} className="text-gray-500 mr-3" />
                      <input 
                        type="text" name="course" required placeholder="B.TECH"
                        value={formData.course} onChange={handleInputChange}
                        className="bg-transparent w-full outline-none text-white text-sm font-bold uppercase placeholder-gray-700"
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 2: Transaction Details */}
              <section>
                <h3 className="text-white font-bold text-sm tracking-[0.2em] mb-6 uppercase flex items-center gap-2 border-l-2 border-[#ff4655] pl-3">
                  <CreditCard size={16} className="text-[#ff4655]" /> Transaction Data
                </h3>
                
                <div className="bg-[#1f2b38] p-6 border border-[#333] space-y-6">
                  
                  {/* Transaction ID Input */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Transaction ID / UTR</label>
                    <div className="flex items-center bg-[#0f1923] border-b-2 border-[#555] focus-within:border-[#ff4655] transition-colors px-3 py-3">
                      <span className="text-[#ff4655] font-bold mr-3 text-xs">TXN</span>
                      <input 
                        type="text" name="txnId" required placeholder="ENTER ID"
                        value={formData.txnId} onChange={handleInputChange}
                        className="bg-transparent w-full outline-none text-white text-sm font-bold uppercase placeholder-gray-700"
                      />
                    </div>
                  </div>

                  {/* Screenshot Upload */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Upload Proof</label>
                    <div className="bg-[#0f1923] border-2 border-dashed border-[#444] p-6 text-center hover:border-[#ff4655] hover:bg-[#ff4655]/5 transition-all relative group cursor-pointer">
                      <input 
                        type="file" onChange={handleFileChange} accept="image/*"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                      />
                      
                      {preview ? (
                        <div className="relative z-10">
                          <img src={preview} alt="Preview" className="h-32 mx-auto border border-[#ff4655]" />
                          <p className="text-[10px] text-[#ff4655] mt-2 font-mono truncate">{file.name}</p>
                        </div>
                      ) : (
                        <div className="z-10 relative pointer-events-none">
                          <Upload className="mx-auto text-gray-500 mb-3 group-hover:text-[#ff4655] transition-colors" size={24} />
                          <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Drop File or Click</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </section>

              {/* ERROR DISPLAY */}
              {errorMessage && (
                <div className="bg-red-500/10 border-l-4 border-red-500 p-4 flex gap-3">
                  <AlertCircle className="text-red-500 shrink-0" size={20} />
                  <p className="text-red-200 text-xs font-mono">{errorMessage}</p>
                </div>
              )}

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full h-16 bg-[#ff4655] hover:bg-white hover:text-black text-white font-black text-xl italic tracking-tighter uppercase transition-all skew-x-[-10deg] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {status === 'loading' ? (
                  <span className="animate-pulse">PROCESSING...</span>
                ) : (
                  <>
                    <Target size={24} /> LOCK IN
                  </>
                )}
              </button>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValorantRegister;