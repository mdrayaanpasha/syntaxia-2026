import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SyntaxiaFest from "./pages/home";
import EventLandingPage from "./pages/hackathon";

export default function App(){
  return(
    <>
    <Router>
      <Routes>
        <Route path="/" element={<SyntaxiaFest/>} />
        <Route path="/hackathon" element={<EventLandingPage/>}/>
      </Routes>
    </Router>
    </>
  )
}