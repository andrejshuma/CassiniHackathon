import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Test from "./pages/Test";
import Advice from "./pages/Advice/Advice";
import Profile from "./pages/Profile/Profile";
import FeaturePage from "./pages/FeatureIndexes/FeaturePage.jsx";

import { GlobalStateProvider } from "./GlobalStateProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GlobalStateProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/1" element={<FeaturePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/test" element={<Test />}></Route>
          <Route path="/advice" element={<Advice />} />
          <Route path="/home" element={<Home />} />

          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </GlobalStateProvider>
  </StrictMode>
);
