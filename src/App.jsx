import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SyntaxiaFest from "./pages/home";
import EventLandingPage from "./pages/hackathon";
import Certificate from "./pages/certificate";
import CertForm from "./pages/certificate-form";
import VolForm from "./pages/volunteer-form";
import VolCertificate from "./pages/volcertificate";
import HomePage from "./pages/home/page";
export default function App(){
  return(
    <>
    <Router>
      <Routes>
        <Route path="/" element={<SyntaxiaFest/>} />
        <Route path="/home" element={<HomePage/>}/>
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