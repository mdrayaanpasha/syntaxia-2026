import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Crosshair, Upload, User, Smartphone, 
  School, Book, Check, AlertCircle, 
  ChevronLeft, CreditCard, QrCode, ShieldAlert,
  Loader2, ShieldCheck
} from 'lucide-react';
import PremiumNavbar from '../../home/components/nav';

const BgmiRegister = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // --- CONFIG ---
  const BGMI_EVENT_ID = "cmlgm1wy10001wpij8etyb11w"; 
  const BGMI_PRICE = "₹410 + ₹90(GST) = ₹500"; 
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
        navigate('/auth'); 
        return;
      }

      // 2. Check if user already has BGMI pass
      try {
        const response = await fetch('https://note-taking-server-kappa.vercel.app/api/user/pass-check/BGMI', {
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
      navigate('/auth');
      return;
    }

    if (!file) {
      setStatus('error');
      setErrorMessage('Please upload the payment screenshot.');
      return;
    }

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
      <div className="min-h-screen bg-[#050505] flex items-center justify-center font-minecraft text-orange-500">
        <div className="text-center">
          <Loader2 size={48} className="animate-spin mx-auto mb-4" />
          <p className="text-xl animate-pulse tracking-widest">ESTABLISHING SATELLITE UPLINK...</p>
        </div>
      </div>
    );
  }

  // --- VIEW 2: ALREADY REGISTERED (5 Sec Delay) ---
  if (isAlreadyRegistered) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 font-minecraft text-white">
        <div className="bg-[#0a0a0a] border-2 border-orange-500 p-12 max-w-lg w-full text-center shadow-[0_0_50px_rgba(249,115,22,0.3)] relative overflow-hidden">
          
          {/* Animated Background Scanline */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(249,115,22,0.1)_50%,transparent_50%)] bg-[length:100%_4px] pointer-events-none"></div>

          <div className="w-24 h-24 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-orange-500">
            <ShieldCheck size={48} className="text-orange-500" />
          </div>
          
          <h2 className="text-3xl font-black mb-4 text-orange-500 uppercase tracking-tighter">
            ALREADY DEPLOYED
          </h2>
          
          <p className="text-gray-300 mb-8 font-mono text-sm leading-relaxed">
            You are already registered for the <span className="text-orange-500 font-bold">BGMI WARS</span>. 
            <br/> Returning to command center...
          </p>

          <div className="flex items-center justify-center gap-3 text-orange-500 text-xs font-mono animate-pulse">
            <Loader2 className="animate-spin" size={16} />
            <span>EXTRACTING...</span>
          </div>
        </div>
      </div>
    );
  }

  // --- VIEW 3: SUCCESS AFTER REGISTRATION ---
  if (status === 'success') {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 font-minecraft text-white">
        <div className="bg-[#0a0a0a] border-2 border-orange-500 p-8 max-w-md w-full text-center shadow-[0_0_50px_rgba(249,115,22,0.2)]">
          <div className="w-20 h-20 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={40} className="text-orange-500" />
          </div>
          <h2 className="text-3xl font-black mb-2 text-orange-500">DEPLOYMENT CONFIRMED</h2>
          <p className="text-gray-400 mb-8 font-mono">
            Your BGMI Squad Pass is active. <br/> 
            Get ready to drop.
          </p>
          <button 
            onClick={() => navigate('/')}
            className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-black font-bold uppercase tracking-widest transition-colors"
          >
            Return to Lobby
          </button>
        </div>
      </div>
    );
  }

  // --- VIEW 4: MAIN FORM ---
  return (
    <div className="min-h-screen bg-[#050505] text-gray-200 font-minecraft selection:bg-orange-500 selection:text-black">
      <PremiumNavbar />
      
      <div className="max-w-7xl mx-auto px-4 py-12 pt-24 relative z-10">
        
        {/* HEADER */}
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-orange-500 mb-8 hover:-translate-x-1 transition-transform">
          <ChevronLeft size={20} /> ABORT_MISSION
        </button>

        <div className="mb-12 border-b border-[#333] pb-8">
          <h1 className="text-5xl md:text-7xl font-black text-white italic tracking-tighter [text-shadow:4px_4px_0px_#f97316]">
            BGMI <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">WARS PASS</span>
          </h1>
          <p className="text-gray-400 font-mono mt-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-orange-500 animate-pulse"></span>
            SQUAD ENTRY FEE: <span className="text-orange-500 font-bold">{BGMI_PRICE}</span>
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* LEFT COLUMN: PAYMENT (QR CODE) */}
          <div className="lg:col-span-5 space-y-8 order-2 lg:order-1">
            <div className="bg-[#0a0a0a] border border-[#222] p-8 relative overflow-hidden group">
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-2 h-2 bg-orange-500"></div>
              <div className="absolute top-0 right-0 w-2 h-2 bg-orange-500"></div>
              <div className="absolute bottom-0 left-0 w-2 h-2 bg-orange-500"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 bg-orange-500"></div>

              <h3 className="text-orange-500 font-mono text-sm tracking-[0.3em] mb-6 uppercase flex items-center gap-2">
                <QrCode size={16} /> Scan to Pay
              </h3>

              <div className="bg-white p-4 max-w-[250px] mx-auto mb-6 rounded-sm shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                {/* QR Code */}
                <img 
                  src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=upi://pay?pa=syntaxia@sju&pn=Syntaxia&am=200&cu=INR" 
                  alt="Payment QR"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="text-center space-y-2">
                <p className="text-xs text-gray-500 font-mono">UPI ID</p>
                <div className="bg-[#111] p-3 border border-[#333] flex items-center justify-between group-hover:border-orange-500/50 transition-colors">
                  <span className="font-mono text-orange-500 tracking-wider">{UPI_ID}</span>
                  <button 
                    onClick={() => navigator.clipboard.writeText(UPI_ID)}
                    className="text-[10px] bg-[#222] px-2 py-1 hover:bg-white hover:text-black transition-colors"
                  >
                    COPY
                  </button>
                </div>
                <p className="text-[10px] text-gray-600 mt-4">
                  *Scan using GPay, PhonePe, or Paytm. <br/> Note down the Transaction ID after payment.
                </p>
              </div>
            </div>

            {/* Rules Box */}
            <div className="bg-orange-900/10 border border-orange-500/20 p-6 flex gap-4 items-start">
              <ShieldAlert className="text-orange-500 shrink-0 mt-1" />
              <div className="space-y-2">
                <h4 className="text-orange-500 font-bold text-sm">IMPORTANT INTEL</h4>
                <ul className="text-xs text-gray-400 space-y-1 list-disc pl-4 font-mono">
                  <li>Payment is non-refundable.</li>
                  <li>Ensure Transaction ID is correct.</li>
                  <li>Fake screenshots lead to instant ban.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: FORM */}
          <div className="lg:col-span-7 space-y-8 order-1 lg:order-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Section 1: Player Details */}
              <section>
                 <h3 className="text-orange-500 font-mono text-sm tracking-[0.3em] mb-4 uppercase flex items-center gap-2">
                  <User size={16} /> 01. Operator Details
                </h3>
                <div className="grid md:grid-cols-2 gap-6 bg-[#0a0a0a] p-6 border border-[#222]">
                  
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-gray-500">Full Name</label>
                    <div className="flex items-center bg-black border border-[#333] focus-within:border-orange-500 transition-colors px-3 py-3">
                      <User size={16} className="text-gray-600 mr-3" />
                      <input 
                        type="text" name="name" required placeholder="John Doe"
                        value={formData.name} onChange={handleInputChange}
                        className="bg-transparent w-full outline-none text-white text-sm font-mono placeholder-gray-700"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-gray-500">Phone Number</label>
                    <div className="flex items-center bg-black border border-[#333] focus-within:border-orange-500 transition-colors px-3 py-3">
                      <Smartphone size={16} className="text-gray-600 mr-3" />
                      <input 
                        type="tel" name="phoneno" required placeholder="9876543210"
                        value={formData.phoneno} onChange={handleInputChange}
                        className="bg-transparent w-full outline-none text-white text-sm font-mono placeholder-gray-700"
                      />
                    </div>
                  </div>

                  {/* College */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-gray-500">Institution</label>
                    <div className="flex items-center bg-black border border-[#333] focus-within:border-orange-500 transition-colors px-3 py-3">
                      <School size={16} className="text-gray-600 mr-3" />
                      <input 
                        type="text" name="college" required placeholder="College Name"
                        value={formData.college} onChange={handleInputChange}
                        className="bg-transparent w-full outline-none text-white text-sm font-mono placeholder-gray-700"
                      />
                    </div>
                  </div>

                   {/* Course */}
                   <div className="space-y-2">
                    <label className="text-xs font-mono text-gray-500">Course / Class</label>
                    <div className="flex items-center bg-black border border-[#333] focus-within:border-orange-500 transition-colors px-3 py-3">
                      <Book size={16} className="text-gray-600 mr-3" />
                      <input 
                        type="text" name="course" required placeholder="B.Tech / BCA"
                        value={formData.course} onChange={handleInputChange}
                        className="bg-transparent w-full outline-none text-white text-sm font-mono placeholder-gray-700"
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 2: Transaction Details */}
              <section>
                <h3 className="text-orange-500 font-mono text-sm tracking-[0.3em] mb-4 uppercase flex items-center gap-2">
                  <CreditCard size={16} /> 02. Payment Verification
                </h3>
                
                <div className="bg-[#0a0a0a] p-6 border border-[#222] space-y-6">
                  
                  {/* Transaction ID Input */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-gray-500">Transaction ID / UTR</label>
                    <div className="flex items-center bg-black border border-[#333] focus-within:border-orange-500 transition-colors px-3 py-3">
                      <span className="text-orange-500 font-bold mr-3 text-xs">#</span>
                      <input 
                        type="text" name="txnId" required placeholder="Enter Transaction ID"
                        value={formData.txnId} onChange={handleInputChange}
                        className="bg-transparent w-full outline-none text-white text-sm font-mono placeholder-gray-700 uppercase"
                      />
                    </div>
                  </div>

                  {/* Screenshot Upload */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-gray-500">Payment Screenshot</label>
                    <div className="bg-black border-2 border-dashed border-[#333] p-6 text-center hover:border-orange-500 transition-colors relative group cursor-pointer">
                      <input 
                        type="file" onChange={handleFileChange} accept="image/*"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                      />
                      
                      {preview ? (
                        <div className="relative z-10">
                          <img src={preview} alt="Preview" className="h-32 mx-auto border border-orange-500/50" />
                          <p className="text-[10px] text-orange-500 mt-2 font-mono truncate">{file.name}</p>
                        </div>
                      ) : (
                        <div className="z-10 relative pointer-events-none">
                          <Upload className="mx-auto text-gray-600 mb-3 group-hover:text-orange-500 transition-colors" size={24} />
                          <p className="text-xs text-gray-400 font-mono">Click to upload Proof</p>
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

              {/* SUBMIT */}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full h-16 bg-orange-500 hover:bg-orange-600 text-black font-black text-xl italic tracking-tighter uppercase transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0px_#fff] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 clip-path-button"
              >
                {status === 'loading' ? (
                  <span className="animate-pulse">ESTABLISHING LINK...</span>
                ) : (
                  <>
                    CONFIRM REGISTRATION <Crosshair className="animate-spin-slow" />
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

export default BgmiRegister;