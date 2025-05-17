import React from "react";
import Navbar from "../GeneralComponents/Navbar";
import { Bell } from 'lucide-react';
import userDefault from "../../assets/userDefault.jpg";
import Slider_features from "./Slider_features.jsx";
import FeaturePages from "./FeaturePages.jsx";
import {pollenData, uvData, pollutionData} from "./data.js";

const Home = () => {
    const [subPage, setSubPage] = React.useState("pollen"); // home, pollen, uv, pollution, mental
    const getData = {
        "pollen": pollenData,
        "uv": uvData,
        "pollution": pollutionData,
    }
    return (
        <>
            <Navbar />
            <h1>Home</h1>
            <Slider_features activeSubpage={subPage} changeSubpage={setSubPage} />
            {/* User Header */}
            { subPage === "home" ? null : <FeaturePages data={getData[subPage]} dataName={subPage}/> }
        </>
    );
};

export default Home;
