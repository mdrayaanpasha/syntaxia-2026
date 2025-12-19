import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SyntaxiaFest from "./pages/home";
import EventLandingPage from "./pages/hackathon";
import Certificate from "./pages/certificate";
import CertForm from "./pages/certificate-form";
export default function App(){
  return(
    <>
    <Router>
      <Routes>
        <Route path="/" element={<SyntaxiaFest/>} />
        <Route path="/hackathon" element={<EventLandingPage/>}/>
        <Route path="/CertForm" element={<CertForm/>}/>
<Route path="/certificate/:name/college/:college" element={<Certificate />} />      </Routes>
    </Router>
    </>
  )
}