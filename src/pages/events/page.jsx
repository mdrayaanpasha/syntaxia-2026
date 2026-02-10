import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  Sword, Code, Gamepad2, Trophy, MapPin, Clock, Sparkles, 
  Video, Target, Shield, Terminal, Cpu, DoorOpen, TrendingUp, Search, X, CheckCircle, Phone
} from 'lucide-react';
import PremiumNavbar from '../home/components/nav';

const EventsSection = () => {
  const [searchParams] = useSearchParams();
  const [filter, setFilter] = useState('All');
  const [selectedQuest, setSelectedQuest] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const sector = searchParams.get('sector');
    if (sector) {
      const formatted = sector.charAt(0).toUpperCase() + sector.slice(1).toLowerCase();
      if (formatted === "Technical" || formatted === "Gaming") setFilter(formatted);
      if (formatted === "Creative" || formatted === "Non-technical") setFilter("Non-Technical");
    }
  }, [searchParams]);

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


  const categories = ["All", "Technical", "Non-Technical", "Gaming"];
  const filteredQuests = filter === "All" ? quests : quests.filter(q => q.cat === filter);

  return (
    <div className="min-h-screen bg-[#050505] font-sans selection:bg-[#55aa55] selection:text-black">
      <PremiumNavbar />
      
      <section className="relative py-32 px-6 lg:px-12 max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4 text-[#55aa55] font-mono tracking-[0.3em] text-[10px] uppercase">
              <Sword size={14} /> /intel_sectors_decrypted
            </div>
            <h2 className="text-6xl font-black text-white tracking-tighter uppercase italic">
              QUEST <span className="text-[#ffcc00]">BOARD</span>
            </h2>
          </div>

          <div className="flex flex-wrap gap-2 bg-[#111] p-1.5 rounded-xl border border-[#222]">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-lg text-[11px] font-bold tracking-widest transition-all ${
                  filter === cat ? 'bg-[#55aa55] text-black shadow-[0_0_15px_rgba(85,170,85,0.4)]' : 'text-gray-500 hover:text-white hover:bg-[#222]'
                }`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQuests.map((quest) => (
            <div 
              key={quest.id} 
              onClick={() => setSelectedQuest(quest)}
              className={`group bg-[#0a0a0a] border border-[#222] rounded-3xl p-8 cursor-pointer transition-all hover:border-[#55aa55]/50 hover:-translate-y-2 ${quest.glow}`}
            >
              <div className="flex justify-between items-start mb-8">
                <div className={`p-4 rounded-2xl bg-[#111] border ${quest.rarity} ${quest.text}`}>
                  {quest.icon}
                </div>
                {quest.day && <span className="text-[10px] font-mono text-[#ffcc00] tracking-widest uppercase">{quest.day}</span>}
              </div>
              <h3 className="text-2xl font-black text-white mb-4 uppercase italic tracking-tighter">{quest.title}</h3>
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-2 text-xs text-gray-500 font-mono">
                  <MapPin size={14} className="text-[#55aa55]" /> {quest.venue}
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500 font-mono">
                  <Clock size={14} className="text-[#ffcc00]" /> {quest.slot}
                </div>
              </div>
              <div className="w-full py-3 bg-[#111] border border-[#222] text-[10px] font-black text-center uppercase tracking-[0.2em] group-hover:bg-[#55aa55] group-hover:text-black transition-all rounded-xl">
                Open_Intel_Briefing
              </div>
            </div>
          ))}
        </div>

        {/* --- MODAL --- */}
        {selectedQuest && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl">
            <div className="bg-[#0a0a0a] border border-[#222] w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl relative">
              <button onClick={() => setSelectedQuest(null)} className="sticky top-6 float-right mr-6 text-gray-500 hover:text-white"><X size={24} /></button>
              
              <div className="p-8 md:p-12">
                <div className={`inline-block p-4 rounded-2xl bg-[#111] border ${selectedQuest.rarity} ${selectedQuest.text} mb-8`}>
                  {selectedQuest.icon}
                </div>
                <h3 className="text-5xl font-black text-white uppercase italic mb-4">{selectedQuest.title}</h3>
                <p className="text-gray-400 leading-relaxed mb-8 font-medium">{selectedQuest.description}</p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="p-4 bg-[#111] rounded-2xl border border-[#222]">
                    <p className="text-[10px] text-gray-600 uppercase mb-1 font-bold">Venue</p>
                    <p className="text-sm text-white font-bold">{selectedQuest.venue}</p>
                  </div>
                  <div className="p-4 bg-[#111] rounded-2xl border border-[#222]">
                    <p className="text-[10px] text-gray-600 uppercase mb-1 font-bold">Slot</p>
                    <p className="text-sm text-white font-bold">{selectedQuest.slot}</p>
                  </div>
                </div>

                {selectedQuest.eventDetails && (
                  <div className="mb-8">
                    <p className="text-[10px] text-[#55aa55] uppercase font-black tracking-widest mb-4">Mission_Parameters</p>
                    <ul className="space-y-3">
                      {selectedQuest.eventDetails.map((detail, i) => (
                        <li key={i} className="flex gap-3 text-sm text-gray-300">
                          <div className="w-1.5 h-1.5 bg-[#55aa55] rounded-full mt-1.5 shrink-0" /> {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedQuest.rulesAndRegulations && (
                  <div className="mb-8">
                    <p className="text-[10px] text-red-500 uppercase font-black tracking-widest mb-4">Rules_&_Directives</p>
                    <ul className="space-y-3">
                      {selectedQuest.rulesAndRegulations.map((rule, i) => (
                        <li key={i} className="flex gap-3 text-sm text-gray-400">
                          <CheckCircle size={14} className="text-red-500 shrink-0 mt-0.5" /> {rule}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedQuest.eventHeads && (
                  <div className="mb-10">
                    <p className="text-[10px] text-gray-600 uppercase font-black tracking-widest mb-4">Field_Commanders</p>
                    <div className="flex flex-wrap gap-4">
                      {selectedQuest.eventHeads.map((head, i) => (
                        <div key={i} className="flex items-center gap-3 bg-[#111] px-4 py-2 rounded-xl border border-[#222]">
                          <Phone size={12} className="text-[#55aa55]" />
                          <span className="text-xs text-white font-bold uppercase">{head.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <button 
                  onClick={() => {
                    const targetName = selectedQuest.dbId;
                    navigate(`/register?event-name=${targetName}`);
                  }}
                  className="w-full py-5 bg-[#55aa55] text-black font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-white transition-all shadow-[0_10px_30px_rgba(85,170,85,0.2)]"
                >
                  Initiate_Uplink
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default EventsSection;