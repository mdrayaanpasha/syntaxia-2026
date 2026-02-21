import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/home/page";
import AuthPage from "./pages/auth/page";
import TokenHandler from "./pages/auth/tokenhandler";
import EventRegistration from "./pages/registration/event-registration";
import Dashboard from "./pages/dashboard/page";
import EventsSection from "./pages/events/page";
import EventDetailsPage from "./pages/events/details";
import AdminPage from "./pages/admin/page";
import SchedulePage from "./pages/schedule/main";
import PassSelection from "./pages/passSelection/main";
import BgmiRegister from "./pages/pass/BGMI/main";
import ValorantRegister from "./pages/pass/volo/main";
import StandardPassRegister from "./pages/pass/STANDARD/main";


const GlobalStyles = () => (
  <style>{`
    /* Importing Hyper-Modern Fonts */
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@400;700&display=swap');

    /* Global Body Setup */
    body {
      margin: 0;
      background-color: #000000;
      color: #ffffff;
      /* Using Space Grotesk as the primary modern font */
      font-family: 'Space Grotesk', 'Inter', -apple-system, sans-serif;
      -webkit-font-smoothing: antialiased;
    }

    /* Grid Overlay */
    .bg-grid {
      position: fixed;
      inset: 0;
      z-index: -1;
      background-image: 
        linear-gradient(to right, #111111 1px, transparent 1px),
        linear-gradient(to bottom, #111111 1px, transparent 1px);
      background-size: 50px 50px; /* Slightly larger for a cleaner look */
    }

    /* The "Glow" effect that follows the mouse */
    .grid-limiter {
      mask-image: radial-gradient(circle at var(--x) var(--y), black 25%, transparent 70%);
      -webkit-mask-image: radial-gradient(circle at var(--x) var(--y), black 25%, transparent 70%);
    }

    /* Renamed class to reflect modern vibe, kept alias for safety */
    .font-modern, .font-minecraft { 
      font-family: 'Space Grotesk', sans-serif;
      letter-spacing: -0.02em; /* Tighter tracking for that premium feel */
    }

    @keyframes shimmer {
      100% { transform: translateX(100%); }
    }

    .animate-shimmer {
      animation: shimmer 2s infinite;
    }
  `}</style>
);

// ... other imports
import Footer from "./components/footer";

export default function App() {
  return (
    <>
      <GlobalStyles />
      <div className="bg-grid" />

      <Router>
        <div className="flex flex-col min-h-screen">
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/token" element={<TokenHandler />} />
          <Route path="/register" element={<EventRegistration />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/events" element={<EventsSection />} />
          <Route path="/event-details" element={<EventDetailsPage />} />
          <Route path="/ross-geller" element={<AdminPage />} />
          <Route path="/schedule" element={<SchedulePage/>} />
          <Route path="/pass-selection" element={<PassSelection/>} />
          <Route path="/pass/BGMI" element={<BgmiRegister/>} />
          <Route path="/pass/VALO" element={<ValorantRegister/>} />
          <Route path="/pass/STANDARD" element={<StandardPassRegister/>} /> 
            </Routes>
          </div>
          {/* Footer sits at the bottom of the scroll */}
          <Footer />
        </div>
      </Router>
    </>
  );
}