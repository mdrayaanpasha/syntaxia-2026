import React, { useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { 
  MapPin, Clock, ShieldAlert, Gamepad2, Target, Shield, Code, 
  Terminal, Cpu, Trophy, Sparkles, DoorOpen, Video, Zap, 
  ArrowLeft, ChevronRight, TrendingUp, Phone, CheckCircle, Boxes
} from 'lucide-react';
import PremiumNavbar from '../home/components/nav';

const EventDetailsPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const eventId = searchParams.get('id');

  const quest = useMemo(() => {
    const quests = [
      {
        id: 1,
        dbId: "cmlgm1wy10001wpij8etyb11w",
        title: "BGMI",
        cat: "Gaming",
        slot: "TBA",
        venue: "Gaming Arena",
        icon: <Gamepad2 size={32} />,
        rarity: "border-[#A335EE]",
        glow: "shadow-[0_0_20px_rgba(163,53,238,0.3)]",
        text: "text-[#A335EE]",
        img: "https://ik.imagekit.io/yylpuqff5/Minecraft/bgmi_bg.png",
        description: "Squad up for the ultimate Battle Royale experience. Drop in, loot, and survive until the final circle. Only the last team standing claims the chicken dinner."
      },
      {
        id: 2,
        dbId: "cmlgm1wy10002wpij5m9w4zjl",
        title: "LOCK // LOAD",
        internalName: "Valorant",
        cat: "Gaming",
        slot: "TBA",
        description: "Welcome to the ultimate tactical battlefield where precision meets strategy and teamwork defines victory. The Inter-College Valorant Tournament is designed to bring together the most skilled agents from across campuses for a high-intensity esports showdown.",
        venue: "Gaming Arena",
        icon: <Target size={32} />,
        img: "https://ik.imagekit.io/yylpuqff5/Minecraft/val_bg.png",
        eventDetails: ["Team Composition: 5 Main Players + 1 Optional Substitute", "Tournament Type: Inter-College", "Game Mode: Custom Competitive", "Format: Group Stage followed by Knockout Rounds", "Platform: PC"],
        rulesAndRegulations: ["All participants must carry a valid college ID.", "Teams must report 30 minutes prior to match time.", "Any use of cheats/hacks results in immediate disqualification.", "Toxic behavior will not be tolerated."],
        eventHeads: [{ name: "Sapnil Roy", phone: "8972097048" }, { name: "Likhith Noel Roy", phone: "7892667608" }],
        rarity: "border-[#A335EE]",
        glow: "shadow-[0_0_20px_rgba(163,53,238,0.3)]",
        text: "text-[#A335EE]"
      },
      {
        id: 3,
        dbId: "cmlgm1wy10003wpijxnoslqtr",
        title: "CTF (CAPTURE THE FLAG)",
        internalName: "CTF",
        cat: "Technical",
        description: "Flag-Fest is an engaging Capture The Flag (CTF) competition where participants solve a series of interesting technical and logical challenges to discover hidden flags (unique strings of text).",
        eventDetails: ["Teams must consist of 3 members.", "Each participant must bring their own fully charged laptop.", "Duration: 2 hours.", "Categories: Web Exploitation, Cryptography, Forensics, OSINT."],
        rulesAndRegulations: ["Use of AI tools is strictly prohibited.", "Teams must not share flags or solutions.", "Late submissions will not be accepted."],
        eventHeads: [{ name: "Shubo", phone: "6364871536" }, { name: "Renu Thomas", phone: "7012958167" }],
        day: "DAY 1",
        slot: "10:00 – 16:30",
        venue: "De Nobili Hall (1st Floor)",
        icon: <Shield size={32} />,
        img: "https://ik.imagekit.io/yylpuqff5/Minecraft/ctf_bg.png",
        rarity: "border-[#55aa55]",
        glow: "shadow-[0_0_20px_rgba(85,170,85,0.3)]",
        text: "text-[#55aa55]"
      },
      {
        id: 4,
        dbId: "cmlgm1wy10005wpijzyma7iiu",
        title: "Redstone Run",
        internalName: "Debugging & Coding ",
        cat: "Technical",
        day: "DAY 1",
        description: "Redstone Run is a competitive coding event inspired by logic and problem-solving. Participants will face two rounds of debugging and coding challenges that test algorithmic thinking.",
        eventDetails: ["Teams of 1–2 members", "Total Duration: 2 hours", "Round 1: Debugging (30 mins) | Round 2: Coding (1.5 hours)", "Languages: Python, C++, Java"],
        rulesAndRegulations: ["No external help allowed (Google, AI tools, notes).", "Any form of malpractice results in immediate disqualification.", "Decisions made by judges are final."],
        eventHeads: [{ name: "Joy Yahshua", phone: "9035158632" }, { name: "Mahesh Khadayat", phone: "9844900656" }],
        slot: "10:00 – 12:30",
        venue: "Conference Hall 2 (Magis)",
        icon: <Code size={32} />,
        img: "https://ik.imagekit.io/yylpuqff5/Minecraft/code_bg.png",
        rarity: "border-[#55aa55]",
        glow: "shadow-[0_0_20px_rgba(85,170,85,0.3)]",
        text: "text-[#55aa55]"
      },
      {
        id: 5,
        dbId: "cmlgm1wy10006wpijo6lm39g3",
        title: "DATA DETECTIVE (SQL)",
        internalName: "Data Detective",
        cat: "Technical",
        description: "Step into a Minecraft inspired world where every action creates data and every clue tells a story. Solve a murder mystery using logic, SQL queries and analytical thinking.",
        day: "DAY 2",
        slot: "10:00 – 12:30",
        eventDetails: ["Team size: 1–2 members per team.", "Total rounds: 2.", "Mode: Offline / Online SQL environment (as provided)."],
        eventHeads: [{ name: "Chitraksh", phone: "+91 8618908678" }],
        rulesAndRegulations: ["No external help allowed.", "Mobile phones must be kept away.", "Decisions made by judges are final."],
        venue: "De Nobili Hall (1st Floor)",
        icon: <Terminal size={32} />,
        img: "https://ik.imagekit.io/yylpuqff5/Minecraft/sql_bg.png",
        rarity: "border-[#55aa55]",
        glow: "shadow-[0_0_20px_rgba(85,170,85,0.3)]",
        text: "text-[#55aa55]"
      },
      {
        id: 6,
        dbId: "cmlgm1wy10004wpij622cseeu",
        title: "IT QUIZ",
        internalName: "IT Quiz",
        cat: "Technical",
        description: "Spawn into a world where knowledge is your most valuable resource. This IT quiz requires you to craft solutions and dodge logical creepers.",
        eventDetails: ["Team Size: 1 - 2 members per team", "Time Limit: 2 hours", "Number of Rounds: 2"],
        rulesAndRegulations: ["Survival Mode On: No external assistance allowed.", "No Griefing: Any form of cheating leads to disqualification.", "Admin's Word: All decisions made by judges are final."],
        day: "TBA",
        slot: "TBA",
        venue: "TBA",
        icon: <Cpu size={32} />,
        img: "https://ik.imagekit.io/yylpuqff5/Minecraft/quiz_bg.png",
        rarity: "border-[#55aa55]",
        glow: "shadow-[0_0_20px_rgba(85,170,85,0.3)]",
        text: "text-[#55aa55]",
        eventHeads: [{ name: "Sujan", phone: "8317334461" }, { name: "Aaron", phone: "7738408905" }]
      },
      {
        id: 7,
        dbId: "cmlgm1wy10007wpijl52gfwxj",
        title: "IPL AUCTION",
        description: "Step into the thrill of the IPL auction room and become a franchise owner for a day! Build the ultimate squad using strategy, stats, and smart decision-making.",
        cat: "Non-Technical",
        day: "DAY 2",
        slot: "10:00 – 16:30",
        venue: "Conference Hall 2 (Magis)",
        eventDetails: ["Round 1: IPL quiz (Elimination Round).", "Round 2: Auction Room.", "Participants can use Excel during the auction round."],
        rulesAndRegulations: ["Team size: Maximum 3 participants.", "No use of mobile phones during the quiz round.", "The auctioneer’s decision will be final."],
        eventHeads: [{ name: "Hirender Singh", phone: "9008530931" }, { name: "Brandon", phone: "8861379823" }],
        icon: <Trophy size={32} />,
        img: "https://ik.imagekit.io/yylpuqff5/Minecraft/ipl_bg.png",
        rarity: "border-[#ffcc00]",
        glow: "shadow-[0_0_20px_rgba(255,204,0,0.3)]",
        text: "text-[#ffcc00]"
      },
      {
        id: 8,
        dbId: "cmlgm1wy10008wpij9wkl7ggo",
        title: "ANIME QUIZ",
        cat: "Non-Technical",
        day: "DAY 2",
        slot: "13:30 – 16:30",
        venue: "De Nobili Hall",
        icon: <Sparkles size={32} />,
        img: "https://ik.imagekit.io/yylpuqff5/Minecraft/anime_bg.png",
        rarity: "border-[#ffcc00]",
        glow: "shadow-[0_0_20px_rgba(255,204,0,0.3)]",
        text: "text-[#ffcc00]",
        description: "Test your knowledge of the anime world in this high-stakes trivia battle. From classic Shonen to modern Seinen, only the true Otakus will survive."
      },
      {
        id: 9,
        dbId: "cmlgm1wy10009wpij3ufrl65m",
        title: "Mine Your Way Out",
        internalName: "Escape Room",
        description: "Inspired by the iconic Minecraft universe, this immersive escape room challenges your observation skills, logic, and teamwork under pressure.",
        eventDetails: ["4 members per team", "Time limit: 15 mins", "Number of rounds: 1"],
        rulesAndRegulations: ["No phones or external assistance.", "The entire task must be finished within the time limit.", "Decisions made by judges are final."],
        eventHeads: [{ name: "Lakshya K", phone: "9742402114" }, { name: "Aishwariya A", phone: "8431536748" }],
        cat: "Non-Technical",
        day: "BOTH DAYS",
        slot: "10:00 – 16:30",
        venue: "Faber Hall (Ground Floor)",
        icon: <DoorOpen size={32} />,
        img: "https://ik.imagekit.io/yylpuqff5/Minecraft/escape_bg.png",
        rarity: "border-[#ffcc00]",
        glow: "shadow-[0_0_20px_rgba(255,204,0,0.3)]",
        text: "text-[#ffcc00]"
      },
      {
        id: 10,
        dbId: "cmlgm1wy1000awpijjbkedi4h",
        title: "BUSINESS REVIVAL",
        cat: "Non-Technical",
        day: "DAY 1",
        slot: "10:00 – 16:30",
        venue: "Aloysius Hall (1st Floor)",
        icon: <TrendingUp size={32} />,
        img: "https://ik.imagekit.io/yylpuqff5/Minecraft/biz_bg.png",
        rarity: "border-[#ffcc00]",
        glow: "shadow-[0_0_20px_rgba(255,204,0,0.3)]",
        text: "text-[#ffcc00]",
        description: "Take failing brands and flip them into market leaders. This event tests your business logic, marketing strategy, and revival instincts."
      },
      {
        id: 11,
        dbId: "cmlgm1wy1000bwpij0508s1t8",
        title: "REEL MAKING",
        description: "Minecraft-themed reel making event. Spin a wheel to get your genre and create a 30–60 second Instagram Reel incorporating the theme.",
        cat: "Non-Technical",
        eventDetails: ["Team Size: 1–2 members", "Reel Duration: 30–60 seconds", "Platform: Instagram Reels"],
        rulesAndRegulations: ["Minecraft theme must be clearly represented.", "Reel duration must strictly be 30–60 seconds.", "Any offensive content leads to disqualification."],
        eventHeads: [{ name: "Charles Mervin J", phone: "9538203989" }, { name: "Zoya Hafsa", phone: "8123358161" }],
        day: "DAY 1",
        slot: "10:00 – 12:30",
        venue: "Loyola Hall (Ground Floor)",
        icon: <Video size={32} />,
        img: "https://ik.imagekit.io/yylpuqff5/Minecraft/reel_bg.png",
        rarity: "border-[#ffcc00]",
        glow: "shadow-[0_0_20px_rgba(255,204,0,0.3)]",
        text: "text-[#ffcc00]"
      }
    ];
    return quests.find(q => q.dbId === eventId);
  }, [eventId]);

  if (!quest) return (
    <div className="min-h-screen bg-[#030303] flex items-center justify-center font-minecraft">
      <div className="text-center border-2 border-dashed border-white/10 p-20">
         <ShieldAlert size={48} className="text-red-500 mx-auto mb-6" />
         <p className="text-white text-xl uppercase tracking-widest">Dossier_Not_Found</p>
         <button onClick={() => navigate('/events')} className="mt-8 text-[#55aa55] text-xs underline">/return_to_hub</button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#030303] font-minecraft text-gray-300 selection:bg-[#55aa55] selection:text-black">
      <PremiumNavbar />
      
      <main className="max-w-7xl mx-auto px-6 pt-32 pb-48">
        {/* HUD NAV */}
        <button onClick={() => navigate(-1)} className="flex items-center gap-3 text-gray-700 hover:text-white transition-all mb-12 font-mono text-[10px] uppercase tracking-[0.4em]">
          <ArrowLeft size={14} /> /return_to_board
        </button>

        {/* HERO SLAB CARD */}
        <div className="relative w-full bg-[#050505] border-x-[4px] border-b-[12px] border-black overflow-hidden mb-16 shadow-[0_30px_60px_rgba(0,0,0,0.6)]">
          <div className="absolute inset-0 z-0">
            <img src={quest.img} alt="" className="w-full h-full object-cover opacity-30 grayscale hover:grayscale-0 transition-all duration-700" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/80 to-transparent"></div>
          </div>
          <div className="absolute top-0 left-0 h-[6px] w-full z-20" style={{ backgroundColor: quest.text.includes('#') ? quest.text.split('[')[1].split(']')[0] : '#55aa55' }}></div>

          <div className="relative z-10 p-10 md:p-24">
             <div className="flex flex-col md:flex-row items-center gap-12">
                <div className={`w-24 h-24 bg-black border-4 flex items-center justify-center shadow-[8px_8px_0px_#000] ${quest.rarity} ${quest.text}`}>
                  {quest.icon}
                </div>
                <div className="text-center md:text-left">
                   <p className="text-[#55aa55] font-mono text-[9px] uppercase tracking-[0.5em] mb-4">/active_mission_dossier</p>
                   <h1 className="text-6xl md:text-9xl font-black text-white italic uppercase tracking-tighter leading-[0.8] mb-6 [text-shadow:8px_8px_0px_#111]">
                     {quest.title}
                   </h1>
                   <div className="flex flex-wrap justify-center md:justify-start gap-4">
                      <span className="bg-white/5 border border-white/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-[#ffcc00]">{quest.cat}</span>
                      {quest.day && <span className="bg-white/5 border border-white/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white">{quest.day}</span>}
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* HUD INFO GRID */}
        <div className="grid lg:grid-cols-12 gap-1 bg-white/5 border border-white/5 mb-16">
           <div className="lg:col-span-4 bg-[#050505] p-10">
              <p className="text-gray-600 font-mono text-[9px] uppercase tracking-[0.4em] mb-6 flex items-center gap-2"><MapPin size={12} /> Target_Location</p>
              <p className="text-2xl font-black text-white italic uppercase tracking-widest">{quest.venue}</p>
           </div>
           <div className="lg:col-span-4 bg-[#050505] p-10 border-y lg:border-y-0 lg:border-x border-white/5">
              <p className="text-gray-600 font-mono text-[9px] uppercase tracking-[0.4em] mb-6 flex items-center gap-2"><Clock size={12} /> Temporal_Window</p>
              <p className="text-2xl font-black text-white italic uppercase tracking-widest">{quest.slot}</p>
           </div>
           <div className="lg:col-span-4 bg-[#050505] p-10 flex flex-col justify-center">
              <p className="text-gray-600 font-mono text-[9px] uppercase tracking-[0.4em] mb-6 flex items-center gap-2"><Terminal size={12} /> Field_Commanders</p>
              {quest.eventHeads?.map((h, i) => (
                <div key={i} className="flex justify-between items-center mb-2">
                  <p className="text-lg font-black text-[#ffcc00] italic uppercase">{h.name}</p>
                  <a href={`tel:${h.phone}`} className="text-gray-500 hover:text-white font-mono text-[10px] tracking-widest underline underline-offset-4">{h.phone}</a>
                </div>
              ))}
           </div>
        </div>

        {/* MISSION SPECS LIST */}
        <div className="grid md:grid-cols-2 gap-20">
           <div className="space-y-12">
              <div>
                <h3 className="text-[#55aa55] font-mono text-[10px] uppercase tracking-[0.5em] mb-10 border-b border-white/5 pb-4">Mission_Briefing</h3>
                <p className="text-gray-400 text-lg leading-relaxed italic">{quest.description}</p>
              </div>

              {quest.eventDetails && (
                <div>
                  <h3 className="text-[#ffcc00] font-mono text-[10px] uppercase tracking-[0.5em] mb-10 border-b border-white/5 pb-4">Technical_Parameters</h3>
                  <div className="space-y-6">
                    {quest.eventDetails.map((detail, i) => (
                      <div key={i} className="flex items-center gap-5 text-gray-500 hover:text-white transition-colors">
                        <CheckCircle size={16} className="text-[#ffcc00]" />
                        <span className="text-[11px] font-mono uppercase tracking-[0.2em]">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
           </div>

           {quest.rulesAndRegulations && (
             <div>
                <h3 className="text-red-500 font-mono text-[10px] uppercase tracking-[0.5em] mb-10 border-b border-white/5 pb-4">Protocol_Directives</h3>
                <div className="bg-red-500/5 border border-red-500/10 p-10 space-y-6">
                  {quest.rulesAndRegulations.map((rule, i) => (
                    <div key={i} className="flex items-start gap-5 text-gray-500">
                      <span className="text-red-500 font-mono text-[10px] mt-1">0{i+1}</span>
                      <span className="text-[11px] font-mono uppercase tracking-[0.2em] leading-relaxed">{rule}</span>
                    </div>
                  ))}
                </div>
             </div>
           )}
        </div>

        {/* STICKY GLASSY CTA */}
        <div className="fixed bottom-0 left-0 w-full p-6 md:p-10 z-[60] pointer-events-none">
          <div className="max-w-7xl mx-auto flex justify-end">
            <button 
              onClick={() => navigate(`/register?event-name=${quest.dbId}`)}
              className="pointer-events-auto w-full md:w-[450px] h-20 md:h-24 bg-[#55aa55]/90 backdrop-blur-2xl border-x-[4px] border-b-[8px] border-black shadow-[0_25px_60px_rgba(0,0,0,0.6)] group relative overflow-hidden transition-all active:translate-y-1 active:border-b-4"
            >
              <div className="relative z-10 flex items-center justify-center gap-8 text-black">
                <span className="font-black italic uppercase tracking-[0.3em] text-xl md:text-2xl">Register</span>
                <ChevronRight className="group-hover:translate-x-3 transition-transform" size={28} />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-shimmer" />
            </button>
          </div>
        </div>
      </main>

      {/* BACKGROUND DECOR */}
      <div className="fixed bottom-10 right-10 opacity-5 pointer-events-none select-none">
         <Boxes size={400} className="text-white" />
      </div>
    </div>
  );
};

export default EventDetailsPage;