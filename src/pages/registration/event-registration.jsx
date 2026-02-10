import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { UploadCloud, Users, Save, X, Plus, Terminal, CheckCircle } from 'lucide-react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast'; // 1. Import Toast

const AVATAR_MAP = [
  { id: 1, url: "https://ik.imagekit.io/yylpuqff5/syntaxia-registrations/pfp-1.jpg" },
  { id: 2, url: "https://ik.imagekit.io/yylpuqff5/syntaxia-registrations/pfp-2.jpg" },
  { id: 3, url: "https://ik.imagekit.io/yylpuqff5/syntaxia-registrations/pfp-3.jpg" },
  { id: 4, url: "https://ik.imagekit.io/yylpuqff5/syntaxia-registrations/pfp-4.jpg" }
];

const EventRegistration = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const eventName = searchParams.get('event-name') || 'UNKNOWN_PROTOCOL';
  const API_BASE_URL = "https://note-taking-server-kappa.vercel.app/";
  const eventId = eventName;

  const [loading, setLoading] = useState(false);
  
  const [profile, setProfile] = useState({
    name: '',
    college: '',
    regno: '',
    course: '',
    avatar: 1 
  });

  const [file, setFile] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [newParticipant, setNewParticipant] = useState('');

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      toast.success('File uploaded successfully');
    }
  };

  const addParticipant = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!newParticipant.trim()) return;

    if (emailRegex.test(newParticipant)) {
      if (participants.includes(newParticipant)) {
        toast.error('Member already added'); // 2. Duplicate Check
        return;
      }
      setParticipants([...participants, newParticipant]);
      setNewParticipant('');
      toast.success('Teammate added');
    } else {
      toast.error('Invalid email format'); // 3. Validation Toast
    }
  };

  const removeParticipant = (index) => {
    setParticipants(participants.filter((_, i) => i !== index));
    toast('Member removed', { icon: '🗑️' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const loadingToast = toast.loading('Initializing uplink...');

    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    try {
      // Step 1
      toast.loading('Updating player stats...', { id: loadingToast });
      await axios.post(`${API_BASE_URL}/api/user/details`, profile, { headers });

      // Step 2
      toast.loading('Uploading proof of work...', { id: loadingToast });
      const formData = new FormData();
      formData.append('eventId', eventId);
      formData.append('file', file);
      participants.forEach((p) => formData.append('otherParticipants', p));

      await axios.post(`${API_BASE_URL}/api/user/register-event`, formData, { headers });

      toast.success('Registration Complete!', { id: loadingToast });
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (err) {
      const serverMessage = err.response?.data?.message;
      toast.error(serverMessage || 'Transmission failed', { id: loadingToast });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#050505] text-gray-300 font-sans selection:bg-[#55aa55] selection:text-black flex justify-center py-10 px-4">
      
      {/* 4. Add the Toaster Container */}
      <Toaster position="top-center" reverseOrder={false} toastOptions={{
        style: {
          background: '#111',
          color: '#fff',
          border: '1px solid #333',
          fontSize: '12px',
          letterSpacing: '0.1em'
        }
      }} />

      <div className="fixed inset-0 pointer-events-none z-0">
         <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#55aa55] to-transparent opacity-50"></div>
         <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#55aa55] blur-[150px] opacity-10 rounded-full"></div>
      </div>

      <div className="relative z-10 w-full max-w-2xl flex flex-col gap-6">
        <div className="border-l-4 border-[#55aa55] pl-6 py-2 bg-white/5 backdrop-blur-sm">
          <h1 className="text-3xl font-bold text-white tracking-tighter uppercase">
            Protocol: <span className="text-[#55aa55]">{eventName}</span>
          </h1>
          <p className="text-xs tracking-[0.3em] text-gray-500 mt-1">SECURE_REGISTRATION_UPLINK</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          {/* PLAYER STATS SECTION */}
          <div className="p-6 bg-[#111] border border-[#222] rounded-lg relative group">
            <div className="absolute -top-3 left-4 bg-[#050505] px-2 text-[#55aa55] text-xs font-bold tracking-widest flex items-center gap-2">
              <Terminal size={12} /> PLAYER_STATS
            </div>

            <div className="mb-8 mt-2">
              <label className="text-xs uppercase tracking-wider text-gray-500 block mb-4">Select Identity Avatar</label>
              <div className="flex flex-wrap gap-4">
                {AVATAR_MAP.map((avatarObj) => (
                  <button
                    key={avatarObj.id}
                    type="button"
                    onClick={() => {
                      setProfile({ ...profile, avatar: avatarObj.id });
                      toast.success(`Avatar ${avatarObj.id} selected`, { id: 'avatar-selection' });
                    }}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                      profile.avatar === avatarObj.id 
                      ? 'border-[#55aa55] scale-110 shadow-[0_0_20px_rgba(85,170,85,0.4)]' 
                      : 'border-[#333] hover:border-[#444]'
                    }`}
                  >
                    <img src={avatarObj.url} alt={`Avatar ${avatarObj.id}`} className="w-full h-full object-cover" />
                    {profile.avatar === avatarObj.id && (
                      <div className="absolute inset-0 bg-[#55aa55]/20 flex items-center justify-center">
                        <CheckCircle size={24} className="text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs uppercase tracking-wider text-gray-500">Codename (Name)</label>
                <input type="text" name="name" required value={profile.name} onChange={handleProfileChange} className="w-full bg-black/50 border border-[#333] p-3 text-white focus:border-[#55aa55] focus:outline-none transition-colors" />
              </div>
              <div className="space-y-1">
                <label className="text-xs uppercase tracking-wider text-gray-500">Guild (College)</label>
                <input type="text" name="college" required value={profile.college} onChange={handleProfileChange} className="w-full bg-black/50 border border-[#333] p-3 text-white focus:border-[#55aa55] focus:outline-none transition-colors" />
              </div>
              <div className="space-y-1">
                <label className="text-xs uppercase tracking-wider text-gray-500">Reg. ID</label>
                <input type="text" name="regno" required value={profile.regno} onChange={handleProfileChange} className="w-full bg-black/50 border border-[#333] p-3 text-white focus:border-[#55aa55] focus:outline-none transition-colors" />
              </div>
              <div className="space-y-1">
                <label className="text-xs uppercase tracking-wider text-gray-500">Class (Course)</label>
                <input type="text" name="course" required value={profile.course} onChange={handleProfileChange} className="w-full bg-black/50 border border-[#333] p-3 text-white focus:border-[#55aa55] focus:outline-none transition-colors" />
              </div>
            </div>
          </div>

          {/* SQUAD MANIFEST SECTION */}
          <div className="p-6 bg-[#111] border border-[#222] rounded-lg relative">
             <div className="absolute -top-3 left-4 bg-[#050505] px-2 text-[#55aa55] text-xs font-bold tracking-widest flex items-center gap-2">
              <Users size={12} /> SQUAD_MANIFEST
            </div>

            <div className="flex gap-2 mb-4">
              <input 
                type="email" 
                placeholder="Add Teammate Email"
                value={newParticipant}
                onChange={(e) => setNewParticipant(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addParticipant())}
                className="flex-1 bg-black/50 border border-[#333] p-3 text-white focus:border-[#55aa55] focus:outline-none"
              />
              <button type="button" onClick={addParticipant} className="bg-[#222] hover:bg-[#333] text-white p-3 border border-[#333] transition-colors">
                <Plus size={20} />
              </button>
            </div>

            {participants.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {participants.map((p, i) => (
                  <div key={i} className="flex items-center gap-2 bg-[#55aa55]/10 border border-[#55aa55]/30 px-3 py-1 text-sm text-[#55aa55]">
                    <span>{p}</span>
                    <button type="button" onClick={() => removeParticipant(i)} className="hover:text-white"><X size={14} /></button>
                  </div>
                ))}
              </div>
            )}

            <div className="h-px w-full bg-[#222] my-6"></div>

             <div className="space-y-2">
                <div className="text-xs uppercase tracking-wider text-gray-500 flex items-center gap-2">
                    <UploadCloud size={14} /> PROOF_OF_WORK (Screenshot)
                </div>
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-[#333] border-dashed rounded-lg cursor-pointer bg-black/30 hover:bg-black/50 hover:border-[#55aa55] transition-all group">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        {file ? (
                           <div className="text-[#55aa55] flex flex-col items-center">
                              <CheckCircle size={32} className="mb-2" />
                              <p className="text-sm">{file.name}</p>
                           </div>
                        ) : (
                           <>
                              <UploadCloud className="w-8 h-8 mb-3 text-gray-500 group-hover:text-white transition-colors" />
                              <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
                           </>
                        )}
                    </div>
                    <input type="file" className="hidden" onChange={handleFileChange} required />
                </label>
             </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="group relative w-full py-4 bg-[#55aa55] hover:bg-[#66cc66] text-black font-bold tracking-[0.2em] transition-all overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
          >
             <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
             <span className="relative flex items-center justify-center gap-3">
                {loading ? 'PROCESSING...' : <> <Save size={18} /> INITIATE_REGISTRATION </>}
             </span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default EventRegistration;