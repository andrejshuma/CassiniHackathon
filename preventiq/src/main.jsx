import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Crowd from "./pages/Crowd/Crowd";

import GreenAreas from "./pages/GreenAreas/GreenAreas";
import Home from "./pages/Home/Home";
import Polen from "./pages/Polen/Polen";
import Polution from "./pages/Polution/Polution";
import Register2 from "./pages/Register/components/Register2";
import Register3 from "./pages/Register/components/Register3";
import Register from "./pages/Register/Register";
import SunHeat from "./pages/SunHeat/SunHeat";
import Test from "./pages/Test";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/register" element={<Register />} />
				<Route path="/register2" element={<Register2 />} />
				<Route path="/register3" element={<Register3 />} />
				<Route path="/test" element={<Test />}></Route>
				<Route path="/polution" element={<Polution />} />
				<Route path="/greenareas" element={<GreenAreas />} />
				<Route path="/polen" element={<Polen />} />
				<Route path="/sunheat" element={<SunHeat />} />
				<Route path="/crowd" element={<Crowd />} />
			</Routes>
		</Router>
	</StrictMode>
);
