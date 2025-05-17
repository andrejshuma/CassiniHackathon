import React from "react";
import Navbar from "../GeneralComponents/Navbar";
import { Bell } from 'lucide-react';
import userDefault from "../../assets/userDefault.jpg";
import Slider_features from "./Slider_features.jsx";
import FeaturePages from "./FeatureSubpages.jsx";
import {pollenData, uvData, pollutionData} from "./data.js";
import { pollenAdvice, pollutionAdvice, uvAdvice } from "./advices.js";
import Tips from "./Tips.jsx";

import Top from "./HomepageView/Top.jsx";
import Metrics from "./HomepageView/Metrics.jsx";
import Footer from "../GeneralComponents/Footer.jsx";


const Home = () => {
    const [subPage, setSubPage] = React.useState("pollen"); // home, pollen, uv, pollution, mental
    const getData = {
        "pollen": pollenData,
        "uv": uvData,
        "pollution": pollutionData,
    }
    const getTips = {
        "pollen": pollenAdvice,
        "uv": uvAdvice,
        "pollution": pollutionAdvice,
    }
    return (
        <>
            <Navbar />
            <Slider_features activeSubpage={subPage} changeSubpage={setSubPage} />
            {/* User Header */}
            { subPage === "home" ? null : <FeaturePages data={getData[subPage]} dataName={subPage}/> }
            { subPage === "home" ? null : <Tips tips={getTips[subPage]}/> }
            <Metrics/>
        </>
    );
};

export default Home;
