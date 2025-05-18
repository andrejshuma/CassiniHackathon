import React from "react";
import Navbar from "../GeneralComponents/Navbar";
import { Bell } from 'lucide-react';
import Slider_features from "./Slider_features.jsx";
import FeaturePages from "./OldFeaturePageWIthAnalytics.jsx";
import {pollenData, uvData, pollutionData} from "./data.js";
import { pollenAdvice, pollutionAdvice, uvAdvice } from "./advices.js";
import Tips from "./Tips.jsx";

import Top from "./HomepageView/Top.jsx";
import Metrics from "./HomepageView/Metrics.jsx";
import Footer from "../GeneralComponents/Footer.jsx";
import { useGlobalState } from "../../GlobalStateProvider.jsx";


const Home = () => {
    const { globalObject, setGlobalObject } = useGlobalState();
    console.log("HOME PAGE", globalObject)
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
            <Top/>
            {/* User Header */}

            <Metrics/>
            <Footer/>
        </>
    );
};

export default Home;
