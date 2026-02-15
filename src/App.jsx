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

// Global font + animation loader
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.cdnfonts.com/css/minecraft-4');
    @import url('https://fonts.googleapis.com/css2?family=Silkscreen:wght@400;700&display=swap');

    /* Global Body Setup */
    body {
      margin: 0;
      background-color: #000000;
      color: white;
    }

    /* Grid Overlay */
    .bg-grid {
      position: fixed;
      inset: 0;
      z-index: -1;
      background-image: 
        linear-gradient(to right, #1a1a1a 1px, transparent 1px),
        linear-gradient(to bottom, #1a1a1a 1px, transparent 1px);
      background-size: 40px 40px;
    }


/* The "Glow" effect that follows the mouse */
.grid-limiter {
  mask-image: radial-gradient(circle at var(--x) var(--y), black 20%, transparent 80%);
  -webkit-mask-image: radial-gradient(circle at var(--x) var(--y), black 20%, transparent 80%);
}

    .font-minecraft { 
      font-family: 'Minecraft', 'Silkscreen', sans-serif; 
    }

    @keyframes shimmer {
      100% { transform: translateX(100%); }
    }

    .animate-shimmer {
      animation: shimmer 2s infinite;
    }
  `}</style>
);

export default function App() {
  return (
    <>
      <GlobalStyles />
      {/* This div stays fixed behind all routes */}
      <div className="bg-grid" />

      <Router>
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
        </Routes>
      </Router>
    </>
  );
}