import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/home/page";
import AuthPage from "./pages/auth/page";
import TokenHandler from "./pages/auth/tokenhandler";
import EventRegistration from "./pages/registration/event-registration";
import Dashboard from "./pages/dashboard/page";
import EventsSection from "./pages/events/page";
import EventDetailsPage from "./pages/events/details";
import AdminPage from "./pages/admin/page";

// Global font + animation loader
const MinecraftFontLoader = () => (
  <style>{`
    @import url('https://fonts.cdnfonts.com/css/minecraft-4');
    @import url('https://fonts.googleapis.com/css2?family=Silkscreen:wght@400;700&display=swap');

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
      <MinecraftFontLoader />

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
        </Routes>
      </Router>
    </>
  );
}
