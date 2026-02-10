import React, { useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { 
  MapPin, Clock, CheckCircle, Phone, ArrowLeft, 
  ShieldAlert, Gamepad2, Target, Shield, Code, 
  Terminal, Cpu, Trophy, Sparkles, DoorOpen, 
  TrendingUp, Video, Zap, ChevronRight
} from 'lucide-react';
import PremiumNavbar from '../home/components/nav';

const EventDetailsPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const eventId = searchParams.get('id');

  // Using useMemo to prevent re-calculating the quest on every render
  const quest = useMemo(() => {
const quests = [
  {
    id: 1,
    dbId: "cmlgm1wy10001wpij8etyb11w", // BGMI
    title: "BGMI",
    cat: "Gaming",
    slot: "TBA",
    venue: "Gaming Arena",
    icon: <Gamepad2 size={24} />,
    rarity: "border-[#A335EE]",
    glow: "shadow-[0_0_20px_rgba(163,53,238,0.3)]",
    text: "text-[#A335EE]",
    description:
      "Squad up for the ultimate Battle Royale experience. Drop in, loot, and survive until the final circle. Only the last team standing claims the chicken dinner."
  },
  {
    id: 2,
    dbId: "cmlgm1wy10002wpij5m9w4zjl", // Valorant
    title: "LOCK // LOAD",
    internalName: "Valorant",
    cat: "Gaming",
    slot: "TBA",
    description:
      "Welcome to the ultimate tactical battlefield where precision meets strategy and teamwork defines victory. The Inter-College Valorant Tournament is designed to bring together the most skilled agents from across campuses for a high-intensity esports showdown.",
    venue: "Gaming Arena",
    icon: <Target size={24} />,
    eventDetails: [
      "Team Composition: 5 Main Players + 1 Optional Substitute",
      "Tournament Type: Inter-College",
      "Game Mode: Custom Competitive",
      "Format: Group Stage followed by Knockout Rounds",
      "Platform: PC"
    ],
    rulesAndRegulations: [
      "All participants must carry a valid college ID.",
      "Teams must report 30 minutes prior to match time.",
      "Any use of cheats/hacks results in immediate disqualification.",
      "Toxic behavior will not be tolerated."
    ],
    eventHeads: [
      { name: "Sapnil Roy", phone: "8972097048" },
      { name: "Likhith Noel Roy", phone: "7892667608" }
    ],
    rarity: "border-[#A335EE]",
    glow: "shadow-[0_0_20px_rgba(163,53,238,0.3)]",
    text: "text-[#A335EE]"
  },
  {
    id: 3,
    dbId: "cmlgm1wy10003wpijxnoslqtr", // CTF
    title: "CTF (CAPTURE THE FLAG)",
    internalName: "CTF",
    cat: "Technical",
    description:
      "Flag-Fest is an engaging Capture The Flag (CTF) competition where participants solve a series of interesting technical and logical challenges to discover hidden flags (unique strings of text).",
    eventDetails: [
      "Teams must consist of 3 members.",
      "Each participant must bring their own fully charged laptop.",
      "Duration: 2 hours.",
      "Categories: Web Exploitation, Cryptography, Forensics, OSINT."
    ],
    rulesAndRegulations: [
      "Use of AI tools is strictly prohibited.",
      "Teams must not share flags or solutions.",
      "Late submissions will not be accepted."
    ],
    eventHeads: [
      { name: "Shubo", phone: "6364871536" },
      { name: "Renu Thomas", phone: "7012958167" }
    ],
    day: "DAY 1",
    slot: "10:00 – 16:30",
    venue: "De Nobili Hall (1st Floor)",
    icon: <Shield size={24} />,
    rarity: "border-[#55aa55]",
    glow: "shadow-[0_0_20px_rgba(85,170,85,0.3)]",
    text: "text-[#55aa55]"
  },
  {
    id: 4,
    dbId: "cmlgm1wy10005wpijzyma7iiu", // Debugging & Coding
    title: "Redstone Run",
    internalName: "Debugging & Coding ",
    cat: "Technical",
    day: "DAY 1",
    description:
      "Redstone Run is a competitive coding event inspired by logic and problem-solving. Participants will face two rounds of debugging and coding challenges that test algorithmic thinking.",
    eventDetails: [
      "Teams of 1–2 members",
      "Total Duration: 2 hours",
      "Round 1: Debugging (30 mins) | Round 2: Coding (1.5 hours)",
      "Languages: Python, C++, Java"
    ],
    rulesAndRegulations: [
      "No external help allowed (Google, AI tools, notes).",
      "Any form of malpractice results in immediate disqualification.",
      "Decisions made by judges are final."
    ],
    eventHeads: [
      { name: "Joy Yahshua", phone: "9035158632" },
      { name: "Mahesh Khadayat", phone: "9844900656" }
    ],
    slot: "10:00 – 12:30",
    venue: "Conference Hall 2 (Magis)",
    icon: <Code size={24} />,
    rarity: "border-[#55aa55]",
    glow: "shadow-[0_0_20px_rgba(85,170,85,0.3)]",
    text: "text-[#55aa55]"
  },
  {
    id: 5,
    dbId: "cmlgm1wy10006wpijo6lm39g3", // Data Detective
    title: "DATA DETECTIVE (SQL)",
    internalName: "Data Detective",
    cat: "Technical",
    description:
      "Step into a Minecraft inspired world where every action creates data and every clue tells a story. Solve a murder mystery using logic, SQL queries and analytical thinking.",
    day: "DAY 2",
    slot: "10:00 – 12:30",
    eventDetails: [
      "Team size: 1–2 members per team.",
      "Total rounds: 2.",
      "Mode: Offline / Online SQL environment (as provided)."
    ],
    eventHeads: [{ name: "Chitraksh", phone: "+91 8618908678" }],
    rulesAndRegulations: [
      "No external help allowed.",
      "Mobile phones must be kept away.",
      "Decisions made by judges are final."
    ],
    venue: "De Nobili Hall (1st Floor)",
    icon: <Terminal size={24} />,
    rarity: "border-[#55aa55]",
    glow: "shadow-[0_0_20px_rgba(85,170,85,0.3)]",
    text: "text-[#55aa55]"
  },
  {
    id: 6,
    dbId: "cmlgm1wy10004wpij622cseeu", // IT Quiz
    title: "IT QUIZ",
    internalName: "IT Quiz",
    cat: "Technical",
    description:
      "Spawn into a world where knowledge is your most valuable resource. This IT quiz requires you to craft solutions and dodge logical creepers.",
    eventDetails: [
      "Team Size: 1 - 2 members per team",
      "Time Limit: 2 hours",
      "Number of Rounds: 2"
    ],
    rulesAndRegulations: [
      "Survival Mode On: No external assistance allowed.",
      "No Griefing: Any form of cheating leads to disqualification.",
      "Admin's Word: All decisions made by judges are final."
    ],
    day: "TBA",
    slot: "TBA",
    venue: "TBA",
    icon: <Cpu size={24} />,
    rarity: "border-[#55aa55]",
    glow: "shadow-[0_0_20px_rgba(85,170,85,0.3)]",
    text: "text-[#55aa55]",
    eventHeads: [
      { name: "Sujan", phone: "8317334461" },
      { name: "Aaron", phone: "7738408905" }
    ]
  },
  {
    id: 7,
    dbId: "cmlgm1wy10007wpijl52gfwxj", // IPL Auction
    title: "IPL AUCTION",
    description:
      "Step into the thrill of the IPL auction room and become a franchise owner for a day! Build the ultimate squad using strategy, stats, and smart decision-making.",
    cat: "Non-Technical",
    day: "DAY 2",
    slot: "10:00 – 16:30",
    venue: "Conference Hall 2 (Magis)",
    eventDetails: [
      "Round 1: IPL quiz (Elimination Round).",
      "Round 2: Auction Room.",
      "Participants can use Excel during the auction round."
    ],
    rulesAndRegulations: [
      "Team size: Maximum 3 participants.",
      "No use of mobile phones during the quiz round.",
      "The auctioneer’s decision will be final."
    ],
    eventHeads: [
      { name: "Hirender Singh", phone: "9008530931" },
      { name: "Brandon", phone: "8861379823" }
    ],
    icon: <Trophy size={24} />,
    rarity: "border-[#ffcc00]",
    glow: "shadow-[0_0_20px_rgba(255,204,0,0.3)]",
    text: "text-[#ffcc00]"
  },
  {
    id: 8,
    dbId: "cmlgm1wy10008wpij9wkl7ggo", // Anime Quiz
    title: "ANIME QUIZ",
    cat: "Non-Technical",
    day: "DAY 2",
    slot: "13:30 – 16:30",
    venue: "De Nobili Hall",
    icon: <Sparkles size={24} />,
    rarity: "border-[#ffcc00]",
    glow: "shadow-[0_0_20px_rgba(255,204,0,0.3)]",
    text: "text-[#ffcc00]"
  },
  {
    id: 9,
    dbId: "cmlgm1wy10009wpij3ufrl65m", // Escape Room
    title: "Mine Your Way Out",
    internalName: "Escape Room",
    description:
      "Inspired by the iconic Minecraft universe, this immersive escape room challenges your observation skills, logic, and teamwork under pressure.",
    eventDetails: [
      "4 members per team",
      "Time limit: 15 mins",
      "Number of rounds: 1"
    ],
    rulesAndRegulations: [
      "No phones or external assistance.",
      "The entire task must be finished within the time limit.",
      "Decisions made by judges are final."
    ],
    eventHeads: [
      { name: "Lakshya K", phone: "9742402114" },
      { name: "Aishwariya A", phone: "8431536748" }
    ],
    cat: "Non-Technical",
    day: "BOTH DAYS",
    slot: "10:00 – 16:30",
    venue: "Faber Hall (Ground Floor)",
    icon: <DoorOpen size={24} />,
    rarity: "border-[#ffcc00]",
    glow: "shadow-[0_0_20px_rgba(255,204,0,0.3)]",
    text: "text-[#ffcc00]"
  },
  {
    id: 10,
    dbId: "cmlgm1wy1000awpijjbkedi4h", // Business Revival
    title: "BUSINESS REVIVAL",
    cat: "Non-Technical",
    day: "DAY 1",
    slot: "10:00 – 16:30",
    venue: "Aloysius Hall (1st Floor)",
    icon: <TrendingUp size={24} />,
    rarity: "border-[#ffcc00]",
    glow: "shadow-[0_0_20px_rgba(255,204,0,0.3)]",
    text: "text-[#ffcc00]"
  },
  {
    id: 11,
    dbId: "cmlgm1wy1000bwpij0508s1t8", // Reel Making
    title: "REEL MAKING",
    description:
      "Minecraft-themed reel making event. Spin a wheel to get your genre and create a 30–60 second Instagram Reel incorporating the theme.",
    cat: "Non-Technical",
    eventDetails: [
      "Team Size: 1–2 members",
      "Reel Duration: 30–60 seconds",
      "Platform: Instagram Reels"
    ],
    rulesAndRegulations: [
      "Minecraft theme must be clearly represented.",
      "Reel duration must strictly be 30–60 seconds.",
      "Any offensive content leads to disqualification."
    ],
    eventHeads: [
      { name: "Charles Mervin J", phone: "9538203989" },
      { name: "Zoya Hafsa", phone: "8123358161" }
    ],
    day: "DAY 1",
    slot: "10:00 – 12:30",
    venue: "Loyola Hall (Ground Floor)",
    icon: <Video size={24} />,
    rarity: "border-[#ffcc00]",
    glow: "shadow-[0_0_20px_rgba(255,204,0,0.3)]",
    text: "text-[#ffcc00]"
  }
];



    return quests.find(q => q.dbId === eventId);
  }, [eventId]);

  const handleRegister = () => {
    const targetName = quest.internalName || quest.title;
    navigate(`/register-event?event-name=${encodeURIComponent(targetName)}`);
  };

  if (!quest) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center text-gray-500 font-mono">
        <ShieldAlert size={48} className="mb-4 text-red-500 animate-pulse" />
        <p className="tracking-[0.2em]">ERROR: MISSION_ID_NOT_FOUND</p>
        <button onClick={() => navigate('/events')} className="mt-6 text-[#55aa55] hover:underline">
          Return to Quest Board
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-gray-300 font-sans selection:bg-[#55aa55] selection:text-black">
      <PremiumNavbar />
      
      <main className="max-w-4xl mx-auto px-6 pt-32 pb-20">
        {/* BACK BUTTON */}
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-gray-500 hover:text-[#55aa55] transition-colors mb-10 font-mono text-xs uppercase tracking-widest"
        >
          <ArrowLeft size={16} /> /back_to_grid
        </button>

        {/* HERO SECTION */}
        <div className="flex flex-col md:flex-row gap-8 items-start mb-16">
          <div className={`p-6 rounded-3xl bg-[#0a0a0a] border-2 ${quest.rarity} ${quest.text} ${quest.glow} shrink-0`}>
            {quest.icon}
          </div>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-white/5 border border-white/10 ${quest.text}`}>
                {quest.cat}
              </span>
              {quest.day && (
                <span className="text-[10px] font-mono text-[#ffcc00] uppercase tracking-widest">
                  {quest.day}
                </span>
              )}
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase italic leading-none mb-4">
              {quest.title}
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed max-w-2xl font-medium">
              {quest.description}
            </p>
          </div>
        </div>

        {/* INTEL GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="p-6 bg-[#0a0a0a] border border-[#222] rounded-3xl group hover:border-[#55aa55]/50 transition-all">
            <div className="flex items-center gap-3 text-[#55aa55] mb-4">
              <MapPin size={20} />
              <span className="text-[10px] uppercase font-black tracking-widest">Target_Location</span>
            </div>
            <p className="text-xl font-bold text-white uppercase">{quest.venue}</p>
          </div>

          <div className="p-6 bg-[#0a0a0a] border border-[#222] rounded-3xl group hover:border-[#ffcc00]/50 transition-all">
            <div className="flex items-center gap-3 text-[#ffcc00] mb-4">
              <Clock size={20} />
              <span className="text-[10px] uppercase font-black tracking-widest">Temporal_Window</span>
            </div>
            <p className="text-xl font-bold text-white uppercase">{quest.slot}</p>
          </div>
        </div>

        {/* DETAILED SPECS */}
        <div className="space-y-12">
          {/* PARAMETERS */}
          {quest.eventDetails && (
            <div className="relative">
               <div className="flex items-center gap-4 mb-6">
                <Zap size={18} className="text-[#55aa55]" />
                <h2 className="text-xs font-black text-gray-500 uppercase tracking-[0.4em]">Mission_Parameters</h2>
                <div className="h-px flex-1 bg-[#111]"></div>
               </div>
               <ul className="grid grid-cols-1 gap-4">
                {quest.eventDetails.map((detail, i) => (
                  <li key={i} className="flex gap-4 p-4 bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl text-gray-300">
                    <CheckCircle size={18} className="text-[#55aa55] shrink-0 mt-0.5" />
                    <span className="text-sm font-medium">{detail}</span>
                  </li>
                ))}
               </ul>
            </div>
          )}

          {/* RULES */}
          {quest.rulesAndRegulations && (
            <div>
               <div className="flex items-center gap-4 mb-6">
                <ShieldAlert size={18} className="text-red-500" />
                <h2 className="text-xs font-black text-gray-500 uppercase tracking-[0.4em]">Directives_&_Rules</h2>
                <div className="h-px flex-1 bg-[#111]"></div>
               </div>
               <div className="bg-red-500/5 border border-red-500/10 p-6 rounded-3xl space-y-4">
                 {quest.rulesAndRegulations.map((rule, i) => (
                   <div key={i} className="flex gap-3 text-sm text-gray-400">
                      <span className="text-red-500 font-mono">[{i+1}]</span>
                      <p>{rule}</p>
                   </div>
                 ))}
               </div>
            </div>
          )}

          {/* FIELD COMMANDERS */}
          {quest.eventHeads && (
            <div>
               <div className="flex items-center gap-4 mb-6">
                <Terminal size={18} className="text-gray-600" />
                <h2 className="text-xs font-black text-gray-500 uppercase tracking-[0.4em]">Field_Commanders</h2>
                <div className="h-px flex-1 bg-[#111]"></div>
               </div>
               <div className="flex flex-wrap gap-4">
                {quest.eventHeads.map((head, i) => (
                  <div key={i} className="flex items-center gap-4 bg-[#0a0a0a] border border-[#222] px-6 py-4 rounded-2xl group hover:border-[#55aa55] transition-all">
                    <div className="w-10 h-10 rounded-full bg-[#111] flex items-center justify-center text-[#55aa55] font-black italic">
                      {head.name[0]}
                    </div>
                    <div>
                      <p className="text-xs font-black text-white uppercase tracking-tighter">{head.name}</p>
                      <a href={`tel:${head.phone}`} className="text-[10px] text-gray-500 font-mono hover:text-[#55aa55] flex items-center gap-1 mt-0.5">
                        <Phone size={10} /> {head.phone}
                      </a>
                    </div>
                  </div>
                ))}
               </div>
            </div>
          )}
        </div>

        {/* STICKY BOTTOM CTA */}
        <div className="fixed bottom-8 left-0 w-full px-6 z-50 pointer-events-none">
          <button 
            onClick={handleRegister}
            className="pointer-events-auto max-w-4xl mx-auto w-full py-5 bg-[#55aa55] text-black font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-white transition-all shadow-[0_20px_40px_rgba(0,0,0,0.4)] flex items-center justify-center gap-4 group active:scale-[0.98]"
          >
            Initiate_Uplink_Protocol <ChevronRight className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </main>
    </div>
  );
};

export default EventDetailsPage;