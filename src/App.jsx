import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SyntaxiaFest from "./pages/home";


export default function App(){
  return(
    <>
    <Router>
      <Routes>
        <Route path="/" element={<SyntaxiaFest/>} />
      </Routes>
    </Router>
    </>
  )
}