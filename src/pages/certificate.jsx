import React from 'react';
import { useParams } from 'react-router-dom';
import bg from "../../public/bg(1).png";
import dean from "../../public/dean(1).png";
import soit from "../../public/so_it.jpg";

const Certificate = () => {
  const { name, college } = useParams();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {/* CRITICAL PRINT CSS: 
          1. Forces landscape.
          2. Forces a fixed desktop-width viewport (1120px) so mobile doesn't shrink fonts.
      */}
      <style>
        {`
          @media print {
            @page { size: landscape; margin: 0; }
            body { 
              margin: 0; 
              width: 1120px !important; 
              min-width: 1120px !important;
              background: white;
            }
            .no-print { display: none !important; }
            .print-wrapper { 
              transform: scale(1.1) !important; /* Adjust to fill A4 paper width */
              transform-origin: top left;
              margin: 0 !important;
              padding: 40px !important;
            }
          }
        `}
      </style>

      {/* Action Button */}
      <button 
        onClick={() => window.print()} 
        className="no-print mb-8 flex items-center gap-3 px-10 py-4 bg-slate-900 text-white rounded-full font-bold hover:bg-sky-600 transition-all shadow-xl active:scale-95"
      >
        <span>📥</span> DOWNLOAD CERTIFICATE
      </button>

      {/* Responsive Wrapper: 
         - On screen: Scales down for small devices.
         - On print: Resets to full size via 'print-wrapper' class.
      */}
      <div className="print-wrapper transform scale-[0.35] xs:scale-[0.45] sm:scale-[0.7] md:scale-[0.85] lg:scale-100 transition-transform duration-300">
        
        {/* Main Certificate Container */}
        <div className="relative w-[850px] h-[600px] bg-white shadow-2xl overflow-hidden border-8 border-white rounded-sm flex flex-col p-6 text-slate-800">
          
          <div className="absolute inset-0 opacity-10 pointer-events-none" 
                style={{ backgroundImage: 'linear-gradient(#94a3b8 1px, transparent 1px), linear-gradient(90deg, #94a3b8 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
          </div>

          {/* Header Logos */}
          <div className="relative z-20 w-full flex justify-between items-start -mt-2">
            <LogoCircle src={soit}/>
            <LogoCircle src="https://media.canva.com/v2/image-resize/format:PNG/height:200/quality:100/uri:ifs%3A%2F%2FM%2F302ead2d-65d9-423d-9187-7e4d106f0e83/watermark:F/width:200?csig=AAAAAAAAAAAAAAAAAAAAAAxPSb7mUCRxxtRydMp2JfBWiR_Q0XoXSY6WmWURIz10&exp=1766180443&osig=AAAAAAAAAAAAAAAAAAAAAOHgTQwVcnDB94zaBECC5u_uhb5rnpfBTsSOBHoaTbXu&signer=media-rpc&x-canva-quality=thumbnail" />
            <LogoCircle src="https://media.canva.com/v2/image-resize/format:PNG/height:200/quality:100/uri:ifs%3A%2F%2FM%2Fe93c0c4b-bb77-456a-ab9b-e7e6426c0ae4/watermark:F/width:141?csig=AAAAAAAAAAAAAAAAAAAAAI106_nnuIIJL-tv9av5h64XzMMWMIs6_NG7Uwl_MV3Q&exp=1766182479&osig=AAAAAAAAAAAAAAAAAAAAAMTqlhz6-8mzrpAB51g29kGVz9WwsefIjCI5W-mW3mKU&signer=media-rpc&x-canva-quality=thumbnail" />
          </div>

          <div className="relative z-10 flex flex-col items-center flex-grow mt-2">
            <div className="text-center uppercase mb-6">
              <h1 className="text-3xl font-black tracking-widest mb-1 text-slate-900">St Joseph's University</h1>
              <p className="text-[9px] text-gray-500 italic">36, Lalbagh Road, Bengaluru-560027, Karnataka</p>
              <div className="mt-3 space-y-1 font-semibold text-sm tracking-widest">
                <p>School of Information Technology</p>
                <p>Department of Computer Science & Cybernetics Association</p>
              </div>
            </div>

            <div className="text-center mb-4">
              <h2 className="text-7xl font-black italic tracking-tighter text-slate-700">HACKATHON</h2>
              <div className="flex justify-center -mt-2">
                 <p className="text-xl font-bold border-2 border-slate-700 px-2 rotate-2 bg-white">2025</p>
              </div>
            </div>

            <h3 className="text-lg font-bold tracking-[0.3em] mb-6 border-b-2 border-slate-800 pb-1">CERTIFICATE OF PARTICIPATION</h3>

            <div className="text-center w-full px-12 leading-relaxed uppercase text-[11px] font-bold mb-8">
              <p>
                This is to certify that{" "}
                <span className="inline-block border-b border-dotted border-slate-800 min-w-[200px] mx-1 text-base normal-case text-sky-600">
                  {name ? decodeURIComponent(name) : "________________"}
                </span>{" "}
                of{" "}
                <span className="inline-block border-b border-dotted border-slate-800 min-w-[200px] mx-1 text-base normal-case text-sky-600">
                  {college ? decodeURIComponent(college) : "________________"}
                </span>{" "}
                has participated in Hackathon'25 held by the Cybernetics Association on 20th December 2025.
              </p>
            </div>

            {/* Signatures */}
            <div className="w-full flex justify-around mt-auto text-center px-4 mb-10">
              <Signature name="Dr. Annie Syrien" role="Coordinator" image="https://media.canva.com/v2/image-resize/format:PNG/height:167/quality:100/uri:ifs%3A%2F%2FM%2F3078378c-8d97-43a2-8bee-ae773a70881c/watermark:F/width:200?csig=AAAAAAAAAAAAAAAAAAAAANSfY37qOqV-a19sKZ_cVFA7PVudb7XnhYfowDDm5EmX&exp=1766182375&osig=AAAAAAAAAAAAAAAAAAAAABtes-4TGXOeqKeUeRdeVUGPMBvbLkT2AI9iyvlYYwbp&signer=media-rpc&x-canva-quality=thumbnail" />
              <Signature name="Dr. B G Prashanthi" role="HOD" image={bg} />
              <Signature name="Dr. A. M. Bojamma" role="Dean" image={dean}/>
            </div>
          </div>

          {/* Bottom Polygon */}
          <div className="absolute bottom-0 left-0 w-full h-14 bg-sky-600 z-0" 
               style={{ clipPath: 'polygon(0% 40%, 5% 20%, 10% 40%, 15% 10%, 20% 45%, 25% 15%, 30% 50%, 35% 20%, 40% 45%, 45% 10%, 50% 40%, 55% 15%, 60% 50%, 65% 25%, 70% 45%, 75% 10%, 80% 40%, 85% 20%, 90% 45%, 95% 15%, 100% 40%, 100% 100%, 0% 100%)' }}>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sub-components
const LogoCircle = ({ src }) => (
  <div className="w-14 h-14 rounded-full flex items-center justify-center overflow-hidden bg-white shadow-sm border border-gray-100">
    <img src={src} alt="logo" className="w-10 h-10 object-contain" />
  </div>
);

const Signature = ({ name, role, image }) => (
  <div className="flex flex-col items-center">
    <div className="relative h-12 w-32 flex items-end justify-center border-b border-slate-400 mb-1">
      <img src={image} alt="signature" className="absolute bottom-1 h-auto max-h-12 w-auto object-contain" />
    </div>
    <p className="text-[10px] font-bold mt-1 uppercase">{name}</p>
    <p className="text-[7px] text-gray-500 uppercase tracking-tighter">{role}</p>
  </div>
);

export default Certificate;