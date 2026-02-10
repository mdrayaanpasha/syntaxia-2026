import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SyntaxiaFest from "./pages/home";
import EventLandingPage from "./pages/hackathon";
import Certificate from "./pages/certificate";
import CertForm from "./pages/certificate-form";
import VolForm from "./pages/volunteer-form";
import VolCertificate from "./pages/volcertificate";
import HomePage from "./pages/home/page";
import AuthPage from "./pages/auth/page";
import TokenHandler from "./pages/auth/tokenhandler";
import EventRegistration from "./pages/registration/event-registration";
import Dashboard from "./pages/dashboard/page";
import EventsSection from "./pages/events/page";
import EventDetailsPage from "./pages/events/details";
import AdminPage from "./pages/admin/page";

export default function App(){
  return(
    <>
    <Router>
      <Routes>
        <Route path="/" element={<SyntaxiaFest/>} />
        <Route path="/home" element={<HomePage/>}/>
        <Route path="/auth" element={<AuthPage/>}/>
        <Route path="/token" element={<TokenHandler/>}/>
        <Route path="/register" element={<EventRegistration/>}/>
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/events" element={<EventsSection/>} />
        <Route path="/event-details" element={<EventDetailsPage/>} />
        <Route path="/ross-geller" element={<AdminPage/>} />
        {/* <Route path="/hackathon" element={<EventLandingPage/>}/>
        <Route path="/CertForm" element={<CertForm/>}/>
<Route path="/certificate/:name/college/:college" element={<Certificate />} />    
        <Route path="/volform" element={<VolForm/>}/>
        <Route path="/vol-certificate/:name/college/:college" element={<VolCertificate />} />    
 */}

  </Routes>
    </Router>
    </>
  )
}