import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldAlert, FileText, UserCheck, CreditCard, 
  Info, ArrowLeft, Terminal, AlertCircle 
} from 'lucide-react';
import PremiumNavbar from '../home/components/nav';

const PolicyPage = () => {
  const navigate = useNavigate();

  const policies = [
    {
      id: "01",
      title: "SINGLE-LINK PROTOCOL",
      icon: <UserCheck className="text-[#55aa55]" size={20} />,
      content: "Each registration is tied to a single individual. You cannot register for multiple people under one account/payment. Every attendee must possess their own unique Access Pass for entry.",
      warning: "Multiple entries under one pass will be flagged and denied at the perimeter."
    },
    {
      id: "02",
      title: "ENTRY CREDENTIALS",
      icon: <CreditCard className="text-[#55aa55]" size={20} />,
      content: "A registration fee (e.g., ₹400 per person) is mandatory for event access. Ensure your Transaction ID (TXN REF) is valid and matches your dashboard records.",
      warning: "Invalid or forged transaction IDs will result in a permanent ban from Syntaxia."
    },
    {
      id: "03",
      title: "HARDWARE & GEAR",
      icon: <Terminal className="text-[#55aa55]" size={20} />,
      content: "Participants in gaming or coding events must adhere to the specific hardware requirements of the mission. Use of unauthorized scripts or external cheats is strictly prohibited.",
      warning: "Zero-tolerance policy for unsportsmanlike conduct."
    },
    {
      id: "04",
      title: "REFUND & CANCELLATION",
      icon: <AlertCircle className="text-[#55aa55]" size={20} />,
      content: "Once a mission log (registration) is initialized and payment is confirmed, no refunds will be issued under any circumstances. Ensure your availability before syncing.",
      warning: "Access passes are non-transferable."
    }
  ];

  return (
    <div className="min-h-screen bg-[#080808] text-gray-300 font-minecraft selection:bg-[#55aa55] selection:text-black">
      <PremiumNavbar />

      <main className="max-w-4xl mx-auto pt-24 md:pt-32 px-6 pb-20">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
          <div>
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-[10px] text-[#55aa55] uppercase tracking-widest mb-4 hover:opacity-70 transition-all"
            >
              <ArrowLeft size={14} /> Return_To_Base
            </button>
            <h1 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-tight">
              Privacy <span className="text-[#55aa55]">&</span> Policies
            </h1>
            <p className="text-gray-500 text-xs mt-2 uppercase tracking-widest">
              Protocol_v2.0 // Terms of Engagement
            </p>
          </div>
          <div className="hidden md:block">
            <ShieldAlert size={80} className="text-[#55aa55] opacity-20" />
          </div>
        </div>

        {/* POLICY GRID */}
        <section className="space-y-6">
          <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-xl flex gap-4 items-start mb-8">
            <Info className="text-yellow-500 shrink-0" size={20} />
            <p className="text-[11px] text-yellow-500 leading-relaxed uppercase font-bold">
              Attention: By registering for Syntaxia, you are entering a binding agreement with the Core Protocol. Read the following directives carefully.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {policies.map((policy) => (
              <div 
                key={policy.id} 
                className="bg-[#0c0c0c] border border-[#1a1a1a] p-6 rounded-2xl group hover:border-[#55aa55]/30 transition-all"
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-[10px] text-gray-700 font-bold tracking-tighter">[{policy.id}]</span>
                  <div className="p-2 bg-[#111] rounded-lg border border-[#222]">
                    {policy.icon}
                  </div>
                  <h3 className="text-white font-bold uppercase text-lg tracking-wide">
                    {policy.title}
                  </h3>
                </div>
                
                <p className="text-gray-400 text-sm leading-relaxed mb-4 font-sans italic">
                  "{policy.content}"
                </p>

                <div className="flex items-center gap-2 text-[9px] text-red-500/70 uppercase font-bold tracking-widest border-t border-[#1a1a1a] pt-4">
                  <FileText size={12} />
                  <span>Warning: {policy.warning}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FINAL CONSENT */}
        <div className="mt-12 p-8 border border-dashed border-[#1a1a1a] rounded-3xl text-center">
          <p className="text-[10px] text-gray-500 uppercase tracking-[0.3em] mb-4">
            Awaiting_User_Acknowledgment
          </p>
          <p className="text-xs text-gray-400 max-w-md mx-auto leading-loose italic">
            "By proceeding with the payment and registration, I acknowledge that I have read the mission protocols and agree to abide by the Single-Link registration system."
          </p>
        </div>

        {/* FOOTER */}
        <footer className="mt-20 text-center opacity-30">
          <p className="text-[9px] uppercase tracking-[0.5em] font-bold">
            Encryption_Standard_AES_256 // Syntaxia_Core
          </p>
        </footer>
      </main>
    </div>
  );
};

export default PolicyPage;