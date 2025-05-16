import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Polution from "./pages/Polution/Polution";
import GreenAreas from "./pages/GreenAreas/GreenAreas";
import Polen from "./pages/Polen/Polen";
import SunHeat from "./pages/SunHeat/SunHeat";
import Crowd from "./pages/Crowd/Crowd";
import Register2 from "./pages/Register/components/Register2";
import Register3 from "./pages/Register/components/Register3";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register2" element={<Register2 />} />
        <Route path="/register3" element={<Register3 />} />
        <Route path="/polution" element={<Polution />} />
        <Route path="/greenareas" element={<GreenAreas />} />
        <Route path="/polen" element={<Polen />} />
        <Route path="/sunheat" element={<SunHeat />} />
        <Route path="/crowd" element={<Crowd />} />
      </Routes>
    </Router>
  </StrictMode>
);
