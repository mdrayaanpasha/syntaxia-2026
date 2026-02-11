import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { UploadCloud, Users, X, Plus, User, CheckCircle, Loader2 } from 'lucide-react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import PremiumNavbar from '../home/components/nav';

// --- Skeleton Component ---
const Skeleton = () => (
  <div className="max-w-xl mx-auto space-y-8 animate-pulse">
    <div className="h-10 bg-[#1a1a1a] w-3/4 mx-auto rounded-lg" />
    <div className="space-y-6">
      <div className="h-32 bg-[#111] border border-[#222] rounded-xl" />
      <div className="h-64 bg-[#111] border border-[#222] rounded-xl" />
      <div className="h-14 bg-[#1a1a1a] rounded-xl" />
    </div>
  </div>
);

const EventRegistration = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const eventName = searchParams.get('event-name') || 'EVENT';
  const API_BASE_URL = "https://note-taking-server-kappa.vercel.app";
  
  const [loading, setLoading] = useState(false);
  const [fetchingUser, setFetchingUser] = useState(true);
  const [hasExistingProfile, setHasExistingProfile] = useState(false);
  
  const [profile, setProfile] = useState({ name: '', college: '', regno: '', course: '', avatar: 1 });
  const [file, setFile] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [newParticipant, setNewParticipant] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        localStorage.setItem("redir",encodeURIComponent(location.pathname + location.search))
        return navigate("/auth");
      }

      try {
        const { data } = await axios.get(`${API_BASE_URL}/api/user`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (data.user.userDetails) {
          setProfile(data.user.userDetails);
          setHasExistingProfile(true);
        }
      } catch (err) {
        console.error("Session fetch failed");
      } finally {
        setTimeout(() => setFetchingUser(false), 800); // Slight delay for smoother feel
      }
    };
    fetchUserData();
  }, [navigate, location]);

  const addParticipant = () => {
    if (!newParticipant.includes('@')) return toast.error('Invalid email');
    if (participants.includes(newParticipant)) return toast.error('Already added');
    setParticipants([...participants, newParticipant]);
    setNewParticipant('');
  };

  const eventData = {
  "cmlgm1wy10001wpij8etyb11w": "BGMI",
  "cmlgm1wy10002wpij5m9w4zjl": "LOCK // LOAD",
  "cmlgm1wy10003wpijxnoslqtr": "CTF (CAPTURE THE FLAG)",
  "cmlgm1wy10005wpijzyma7iiu": "Redstone Run",
  "cmlgm1wy10006wpijo6lm39g3": "DATA DETECTIVE (SQL)",
  "cmlgm1wy10004wpij622cseeu": "IT QUIZ",
  "cmlgm1wy10007wpijl52gfwxj": "IPL AUCTION",
  "cmlgm1wy10008wpij9wkl7ggo": "ANIME QUIZ",
  "cmlgm1wy10009wpij3ufrl65m": "Mine Your Way Out",
  "cmlgm1wy1000awpijjbkedi4h": "BUSINESS REVIVAL",
  "cmlgm1wy1000bwpij0508s1t8": "REEL MAKING"
}

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return toast.error("Upload proof of work first");
    
    setLoading(true);
    const loadId = toast.loading('Registering...');
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    try {
      if (!hasExistingProfile) {
        await axios.post(`${API_BASE_URL}/api/user/details`, profile, { headers });
      }

      const formData = new FormData();
      formData.append('eventId', eventName);
      formData.append('file', file);
      participants.forEach(p => formData.append('otherParticipants', p));

      await axios.post(`${API_BASE_URL}/api/user/register-event`, formData, { headers });
      toast.success('Registration successful!', { id: loadId });
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed', { id: loadId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" min-h-screen bg-[#0a0a0a] text-gray-200 py-12 px-4 font-sans">
      <Toaster position="top-right" />
      
      {fetchingUser ? (
        <Skeleton />
      ) : (
        <>
        <PremiumNavbar/>
        <div className="max-w-xl mt-10 mx-auto space-y-8 transition-opacity duration-500 opacity-100">
          
          <header className="text-center space-y-1 font-minecraft">
            <h1 className="text-3xl font-black text-white uppercase italic">
              <span className="text-[#55aa55]">#</span> {eventData[eventName]} - Registration
            </h1>
            <p className="text-gray-500 text-[10px] tracking-[0.3em] uppercase">Secure Uplink Established</p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Identity Card */}
            <div className="bg-[#111]/50 border border-[#222] p-5 rounded-xl">
              <div className="flex items-center gap-2 text-gray-500 mb-4 font-bold text-[10px] tracking-widest uppercase">
                <User size={14} className="text-[#55aa55]" /> Profile Context
              </div>

              {hasExistingProfile ? (
                <div className="flex items-center gap-4 bg-[#55aa55]/5 p-3 rounded-lg border border-[#55aa55]/10">
                  <div className="w-10 h-10 rounded-full border border-[#55aa55]/50 overflow-hidden bg-[#222]">
                     <img src={`https://ik.imagekit.io/yylpuqff5/syntaxia-registrations/pfp-${profile.avatar}.jpg`} alt="" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-white font-semibold">{profile.name}</p>
                    <p className="text-[10px] text-gray-500 uppercase">{profile.regno} • {profile.college}</p>
                  </div>
                  <CheckCircle className="text-[#55aa55]" size={18} />
                </div>
              ) : (
                <div className="grid gap-3">
                  <input required placeholder="Name" className="bg-white/5 border border-[#222] p-2.5 rounded-lg text-sm focus:border-[#55aa55] outline-none transition-all" onChange={e => setProfile({...profile, name: e.target.value})} />
                  <input required placeholder="College" className="bg-white/5 border border-[#222] p-2.5 rounded-lg text-sm focus:border-[#55aa55] outline-none transition-all" onChange={e => setProfile({...profile, college: e.target.value})} />
                  <div className="grid grid-cols-2 gap-3">
                    <input required placeholder="Reg No" className="bg-white/5 border border-[#222] p-2.5 rounded-lg text-sm focus:border-[#55aa55] outline-none transition-all" onChange={e => setProfile({...profile, regno: e.target.value})} />
                    <input required placeholder="Course" className="bg-white/5 border border-[#222] p-2.5 rounded-lg text-sm focus:border-[#55aa55] outline-none transition-all" onChange={e => setProfile({...profile, course: e.target.value})} />
                  </div>
                </div>
              )}
            </div>

            {/* Logistics Card */}
            <div className="bg-[#111]/50 border border-[#222] p-5 rounded-xl space-y-5">
              <div className="flex items-center gap-2 text-gray-500 font-bold text-[10px] tracking-widest uppercase">
                <Users size={14} className="text-[#55aa55]" /> Squad & Manifest
              </div>

              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Teammate Email" 
                  value={newParticipant} 
                  onChange={e => setNewParticipant(e.target.value)}
                  className="flex-1 bg-white/5 border border-[#222] rounded-lg px-4 py-2 text-sm focus:border-[#55aa55] outline-none"
                />
                <button type="button" onClick={addParticipant} className="px-3 bg-[#222] hover:bg-[#333] rounded-lg border border-[#333] transition-colors"><Plus size={18}/></button>
              </div>
              
              {participants.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {participants.map((email, i) => (
                    <span key={i} className="flex items-center gap-2 bg-[#55aa55]/10 px-3 py-1 rounded-md text-[11px] border border-[#55aa55]/20 text-[#55aa55]">
                      {email} <X size={12} className="cursor-pointer hover:text-white" onClick={() => setParticipants(participants.filter((_, idx) => idx !== i))} />
                    </span>
                  ))}
                </div>
              )}

              <div className="space-y-2">
                <label className={`flex flex-col items-center justify-center border border-dashed rounded-xl p-6 transition-all cursor-pointer ${file ? 'border-[#55aa55] bg-[#55aa55]/5' : 'border-[#333] hover:border-[#444]'}`}>
                  {file ? (
                    <div className="text-center">
                      <CheckCircle className="mx-auto text-[#55aa55] mb-2" size={24} />
                      <p className="text-[11px] text-white font-mono">{file.name}</p>
                    </div>
                  ) : (
                    <>
                      <UploadCloud className="text-gray-600 mb-2" size={24} />
                      <p className="text-[10px] text-gray-500 uppercase tracking-tighter">Attach Payment Screenshot</p>
                    </>
                  )}
                  <input type="file" className="hidden" onChange={e => setFile(e.target.files[0])} accept="image/*" />
                </label>
              </div>
            </div>

            <button 
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-[#55aa55] hover:bg-[#66cc66] text-[#0a0a0a] font-bold uppercase text-xs tracking-widest shadow-lg shadow-[#55aa55]/5 active:scale-[0.99] transition-all disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin mx-auto" size={18} /> : 'Submit Protocol'}
            </button>
          </form>
        </div>
        </>
      )}
    </div>
  );
};

export default EventRegistration;